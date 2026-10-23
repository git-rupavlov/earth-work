async function ewFetchJson(url) {
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
  return response.json();
}

function ewVitalsSummary(asset) {
  return Object.entries(asset.vitals || {})
    .map(([key, value]) => `${key}: ${value === null ? 'missing' : value}`)
    .join('<br>');
}

function ewKnownVitalRatio(asset) {
  const values = Object.values(asset.vitals || {});
  if (!values.length) return 0;
  return values.filter(value => value !== null && value !== undefined).length / values.length;
}

function ewNmsAssetType(asset) {
  if (asset.local_position?.area === 'field_pit_cluster') return 'pit cluster';
  if (asset.local_position?.area === 'field_plot') return 'field plot';
  if (asset.site_id === 'sofia_balcony') return 'balcony asset';
  return 'plant asset';
}

function ewNmsSerial(asset) {
  return asset.asset_id.replaceAll('_', '-');
}

function ewHumanLabel(value) {
  return String(value || 'unknown').replaceAll('_', ' ');
}

function ewFormatValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (value === null || value === undefined) return 'missing';
  if (typeof value === 'object') return Object.entries(value).map(([key, val]) => `${ewHumanLabel(key)}: ${val}`).join(', ');
  return value;
}

function ewPlantLatinName(asset) {
  const id = asset.asset_id || '';
  if (id.startsWith('solanum_lycopersicum')) return 'Solanum lycopersicum L.';
  if (id.startsWith('amaranthus')) return 'Amaranthus spp.';
  if (id.startsWith('cucurbita_moschata')) return 'Cucurbita moschata';
  if (id.startsWith('urtica_dioica')) return 'Urtica dioica L.';
  if (id.startsWith('capsicum_annuum')) return 'Capsicum annuum L.';
  if (id.startsWith('ipomoea_batatas')) return 'Ipomoea batatas (L.) Lam.';
  if (id.startsWith('helianthus_annuus')) return 'Helianthus annuus L.';
  return 'Plant species unresolved';
}

