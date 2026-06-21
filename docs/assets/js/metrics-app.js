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

function ewRenderAssetList(app, data, selectedId) {
  const list = app.querySelector('[data-ew-app-assets]');
  list.innerHTML = data.plant_assets.map(asset => `
    <button class="ew-app-asset-button ${asset.asset_id === selectedId ? 'is-active' : ''}" data-ew-app-asset="${asset.asset_id}" type="button">
      <strong>${asset.display_name}</strong>
      <span>${asset.project_id} · ${asset.status}</span>
    </button>
  `).join('');

  list.querySelectorAll('[data-ew-app-asset]').forEach(button => {
    button.addEventListener('click', () => ewSelectAppAsset(app, data, button.dataset.ewAppAsset));
  });
}

function ewRenderDetail(app, asset) {
  const detail = app.querySelector('[data-ew-app-detail]');
  detail.innerHTML = `
    <h3>${asset.display_name}</h3>
    <div class="ew-app-detail-grid">
      <div><strong>Asset ID</strong><span>${asset.asset_id}</span></div>
      <div><strong>Project</strong><span>${asset.project_id}</span></div>
      <div><strong>Site</strong><span>${asset.site_id}</span></div>
      <div><strong>Containers</strong><span>${asset.containers.join(', ')}</span></div>
      <div><strong>Status</strong><span>${asset.status}</span></div>
      <div><strong>Telemetry layers</strong><span>${asset.layers.join(', ')}</span></div>
    </div>
  `;
}

function ewSelectAppAsset(app, data, assetId) {
  const asset = data.plant_assets.find(item => item.asset_id === assetId) || data.plant_assets[0];
  app.dataset.selectedAsset = asset.asset_id;
  ewRenderAssetList(app, data, asset.asset_id);
  ewRenderDetail(app, asset);

  if (app.ewMarkers) {
    app.ewMarkers.forEach(({ marker, asset: markerAsset }) => {
      if (markerAsset.asset_id === asset.asset_id) {
        marker.openPopup();
      }
    });
  }

  ewRenderTopology(app, data, asset);
  ewRenderWeatherContext(app, asset);
  ewRenderPlantRadarProfile(app, asset);
}

function ewInitMap(app, data) {
  const mapEl = app.querySelector('[data-ew-app-map]');
  const map = L.map(mapEl).setView(data.map_defaults.center, data.map_defaults.zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const siteLayer = L.layerGroup().addTo(map);
  const plantLayer = L.layerGroup().addTo(map);

  data.sites.forEach(site => {
    L.circleMarker(site.coordinates, {
      radius: 9,
      weight: 2,
      fillOpacity: 0.6
    })
      .bindPopup(`<div class="ew-app-popup"><strong>${site.name}</strong><span>${site.summary}</span><span>${site.coordinate_quality}</span></div>`)
      .addTo(siteLayer);
  });

  app.ewMarkers = data.plant_assets.map(asset => {
    const marker = L.marker(asset.map_coordinates)
      .bindPopup(`<div class="ew-app-popup"><strong>${asset.display_name}</strong><span>${asset.project_id}</span><span>${ewVitalsSummary(asset)}</span></div>`)
      .addTo(plantLayer);

    marker.on('click', () => ewSelectAppAsset(app, data, asset.asset_id));
    return { marker, asset };
  });

  L.control.layers(
    { 'OpenStreetMap': map },
    { 'Sites': siteLayer, 'Plant assets': plantLayer },
    { collapsed: false }
  ).addTo(map);

  app.ewMap = map;
  setTimeout(() => map.invalidateSize(), 100);
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
  const chart = echarts.init(el);
  chart.setOption({
    title: { text: 'Plant telemetry topology', subtext: 'Site → plant assets → shared metrics', left: 'center' },
    tooltip: { formatter: params => params.data.value || params.data.name },
    legend: { top: 50, data: ['Sites', 'Plants', 'Metrics'] },
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      categories: [{ name: 'Sites' }, { name: 'Plants' }, { name: 'Metrics' }],
      force: { repulsion: 180, edgeLength: 90 },
      label: { show: true, formatter: params => params.data.value || params.data.name },
      data: nodes,
      links
    }]
  });
  window.addEventListener('resize', () => chart.resize());
}

async function ewRenderWeatherContext(app, asset) {
  const el = app.querySelector('[data-ew-app-weather]');
  if (!el || typeof echarts === 'undefined') return;

  let data;
  try {
    data = await ewFetchJson('/assets/data/balcony-environment.daily.json');
  } catch (error) {
    el.innerHTML = `<p class="ew-muted">Weather dataset not loaded: ${error.message}</p>`;
    return;
  }

  const rows = data.series || [];
  const chart = echarts.init(el);
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

async function ewRenderPlantRadarProfile(app, asset) {
  const el = app.querySelector('[data-ew-app-radar]');
  if (!el || typeof echarts === 'undefined') return;

  let data;
  try {
    data = await ewFetchJson('/assets/data/plant-radar-profiles.json');
  } catch (error) {
    el.innerHTML = `<p class="ew-muted">Radar profile failed to load: ${error.message}</p>`;
    return;
  }

  const profile = data.profiles?.[asset.asset_id];
  if (!profile) {
    el.innerHTML = '<p class="ew-muted">No radar profile yet for this plant asset.</p>';
    return;
  }

  const chart = echarts.init(el);
  chart.setOption({
    title: {
      text: 'Хранителен / ресурсен радар',
      subtext: `${profile.label} · normalized 0-10 heuristic seed`,
      left: 'center'
    },
    tooltip: {},
    radar: {
      radius: '64%',
      indicator: data.axes.map(axis => ({ name: axis.label, max: axis.max }))
    },
    series: [{
      type: 'radar',
      data: [{ value: profile.values, name: profile.label }]
    }]
  });
  window.addEventListener('resize', () => chart.resize());
}

async function ewInitMetricsApp() {
  const app = document.querySelector('[data-ew-metrics-app]');
  if (!app || typeof L === 'undefined') return;

  let data;
  try {
    data = await ewFetchJson('/assets/data/plant-map-app.seed.json');
  } catch (error) {
    app.innerHTML = `<p class="ew-muted">Metrics app failed to load: ${error.message}</p>`;
    return;
  }

  app.innerHTML = `
    <div class="ew-metrics-app">
      <aside class="ew-app-panel">
        <h3>Plant inventory</h3>
        <div class="ew-app-toolbar">
          <button class="ew-app-toggle is-active" type="button">Plants</button>
          <button class="ew-app-toggle" type="button">Vitals</button>
          <button class="ew-app-toggle" type="button">Weather</button>
          <button class="ew-app-toggle" type="button">Topology</button>
        </div>
        <div class="ew-app-asset-list" data-ew-app-assets></div>
      </aside>
      <main>
        <div class="ew-app-map-card"><div class="ew-app-map" data-ew-app-map></div></div>
        <div class="ew-app-detail-card" data-ew-app-detail></div>
        <div class="ew-app-detail-card"><div class="ew-app-radar" data-ew-app-radar></div></div>
        <div class="ew-app-detail-card"><div class="ew-app-topology" data-ew-app-topology></div></div>
        <div class="ew-app-detail-card"><div class="ew-app-weather" data-ew-app-weather></div></div>
      </main>
    </div>
  `;

  ewInitMap(app, data);
  ewSelectAppAsset(app, data, data.plant_assets[0].asset_id);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ewInitMetricsApp);
} else {
  ewInitMetricsApp();
}
