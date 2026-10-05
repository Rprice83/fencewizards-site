// POST /api/staff/stories/:id/submit — all photos are up: mark the story sent and email the reviewer (STORY_NOTIFY).
import { json } from '../../../../../server/inbox.js';
import { getStory, setStoryStatus, storySummary, validStoryId, JOB_TYPES } from '../../../../../server/stories.js';
import { sendWithResend } from '../../../../../server/email.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function onRequestPost(context) {
  const { params, env } = context;
  if (!validStoryId(params.id)) return json({ error: 'Not found' }, 404);
  const story = await getStory(env.DB, params.id);
  if (!story) return json({ error: 'Not found' }, 404);
  if (!story.photos.length) return json({ error: 'Add at least one photo.' }, 400);
  if (story.status === 'uploading') await setStoryStatus(env.DB, story.id, 'submitted');

  const to = String(env.STORY_NOTIFY || '').split(',').map(s => s.trim()).filter(Boolean);
  const notify = async () => {
    let status = 'skipped';
    if (env.RESEND_API_KEY && to.length) {
      const summary = storySummary(story);
      const link = `${env.SITE_URL || ''}/staff/stories/#${story.id}`;
      try {
        await sendWithResend(env, {
          to, from: env.QUOTE_FROM,
          subject: `New job story ${story.id}: ${JOB_TYPES[story.answers.jobType] || 'Job'} in ${story.answers.town} (${story.photos.length} photos)`,
          html: `<div style="font:15px/1.5 Arial,sans-serif;color:#231F20;max-width:600px"><h2 style="margin:0 0 6px">New job story from ${esc(story.author)}</h2>
            <pre style="white-space:pre-wrap;font:14px/1.5 Arial,sans-serif;background:#f6f6f6;padding:12px 14px;border-radius:6px">${esc(summary)}</pre>
            <p><a href="${esc(link)}" style="color:#ED1C24;font-weight:700">Open it in the staff area →</a></p>
            <p style="color:#888;font-size:12px">Draft it, review it, then publish (FIELD-NOTES.md). Nothing is posted automatically.</p></div>`,
          text: `New job story ${story.id} from ${story.author}\n\n${summary}\n\n${link}`,
        });
        status = 'sent';
      } catch (err) { status = `failed: ${String(err.message).slice(0, 200)}`; }
    }
    await env.DB.prepare('UPDATE stories SET email_status = ? WHERE id = ?').bind(status, story.id).run();
  };
  context.waitUntil(notify());
  return json({ ok: true });
}
