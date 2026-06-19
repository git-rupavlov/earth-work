# Monitor

<section class="ew-page-hero" aria-label="Plant monitor">
  <img class="ew-page-hero-image" src="../assets/images/monitoring.webp" alt="" aria-hidden="true" loading="eager" decoding="async" width="2560" height="1440" />
  <div class="ew-page-hero-content">
    <p class="ew-page-hero-kicker">Plant NMS</p>
    <h1>Plant Monitor</h1>
    <p>Selectable plant inventory with asset details, metric interfaces, chart previews and logs.</p>
  </div>
</section>

This is the plant equivalent of an NMS monitor tab.

Select a plant asset to inspect:

- identity data;
- family, genus, species and cultivar;
- source / vendor analogue;
- lifecycle and growth habit;
- assigned containers / slots;
- metric interfaces;
- chart preview;
- event logs.

<div data-ew-plant-monitor></div>

---

## Current Monitor Scope

The first monitor version uses the static plant asset layer from:

```text
../data/plant-assets.catalog.yml
```

and the first Pink Dream tomato measurement seed from:

```text
../data/balcony-pot-house.pink-tomatoes.measurements.yml
```

Later this monitor should read generated JSON from the YAML data files, instead of keeping the plant list inside JavaScript. Because hardcoding telemetry is how tiny dashboards become haunted furniture.

---

## Target Tabs

Each selected plant should eventually expose:

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
├── growth time-series
├── stress score
├── phenology timeline
├── harvest output
└── radar profile

Logs
├── observations
├── pruning
├── watering
├── propagation
├── pest events
└── harvest events
```
