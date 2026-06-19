# Metrics App

<section class="ew-page-hero" aria-label="Metrics app">
  <img class="ew-page-hero-image" src="../assets/images/monitoring.webp" alt="" aria-hidden="true" loading="eager" decoding="async" width="2560" height="1440" />
  <div class="ew-page-hero-content">
    <p class="ew-page-hero-kicker">Plant data application</p>
    <h1>Metrics App</h1>
    <p>Map underlays, plant asset inventory, vitals, topology, common weather context and future heatmap layers.</p>
  </div>
</section>

This is the new direction for Metrics: not just a page, but a static-site app.

The app starts with:

```text
real map underlay       -> OpenStreetMap / Leaflet
plant location overlay  -> plant assets and sites
vitals panel            -> selected asset detail
weather context         -> shared balcony environment telemetry
topology view           -> site → plant → metric relationship graph
future heatmaps         -> growth, stress, sun, humidity, UV and soil moisture
```

Home balcony coordinates are intentionally approximate and city-level in the public repository. Exact residential coordinates do not belong in a public plant dashboard, because apparently tomatoes do not need doxxing support.

<div data-ew-metrics-app></div>

---

## App Data Sources

```text
../assets/data/plant-map-app.seed.json
../assets/data/balcony-environment.daily.json
../assets/data/pink-tomatoes.daily.json
../data/balcony-environment.sources.yml
```

---

## Target Underlay / Overlay Model

```text
Base underlays
├── OpenStreetMap
├── satellite / orthophoto later
├── elevation / slope later
└── soil / climate grid later

Plant overlays
├── plant assets
├── containers / beds
├── vitals
├── growth rate
├── stress score
└── topology

Weather overlays
├── temperature
├── humidity
├── UV index
├── solar radiation
├── precipitation
├── wind
└── pressure

Future heatmaps
├── growth heatmap
├── water stress heatmap
├── UV stress heatmap
├── humidity risk heatmap
├── pest pressure heatmap
└── yield heatmap
```
