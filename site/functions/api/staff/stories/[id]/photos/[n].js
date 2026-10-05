// GET /api/staff/stories/:id/photos/:n — the original photo (staff only; may still contain GPS)
import { json } from '../../../../../../server/inbox.js';
import { getStory, validStoryId } from '../../../../../../server/stories.js';

export async function onRequestGet({ params, env }) {
  if (!validStoryId(params.id) || !env.PHOTOS) return json({ error: 'Not found' }, 404);
  const story = await getStory(env.DB, params.id);
  const photo = story?.photos.find(p => String(p.n) === params.n);
  const obj = photo && await env.PHOTOS.get(photo.key);
  if (!obj) return json({ error: 'Not found' }, 404);
  return new Response(obj.body, {
    headers: {
      'Content-Type': obj.httpMetadata?.contentType || 'application/octet-stream',
      'Content-Disposition': `inline; filename="${photo.key.split('/').pop()}"`,
      'Cache-Control': 'private, max-age=86400',
    },
  });
}
