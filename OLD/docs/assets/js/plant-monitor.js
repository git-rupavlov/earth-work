const EW_PLANT_MONITOR_ASSETS = [
  {
    assetId: 'solanum_lycopersicum_pink_dream',
    displayName: 'Pink Dream tomato',
    bgName: 'Розова мечта домат',
    family: 'Solanaceae',
    genus: 'Solanum',
    species: 'Solanum lycopersicum',
    subspecies: 'none',
    cultivar: 'Pink Dream',
    type: 'crop_plant',
    lifecycle: 'tender perennial grown as annual',
    growthHabit: 'indeterminate / unknown',
    source: 'purchased or started seedling',
    status: 'active',
    project: 'Balcony Pot House',
    containers: ['f30_01', 'f30_02'],
    instances: ['tomato_pink_dream_01', 'tomato_pink_dream_02'],
    roles: ['food production', 'propagation trial source', 'container performance reference'],
    metrics: ['height_cm', 'stem_diameter_mm', 'leaf_count', 'flower_count', 'fruit_count', 'wilting_score_0_5', 'harvest_weight_g'],
    logs: [
      '2026-06-12 12:00 | Day 1 baseline | both Pink Dream tomatoes ≈ 50 cm',
      '2026-06-17 07:00 | cloudy, 19°C | pruning and propagation event',
      '2026-06-17 07:00 | tomato_pink_dream_01 | height_cm = 65',
      '2026-06-17 07:00 | tomato_pink_dream_01 | derived growth since baseline ≈ 15 cm',
      '2026-06-17 07:00 | both main plants | leaf mass removed ≈ 15-20%',
      '2026-06-17 07:05 | side shoot #1 | direct soil propagation started',
      '2026-06-17 07:10 | side shoot #2 | water rooting propagation started'
    ],
    chartData: [
      { label: 'Day 1', value: 50, metric: 'height_cm', instance: 'tomato_pink_dream_01' },
      { label: 'Day 6', value: 65, metric: 'height_cm', instance: 'tomato_pink_dream_01' }
    ]
  },
  {
    assetId: 'solanum_lycopersicum_cherry_balcony_population',
    displayName: 'Cherry tomato population',
    bgName: 'Чери домат',
    family: 'Solanaceae',
    genus: 'Solanum',
    species: 'Solanum lycopersicum',
    subspecies: 'none',
    cultivar: 'mixed / unknown cherry',
    type: 'crop_plant_population',
    lifecycle: 'tender perennial grown as annual',
    growthHabit: 'indeterminate / unknown',
    source: 'previous year fruit seed bank',
    status: 'active',
    project: 'Balcony Pot House',
    containers: ['window_box_01', 'window_box_02', 'window_box_03', 'window_box_04', 'cube_01', 'cube_02', 'cube_03', 'cube_04'],
    instances: ['cherry_tomatoes_window_boxes', 'volunteer_cherry_tomato_population'],
    roles: ['food production', 'volunteer selection', 'local adaptation observation'],
    metrics: ['survival_count', 'height_cm', 'flower_count', 'fruit_count', 'harvest_weight_g', 'vigor_score_0_5'],
    logs: ['Initial inventory created from balcony container layout. Time-series pending.'],
    chartData: []
  },
  {
    assetId: 'capsicum_annuum_balcony_pepper',
    displayName: 'Pepper',
    bgName: 'Пипер',
    family: 'Solanaceae',
    genus: 'Capsicum',
    species: 'Capsicum annuum',
    subspecies: 'none',
    cultivar: 'unknown',
    type: 'crop_plant',
    lifecycle: 'tender perennial grown as annual',
    growthHabit: 'bushy',
    source: 'unknown',
    status: 'active',
    project: 'Balcony Pot House',
    containers: ['window_box_01', 'window_box_02', 'cube_03', 'cube_04'],
    instances: ['peppers_total'],
    roles: ['food production', 'container crop comparison'],
    metrics: ['height_cm', 'stem_diameter_mm', 'leaf_count', 'flower_count', 'fruit_count', 'harvest_weight_g'],
    logs: ['Initial inventory created. Growth measurements pending.'],
    chartData: []
  },
  {
    assetId: 'ipomoea_batatas_balcony_sweet_potato',
    displayName: 'Sweet potato',
    bgName: 'Сладък картоф',
    family: 'Convolvulaceae',
    genus: 'Ipomoea',
    species: 'Ipomoea batatas',
    subspecies: 'none',
    cultivar: 'unknown',
    type: 'crop_plant',
    lifecycle: 'tender perennial grown as annual',
    growthHabit: 'trailing vine',
    source: 'tuber or slip unknown',
    status: 'active',
    project: 'Balcony Pot House',
    containers: ['f30_03'],
    instances: ['sweet_potato_01'],
    roles: ['container tuber trial', 'biomass trial', 'vine growth tracking'],
    metrics: ['vine_length_cm', 'node_count', 'canopy_spread_cm', 'wilting_score_0_5', 'harvest_weight_g'],
    logs: ['Initial inventory created. Vine-length tracking pending.'],
    chartData: []
  },
  {
    assetId: 'helianthus_annuus_balcony_sunflower',
    displayName: 'Sunflower',
    bgName: 'Слънчоглед',
    family: 'Asteraceae',
    genus: 'Helianthus',
    species: 'Helianthus annuus',
    subspecies: 'none',
    cultivar: 'unknown',
    type: 'crop_and_support_plant',
    lifecycle: 'annual',
    growthHabit: 'upright single stem',
    source: 'seed unknown',
    status: 'active',
    project: 'Balcony Pot House',
    containers: ['f25_01'],
    instances: ['sunflower_01'],
    roles: ['pollinator support', 'seed production trial', 'biomass generation', 'biodiversity support'],
    metrics: ['height_cm', 'stem_diameter_mm', 'leaf_count', 'flower_head_diameter_cm', 'seeds_harvested_g'],
    logs: ['Added to F25 cylindrical pot inventory. Growth tracking pending.'],
    chartData: []
  },
  {
    assetId: 'salvia_rosmarinus_balcony_rosemary',
    displayName: 'Rosemary',
    bgName: 'Розмарин',
    family: 'Lamiaceae',
    genus: 'Salvia',
    species: 'Salvia rosmarinus',
    subspecies: 'none',
    cultivar: 'unknown',
    type: 'perennial_herb',
    lifecycle: 'perennial',
    growthHabit: 'woody shrub',
    source: 'unknown',
    status: 'active',
    project: 'Balcony Pot House',
    containers: ['window_box_03', 'window_box_04', 'small_box_01', 'small_box_02', 'small_box_03'],
    instances: ['rosemary_total'],
    roles: ['perennial herb layer', 'aromatic companion', 'long-term container survival indicator'],
    metrics: ['height_cm', 'canopy_width_cm', 'pruning_weight_g', 'drought_stress_score_0_5', 'harvest_weight_g'],
    logs: ['Seven rosemary plants present across window boxes and small boxes.'],
    chartData: []
  },
  {
    assetId: 'petroselinum_crispum_balcony_parsley',
    displayName: 'Parsley',
    bgName: 'Магданоз',
    family: 'Apiaceae',
    genus: 'Petroselinum',
    species: 'Petroselinum crispum',
    subspecies: 'none',
    cultivar: 'unknown',
    type: 'herb',
    lifecycle: 'biennial often grown as annual',
    growthHabit: 'rosette',
    source: 'unknown',
    status: 'active',
    project: 'Balcony Pot House',
    containers: ['cube_01', 'cube_02', 'cube_03', 'cube_04'],
    instances: ['parsley_total'],
    roles: ['herb layer', 'companion trial', 'harvest regrowth observation'],
    metrics: ['leaf_count', 'regrowth_days', 'harvest_weight_g', 'cut_count', 'yellowing_score_0_5'],
    logs: ['Parsley present in all four cube containers.'],
    chartData: []
  },
  {
    assetId: 'phaseolus_vulgaris_balcony_white_bean',
    displayName: 'White bean',
    bgName: 'Бял фасул',
    family: 'Fabaceae',
    genus: 'Phaseolus',
    species: 'Phaseolus vulgaris',
    subspecies: 'none',
    cultivar: 'white bean unknown',
    type: 'legume_crop',
    lifecycle: 'annual',
    growthHabit: 'climbing or bush unknown',
    source: 'dry bean seed or unknown',
    status: 'active',
    project: 'Balcony Pot House',
    containers: ['cube_01', 'cube_02'],
    instances: ['white_beans_total'],
    roles: ['seed production trial', 'biomass generation', 'nitrogen association observation', 'vertical growth trial'],
    metrics: ['vine_length_cm', 'height_cm', 'leaf_count', 'flower_count', 'pod_count', 'seed_weight_g'],
    logs: ['Two white bean plants active in cube containers.'],
    chartData: []
  },
  {
    assetId: 'vitis_vinifera_balcony_grapevine',
    displayName: 'Grapevine',
    bgName: 'Лоза',
    family: 'Vitaceae',
    genus: 'Vitis',
    species: 'Vitis vinifera',
    subspecies: 'none',
    cultivar: 'unknown',
    type: 'perennial_canopy',
    lifecycle: 'perennial',
    growthHabit: 'woody climbing vine',
    source: 'established existing plant',
    status: 'established',
    project: 'Balcony Pot House',
    containers: ['established_balcony_canopy'],
    instances: ['grapevine_01'],
    roles: ['canopy layer', 'shade provider', 'microclimate modifier', 'drying risk reduction'],
    metrics: ['canopy_density_score_0_5', 'shade_hours', 'pruning_weight_g', 'shaded_temperature_delta_c'],
    logs: ['Established canopy used as shade and microclimate modifier.'],
    chartData: []
  }
];

