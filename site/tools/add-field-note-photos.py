"""
Prepare Richard's job photos for a Field Note.

    python tools/add-field-note-photos.py <note-slug> <photo or folder> [more photos...]

For each photo it:
  * rotates it upright and saves web versions at 800 and 1600 px wide
    into public/assets/field-notes/<note-slug>/photo-01-800.jpg, -1600.jpg, ...
  * strips ALL metadata from the published copies (GPS location, camera, owner name)
  * reads the GPS location and date first, and reports the nearest service-area town,
    so the note's town can be checked against where the photos were actually taken

It prints a ready-to-paste `photos:` block for the note's front matter. Originals are never changed.
Supports JPG, PNG and iPhone HEIC photos.
"""
import math
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps, ExifTags

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:  # HEIC files just won't open
    pass

SITE = Path(__file__).resolve().parent.parent
EXTS = {".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp"}
SIZES = (800, 1600)


def load_towns():
    """Read the town list (name, lat, lng) straight from build/lib/site.mjs so there is one source of truth."""
    src = (SITE / "build" / "lib" / "site.mjs").read_text(encoding="utf-8")
    return [(n, float(a), float(o)) for n, a, o in re.findall(r"name: '([^']+)', county: '[^']+', lat: ([\d.-]+), lng: ([\d.-]+)", src)]


def miles(a, b):
    lat1, lng1, lat2, lng2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((lat2 - lat1) / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin((lng2 - lng1) / 2) ** 2
    return 2 * 3958.8 * math.asin(math.sqrt(h))


def gps_and_date(img):
    exif = img.getexif()
    date = None
    try:
        sub = exif.get_ifd(ExifTags.IFD.Exif)
        date = sub.get(ExifTags.Base.DateTimeOriginal) or exif.get(ExifTags.Base.DateTime)
    except Exception:
        pass
    gps = None
    try:
        g = exif.get_ifd(ExifTags.IFD.GPSInfo)
        if g and 2 in g and 4 in g:
            def deg(v):
                return float(v[0]) + float(v[1]) / 60 + float(v[2]) / 3600
            lat = deg(g[2]) * (-1 if g.get(1) == "S" else 1)
            lng = deg(g[4]) * (-1 if g.get(3) == "W" else 1)
            gps = (lat, lng)
    except Exception:
        pass
    if date:
        date = str(date)[:10].replace(":", "-")
    return gps, date


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    slug = sys.argv[1]
    if not re.fullmatch(r"[a-z0-9-]+", slug):
        sys.exit("The note slug must be lowercase letters, numbers and hyphens, e.g. bloomington-campus-perimeter-oct-2026")

    files = []
    for arg in sys.argv[2:]:
        p = Path(arg)
        files += sorted(f for f in p.iterdir() if f.suffix.lower() in EXTS) if p.is_dir() else [p]
    if not files:
        sys.exit("No photos found.")

    out = SITE / "public" / "assets" / "field-notes" / slug
    out.mkdir(parents=True, exist_ok=True)
    start = len(list(out.glob("photo-*-1600.jpg"))) + 1
    towns = load_towns()

    print(f"\nPreparing {len(files)} photo(s) for '{slug}'\n")
    stub, places, dates = [], [], []
    for i, f in enumerate(files, start):
        name = f"photo-{i:02d}"
        with Image.open(f) as raw:
            gps, date = gps_and_date(raw)
            img = ImageOps.exif_transpose(raw).convert("RGB")
        for w in SIZES:
            tw = min(w, img.width)
            res = img.resize((tw, round(img.height * tw / img.width)), Image.LANCZOS) if img.width > tw else img
            # saving without exif= drops every bit of metadata from the published file
            res.save(out / f"{name}-{w}.jpg", quality=82 if w == 1600 else 80, optimize=True, progressive=True)

        where = "no GPS in photo"
        if gps:
            town, dist = min(((t[0], miles(gps, (t[1], t[2]))) for t in towns), key=lambda x: x[1])
            where = f"{dist:.1f} mi from {town}"
            places.append((town, dist))
        if date:
            dates.append(date)
        print(f"  {f.name:<32} -> {name}   {img.width}x{img.height}   taken {date or 'unknown'}   {where}")
        stub.append(f"  - file: {name}\n    alt: \"\"   # describe what's visible, no town or customer names\n    caption: \"\"   # optional")

    print("\nPaste into the note's front matter (fill in alt text):\n")
    print("photos:\n" + "\n".join(stub))
    if places:
        nearest = min(places, key=lambda x: x[1])
        print(f"\nPhotos were taken nearest to: {nearest[0]} ({nearest[1]:.1f} mi). Check this matches the note's town.")
        if nearest[1] > 15:
            print("  ! That's more than 15 miles from any named town. The job may be between towns; set `town:` to the closest one or leave it out.")
    if dates:
        print(f"Photo dates: {min(dates)} to {max(dates)}")
    print(f"\nSaved to {out.relative_to(SITE)}. Metadata removed from the published copies.\n")


if __name__ == "__main__":
    main()
