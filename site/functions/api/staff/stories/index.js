// GET  /api/staff/stories — job stories, newest first (archived hidden)
// POST /api/staff/stories — { answers, quoteId? } → { id }; then upload photos, then POST …/submit
import { json } from '../../../../server/inbox.js';
import { listStories, createStory, cleanAnswers, StoryError } from '../../../../server/stories.js';

export async function onRequestGet({ env }) {
  return json({ stories: await listStories(env.DB) });
}

export async function onRequestPost({ request, env, data }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request' }, 400); }
  try {
    const id = await createStory(env.DB, { answers: cleanAnswers(body.answers), author: data.user.name, quoteId: body.quoteId });
    return json({ ok: true, id });
  } catch (err) {
    if (err instanceof StoryError) return json({ error: err.message }, 400);
    throw err;
  }
}
