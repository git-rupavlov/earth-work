(() => {
  const root = document.querySelector('[data-ew-seed-catalog]');
  if (!root) return;

  const state = {
    data: [],
    query: '',
    category: 'all',
    inventory: 'all',
    lifecycle: 'all',
    container: 'all'
  };

  const esc = (value) => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const label = (value) => value == null || value === '' ? 'unknown' : String(value);

  function unique(field) {
    return [...new Set(state.data.map(item => item[field]).filter(Boolean))]
      .sort((a, b) => String(a).localeCompare(String(b)));
  }

  function optionList(values, current, allLabel) {
    return [`<option value="all">${esc(allLabel)}</option>`, ...values.map(value =>
      `<option value="${esc(value)}"${value === current ? ' selected' : ''}>${esc(value)}</option>`
    )].join('');
  }

  function matches(item) {
    const haystack = [
      item.category,
      item.species,
      item.variety,
      item.generation,
      item.seed_type,
      item.inventory_state,
      item.source,
      item.lifecycle,
      item.container_suitability,
      ...(item.tags || []),
      item.notes
    ].join(' ').toLowerCase();

    const queryOk = !state.query || haystack.includes(state.query.toLowerCase());
    const categoryOk = state.category === 'all' || item.category === state.category;
    const inventoryOk = state.inventory === 'all' || item.inventory_state === state.inventory;
    const lifecycleOk = state.lifecycle === 'all' || item.lifecycle === state.lifecycle;
    const containerOk = state.container === 'all' || item.container_suitability === state.container;

    return queryOk && categoryOk && inventoryOk && lifecycleOk && containerOk;
  }

  function card(item) {
    const displayName = item.variety || item.species || item.id;
    const quantity = item.quantity == null ? 'unknown' : `${item.quantity} seeds`;
    const badges = [item.inventory_state, item.generation, item.seed_type]
      .filter(Boolean)
      .map((value, index) => `<span class="ew-seed-badge"${index === 0 ? ` data-state="${esc(item.inventory_state)}"` : ''}>${esc(value)}</span>`)
      .join('');
    const media = item.image
      ? `<div class="ew-seed-media"><img src="${esc(item.image)}" alt="${esc(displayName)} seed artwork" loading="lazy" decoding="async"></div>`
      : '';

    return `
      <article class="ew-seed-card" data-seed-id="${esc(item.id)}">
        ${media}
        <div class="ew-seed-card-top">
          <span class="ew-seed-category">${esc(item.category)}</span>
          <h3>${esc(displayName)}</h3>
          <div class="ew-seed-species">${esc(item.species)}</div>
        </div>
        <div class="ew-seed-card-body">
          <div class="ew-seed-badges">${badges}</div>
          <dl class="ew-seed-meta">
            <dt>Quantity</dt><dd>${esc(quantity)}</dd>
            <dt>Source</dt><dd>${esc(label(item.source))}</dd>
            <dt>Lifecycle</dt><dd>${esc(label(item.lifecycle))}</dd>
            <dt>Container</dt><dd>${esc(label(item.container_suitability))}</dd>
          </dl>
          <p class="ew-seed-note">${esc(label(item.notes))}</p>
        </div>
      </article>`;
  }

  function render() {
    const filtered = state.data.filter(matches);
    const confirmed = state.data.filter(item => item.inventory_state === 'confirmed').length;
    const savedLines = state.data.filter(item => item.seed_type === 'saved line').length;

    root.innerHTML = `
      <div class="ew-seed-summary">
        <div class="ew-seed-stat"><strong>${state.data.length}</strong><span>Catalog records</span></div>
        <div class="ew-seed-stat"><strong>${confirmed}</strong><span>Confirmed stock</span></div>
        <div class="ew-seed-stat"><strong>${savedLines}</strong><span>Saved lines</span></div>
      </div>

      <div class="ew-seed-layout">
        <aside class="ew-seed-filters" aria-label="Seed catalog filters">
          <input class="ew-seed-search" type="search" placeholder="Search species, variety, tag..." value="${esc(state.query)}" data-seed-search>

          <div class="ew-seed-filter">
            <label for="ew-seed-category">Category</label>
            <select id="ew-seed-category" data-seed-filter="category">${optionList(unique('category'), state.category, 'All categories')}</select>
          </div>

          <div class="ew-seed-filter">
            <label for="ew-seed-state">Inventory state</label>
            <select id="ew-seed-state" data-seed-filter="inventory">${optionList(unique('inventory_state'), state.inventory, 'All states')}</select>
          </div>

          <div class="ew-seed-filter">
            <label for="ew-seed-life">Lifecycle</label>
            <select id="ew-seed-life" data-seed-filter="lifecycle">${optionList(unique('lifecycle'), state.lifecycle, 'All lifecycles')}</select>
          </div>

          <div class="ew-seed-filter">
            <label for="ew-seed-container">Container suitability</label>
            <select id="ew-seed-container" data-seed-filter="container">${optionList(unique('container_suitability'), state.container, 'Any suitability')}</select>
          </div>

          <button class="ew-seed-reset" type="button" data-seed-reset>Reset filters</button>
        </aside>

        <section aria-label="Seed inventory results">
          <div class="ew-seed-results-head">
            <strong>${filtered.length} seed records</strong>
            <span>Inventory, not a storefront</span>
          </div>
          <div class="ew-seed-grid">
            ${filtered.length ? filtered.map(card).join('') : '<div class="ew-seed-empty">No seed records match these filters.</div>'}
          </div>
        </section>
      </div>`;

    root.querySelector('[data-seed-search]')?.addEventListener('input', event => {
      state.query = event.target.value;
      render();
      root.querySelector('[data-seed-search]')?.focus();
    });

    root.querySelectorAll('[data-seed-filter]').forEach(select => {
      select.addEventListener('change', event => {
        state[event.target.dataset.seedFilter] = event.target.value;
        render();
      });
    });

    root.querySelector('[data-seed-reset]')?.addEventListener('click', () => {
      state.query = '';
      state.category = 'all';
      state.inventory = 'all';
      state.lifecycle = 'all';
      state.container = 'all';
      render();
    });
  }

  fetch('/assets/data/seeds.json')
    .then(response => {
      if (!response.ok) throw new Error(`Seed catalog HTTP ${response.status}`);
      return response.json();
    })
    .then(payload => {
      state.data = Array.isArray(payload.seeds) ? payload.seeds : [];
      render();
    })
    .catch(error => {
      console.error(error);
      root.innerHTML = '<div class="ew-seed-empty">Seed inventory data could not be loaded.</div>';
    });
})();
