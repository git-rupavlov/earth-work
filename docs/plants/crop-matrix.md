# Crop Matrix

## Purpose

This page presents crops as system components, not as winners or losers.

The project provides scoring, classifications and visualizations. The final interpretation belongs to the reader.

A tomato, a bean, a nettle patch and a butternut squash field do different jobs. Comparing them as if they were the same tool is how people end up arguing with vegetables. Humanity has peaked, apparently.

---

## Current Context

Baylovo does not replace the original project plan.

It is a working system where we can:

- participate in an existing productive setup;
- observe real soil, water, weeds, pests and labor requirements;
- collect experience;
- collect seed where possible;
- improve efficiency of current work;
- gradually introduce new crops without breaking what already works.

For next year the direction remains broadly the same:

```text
Increase efficiency of current activity
        +
Introduce additional resilient crops
        +
Use observations to improve the original plan
```

Current additional focus crops:

- nettle;
- lapad;
- alfalfa;
- amaranth Red Garnet;
- amaranth Green Garnet;
- butternut squash;
- sorghum;
- sunflower;
- chickpea;
- Jerusalem artichoke.

---

## Method

The crop matrix separates three layers:

1. **Data** — observations, measurements, literature values and working scores.
2. **Classification** — crop roles, plant parts, lifecycle and ecological function.
3. **Visualization** — Kiviat charts, scatter plots, function matrices and comparison tables.

The goal is to support design decisions such as:

- low-maintenance food production;
- soil restoration;
- biomass generation;
- drought-tolerant planting;
- crop combinations;
- balcony, greenhouse and field experiments;
- Baylovo field learning and process validation.

---

## Full 24-Criteria Matrix

The full matrix is intended to be shown as a heatmap in a later version.

| Group | Criteria |
|---|---|
| Production | calories per m², protein per m², edible mass, harvest duration |
| Resilience | drought tolerance, heat tolerance, cold tolerance, disease and pest resistance |
| Resource demand | irrigation need, fertility need, human labor, maintenance operations |
| Soil and ecosystem | soil improvement, biomass production, pollinator support, compost/mulch value |
| Storage and propagation | no-fridge storage, storage duration, seed collection, self-reproduction |
| Practical value | nutrient density, usage flexibility, failure risk, beginner suitability |

---

## 10-Axis Kiviat Profile

The Kiviat chart uses a compact 10-criterion profile.

| Axis | Meaning |
|---|---|
| Calories/m² | Energy production from area |
| Protein/m² | Protein production from area |
| Nutrient density | Vitamins, minerals and general nutritional value |
| Drought tolerance | Performance with limited water |
| Disease resistance | Lower disease and pest sensitivity |
| Low labor | Lower human maintenance demand |
| Soil improvement | Contribution to soil function |
| Biomass | Organic matter production |
| Storability | Storage potential without advanced infrastructure |
| Low failure risk | Chance of still producing something in bad conditions |

!!! note
    These are working scores from 0 to 10. They are not final truth. That would be suspiciously convenient, and nature does not do convenient.

---

## Interactive Kiviat Visualization

<div class="crop-matrix-controls">
  <label for="crop-select">Crop</label>
  <select id="crop-select"></select>
</div>

<div class="crop-matrix-layout">
  <div id="crop-kiviat-chart" class="crop-card"></div>
  <div id="crop-summary" class="crop-card"></div>
</div>

---

## Scatter Comparison: Calories vs Low Labor

This graph shows one practical question: which crops give higher calorie score with lower labor demand.

<div id="crop-scatter-labor-calories" class="crop-card crop-scatter-card"></div>

---

## Score Comparison Table

This table exposes the same 10-axis working score used by the Kiviat visualization.

<div class="crop-table-wrap">
  <table id="crop-score-comparison"></table>
</div>

### Static fallback