function monitorMount() {
  return document.querySelector('[data-ew-plant-monitor]');
}

function formatList(items) {
  if (!items || !items.length) return '<span class="ew-muted">none</span>';
  return items.map(item => `<span class="ew-chip">${item}</span>`).join('');
}

function buildMiniChart(asset) {
  if (!asset.chartData || !asset.chartData.length) {
    return '<div class="ew-empty-chart">No time-series data yet. Add measurements and the plant will stop being a mysterious green blob.</div>';
  }

  const max = Math.max(...asset.chartData.map(d => d.value), 1);
  const points = asset.chartData.map((d, index) => {
    const x = asset.chartData.length === 1 ? 50 : (index / (asset.chartData.length - 1)) * 100;
    const y = 90 - (d.value / max) * 75;
    return `${x},${y}`;
  }).join(' ');

  return `
    <svg class="ew-mini-chart" viewBox="0 0 100 100" role="img" aria-label="Mini chart">
      <line x1="5" y1="90" x2="95" y2="90"></line>
      <line x1="5" y1="10" x2="5" y2="90"></line>
      <polyline points="${points}"></polyline>
      ${asset.chartData.map((d, index) => {
        const x = asset.chartData.length === 1 ? 50 : (index / (asset.chartData.length - 1)) * 100;
        const y = 90 - (d.value / max) * 75;
        return `<circle cx="${x}" cy="${y}" r="3"><title>${d.label}: ${d.value} ${d.metric}</title></circle>`;
      }).join('')}
    </svg>
  `;
}

