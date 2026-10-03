# Running the website preview on a Mac

Everything Mac-specific lives in this `mac` folder. The Windows setup is untouched.

## One-time setup
1. **Install Node.js:** go to https://nodejs.org and install the **LTS** version (a normal Mac installer, default options).
2. **Get the project onto the Mac.** The easiest way is to unzip **`Fence Wizards site (Mac preview).zip`** (made on the Windows PC). It holds just what the preview needs, about 50 MB. Copying the whole project folder also works; the start file sets itself up either way.
3. Put the unzipped folder somewhere normal like **Documents** or **Desktop**, not inside a syncing folder.

## Start the site
**Easiest, always works:**
1. Open **Terminal** (press Command+Space, type "Terminal", press Return).
2. Type `bash` and a space.
3. **Drag** `Start Website Preview.command` from this folder into the Terminal window, then press **Return**.

**Or double-click it in Finder.** The first time, macOS will probably block it. Right-click the file → **Open** → **Open**. After that, double-clicking works.
If double-clicking does nothing or says "permission denied", use the Terminal way above. To make double-clicking work, in Terminal type `chmod +x ` (with the space), drag the file in, and press Return, once.

The first run takes a few minutes while it downloads the Mac versions of the site's tools. Then your browser opens to **http://localhost:8788**.

- Quote Inbox: **http://localhost:8788/staff/** (opens without a login on this computer only)
- **Keep the Terminal window open** while you show the site. Close it (or press Control+C) to stop.
- The Mac needs **internet** for fonts and satellite maps; a phone hotspot is fine.

## If the main start file shows an error (e.g. "write EPIPE")
Use the **backup**: `Start Simple Preview (no forms).command`, started the same way (Terminal: `bash `, drag the file in, Return).
- Needs only Node.js, nothing to download, and starts in seconds.
- **Works:** every page, the drone video, the estimator's satellite map, drawing and live pricing.
- **Doesn't work:** sending forms / quotes and the Quote Inbox (those need the full engine).

To help fix the main file, note your **macOS version + chip** (Apple menu → About This Mac) and copy the last ~15 lines of the Terminal window.

## Notes
- This is a local draft: form emails don't send yet, and logos and font are placeholders.
- Quotes you send while demoing appear in the Quote Inbox on this Mac only.
- Do one test run at home before showing anyone, so the first-time download is already done.
