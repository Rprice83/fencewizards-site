// Backup preview server: plain Node.js, no installs needed. Serves site/public at http://localhost:8788.
// Every page, the video and the estimator's drawing + pricing work. Form sending and the Quote Inbox
// need the full Cloudflare engine (Start Website Preview.command) and won't work in this mode.
import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'site', 'public');
const PORT = 8788;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};

async function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  const safe = normalize(join(ROOT, p));
  if (!safe.startsWith(ROOT)) return null; // no escaping the site folder
  for (const candidate of [safe, join(safe, 'index.html'), `${safe}.html`]) {
    try { const s = await stat(candidate); if (s.isFile()) return { file: candidate, size: s.size }; } catch { /* next */ }
  }
  return null;
}

createServer(async (req, res) => {
  try {
    if (req.url.startsWith('/api/')) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Sending is turned off in the simple preview. Use the full preview to test forms.' }));
    }
    // Pretty folder URLs need a trailing slash so relative links behave like the real host
    if (!extname(req.url.split('?')[0]) && !req.url.split('?')[0].endsWith('/')) {
      const target = await resolveFile(req.url);
      if (target && target.file.endsWith('index.html')) { res.writeHead(301, { Location: `${req.url.split('?')[0]}/` }); return res.end(); }
    }
    const found = await resolveFile(req.url);
    if (!found) {
      const nf = await readFile(join(ROOT, '404.html')).catch(() => 'Not found');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(nf);
    }
    const type = TYPES[extname(found.file).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if (range) { // Safari needs byte ranges to play video
      let start = range[1] ? Number(range[1]) : found.size - Number(range[2]);
      let end = range[1] && range[2] ? Number(range[2]) : found.size - 1;
      start = Math.max(0, start); end = Math.min(end, found.size - 1);
      if (start > end) { res.writeHead(416, { 'Content-Range': `bytes */${found.size}` }); return res.end(); }
      res.writeHead(206, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${found.size}`, 'Content-Length': end - start + 1 });
      return createReadStream(found.file, { start, end }).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': found.size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' });
    if (req.method === 'HEAD') return res.end();
    createReadStream(found.file).pipe(res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(String(err));
  }
}).listen(PORT, '127.0.0.1', () => {
  console.log('\n  Simple preview running at http://localhost:8788');
  console.log('  (Pages, video and estimator pricing work; sending forms and the Quote Inbox do not.)');
  console.log('  Keep this window open. To stop: close it or press Control+C.\n');
}).on('error', err => {
  console.error(err.code === 'EADDRINUSE' ? '\n  Something is already using port 8788. Close the other preview window first.\n' : err);
  process.exit(1);
});
