# Seeds

<section class="ew-page-hero" aria-label="Seeds">
  <object class="ew-page-hero-image" data="/assets/images/heroes/seeds.svg" type="image/svg+xml" aria-label="Seed stock, packets and propagation tools in the NoMad's Farm balcony garden"></object>
  <div class="ew-page-hero-content">
    <p class="ew-page-hero-kicker">01 · Seed inventory</p>
    <h1>Seeds</h1>
    <p>Seed stock, provenance, viability, sowing plans and saved genetics.</p>
  </div>
</section>

The seed section is an inventory and selection database rather than a storefront. It tracks what exists, what is only referenced or planned, where a line came from, and what still needs germination or stock data.

<div data-ew-seed-catalog></div>

---

## Inventory model

```text
Seed record
├── category / species / variety
├── generation or hybrid status
├── inventory state
├── quantity
├── provenance / source
├── lifecycle
├── container suitability
├── tags
└── notes / future germination records
```

Unknown values stay explicitly unknown until they are measured or verified.
