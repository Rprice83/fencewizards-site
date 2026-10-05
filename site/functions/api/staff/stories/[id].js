// GET   /api/staff/stories/:id — the story with its answers and photo list
// PATCH /api/staff/stories/:id — { status } (e.g. 'drafted', 'published', 'archived')
import { json } from '../../../../server/inbox.js';
import { getStory, setStoryStatus, validStoryId, StoryError } from '../../../../server/stories.js';

export async function onRequestGet({ params, env }) {
  if (!validStoryId(params.id)) return json({ error: 'Not found' }, 404);
  const s = await getStory(env.DB, params.id);
  return s ? json(s) : json({ error: 'Not found' }, 404);
}

export async function onRequestPatch({ params, env, request }) {
  if (!validStoryId(params.id)) return json({ error: 'Not found' }, 404);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request' }, 400); }
  try {
    return (await setStoryStatus(env.DB, params.id, body.status)) ? json({ ok: true }) : json({ error: 'Not found' }, 404);
  } catch (err) {
    if (err instanceof StoryError) return json({ error: err.message }, 400);
    throw err;
  }
}