function renderAssetList(selectedId) {
  return EW_PLANT_MONITOR_ASSETS.map(asset => `
    <button class="ew-monitor-row ${asset.assetId === selectedId ? 'is-active' : ''}" data-plant-id="${asset.assetId}" type="button">
      <span class="ew-monitor-row-name">${asset.displayName}</span>
      <span class="ew-monitor-row-meta">${asset.family} · ${asset.status}</span>
    </button>
  `).join('');
}

function renderAssetDetails(asset) {
  return `
    <div class="ew-monitor-detail-card">
      <div class="ew-monitor-header">
        <div>
          <p class="ew-kicker">Selected plant asset</p>
          <h3>${asset.displayName}</h3>
          <p>${asset.bgName}</p>
        </div>
        <span class="ew-status-pill">${asset.status}</span>
      </div>

      <div class="ew-monitor-tabs" role="tablist">
        <button type="button" class="is-active" data-ew-tab="overview">Overview</button>
        <button type="button" data-ew-tab="charts">Charts</button>
        <button type="button" data-ew-tab="logs">Logs</button>
      </div>

      <div class="ew-tab-panel is-active" data-ew-panel="overview">
        <div class="ew-asset-grid">
          <div><strong>Asset ID</strong><span>${asset.assetId}</span></div>
          <div><strong>Type</strong><span>${asset.type}</span></div>
          <div><strong>Family</strong><span>${asset.family}</span></div>
          <div><strong>Genus</strong><span>${asset.genus}</span></div>
          <div><strong>Species</strong><span>${asset.species}</span></div>
          <div><strong>Subspecies</strong><span>${asset.subspecies}</span></div>
          <div><strong>Cultivar / model</strong><span>${asset.cultivar}</span></div>
          <div><strong>Source / vendor</strong><span>${asset.source}</span></div>
          <div><strong>Lifecycle</strong><span>${asset.lifecycle}</span></div>
          <div><strong>Growth habit</strong><span>${asset.growthHabit}</span></div>
          <div><strong>Project / site</strong><span>${asset.project}</span></div>
          <div><strong>Containers / slots</strong><span>${asset.containers.join(', ')}</span></div>
        </div>
        <h4>Roles</h4>
        <div class="ew-chip-list">${formatList(asset.roles)}</div>
        <h4>Metric interfaces</h4>
        <div class="ew-chip-list">${formatList(asset.metrics)}</div>
      </div>

      <div class="ew-tab-panel" data-ew-panel="charts">
        <h4>Current chart preview</h4>
        ${buildMiniChart(asset)}
        <p class="ew-muted">This is the first passive chart layer. Later this can become real time-series, radar diagrams and comparison dashboards.</p>
      </div>

      <div class="ew-tab-panel" data-ew-panel="logs">
        <h4>Event logs</h4>
        <ul class="ew-log-list">
          ${asset.logs.map(log => `<li>${log}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

function activatePlantMonitor(selectedId = EW_PLANT_MONITOR_ASSETS[0].assetId) {
  const mount = monitorMount();
  if (!mount) return;

  const selected = EW_PLANT_MONITOR_ASSETS.find(asset => asset.assetId === selectedId) || EW_PLANT_MONITOR_ASSETS[0];

  mount.innerHTML = `
    <div class="ew-monitor-shell">
      <aside class="ew-monitor-list" aria-label="Plant assets">
        <div class="ew-monitor-list-title">Plant assets</div>
        ${renderAssetList(selected.assetId)}
      </aside>
      <section class="ew-monitor-detail" aria-live="polite">
        ${renderAssetDetails(selected)}
      </section>
    </div>
  `;

  mount.querySelectorAll('[data-plant-id]').forEach(button => {
    button.addEventListener('click', () => activatePlantMonitor(button.dataset.plantId));
  });

  mount.querySelectorAll('[data-ew-tab]').forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.dataset.ewTab;
      mount.querySelectorAll('[data-ew-tab]').forEach(item => item.classList.toggle('is-active', item.dataset.ewTab === tab));
      mount.querySelectorAll('[data-ew-panel]').forEach(panel => panel.classList.toggle('is-active', panel.dataset.ewPanel === tab));
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => activatePlantMonitor());
} else {
  activatePlantMonitor();
}