| Crop | Calories/m² | Protein/m² | Nutrient density | Drought | Disease | Low labor | Soil | Biomass | Storage | Low risk |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Amaranth | 7 | 7 | 10 | 9 | 8 | 8 | 7 | 10 | 9 | 8 |
| Jerusalem artichoke | 9 | 4 | 7 | 9 | 10 | 10 | 7 | 10 | 10 | 10 |
| Butternut squash | 8 | 4 | 8 | 7 | 7 | 6 | 7 | 9 | 10 | 7 |
| Nettle | 2 | 4 | 10 | 8 | 10 | 10 | 9 | 10 | 2 | 10 |
| Lapad | 3 | 3 | 9 | 8 | 9 | 10 | 8 | 8 | 2 | 10 |
| Alfalfa | 1 | 3 | 5 | 9 | 9 | 9 | 10 | 9 | 1 | 10 |
| Sorghum | 7 | 5 | 6 | 10 | 9 | 9 | 7 | 10 | 9 | 9 |
| Common bean | 6 | 9 | 8 | 6 | 7 | 7 | 10 | 6 | 10 | 7 |
| Lentil | 5 | 9 | 8 | 8 | 8 | 9 | 10 | 4 | 10 | 8 |
| Chickpea | 6 | 9 | 8 | 8 | 8 | 8 | 9 | 5 | 10 | 7 |
| Sunflower | 7 | 7 | 8 | 8 | 8 | 9 | 6 | 9 | 9 | 8 |
| Okra | 4 | 4 | 7 | 9 | 8 | 8 | 5 | 5 | 6 | 7 |
| Potato | 9 | 4 | 6 | 5 | 5 | 5 | 4 | 5 | 8 | 6 |
| Sweet potato | 8 | 4 | 8 | 7 | 7 | 6 | 6 | 8 | 7 | 6 |
| Cherry tomato | 5 | 3 | 8 | 5 | 5 | 3 | 4 | 6 | 3 | 4 |
| Pink tomato | 5 | 3 | 8 | 4 | 4 | 3 | 3 | 5 | 3 | 3 |
| Peppers | 4 | 3 | 8 | 5 | 5 | 4 | 3 | 4 | 5 | 4 |
| Vetch | 2 | 4 | 4 | 7 | 8 | 9 | 10 | 8 | 3 | 8 |
| Clover | 2 | 4 | 5 | 7 | 8 | 9 | 10 | 7 | 3 | 8 |
| Phacelia | 0 | 0 | 2 | 7 | 8 | 9 | 8 | 8 | 3 | 8 |

---

## Functional Matrix

This table shows what each crop does inside the system.

<div class="crop-table-wrap">
  <table id="crop-function-matrix"></table>
</div>

### Static fallback

| Crop | Calories | Protein | Biomass | Nitrogen | Soil | Pollinators | Mulch | Storage | Ground cover |
|---|---|---|---|---|---|---|---|---|---|
| Amaranth | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  |
| Jerusalem artichoke | ✓ |  | ✓ |  |  |  | ✓ | ✓ | ✓ |
| Butternut squash | ✓ |  |  |  |  |  | ✓ | ✓ | ✓ |
| Nettle |  |  | ✓ |  | ✓ | ✓ | ✓ |  | ✓ |
| Lapad |  |  | ✓ |  | ✓ |  | ✓ |  | ✓ |
| Alfalfa |  |  | ✓ | ✓ | ✓ | ✓ | ✓ |  | ✓ |
| Common bean |  | ✓ |  | ✓ |  |  |  | ✓ |  |
| Lentil |  | ✓ |  | ✓ |  |  |  | ✓ |  |
| Chickpea |  | ✓ |  | ✓ |  |  |  | ✓ |  |
| Sunflower | ✓ | ✓ | ✓ |  |  | ✓ |  | ✓ |  |
| Vetch |  |  |  | ✓ | ✓ |  | ✓ |  |  |
| Clover |  |  |  | ✓ | ✓ | ✓ |  |  | ✓ |
| Phacelia |  |  | ✓ |  | ✓ | ✓ |  |  |  |

---

## Crop Groups

<div id="crop-groups" class="crop-group-grid"></div>

---

## Future Visualizations

Planned views:

- full 24-criteria heatmap;
- yield vs irrigation demand scatter plot;
- biomass vs soil improvement scatter plot;
- seasonal work and harvest calendar;
- interaction matrix between companion crops.
