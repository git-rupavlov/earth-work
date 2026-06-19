# Monitor

<section class="ew-page-hero" aria-label="Plant monitor">
  <img class="ew-page-hero-image" src="../assets/images/monitoring.webp" alt="" aria-hidden="true" loading="eager" decoding="async" width="2560" height="1440" />
  <div class="ew-page-hero-content">
    <p class="ew-page-hero-kicker">Plant NMS</p>
    <h1>Plant Monitor</h1>
    <p>One inventory-style page for all plants, with selected-asset details, charts and logs.</p>
  </div>
</section>

This is the plant equivalent of an NMS inventory/monitor page.

The rule is simple: all plant monitoring starts here. Select a plant asset, then inspect its identity, metric interfaces, charts, common environment context and logs inside the same page. No separate chart zoo. Civilization has already suffered enough.

<div data-ew-plant-monitor></div>

---

## Current Monitor Scope

The monitor uses the static plant asset layer from:

```text
../data/plant-assets.catalog.yml
```

and tomato growth data from:

```text
../data/balcony-pot-house.pink-tomatoes.measurements.yml
../data/balcony-pot-house.pink-tomatoes.growth-phases.yml
../assets/data/pink-tomatoes.daily.json
```

Common balcony environment data is defined here:

```text
../data/balcony-environment.sources.yml
../assets/data/balcony-environment.daily.json
```

The environmental charts are shown inside every selected plant's **Charts** tab, because humidity, UV and temperature are shared context for all balcony plants.

Later this monitor should read generated JSON from the YAML data files, instead of keeping the plant list inside JavaScript. Because hardcoding telemetry is how tiny dashboards become haunted furniture.

---

## Target Selected-Asset Tabs

Each selected plant should expose:

```text
Overview
├── identity
├── taxonomy
├── cultivar / variety
├── source
├── lifecycle
├── current location
└── assigned containers

Charts
├── plant growth time-series
├── stress score
├── phenology timeline
├── harvest output
├── radar profile
├── common balcony temperature
├── common balcony humidity
└── common balcony UV index

Logs
├── observations
├── pruning
├── watering
├── propagation
├── weather/source imports
├── pest events
└── harvest events
```
