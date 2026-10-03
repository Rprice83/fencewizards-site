# Fence Wizards organized asset library

Open **asset-library.html** in a browser to search all 51 assets, compare originals with existing website references, read their metadata, and open named copies.

## Results

- 42 original photos cataloged; 41 matched to the 41 existing website photo references using pixel/perceptual comparison and visual inspection.
- 1 additional photo, **FW-P028 / IMG_1526.HEIC**, shows a person beside a wrapped pickup. Its nearest automated candidate was rejected; no existing website photo match was found.
- 9 original videos cataloged. Seven have strong scene/frame matches to existing website video posters. V001 is an alternate construction shot; V008 overlaps the street-truck scene in V007. These associations do not prove the complete edited website video is identical to the original clip.
- 40 photos contain GPS coordinates. All 42 photos contain embedded dates. All nine video containers contain creation dates, which may reflect editing/export rather than filming.
- No exact duplicate original files were found. In particular, V007 and V008 are distinct 4.18-second and 5.06-second clips.

## Files to use

- **asset-library.html** — searchable internal library with image comparisons, names, source descriptions, source page usage, GPS map links, and matching notes. Keep this file with the surrounding folder.
- **richard-review.html** — self-contained review form with embedded thumbnails. You may send this file alone to Richard. He can open it in a desktop browser, type short answers, and download a text file to return. It starts with three priority groups; select All groups for the remaining location/project confirmations. Answers save locally when the browser supports it; downloading is the reliable portable copy.
- **asset-register.json** — full structured register associating each original file with its stable ID, named copy, original hash, metadata, website evidence, and suggested alt text. This is the source for future website imports.
- **named-photos/** — 42 descriptively named JPEG copies, maximum 2400 pixels on the longest side, with orientation normalized. GPS and camera metadata are excluded from these public-facing copies but retained in the internal register and originals. Final responsive sizes can be generated after design selection.
- **named-videos/** — nine descriptively named, full-quality copies. They retain their source codecs and metadata; produce optimized web versions before publishing.
- **reference-images/** — existing website images used as matching evidence.
- **previews/** and **contact-sheets/** — review images and matching comparisons. The early photo matching sheets show automated candidates; P028's displayed candidate was rejected in the final register.

## Metadata rules

### GPS city lookup

Every asset now has a **GPS_City** field, visible directly on its library card and in the Richard review form. Forty photo coordinates were looked up against U.S. Census Bureau place boundaries. Thirty-six fall within a named incorporated place or Census designated place; four fall outside those places and show their township with county/state context. Indianapolis city (balance) is displayed as Indianapolis, with the exact Census name retained in GPS_Place_Name.

Two photos and all nine videos currently say **Unavailable — no GPS extracted**. No city was copied from a related photo or inferred from a source webpage. The basic video metadata scan did not expose coordinates; V001/V002 contain DJI data streams that have not been decoded. This label does not establish that the original video contains no possible GPS information.

GPS_City is the place containing the recorded coordinate, not necessarily a postal city or a verified job location. Confirmed project-city fields remain separate. GPS_City_Source_URL, GPS_City_Status, GPS_Place_Name, GPS_County, GPS_State, and GPS_City_Lookup_Date preserve provenance. Raw lookup responses are stored in gps-city-evidence. See [U.S. Census geographic lookup documentation](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html).

All originals remain untouched in Original Pictures and Drone Footage. Stable IDs connect them to the prepared copies even if public filenames change later. The register stores existing descriptions separately from suggested alt text. Nothing has been uploaded or published.

Website placement does not establish a photo's location: the same photo appears on multiple city pages. Existing location wording is preserved as a source claim, while confirmed_city and confirmed_project remain blank until confirmed. GPS map links are device-recorded clues, not verified customer/project details. EXIF dates are photo dates, not necessarily installation dates.

The 33 review groups are suggestions based on GPS proximity within 150 meters of a group's first photo, or clearly labeled visual associations for videos. They are not confirmed jobs. Photos from different dates may belong to the same place but different jobs. Richard can correct groupings in the form.

Customer names, individual identities, exact site details, and publication permission were not inferred. The register and review form contain internal location clues and are intended for the website team and Richard.

## Items that need attention

1. **P028:** identify the person/location only if useful and permitted.
2. **V001 and V002/V003:** related construction footage; select the preferred edit and confirm the project.
3. **V007/V008:** overlapping street footage, not exact duplicates; choose the preferred version.
4. **V005:** portrait original. The current website poster is stretched horizontally; preserve the correct proportions in the redesign.
5. **P035/P036:** orange safety mesh is visible, but the confirmed current service scope excludes orange fencing. Do not advertise that mesh as a rental product.
6. **P042:** existing name/caption says van, but the photo shows a pickup. The new name and suggested alt text reflect that, while the source caption remains available.
7. **P031:** use the neutral phrase construction equipment rather than inheriting the website's yard-tractor identification.
8. **Hero reel:** V009 matches the hero poster, but the existing reel combines multiple scenes. Do not replace the entire reel with V009 merely because the poster matches.

## Next workflow

Send Richard the review form. Use his returned answers to update confirmed city, project, permissions, and grouping in the register, with his confirmation recorded as the source. Use the job story questionnaire for the narrative details of projects selected for Field Notes. Website alt text belongs in the page markup; the JSON register provides the associated text and provenance for implementation.
