// POST /api/staff/stories/:id/photos — one original photo per request (raw body).
// Headers: Content-Type (image type), X-File-Name (URI-encoded original name).
import { json } from '../../../../../server/inbox.js';
import { addPhoto, validStoryId, MAX_PHOTO_BYTES, StoryError } from '../../../../../server/stories.js';

export async function onRequestPost({ params, env, request }) {
  if (!validStoryId(params.id)) return json({ error: 'Not found' }, 404);
  if (!env.PHOTOS) return json({ error: 'Photo storage is not set up yet.' }, 500);
  const size = Number(request.headers.get('Content-Length') || 0);
  if (size > MAX_PHOTO_BYTES) return json({ error: 'That photo is too large (30 MB max).' }, 413);
  let name = 'photo.jpg';
  try { name = decodeURIComponent(request.headers.get('X-File-Name') || name); } catch { /* keep default */ }
  const type = (request.headers.get('Content-Type') || '').split(';')[0].trim();
  try {
    // Buffer it: R2 needs a known length, and photos are well under the request limit
    const body = await request.arrayBuffer();
    const photo = await addPhoto(env.DB, env.PHOTOS, params.id, { body, name, type, size: body.byteLength });
    return photo ? json({ ok: true, photo }) : json({ error: 'Not found' }, 404);
  } catch (err) {
    if (err instanceof StoryError) return json({ error: err.message }, 400);
    throw err;
  }
}
