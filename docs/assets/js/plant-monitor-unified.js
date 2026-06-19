function ewChartContainerId(assetId, suffix) {
  return `${assetId.replaceAll('_', '-')}-${suffix}`;
}

function ewSelectedAssetSeries(asset) {
  if (asset.assetId === 'solanum_lycopersicum_pink_dream') {
    return {
      title: 'Pink Dream tomato daily height trend',
      subtext: 'Daily 06:30 model, May 12 - Jun 19',
      unit: 'cm',
      yAxisName: 'Height (cm)',
      rows: [
        { label: 'May 12', value: 10, phase: 'Planting day' },
        { label: 'May 13', value: 10.5, phase: 'Establishment' },
        { label: 'May 14', value: 11, phase: 'Establishment' },
        { label: 'May 15', value: 11.5, phase: 'Establishment' },
        { label: 'May 16', value: 12, phase: 'Establishment' },
        { label: 'May 17', value: 12.5, phase: 'Establishment' },
        { label: 'May 18', value: 13, phase: 'Establishment' },
        { label: 'May 19', value: 13.5, phase: 'Establishment' },
        { label: 'May 20', value: 14, phase: 'Establishment' },
        { label: 'May 21', value: 14.5, phase: 'Establishment' },
        { label: 'May 22', value: 15, phase: 'Establishment' },
        { label: 'May 23', value: 16.5, phase: 'Vegetative acceleration' },
        { label: 'May 24', value: 18, phase: 'Vegetative acceleration' },
        { label: 'May 25', value: 19.5, phase: 'Vegetative acceleration' },
        { label: 'May 26', value: 21, phase: 'Vegetative acceleration' },
        { label: 'May 27', value: 22.5, phase: 'Vegetative acceleration' },
        { label: 'May 28', value: 24, phase: 'Vegetative acceleration' },
        { label: 'May 29', value: 25.5, phase: 'Vegetative acceleration' },
        { label: 'May 30', value: 27, phase: 'Vegetative acceleration' },
        { label: 'May 31', value: 28.5, phase: 'Vegetative acceleration' },
        { label: 'Jun 01', value: 30, phase: 'Vegetative acceleration' },
        { label: 'Jun 02', value: 31.5, phase: 'Vegetative acceleration' },
        { label: 'Jun 03', value: 33, phase: 'Vegetative acceleration' },
        { label: 'Jun 04', value: 34.5, phase: 'Vegetative acceleration' },
        { label: 'Jun 05', value: 36, phase: 'Vegetative acceleration' },
        { label: 'Jun 06', value: 38.1, phase: 'Rapid vegetative growth' },
        { label: 'Jun 07', value: 40.2, phase: 'Rapid vegetative growth' },
        { label: 'Jun 08', value: 42.3, phase: 'Rapid vegetative growth' },
        { label: 'Jun 09', value: 44.4, phase: 'Rapid vegetative growth' },
        { label: 'Jun 10', value: 46.5, phase: 'Rapid vegetative growth' },
        { label: 'Jun 11', value: 48.6, phase: 'Rapid vegetative growth' },
        { label: 'Jun 12', value: 50.7, phase: 'Rapid vegetative growth' },
        { label: 'Jun 13', value: 52.8, phase: 'Rapid vegetative growth' },
        { label: 'Jun 14', value: 54.9, phase: 'Rapid vegetative growth' },
        { label: 'Jun 15', value: 57, phase: 'Rapid vegetative growth' },
        { label: 'Jun 16', value: 59.1, phase: 'Rapid vegetative growth' },
        { label: 'Jun 17', value: 61.2, phase: 'Rapid vegetative growth' },
        { label: 'Jun 18', value: 63.3, phase: 'Rapid vegetative growth' },
        { label: 'Jun 19', value: 65, phase: 'Rapid vegetative growth' }
      ]
    };
  }

  if (asset.chartData && asset.chartData.length) {
    return {
      title: `${asset.displayName} chart preview`,
      subtext: 'Current known datapoints',
      unit: 'value',
      yAxisName: 'Value',
      rows: asset.chartData.map(row => ({
        label: row.label,
        value: row.value,
        phase: row.metric
      }))
    };
  }

  return null;
}

