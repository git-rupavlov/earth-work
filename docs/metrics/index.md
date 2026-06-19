# Metrics

<section class="ew-page-hero" aria-label="Metrics and visualizations">
  <img class="ew-page-hero-image" src="../assets/images/monitoring.webp" alt="" aria-hidden="true" loading="eager" decoding="async" width="2560" height="1440" />
  <div class="ew-page-hero-content">
    <p class="ew-page-hero-kicker">Data layer</p>
    <h1>Metrics & Visualizations</h1>
    <p>Plant inventory, telemetry, dashboards, time-series, radar diagrams and project comparison views.</p>
  </div>
</section>

Metrics is the Network Management System layer for NoMad's Farm.

The analogy is deliberate:

```text
network device      -> plant asset
vendor              -> seed / plant source
model               -> cultivar / variety
PID                 -> plant asset ID
serial number       -> individual plant ID
software version    -> growth stage / phenology state
site                -> project or growing location
rack / slot         -> container ID
interface           -> measured metric stream
telemetry           -> plant growth and environment time-series
```

The purpose is simple: every observation that becomes measurable should eventually appear as a graph, table, score, timeline or comparison view. Otherwise we are just hoarding notes like medieval monks with worse handwriting.

---

## Data Sources

Initial data sources:

```text
metrics/
├── plant asset catalog
├── balcony container inventory
├── balcony plant inventory
├── Pink Dream tomato measurements
├── environmental measurements
├── plant growth measurements
├── harvest records
├── watering records
├── soil observations
├── project comparison scores
└── crop matrix outputs
```

Current structured sources:

```text
../data/plant-assets.catalog.yml
../data/balcony-pot-house.inventory.yml
../data/balcony-pot-house.pink-tomatoes.measurements.yml
../data/metrics.catalog.yml
```

Future structured sources:

```text
../data/balcony-pot-house.measurements.yml
../data/microclimate-lab.timeseries.yml
../data/plant-growth.timeseries.yml
../data/harvest-log.yml
../data/project-scorecards.yml
```

---

## Plant Asset Inventory

The plant asset catalog is the equivalent of an NMS device inventory.

Each plant asset should include:

```text
asset_id
common_name
Bulgarian name
family
genus
species
subspecies
cultivar / variety
strain / population
source
life cycle
growth habit
edible parts
useful parts
primary roles
active instances
container IDs
metric profile
dashboard views
```

Current plant asset catalog:

```text
../data/plant-assets.catalog.yml
```

Current asset groups:

```text
Solanaceae
├── Pink Dream tomato
├── Cherry tomato population
└── Pepper

Convolvulaceae
└── Sweet potato

Asteraceae
└── Sunflower

Lamiaceae
└── Rosemary

Apiaceae
└── Parsley

Fabaceae
└── White bean

Vitaceae
└── Grapevine
```

This gives us a stable asset layer before we start building visualizations. Yes, apparently even tomatoes now need something suspiciously close to CMDB hygiene. Good.

---

## Current Seed Dataset

### Pink Dream Tomatoes

The first measurement dataset is for the two Pink Dream tomatoes and their side-shoot propagation trial.

Current metric-ready records include:

```text
2026-06-17 07:00 | tomato_pink_dream_01 | height_cm | 65
2026-06-17 07:00 | tomato_pink_dream_01 | leaf_mass_removed_percent_midpoint | 17.5
2026-06-17 07:00 | tomato_pink_dream_02 | leaf_mass_removed_percent_midpoint | 17.5
2026-06-17 07:05 | tomato_side_shoot_01 | cutting_initial_length_cm | 10
2026-06-17 07:10 | tomato_side_shoot_02 | cutting_initial_length_cm | 10
2026-06-17 07:10 | tomato_side_shoot_02 | water_depth_cm | 4
```

Data source:

```text
../data/balcony-pot-house.pink-tomatoes.measurements.yml
```

Open measurements still needed:

```text
- current height for Pink Dream #2
- stem diameter for both main plants
- leaf count or leaf density score
- flower count
- fruit count
- wilting score
- rooting status for soil side shoot
- root count and root length for water side shoot
```

---

## Visualization Types

### Time-Series Graphs

Used for values measured repeatedly over time.

Examples:

- balcony temperature over time;
- humidity over time;
- light exposure by shelf or container;
- soil moisture changes after watering;
- tomato height over time;
- sweet potato vine length over time;
- sunflower height over time;
- harvest weight over time.

Best for:

```text
time -> value
```

---

### Radar Diagrams

Used for comparing multiple dimensions of one crop, plant, project or container.

Examples:

- crop usefulness profile;
- container performance profile;
- project readiness profile;
- plant resilience profile.

Candidate axes:

