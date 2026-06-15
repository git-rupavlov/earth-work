# Crop Matrix

## Purpose

This page presents crops as system components, not as winners or losers.

The project provides scoring, classifications and visualizations. The final interpretation belongs to the reader.

A tomato, a bean and a Jerusalem artichoke do different jobs. Comparing them as if they were the same tool is how people end up arguing with vegetables. Humanity has peaked, apparently.

---

## Method

The crop matrix separates three layers:

1. **Data** — observations, measurements, literature values and working scores.
2. **Classification** — crop roles, plant parts, lifecycle and ecological function.
3. **Visualization** — Kiviat charts, heatmaps, function matrices and scatter plots.

The goal is to support design decisions such as:

- low-maintenance food production;
- soil restoration;
- biomass generation;
- drought-tolerant planting;
- crop combinations;
- balcony and field experiments.

---

## Full 24-Criteria Matrix

The full matrix is intended to be shown as a heatmap.

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

## Functional Matrix

This table shows what each crop does inside the system.

<div class="crop-table-wrap">
  <table id="crop-function-matrix"></table>
</div>

---

## Crop Groups

<div id="crop-groups" class="crop-group-grid"></div>

---

## Future Visualizations

Planned views:

- full 24-criteria heatmap;
- yield vs labor scatter plot;
- yield vs irrigation demand scatter plot;
- biomass vs soil improvement scatter plot;
- seasonal work and harvest calendar;
- interaction matrix between companion crops.
