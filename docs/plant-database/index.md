# Plant Database

<section class="ew-page-hero" aria-label="Plant Database">
  <object class="ew-page-hero-image" data="/assets/images/heroes/plant-database.svg" type="image/svg+xml" aria-label="Plant monitoring dashboard, sensors and field notebook in the NoMad's Farm garden"></object>
  <div class="ew-page-hero-content">
    <p class="ew-page-hero-kicker">03 · Operations</p>
    <h1>Plant Database</h1>
    <p>Individual plant assets, vitals, logs, topology and map context.</p>
  </div>
</section>

This is the canonical operational app for NoMad's Farm.

```text
site / location
  -> individual plant or plot asset
     -> container / slot
     -> vitals
     -> event logs
     -> environmental interfaces
     -> radar profile
     -> map / topology context
```

Each individually managed plant gets its own stable asset ID and log stream. Group assets are kept only where the real-world object is intentionally managed as a plot, population or pit cluster.

Owner-provided coordinates are used for mapped sites and assets. Plant-level GPS offsets are only visualization offsets inside the same growing location, not centimeter-accurate survey positions.

<div data-ew-metrics-app></div>

---

## Runtime data

```text
/assets/data/plant-map-app.seed.json
/assets/data/plant-asset-logs.json
/assets/data/plant-radar-profiles.json
/assets/data/balcony-environment.daily.json
```

## Inventory model

```text
Site
├── Plant Asset 01
│   ├── Asset ID / SN
│   ├── Type / PID
│   ├── Container / slot
│   ├── Status
│   ├── Vitals
│   ├── Logs
│   └── Metric interfaces
├── Plant Asset 02
└── Plot / population assets where grouping is intentional
```
