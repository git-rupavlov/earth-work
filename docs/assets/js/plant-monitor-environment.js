async function ewLoadEnvironmentDataset() {
  if (window.EW_BALCONY_ENVIRONMENT_DATASET) return window.EW_BALCONY_ENVIRONMENT_DATASET;
  const response = await fetch('/assets/data/balcony-environment.daily.json', { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Failed to load balcony environment dataset: ${response.status}`);
  window.EW_BALCONY_ENVIRONMENT_DATASET = await response.json();
  return window.EW_BALCONY_ENVIRONMENT_DATASET;
}

function ewEnvironmentChartId(assetId, metricId) {
  return `${assetId.replaceAll('_', '-')}-env-${metricId.replaceAll('_', '-')}`;
}

function ewRenderEnvironmentCharts(asset) {
  return `
    <h4>Common balcony environment</h4>
    <p class="ew-muted">These environmental metrics are common context for all balcony plants. Current imported values are sparse; missing values are deliberately null, not zero.</p>
    <div class="ew-chart-card"><div class="ew-chart" id="${ewEnvironmentChartId(asset.assetId, 'air_temperature_c')}" data-ew-env-metric="air_temperature_c"></div></div>
    <div class="ew-chart-card"><div class="ew-chart" id="${ewEnvironmentChartId(asset.assetId, 'relative_humidity_percent')}" data-ew-env-metric="relative_humidity_percent"></div></div>
    <div class="ew-chart-card"><div class="ew-chart" id="${ewEnvironmentChartId(asset.assetId, 'uv_index')}" data-ew-env-metric="uv_index"></div></div>
  `;
}

async function ewInitEnvironmentCharts(asset) {
  if (typeof echarts === 'undefined') return;

  let dataset;
  try {
    dataset = await ewLoadEnvironmentDataset();
  } catch (error) {
    document.querySelectorAll('[data-ew-env-metric]').forEach(el => {
      el.innerHTML = `<p class="ew-muted">Environment data failed to load: ${error.message}</p>`;
    });
    return;
  }

  const rows = dataset.series || [];
  const metricConfig = {
    air_temperature_c: { title: 'Air temperature', yAxis: '°C', unit: '°C' },
    relative_humidity_percent: { title: 'Relative humidity', yAxis: '%', unit: '%' },
    uv_index: { title: 'UV index', yAxis: 'index', unit: '' }
  };

  Object.entries(metricConfig).forEach(([metricId, config]) => {
    const el = document.getElementById(ewEnvironmentChartId(asset.assetId, metricId));
    if (!el) return;

    const values = rows.map(row => row[metricId]);
    const hasAnyValue = values.some(value => value !== null && value !== undefined);

    if (!hasAnyValue) {
      el.innerHTML = `<div class="ew-empty-chart">${config.title}: source pipeline is defined, but no imported values yet. The chart is ready; the data is being fashionably absent.</div>`;
      return;
    }

    const chart = echarts.init(el);
    chart.setOption({
      title: {
        text: config.title,
        subtext: 'Common balcony environment, 06:30 daily records',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          const point = params[0];
          const row = rows[point.dataIndex];
          const value = row[metricId];
          return [
            `<strong>${row.label}</strong>`,
            `${config.title}: ${value === null || value === undefined ? 'missing' : `${value} ${config.unit}`}`,
            `Source: ${row.source_id || 'missing'}`,
            `Confidence: ${row.confidence || 'unknown'}`
          ].join('<br>');
        }
      },
      grid: { left: 48, right: 24, top: 80, bottom: 56 },
      xAxis: {
        type: 'category',
        data: rows.map(row => row.label),
        axisLabel: { interval: Math.max(Math.floor(rows.length / 8), 0), rotate: 35 }
      },
      yAxis: { type: 'value', name: config.yAxis, scale: true },
      series: [{
        name: config.title,
        type: 'line',
        connectNulls: false,
        symbolSize: 7,
        data: values
      }]
    });
    window.addEventListener('resize', () => chart.resize());
  });
}

const ewPreviousRenderAssetCharts = ewRenderAssetCharts;
ewRenderAssetCharts = function ewRenderAssetChartsWithEnvironment(asset) {
  return `
    ${ewPreviousRenderAssetCharts(asset)}
    ${ewRenderEnvironmentCharts(asset)}
  `;
};

const ewPreviousInitSelectedCharts = ewInitSelectedCharts;
ewInitSelectedCharts = function ewInitSelectedChartsWithEnvironment(asset) {
  ewPreviousInitSelectedCharts(asset);
  ewInitEnvironmentCharts(asset);
};