```text
Yield
Water efficiency
Heat tolerance
Shade tolerance
Soil value
Storage value
Labor efficiency
Pest resistance
Regrowth potential
Seed value
```

---

### Bar Charts

Used for simple comparisons between discrete categories.

Examples:

- soil volume by container;
- plant count by species;
- yield by crop;
- water use by container;
- number of observations by project.

---

### Scatter Plots

Used for comparing relationships between two numeric variables.

Examples:

- soil volume vs plant growth;
- sun exposure vs yield;
- watering amount vs wilting score;
- temperature vs growth rate;
- container size vs harvest weight.

---

### Heatmaps

Used for matrix-style intensity views.

Examples:

- balcony sun exposure by hour and location;
- temperature by shelf level and time;
- humidity by day and hour;
- crop suitability by site condition;
- container stress by week.

---

### Calendar Views

Used for events and repeated actions.

Examples:

- sowing dates;
- transplant dates;
- pruning dates;
- watering events;
- harvest events;
- pest observations.

---

### Scorecards

Used for compact decision summaries.

Examples:

```text
Crop: Cherry tomato
Yield score: 4 / 5
Water demand: 3 / 5
Labor demand: 2 / 5
Balcony suitability: 5 / 5
Field suitability: 3 / 5
Repeat next season: yes
```

---

## Initial Metric Groups

### Environment Metrics

```text
metric_id: temperature_c
unit: °C
source: sensor/manual
expected_chart: time_series
```

```text
metric_id: relative_humidity_percent
unit: %
source: sensor/manual
expected_chart: time_series
```

```text
metric_id: light_lux
unit: lux
source: sensor/manual
expected_chart: time_series / heatmap
```

```text
metric_id: soil_moisture_percent
unit: %
source: sensor/manual
expected_chart: time_series
```

### Plant Growth Metrics

```text
metric_id: height_cm
unit: cm
source: manual_measurement
expected_chart: time_series
```

```text
metric_id: vine_length_cm
unit: cm
source: manual_measurement
expected_chart: time_series
```

```text
metric_id: stem_diameter_mm
unit: mm
source: manual_measurement
expected_chart: time_series
```

```text
metric_id: leaf_count
unit: count
source: manual_measurement
expected_chart: time_series
```

### Production Metrics

```text
metric_id: harvest_weight_g
unit: g
source: manual_measurement
expected_chart: bar / time_series
```

```text
metric_id: fruit_count
unit: count
source: manual_measurement
expected_chart: bar / time_series
```

```text
metric_id: seeds_harvested_g
unit: g
source: manual_measurement
expected_chart: bar
```

### Management Metrics

```text
metric_id: watering_l
unit: L
source: manual_log
expected_chart: time_series / bar
```

```text
metric_id: labor_minutes
unit: min
source: manual_log
expected_chart: bar / time_series
```

```text
metric_id: wilting_score_0_5
unit: score
source: observation
expected_chart: time_series / heatmap
```

---

## Project-Level Views

### Balcony Pot House

Priority views:

- soil volume by container;
- plant count by species;
- tomato growth over time;
- sweet potato vine length over time;
- sunflower growth over time;
- watering vs wilting;
- temperature and humidity by time of day;
- container stress score.

### Sprout Lab

Priority views:

- germination rate by seed type;
- harvest weight by tray;
- days to harvest;
- mold events by crop;
- rinse frequency vs failure rate;
- light duration vs growth.

### Microclimate Lab

Priority views:

- temperature by sensor location;
- humidity by sensor location;
- shelf-to-shelf difference;
- airflow intervention effect;
- daily min/max summaries.

### Field Projects

Priority views:

- crop survival;
- water demand;
- biomass production;
- labor minutes per useful output;
- yield per visit;
- crop repeatability score.

---

## Data Rules

All future metric records should follow these rules:

1. Use stable IDs for plants, containers, sensors and projects.
2. Use metric units consistently.
3. Keep raw measurements separate from interpretation.
4. Record timestamps in ISO format.
5. Use metric units only.
6. Prefer small repeatable measurements over dramatic undocumented claims. A tragedy for human storytelling, but excellent for data.

---

## Minimum Future Record Format

```yaml
- timestamp: 2026-06-19T07:30:00+03:00
  project_id: balcony-pot-house
  container_id: f30_01
  plant_id: tomato_pink_dream_01
  metric_id: height_cm
  value: 65
  unit: cm
  method: manual_measurement
  observer: rp
  notes: after tying to stake
```

---

## Next Implementation Steps

1. Keep structured inventory in YAML.
2. Maintain plant asset catalog as the plant NMS inventory.
3. Add measurement logs as YAML or CSV.
4. Build simple tables first.
5. Add time-series graphs.
6. Add radar diagrams for crop and project comparison.
7. Add dashboard-style summary cards.
8. Connect measurements back to Crop Matrix and Project pages.
