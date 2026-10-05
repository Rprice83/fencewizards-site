-- Driving distance from downtown Indianapolis (Google Routes API), cached per site rounded to ~100 m.
CREATE TABLE distance_cache (
  key        TEXT PRIMARY KEY,   -- "39.768,-86.158"
  miles      REAL NOT NULL,
  created_at TEXT NOT NULL
);

-- How a quote's distance was measured: 'driving' or 'straight' (fallback / no Google key)
ALTER TABLE quotes ADD COLUMN distance_method TEXT;