function ewRenderAssetCharts(asset) {
  const series = ewSelectedAssetSeries(asset);
  if (!series) {
    return '<div class="ew-empty-chart">No chart data yet for this plant. Inventory exists, telemetry is still a future crime scene.</div>';
  }

  const chartId = ewChartContainerId(asset.assetId, 'chart');
  const rateId = ewChartContainerId(asset.assetId, 'rate');
  const growthRateChart = asset.assetId === 'solanum_lycopersicum_pink_dream'
    ? `<div class="ew-chart-card"><div class="ew-chart" id="${rateId}" data-ew-selected-growth-rate="${asset.assetId}"></div></div>`
    : '';

  return `
    <div class="ew-chart-card"><div class="ew-chart" id="${chartId}" data-ew-selected-chart="${asset.assetId}"></div></div>
    ${growthRateChart}
    <p class="ew-muted">Charts live inside the selected plant asset, like an NMS inventory detail page. One monitor, many plants, no dashboard confetti.</p>
  `;
}

function ewInitSelectedCharts(asset) {
  if (typeof echarts === 'undefined') return;

  const series = ewSelectedAssetSeries(asset);
  if (!series) return;

  const chartEl = document.getElementById(ewChartContainerId(asset.assetId, 'chart'));
  if (chartEl) {
    const chart = echarts.init(chartEl);
    chart.setOption({
      title: { text: series.title, subtext: series.subtext, left: 'center' },
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          const point = params[0];
          const row = series.rows[point.dataIndex];
          return [`<strong>${row.label}</strong>`, `${series.yAxisName}: ${row.value}`, `Phase: ${row.phase}`].join('<br>');
        }
      },
      grid: { left: 48, right: 24, top: 80, bottom: 56 },
      xAxis: { type: 'category', data: series.rows.map(row => row.label), axisLabel: { interval: Math.max(Math.floor(series.rows.length / 8), 0), rotate: 35 } },
      yAxis: { type: 'value', name: series.yAxisName, min: 0 },
      series: [{ name: series.yAxisName, type: 'line', smooth: true, symbolSize: 6, data: series.rows.map(row => row.value) }]
    });
    window.addEventListener('resize', () => chart.resize());
  }

  if (asset.assetId === 'solanum_lycopersicum_pink_dream') {
    const rateEl = document.getElementById(ewChartContainerId(asset.assetId, 'rate'));
    if (rateEl) {
      const rateChart = echarts.init(rateEl);
      rateChart.setOption({
        title: { text: 'Growth rate by phase', subtext: 'Estimated cm/day by phase', left: 'center' },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: 48, right: 24, top: 80, bottom: 64 },
        xAxis: { type: 'category', data: ['Establishment', 'Vegetative acceleration', 'Rapid vegetative growth'], axisLabel: { interval: 0, rotate: 20 } },
        yAxis: { type: 'value', name: 'cm/day', min: 0 },
        series: [{ name: 'Growth rate', type: 'bar', data: [0.5, 1.5, 2.1] }]
      });
      window.addEventListener('resize', () => rateChart.resize());
    }
  }
}

renderAssetDetails = function renderAssetDetails(asset) {
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
        <h4>Plant-specific charts</h4>
        ${ewRenderAssetCharts(asset)}
      </div>

      <div class="ew-tab-panel" data-ew-panel="logs">
        <h4>Event logs</h4>
        <ul class="ew-log-list">
          ${asset.logs.map(log => `<li>${log}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
};

activatePlantMonitor = function activatePlantMonitor(selectedId = EW_PLANT_MONITOR_ASSETS[0].assetId) {
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
      if (tab === 'charts') setTimeout(() => ewInitSelectedCharts(selected), 0);
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => activatePlantMonitor());
} else {
  activatePlantMonitor();
}
