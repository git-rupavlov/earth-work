function cropMatrixDataUrl() {
  const script = document.currentScript || document.querySelector('script[src$="crop-matrix.js"]');
  return new URL('../data/regenerative-cultures.json', script.src).toString();
}

async function loadCropMatrixData() {
  const response = await fetch(cropMatrixDataUrl());
  if (!response.ok) throw new Error('Cannot load crop matrix data');
  return response.json();
}

function svgEl(name, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function point(cx, cy, radius, angle) {
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

function renderKiviat(container, metrics, culture) {
  container.innerHTML = '';
  const size = 540;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = 175;
  const levels = 5;
  const svg = svgEl('svg', { viewBox: `0 0 ${size} ${size}`, role: 'img', 'aria-label': `Kiviat crop profile for ${culture.name}` });

  for (let level = 1; level <= levels; level += 1) {
    const radius = (maxRadius / levels) * level;
    const ringPoints = metrics.map((_, index) => {
      const angle = -Math.PI / 2 + (index * 2 * Math.PI) / metrics.length;
      const p = point(cx, cy, radius, angle);
      return `${p.x},${p.y}`;
    }).join(' ');
    svg.appendChild(svgEl('polygon', { points: ringPoints, class: 'crop-kiviat-ring' }));
  }

  metrics.forEach((metric, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / metrics.length;
    const axisEnd = point(cx, cy, maxRadius, angle);
    const labelPoint = point(cx, cy, maxRadius + 54, angle);
    svg.appendChild(svgEl('line', { x1: cx, y1: cy, x2: axisEnd.x, y2: axisEnd.y, class: 'crop-kiviat-axis' }));
    const label = svgEl('text', { x: labelPoint.x, y: labelPoint.y, class: 'crop-kiviat-label', 'text-anchor': labelPoint.x < cx - 20 ? 'end' : labelPoint.x > cx + 20 ? 'start' : 'middle' });
    label.textContent = metric;
    svg.appendChild(label);
  });

  const polygonPoints = culture.scores.map((score, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / metrics.length;
    const radius = (Math.max(0, Math.min(score, 10)) / 10) * maxRadius;
    const p = point(cx, cy, radius, angle);
    return `${p.x},${p.y}`;
  }).join(' ');

  svg.appendChild(svgEl('polygon', { points: polygonPoints, class: 'crop-kiviat-shape' }));

  culture.scores.forEach((score, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / metrics.length;
    const radius = (Math.max(0, Math.min(score, 10)) / 10) * maxRadius;
    const p = point(cx, cy, radius, angle);
    const dot = svgEl('circle', { cx: p.x, cy: p.y, r: 4, class: 'crop-kiviat-dot' });
    const title = svgEl('title');
    title.textContent = `${metrics[index]}: ${score}/10`;
    dot.appendChild(title);
    svg.appendChild(dot);
  });

  container.appendChild(svg);
}

function renderScatter(container, data) {
  if (!container) return;
  container.innerHTML = '';
  const width = 760;
  const height = 460;
  const margin = { top: 30, right: 35, bottom: 60, left: 70 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const svg = svgEl('svg', { viewBox: `0 0 ${width} ${height}`, role: 'img', 'aria-label': 'Calories versus low labor score scatter plot' });

  function sx(value) { return margin.left + (value / 10) * plotW; }
  function sy(value) { return margin.top + plotH - (value / 10) * plotH; }

  for (let tick = 0; tick <= 10; tick += 2) {
    svg.appendChild(svgEl('line', { x1: sx(tick), y1: margin.top, x2: sx(tick), y2: margin.top + plotH, class: 'crop-scatter-grid' }));
    svg.appendChild(svgEl('line', { x1: margin.left, y1: sy(tick), x2: margin.left + plotW, y2: sy(tick), class: 'crop-scatter-grid' }));

    const xText = svgEl('text', { x: sx(tick), y: height - 28, class: 'crop-scatter-tick', 'text-anchor': 'middle' });
    xText.textContent = tick;
    svg.appendChild(xText);

    const yText = svgEl('text', { x: margin.left - 14, y: sy(tick) + 4, class: 'crop-scatter-tick', 'text-anchor': 'end' });
    yText.textContent = tick;
    svg.appendChild(yText);
  }

  svg.appendChild(svgEl('line', { x1: margin.left, y1: margin.top + plotH, x2: margin.left + plotW, y2: margin.top + plotH, class: 'crop-scatter-axis' }));
  svg.appendChild(svgEl('line', { x1: margin.left, y1: margin.top, x2: margin.left, y2: margin.top + plotH, class: 'crop-scatter-axis' }));

  const xLabel = svgEl('text', { x: margin.left + plotW / 2, y: height - 8, class: 'crop-scatter-label', 'text-anchor': 'middle' });
  xLabel.textContent = 'Low labor score';
  svg.appendChild(xLabel);

  const yLabel = svgEl('text', { x: 18, y: margin.top + plotH / 2, class: 'crop-scatter-label', 'text-anchor': 'middle', transform: `rotate(-90 18 ${margin.top + plotH / 2})` });
  yLabel.textContent = 'Calories/m² score';
  svg.appendChild(yLabel);

  data.cultures.forEach(culture => {
    const calories = culture.scores[0];
    const lowLabor = culture.scores[5];
    const dot = svgEl('circle', { cx: sx(lowLabor), cy: sy(calories), r: 5, class: 'crop-scatter-dot' });
    const title = svgEl('title');
    title.textContent = `${culture.name}: low labor ${lowLabor}/10, calories ${calories}/10`;
    dot.appendChild(title);
    svg.appendChild(dot);

    const label = svgEl('text', { x: sx(lowLabor) + 7, y: sy(calories) - 7, class: 'crop-scatter-name' });
    label.textContent = culture.name;
    svg.appendChild(label);
  });

  container.appendChild(svg);
}

function renderSummary(container, culture, metrics) {
  const rows = metrics.map((metric, index) => `<tr><td>${metric}</td><td>${culture.scores[index]}/10</td></tr>`).join('');
  container.innerHTML = `<h3>${culture.name}</h3><p class="crop-latin">${culture.latin}</p><p><strong>Group:</strong> ${culture.group}</p><p><strong>Lifecycle:</strong> ${culture.lifecycle}</p><p><strong>Edible parts:</strong> ${culture.edibleParts.length ? culture.edibleParts.join(', ') : 'not primarily used as food'}</p><p><strong>Roles:</strong> ${culture.roles.join(', ')}</p><table class="crop-score-table"><tbody>${rows}</tbody></table>`;
}

function renderGroups(groups) {
  const target = document.getElementById('crop-groups');
  if (!target) return;
  target.innerHTML = groups.map(group => `<article class="crop-group-card"><h3>${group.name}</h3><p>${group.description}</p><ul>${group.cultures.map(crop => `<li>${crop}</li>`).join('')}</ul></article>`).join('');
}

function renderFunctionMatrix(cultures) {
  const table = document.getElementById('crop-function-matrix');
  if (!table) return;
  const functions = ['calories', 'protein', 'biomass', 'nitrogen', 'soil', 'pollinators', 'mulch', 'storage', 'ground cover'];
  const header = `<thead><tr><th>Crop</th>${functions.map(fn => `<th>${fn}</th>`).join('')}</tr></thead>`;
  const body = cultures.map(culture => {
    const cells = functions.map(fn => `<td class="${culture.roles.includes(fn) ? 'yes' : ''}">${culture.roles.includes(fn) ? '✓' : ''}</td>`).join('');
    return `<tr><th>${culture.name}</th>${cells}</tr>`;
  }).join('');
  table.innerHTML = `${header}<tbody>${body}</tbody>`;
}

function renderScoreComparison(data) {
  const table = document.getElementById('crop-score-comparison');
  if (!table) return;
  const header = `<thead><tr><th>Crop</th>${data.kiviatMetrics.map(metric => `<th>${metric}</th>`).join('')}</tr></thead>`;
  const body = data.cultures.map(culture => `<tr><th>${culture.name}</th>${culture.scores.map(score => `<td>${score}</td>`).join('')}</tr>`).join('');
  table.innerHTML = `${header}<tbody>${body}</tbody>`;
}

function setupCropSelector(data) {
  const select = document.getElementById('crop-select');
  const chart = document.getElementById('crop-kiviat-chart');
  const summary = document.getElementById('crop-summary');
  if (!select || !chart || !summary) return;
  select.innerHTML = data.cultures.map((culture, index) => `<option value="${index}">${culture.name}</option>`).join('');
  const update = () => {
    const culture = data.cultures[Number(select.value)];
    renderKiviat(chart, data.kiviatMetrics, culture);
    renderSummary(summary, culture, data.kiviatMetrics);
  };
  select.addEventListener('change', update);
  update();
}

function initCropMatrix() {
  if (!document.getElementById('crop-select') && !document.getElementById('crop-function-matrix')) return;
  loadCropMatrixData()
    .then(data => {
      renderGroups(data.groups);
      renderFunctionMatrix(data.cultures);
      renderScoreComparison(data);
      renderScatter(document.getElementById('crop-scatter-labor-calories'), data);
      setupCropSelector(data);
    })
    .catch(error => {
      console.error(error);
      const chart = document.getElementById('crop-kiviat-chart');
      if (chart) chart.textContent = 'Crop matrix data could not be loaded.';
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCropMatrix);
} else {
  initCropMatrix();
}