function ewPlantDocSeed(asset) {
  const name = asset.display_name;
  const latin = ewPlantLatinName(asset);
  const commonLifecycle = [
    'Establishment from seed, seedling, cutting, slip, root or transplant.',
    'Vegetative growth with leaf, stem and root expansion.',
    'Reproductive or storage phase depending on species.',
    'Harvest, seed saving, curing, overwintering or cleanup.',
    'Next cycle starts from selected planting material.'
  ];

  if (asset.asset_id.startsWith('ipomoea_batatas')) {
    return {
      title: 'Sweet potato lifecycle',
      sections: [
        ['Identity', [`Common asset: ${name}`, `Latin name: ${latin}`, `Type: storage-root crop, not stem tuber. Humanity survived this taxonomy crisis somehow.`]],
        ['Lifecycle', ['Dormant storage root wakes above 20°C.', 'Buds produce slips.', 'Each slip can root as an independent plant.', 'Vegetative vines expand and root at nodes.', 'Some adventitious roots differentiate into storage roots.', 'Storage roots enlarge for 90-150 days.', 'Harvest before cold injury and frost.']],
        ['Year-to-year propagation', ['Year 1: one rooted slip can produce multiple storage roots.', 'Year 2: selected storage roots produce many slips.', 'Each slip becomes a separate plant.', 'Do not plant whole roots when multiplication rate matters. Use slips.']],
        ['Monitor fields', Object.entries(asset.vitals || {}).map(([key, value]) => `${ewHumanLabel(key)}: ${ewFormatValue(value)}`)]
      ]
    };
  }

  if (asset.asset_id.startsWith('solanum_lycopersicum')) {
    return {
      title: 'Tomato lifecycle',
      sections: [
        ['Identity', [`Common asset: ${name}`, `Latin name: ${latin}`, `Cultivar line: Pink Dream / balcony population where applicable.`]],
        ['Lifecycle', ['Seed germination.', 'Seedling establishment.', 'Vegetative stem and leaf growth.', 'Flower cluster formation.', 'Fruit set and fruit enlargement.', 'Ripening.', 'Seed saving from mature fruit.']],
        ['Operational notes', ['Track pruning events.', 'Track flowering and first fruit set.', 'Keep watering stable to reduce stress.', 'Use support early, before the plant demonstrates its tragic relationship with gravity.']],
        ['Monitor fields', Object.entries(asset.vitals || {}).map(([key, value]) => `${ewHumanLabel(key)}: ${ewFormatValue(value)}`)]
      ]
    };
  }

  if (asset.asset_id.startsWith('amaranthus')) {
    return {
      title: 'Amaranth lifecycle',
      sections: [
        ['Identity', [`Common asset: ${name}`, `Latin name: ${latin}`]],
        ['Lifecycle', ['Warm-season germination.', 'Fast vegetative leaf growth.', 'Inflorescence formation.', 'Seed ripening.', 'Dry seed harvest and cleaning.']],
        ['Operational notes', ['Track emergence percent.', 'Record height and flowering start.', 'Separate leaf harvest observations from seed harvest observations.']],
        ['Monitor fields', Object.entries(asset.vitals || {}).map(([key, value]) => `${ewHumanLabel(key)}: ${ewFormatValue(value)}`)]
      ]
    };
  }

  return {
    title: `${name} documentation`,
    sections: [
      ['Identity', [`Common asset: ${name}`, `Latin name: ${latin}`, `Asset ID: ${asset.asset_id}`]],
      ['Lifecycle', commonLifecycle],
      ['Operational notes', ['Record stage transitions.', 'Record stress and pest signs.', 'Record harvest or propagation output.', 'Attach observations to this plant asset, not to some cursed global note pile.']],
      ['Monitor fields', Object.entries(asset.vitals || {}).map(([key, value]) => `${ewHumanLabel(key)}: ${ewFormatValue(value)}`)]
    ]
  };
}

function ewRenderDocs(app, asset) {
  const el = app.querySelector('[data-ew-app-docs]');
  if (!el) return;
  const doc = ewPlantDocSeed(asset);
  el.innerHTML = `
    <h3>Docs</h3>
    <p class="ew-muted">Child documentation for <strong>${asset.display_name}</strong>. This is scoped to the selected plant asset.</p>
    <article class="ew-doc-card">
      <header>
        <span class="ew-doc-path">/app/plants/${asset.asset_id}/docs/lifecycle</span>
        <h4>${doc.title}</h4>
      </header>
      ${doc.sections.map(([title, rows]) => `
        <section class="ew-doc-section">
          <h5>${title}</h5>
          <ul>${rows.map(row => `<li>${row}</li>`).join('')}</ul>
        </section>
      `).join('')}
    </article>
  `;
}

function ewRenderAssetList(app, data, selectedId) {
  const list = app.querySelector('[data-ew-app-assets]');
  list.innerHTML = data.plant_assets.map(asset => `
    <button class="ew-app-asset-button ${asset.asset_id === selectedId ? 'is-active' : ''}" data-ew-app-asset="${asset.asset_id}" type="button">
      <strong>${asset.display_name}</strong>
      <span>PID: ${ewNmsAssetType(asset)}</span>
      <span>SN: ${ewNmsSerial(asset)}</span>
      <span>Status: ${asset.status}</span>
    </button>
  `).join('');

  list.querySelectorAll('[data-ew-app-asset]').forEach(button => {
    button.addEventListener('click', () => ewSelectAppAsset(app, data, button.dataset.ewAppAsset));
  });
}

