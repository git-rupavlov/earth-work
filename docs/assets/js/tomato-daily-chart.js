async function loadJson(url) {
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Failed to load ${url}: ${response.status}`);
  return response.json();
}

function renderTomatoDailyChart(dataset) {
  const chartEl = document.querySelector('[data-ew-chart="pink-tomato-daily-height"]');
  if (!chartEl || typeof echarts === 'undefined') return;

  const rows = dataset.series || [];
  const chart = echarts.init(chartEl);

  chart.setOption({
    title: {
      text: 'Pink Dream tomato daily height trend',
      subtext: 'Estimated daily 06:30 height model, May 12 - Jun 19',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        const point = params[0];
        const row = rows[point.dataIndex];
        return [
          `<strong>${row.label}</strong>`,
          `Height: ${row.value} cm`,
          `Phase: ${row.phase_id.replaceAll('_', ' ')}`,
          `Confidence: ${row.confidence}`
        ].join('<br>');
      }
    },
    grid: {
      left: 48,
      right: 24,
      top: 80,
      bottom: 56
    },
    xAxis: {
      type: 'category',
      data: rows.map(row => row.label),
      axisLabel: {
        interval: 4,
        rotate: 35
      }
    },
    yAxis: {
      type: 'value',
      name: 'Height (cm)',
      min: 0
    },
    series: [
      {
        name: 'Height',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        data: rows.map(row => row.value),
        markLine: {
          symbol: 'none',
          data: [
            { xAxis: 'May 22', name: 'End establishment' },
            { xAxis: 'Jun 05', name: 'End acceleration' },
            { xAxis: 'Jun 19', name: 'Current' }
          ]
        }
      }
    ]
  });

  window.addEventListener('resize', () => chart.resize());
}

function renderTomatoGrowthRateChart(dataset) {
  const chartEl = document.querySelector('[data-ew-chart="pink-tomato-growth-rate"]');
  if (!chartEl || typeof echarts === 'undefined') return;

  const phases = (dataset.growth_phases || []).filter(phase => phase.growth_rate_cm_per_day !== null);
  const chart = echarts.init(chartEl);

  chart.setOption({
    title: {
      text: 'Growth rate by phase',
      subtext: 'Estimated cm/day by phase',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: 48,
      right: 24,
      top: 80,
      bottom: 64
    },
    xAxis: {
      type: 'category',
      data: phases.map(phase => phase.label),
      axisLabel: {
        interval: 0,
        rotate: 25
      }
    },
    yAxis: {
      type: 'value',
      name: 'cm/day',
      min: 0
    },
    series: [
      {
        name: 'Growth rate',
        type: 'bar',
        data: phases.map(phase => phase.growth_rate_cm_per_day)
      }
    ]
  });

  window.addEventListener('resize', () => chart.resize());
}

async function initTomatoDailyCharts() {
  if (!document.querySelector('[data-ew-chart="pink-tomato-daily-height"]') && !document.querySelector('[data-ew-chart="pink-tomato-growth-rate"]')) return;

  try {
    const dataset = await loadJson('/assets/data/pink-tomatoes.daily.json');
    renderTomatoDailyChart(dataset);
    renderTomatoGrowthRateChart(dataset);
  } catch (error) {
    document.querySelectorAll('[data-ew-chart]').forEach(el => {
      el.innerHTML = `<p class="ew-muted">Chart data failed to load: ${error.message}</p>`;
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTomatoDailyCharts);
} else {
  initTomatoDailyCharts();
}
