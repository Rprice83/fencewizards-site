// Map + address-search providers for the estimator.
//
// DEVELOPMENT: free Esri World Imagery tiles and OpenStreetMap Nominatim search (no API key).
//   Esri's public tiles and Nominatim both restrict heavy/commercial use, so they are for building and testing only.
// PRODUCTION (TODO.md): swap in Google Maps tiles + Places autocomplete once the API key exists.
//   Only this file should need to change; estimate.js talks to `mapConfig` and `geocoder.search()`.

const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services';
const esriAttribution = 'Imagery &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community';

export const mapConfig = {
  maxZoom: 21,
  satellite: [
    { url: `${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`, options: { maxNativeZoom: 19, maxZoom: 21, attribution: esriAttribution } },
    { url: `${ESRI}/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}`, options: { maxNativeZoom: 19, maxZoom: 21, opacity: 0.85 } },
    { url: `${ESRI}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`, options: { maxNativeZoom: 19, maxZoom: 21 } },
  ],
  streets: [
    { url: `${ESRI}/World_Street_Map/MapServer/tile/{z}/{y}/{x}`, options: { maxNativeZoom: 19, maxZoom: 21, attribution: 'Tiles &copy; Esri' } },
  ],
};

// Indiana-ish bias box (lng/lat): west, north, east, south
const VIEWBOX = '-88.1,41.8,-84.7,38.2';

export const geocoder = {
  // Returns [{ label, lat, lng }]
  async search(query) {
    const params = new URLSearchParams({
      q: query, format: 'jsonv2', addressdetails: '0', limit: '5', countrycodes: 'us', viewbox: VIEWBOX, bounded: '0',
    });
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Search failed (${res.status})`);
    const rows = await res.json();
    return rows.map(r => ({ label: r.display_name.replace(/, United States$/, ''), lat: Number(r.lat), lng: Number(r.lon) }));
  },
};