async function ewRenderLogs(app, asset) {
  const el = app.querySelector('[data-ew-app-logs]');
  if (!el) return;

  let data;
  try {
    data = await ewFetchJson('/assets/data/plant-asset-logs.json');
  } catch (error) {
    el.innerHTML = `<h3>Asset logs</h3><p class="ew-muted">Asset logs failed to load: ${error.message}</p>`;
    return;
  }

  const logs = data.logs?.[asset.asset_id] || [];
  if (!logs.length) {
    el.innerHTML = `<h3>Asset logs</h3><p class="ew-muted">No logs yet for ${asset.display_name}. A device inventory without logs is just a spreadsheet wearing a helmet.</p>`;
    return;
  }

  el.innerHTML = `
    <h3>Asset logs</h3>
    <div class="ew-log-table">
      <div class="ew-log-row ew-log-head"><span>Time</span><span>Severity</span><span>Event</span><span>Message</span></div>
      ${logs.map(log => `
        <div class="ew-log-row ew-severity-${log.severity}">
          <span>${log.timestamp}</span>
          <span>${log.severity}</span>
          <span>${log.event_type}</span>
          <span>${log.message}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function ewRenderDetail(app, asset) {
  const detail = app.querySelector('[data-ew-app-detail]');
  if (!detail) return;
  detail.innerHTML = `
    <h3>${asset.display_name}</h3>
    <p class="ew-muted">NMS-style plant asset inventory record.</p>
    <div class="ew-app-detail-grid">
      <div><strong>Hostname</strong><span>${asset.display_name}</span></div>
      <div><strong>Asset ID / SN</strong><span>${ewNmsSerial(asset)}</span></div>
      <div><strong>PID / Type</strong><span>${ewNmsAssetType(asset)}</span></div>
      <div><strong>Scientific name</strong><span>${ewPlantLatinName(asset)}</span></div>
      <div><strong>Project / Site</strong><span>${asset.project_id} / ${asset.site_id}</span></div>
      <div><strong>Status</strong><span>${asset.status}</span></div>
      <div><strong>Containers / Slots</strong><span>${asset.containers.join(', ')}</span></div>
      <div><strong>Coordinates</strong><span>${asset.map_coordinates.join(', ')}</span></div>
      <div><strong>Metric Interfaces</strong><span>${asset.environment_context_metrics.join(', ')}</span></div>
      <div><strong>Telemetry Layers</strong><span>${asset.layers.join(', ')}</span></div>
    </div>
  `;
}

function ewRenderVitals(app, asset) {
  const el = app.querySelector('[data-ew-app-vitals]');
  if (!el) return;
  const vitals = Object.entries(asset.vitals || {});
  el.innerHTML = `
    <h3>Vitals</h3>
    <p class="ew-muted">Known ratio: ${Math.round(ewKnownVitalRatio(asset) * 100)}%</p>
    <div class="ew-app-detail-grid">
      ${vitals.map(([key, value]) => `<div><strong>${ewHumanLabel(key)}</strong><span>${ewFormatValue(value)}</span></div>`).join('')}
    </div>
  `;
}

function ewSelectAppAsset(app, data, assetId) {
  const asset = data.plant_assets.find(item => item.asset_id === assetId) || data.plant_assets[0];
  app.dataset.selectedAsset = asset.asset_id;
  ewRenderAssetList(app, data, asset.asset_id);
  ewRenderDetail(app, asset);
  ewRenderVitals(app, asset);
  ewRenderDocs(app, asset);
  ewRenderLogs(app, asset);

  if (app.ewMap && Array.isArray(asset.map_coordinates)) {
    app.ewMap.panTo(asset.map_coordinates, { animate: true, duration: 0.35 });
  }

  ewRenderTopology(app, data, asset);
  ewRenderWeatherContext(app, asset);
  ewRenderOperationalRadar(app, asset);
  ewRenderNutritionResourceRadar(app, asset);
}

function ewInitMap(app, data) {
  const mapEl = app.querySelector('[data-ew-app-map]');
  if (!mapEl || typeof L === 'undefined') return;
  const map = L.map(mapEl, { scrollWheelZoom: false }).setView(data.map_defaults.center, 15);
  const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  const siteLayer = L.layerGroup().addTo(map);
  const plantLayer = L.layerGroup().addTo(map);

  data.sites
    .filter(site => site.coordinate_quality !== 'village_level_approximate')
    .forEach(site => {
      L.circleMarker(site.coordinates, { radius: 7, weight: 2, fillOpacity: 0.48 })
        .bindPopup(`<div class="ew-app-popup"><strong>${site.name}</strong><span>${site.summary}</span><span>${site.coordinate_quality}</span></div>`)
        .addTo(siteLayer);
    });

  app.ewMarkers = data.plant_assets.map(asset => {
    const marker = L.marker(asset.map_coordinates)
      .bindPopup(`<div class="ew-app-popup"><strong>${asset.display_name}</strong><span>${asset.project_id}</span><span>${ewVitalsSummary(asset)}</span></div>`)
      .addTo(plantLayer);
    marker.on('click', () => {
      ewSelectAppAsset(app, data, asset.asset_id);
      marker.openPopup();
    });
    return { marker, asset };
  });

  const boundsPoints = [
    ...data.sites.filter(site => site.coordinate_quality !== 'village_level_approximate').map(site => site.coordinates),
    ...data.plant_assets.map(asset => asset.map_coordinates)
  ].filter(point => Array.isArray(point) && point.length === 2);

  if (boundsPoints.length > 1) {
    map.fitBounds(L.latLngBounds(boundsPoints), { padding: [32, 32], maxZoom: 16 });
  }

  L.control.layers({ 'OpenStreetMap': baseLayer }, { 'Sites': siteLayer, 'Plant assets': plantLayer }, { collapsed: true }).addTo(map);
  app.ewMap = map;
  setTimeout(() => map.invalidateSize(), 150);
}

function ewRenderTopology(app, data, selectedAsset) {
  const el = app.querySelector('[data-ew-app-topology]');
  if (!el || typeof echarts === 'undefined') return;
  const nodes = [
    ...data.sites.map(site => ({ name: site.site_id, value: site.name, category: 0, symbolSize: 52 })),
    ...data.plant_assets.map(asset => ({ name: asset.asset_id, value: asset.display_name, category: 1, symbolSize: asset.asset_id === selectedAsset.asset_id ? 52 : 36 })),
    { name: 'air_temperature_c', value: 'Air temperature', category: 2, symbolSize: 30 },
    { name: 'relative_humidity_percent', value: 'Relative humidity', category: 2, symbolSize: 30 },
    { name: 'uv_index', value: 'UV index', category: 2, symbolSize: 30 }
  ];
  const links = data.topology_edges.map(edge => ({ source: edge.from, target: edge.to, value: edge.type }));
  if (el.ewChart) el.ewChart.dispose();
  const chart = echarts.init(el);
  el.ewChart = chart;
  chart.setOption({
    title: { text: 'Plant telemetry topology', subtext: 'Site → plant assets → shared metrics', left: 'center' },
    tooltip: { formatter: params => params.data.value || params.data.name },
    legend: { top: 50, data: ['Sites', 'Plants', 'Metrics'] },
    series: [{ type: 'graph', layout: 'force', roam: true, categories: [{ name: 'Sites' }, { name: 'Plants' }, { name: 'Metrics' }], force: { repulsion: 180, edgeLength: 90 }, label: { show: true, formatter: params => params.data.value || params.data.name }, data: nodes, links }]
  });
  window.addEventListener('resize', () => chart.resize());
}

async function ewRenderWeatherContext(app, asset) {
  const el = app.querySelector('[data-ew-app-weather]');
  if (!el || typeof echarts === 'undefined') return;
  let data;
  try { data = await ewFetchJson('/assets/data/balcony-environment.daily.json'); } catch (error) { el.innerHTML = `<p class="ew-muted">Weather dataset not loaded: ${error.message}</p>`; return; }
  const rows = data.series || [];
  if (el.ewChart) el.ewChart.dispose();
  const chart = echarts.init(el);
  el.ewChart = chart;
  chart.setOption({
    title: { text: 'Shared balcony weather context', subtext: `${asset.display_name} uses common environment telemetry`, left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { top: 52, data: ['Temperature °C', 'Humidity %', 'UV index'] },
    grid: { left: 48, right: 24, top: 92, bottom: 56 },
    xAxis: { type: 'category', data: rows.map(row => row.label), axisLabel: { interval: Math.max(Math.floor(rows.length / 8), 0), rotate: 35 } },
    yAxis: { type: 'value', scale: true },
    series: [
      { name: 'Temperature °C', type: 'line', connectNulls: false, data: rows.map(row => row.air_temperature_c) },
      { name: 'Humidity %', type: 'line', connectNulls: false, data: rows.map(row => row.relative_humidity_percent) },
      { name: 'UV index', type: 'line', connectNulls: false, data: rows.map(row => row.uv_index) }
    ]
  });
  window.addEventListener('resize', () => chart.resize());
}

function ewRenderOperationalRadar(app, asset) {
  const el = app.querySelector('[data-ew-app-radar-operational]');
  if (!el || typeof echarts === 'undefined') return;
  const knownVitalsScore = Math.round(ewKnownVitalRatio(asset) * 10);
  const statusScore = asset.status === 'active' ? 8 : asset.status === 'planned_active' ? 6 : 3;
  const hasGrowth = asset.vitals?.growth_rate_cm_per_day ? 8 : 2;
  const hasYield = asset.vitals?.fruit_count || asset.vitals?.seed_harvest_weight_g || asset.vitals?.leaf_harvest_weight_g || asset.vitals?.harvest_weight_g ? 8 : 2;
  const fieldLoad = asset.local_position?.area_m2 ? Math.min(10, Math.round(asset.local_position.area_m2 / 2)) : 3;
  if (el.ewChart) el.ewChart.dispose();
  const chart = echarts.init(el);
  el.ewChart = chart;
  chart.setOption({
    title: { text: 'Оперативен радар', subtext: `${asset.display_name} · asset/vitals readiness`, left: 'center' },
    tooltip: {},
    radar: { radius: '64%', indicator: [{ name: 'Известни витали', max: 10 }, { name: 'Активност', max: 10 }, { name: 'Растеж', max: 10 }, { name: 'Добивни данни', max: 10 }, { name: 'Площ / товар', max: 10 }, { name: 'Weather връзки', max: 10 }] },
    series: [{ type: 'radar', data: [{ name: asset.display_name, value: [knownVitalsScore, statusScore, hasGrowth, hasYield, fieldLoad, Math.min(10, asset.environment_context_metrics.length)] }] }]
  });
  window.addEventListener('resize', () => chart.resize());
}

async function ewRenderNutritionResourceRadar(app, asset) {
  const el = app.querySelector('[data-ew-app-radar-nutrition]');
  if (!el || typeof echarts === 'undefined') return;
  let data;
  try { data = await ewFetchJson('/assets/data/plant-radar-profiles.json'); } catch (error) { el.innerHTML = `<p class="ew-muted">Radar profile failed to load: ${error.message}</p>`; return; }
  const profile = data.profiles?.[asset.asset_id];
  if (!profile) { el.innerHTML = '<p class="ew-muted">No nutrition/resource radar profile yet for this plant asset.</p>'; return; }
  if (el.ewChart) el.ewChart.dispose();
  const chart = echarts.init(el);
  el.ewChart = chart;
  chart.setOption({
    title: { text: 'Хранителен / ресурсен радар', subtext: `${profile.label} · normalized 0-10 heuristic seed`, left: 'center' },
    tooltip: {},
    radar: { radius: '64%', indicator: data.axes.map(axis => ({ name: axis.label, max: axis.max })) },
    series: [{ type: 'radar', data: [{ value: profile.values, name: profile.label }] }]
  });
  window.addEventListener('resize', () => chart.resize());
}

function ewSetMetricsTab(app, tab) {
  app.dataset.activeTab = tab;
  app.querySelectorAll('[data-ew-app-tab]').forEach(button => {
    button.classList.toggle('is-active', button.dataset.ewAppTab === tab);
  });
  app.querySelectorAll('[data-ew-app-panel]').forEach(panel => {
    panel.hidden = panel.dataset.ewAppPanel !== tab;
  });
  if (tab === 'topology' && app.ewMap) setTimeout(() => app.ewMap.invalidateSize(), 80);
  app.querySelectorAll('.ew-app-radar, .ew-app-topology, .ew-app-weather').forEach(el => {
    if (el.ewChart) setTimeout(() => el.ewChart.resize(), 80);
  });
}

async function ewInitMetricsApp() {
  const app = document.querySelector('[data-ew-metrics-app]');
  if (!app || typeof L === 'undefined') return;
  let data;
  try { data = await ewFetchJson('/assets/data/plant-map-app.seed.json'); } catch (error) { app.innerHTML = `<p class="ew-muted">Metrics app failed to load: ${error.message}</p>`; return; }
  app.innerHTML = `
    <div class="ew-metrics-app">
      <aside class="ew-app-panel">
        <h3>NMS Plant Inventory</h3>
        <div class="ew-app-toolbar" role="tablist" aria-label="Plant monitor sections">
          <button class="ew-app-toggle is-active" data-ew-app-tab="assets" type="button">Assets</button>
          <button class="ew-app-toggle" data-ew-app-tab="vitals" type="button">Vitals</button>
          <button class="ew-app-toggle" data-ew-app-tab="logs" type="button">Logs</button>
          <button class="ew-app-toggle" data-ew-app-tab="topology" type="button">Topology</button>
          <button class="ew-app-toggle" data-ew-app-tab="docs" type="button">Docs</button>
        </div>
        <div class="ew-app-asset-list" data-ew-app-assets></div>
      </aside>
      <main class="ew-app-main">
        <section class="ew-app-section" data-ew-app-panel="assets">
          <div class="ew-app-detail-card" data-ew-app-detail></div>
        </section>
        <section class="ew-app-section" data-ew-app-panel="vitals" hidden>
          <div class="ew-app-detail-card" data-ew-app-vitals></div>
          <div class="ew-app-detail-card ew-app-radar-grid">
            <div class="ew-app-radar" data-ew-app-radar-operational></div>
            <div class="ew-app-radar" data-ew-app-radar-nutrition></div>
          </div>
          <div class="ew-app-detail-card"><div class="ew-app-weather" data-ew-app-weather></div></div>
        </section>
        <section class="ew-app-section" data-ew-app-panel="logs" hidden>
          <div class="ew-app-detail-card" data-ew-app-logs></div>
        </section>
        <section class="ew-app-section" data-ew-app-panel="topology" hidden>
          <div class="ew-app-map-card"><div class="ew-app-map" data-ew-app-map></div></div>
          <div class="ew-app-detail-card"><div class="ew-app-topology" data-ew-app-topology></div></div>
        </section>
        <section class="ew-app-section" data-ew-app-panel="docs" hidden>
          <div class="ew-app-detail-card" data-ew-app-docs></div>
        </section>
      </main>
    </div>
  `;

  app.querySelectorAll('[data-ew-app-tab]').forEach(button => {
    button.addEventListener('click', () => ewSetMetricsTab(app, button.dataset.ewAppTab));
  });

  ewInitMap(app, data);
  ewSelectAppAsset(app, data, data.plant_assets[0].asset_id);
  ewSetMetricsTab(app, 'assets');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ewInitMetricsApp);
} else {
  ewInitMetricsApp();
}
