const EW_PAGE_HEROES = [
  {
    match: '/about/',
    className: 'ew-page-principles',
    image: 'principles.webp',
    kicker: 'About',
    title: 'About NoMad\'s Farm',
    text: 'A practical documentation system for resilient food production, soil recovery and long-term field learning.'
  },
  {
    match: '/projects/',
    className: 'ew-page-principles',
    image: 'principles.webp',
    kicker: 'Project registry',
    title: 'Projects',
    text: 'Active work streams that generate observations, data, failures, decisions and practical experience.'
  },
  {
    match: '/sprout-lab/',
    className: 'ew-page-sprout-lab',
    image: 'sprout-lab.webp',
    kicker: 'Indoor production lab',
    title: 'Sprout Lab',
    text: 'Sprouts, microgreens, seed viability, propagation workflow and year-round production practice.'
  },
  {
    match: '/projects/sprout-lab/three-year-plan/',
    className: 'ew-page-sprout-lab',
    image: 'sprout-lab.webp',
    kicker: 'Development plan',
    title: 'Sprout Lab',
    text: 'Three-year development path for indoor production, seed testing and repeatable growing workflows.'
  },
  {
    match: '/projects/sprout-lab/site-assessment/',
    className: 'ew-page-sprout-lab',
    image: 'sprout-lab.webp',
    kicker: 'Site assessment',
    title: 'Sprout Lab',
    text: 'Shelf layout, humidity, airflow, light and workflow constraints inside the indoor production system.'
  },
  {
    match: '/projects/microclimate-lab/',
    className: 'ew-page-automation',
    image: 'monitoring.webp',
    kicker: 'Monitoring',
    title: 'Microclimate Lab',
    text: 'Temperature, humidity, airflow, light and sensor placement for small growing systems.'
  },
  {
    match: '/projects/microclimate-lab/three-year-plan/',
    className: 'ew-page-automation',
    image: 'monitoring.webp',
    kicker: 'Development plan',
    title: 'Microclimate Lab',
    text: 'Three-year path for sensors, dashboards and practical environmental monitoring.'
  },
  {
    match: '/projects/microclimate-lab/site-assessment/',
    className: 'ew-page-automation',
    image: 'monitoring.webp',
    kicker: 'Site assessment',
    title: 'Microclimate Lab',
    text: 'Assessing airflow, light, humidity and temperature patterns across growing spaces.'
  },
  {
    match: '/projects/balcony-pot-house/',
    className: 'ew-page-balcony',
    image: 'balcony-pot-house.webp',
    kicker: 'Container production',
    title: 'Balcony Pot House',
    text: 'South-East balcony production with tomatoes, peppers, herbs, sweet potato, sunflower and volunteer selection.'
  },
  {
    match: '/projects/balcony-pot-house/three-year-plan/',
    className: 'ew-page-balcony',
    image: 'balcony-pot-house.webp',
    kicker: 'Development plan',
    title: 'Balcony Pot House',
    text: 'Three-year path for compact food production, container trials and microclimate learning.'
  },
  {
    match: '/projects/balcony-pot-house/site-assessment/',
    className: 'ew-page-balcony',
    image: 'balcony-pot-house.webp',
    kicker: 'Site assessment',
    title: 'Balcony Pot House',
    text: 'Sun, shade, containers, watering, crop compatibility and balcony production constraints.'
  },
  {
    match: '/projects/gaitanevo-2026/',
    className: 'ew-page-plants',
    image: 'plants.webp',
    kicker: 'Field work',
    title: 'Gaitanevo 2026',
    text: 'Outdoor crop observation, biomass production, soil building and low-input field routines.'
  },
  {
    match: '/projects/gaitanevo-2026/three-year-plan/',
    className: 'ew-page-plants',
    image: 'plants.webp',
    kicker: 'Development plan',
    title: 'Gaitanevo 2026',
    text: 'Three-year direction for outdoor field work, crop comparison and soil-building practice.'
  },
  {
    match: '/projects/gaitanevo-2026/site-assessment/',
    className: 'ew-page-plants',
    image: 'plants.webp',
    kicker: 'Site assessment',
    title: 'Gaitanevo 2026',
    text: 'Field conditions, water access, vegetation, soil cover and practical constraints.'
  },
  {
    match: '/projects/no-maintenance-squash/',
    className: 'ew-page-squash',
    image: 'squash-pits.webp',
    kicker: 'Field trial',
    title: 'No-Maintenance Squash Trial',
    text: 'Scattered squash pits, low-labor production, mulch, moisture retention and production-per-visit data.'
  },
  {
    match: '/projects/no-maintenance-squash/three-year-plan/',
    className: 'ew-page-squash',
    image: 'squash-pits.webp',
    kicker: 'Development plan',
    title: 'No-Maintenance Squash Trial',
    text: 'Three-year path for resilient squash production in scattered low-input pits.'
  },
  {
    match: '/projects/no-maintenance-squash/site-assessment/',
    className: 'ew-page-squash',
    image: 'squash-pits.webp',
    kicker: 'Site assessment',
    title: 'No-Maintenance Squash Trial',
    text: 'Pit placement, moisture retention, mulch availability and wildlife pressure.'
  },
  {
    match: '/experiments/greenhouse-2026/',
    className: 'ew-page-greenhouse',
    image: 'greenhouse-2026.webp',
    kicker: 'Protected cultivation',
    title: 'Greenhouse 2026',
    text: 'Protected growing system with lapad, nettle, amaranth, seed production and biomass cycles.'
  },
  {
    match: '/projects/greenhouse-2026/three-year-plan/',
    className: 'ew-page-greenhouse',
    image: 'greenhouse-2026.webp',
    kicker: 'Development plan',
    title: 'Greenhouse 2026',
    text: 'Three-year direction for protected cultivation, biomass cycling and seed production practice.'
  },
  {
    match: '/projects/greenhouse-2026/site-assessment/',
    className: 'ew-page-greenhouse',
    image: 'greenhouse-2026.webp',
    kicker: 'Site assessment',
    title: 'Greenhouse 2026',
    text: 'Existing vegetation, heat, airflow, water access and protected trial zones.'
  },
  {
    match: '/soil/ecological-processes/',
    className: 'ew-page-soil',
    image: 'soil.webp',
    kicker: 'Soil system',
    title: 'Soil & Ecology',
    text: 'Living soil, roots, fungi, organic matter and ecosystem processes.'
  },
  {
    match: '/soil/soil-improvement-strategy/',
    className: 'ew-page-soil',
    image: 'soil.webp',
    kicker: 'Soil strategy',
    title: 'Soil Improvement',
    text: 'Practical steps for building fertility, structure and biological activity.'
  },
  {
    match: '/plants/plant-profiles/',
    className: 'ew-page-plants',
    image: 'plants.webp',
    kicker: 'Plant knowledge',
    title: 'Plants & Profiles',
    text: 'Crop notes, plant roles, edible parts, resilience and system value.'
  },
  {
    match: '/plants/functional-groups/',
    className: 'ew-page-plants',
    image: 'plants.webp',
    kicker: 'Plant functions',
    title: 'Functional Groups',
    text: 'Organizing crops by ecological and practical role inside the system.'
  },
  {
    match: '/plants/crop-matrix/',
    className: 'ew-page-crop-matrix',
    image: 'crop-matrix.webp',
    kicker: 'Decision support',
    title: 'Crop Matrix',
    text: 'Compare crops by yield, resilience, soil value, storage and risk.'
  },
  {
    match: '/water/',
    className: 'ew-page-water',
    image: 'water.webp',
    kicker: 'Resource systems',
    title: 'Water Systems',
    text: 'Capture, store and deliver water with less waste and less panic.'
  },
  {
    match: '/infrastructure/',
    className: 'ew-page-infrastructure',
    image: 'infrastructure.webp',
    kicker: 'Operations base',
    title: 'Infrastructure',
    text: 'Shelter, storage, tools, water tanks, access paths and practical systems.'
  },
  {
    match: '/automation/',
    className: 'ew-page-automation',
    image: 'monitoring.webp',
    kicker: 'Monitoring',
    title: 'Monitoring & Automation',
    text: 'Sensors, dashboards, irrigation control and field measurements.'
  },
  {
    match: '/journal/',
    className: 'ew-page-journal',
    image: 'journal.webp',
    kicker: 'Field notes',
    title: 'Field Journal',
    text: 'Observations, logs, failures, lessons and field reports.'
  },
  {
    match: '/journal/test-entry/',
    className: 'ew-page-journal',
    image: 'journal.webp',
    kicker: 'Journal entry',
    title: 'Tomato Trial 2026',
    text: 'Vegetative tomato propagation observations from the balcony production system.'
  },
  {
    match: '/knowledge/',
    className: 'ew-page-principles',
    image: 'principles.webp',
    kicker: 'Knowledge base',
    title: 'Source Hierarchy',
    text: 'USDA, JIRCAS, research sources, field evidence and project observations.'
  },
  {
    match: '/knowledge/content-audit/',
    className: 'ew-page-principles',
    image: 'principles.webp',
    kicker: 'Knowledge base',
    title: 'Content Audit',
    text: 'Separating universal knowledge, active projects, journal observations and personal reflection.'
  },
  {
    match: '/zen/',
    className: 'ew-page-zen',
    image: 'zen.webp',
    kicker: 'Personal journal',
    title: 'Zen and the Art of Nomad Farming',
    text: 'Thoughts, images, failures and observations from field work.'
  }
];

function normalizePath(pathname) {
  let path = pathname;
  if (!path.endsWith('/')) path += '/';
  return path;
}

function findHeroConfig(pathname) {
  const path = normalizePath(pathname);
  return EW_PAGE_HEROES.find(hero => path.endsWith(hero.match));
}

function getAssetBaseUrl() {
  const cssLink = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .find(link => link.href.includes('assets/css/page-heroes.css'));

  if (cssLink) {
    return cssLink.href.replace('assets/css/page-heroes.css', 'assets/images/');
  }

  return new URL('assets/images/', document.baseURI).href;
}

function buildHero(config) {
  const hero = document.createElement('section');
  hero.className = `ew-page-hero ${config.className}`;
  hero.setAttribute('aria-label', config.title);

  const imgSrc = `${getAssetBaseUrl()}${config.image}`;

  hero.innerHTML = `
    <img class="ew-page-hero-image" src="${imgSrc}" alt="" aria-hidden="true" loading="eager" decoding="async" width="2560" height="1440" />
    <div class="ew-page-hero-content">
      <p class="ew-page-hero-kicker">${config.kicker}</p>
      <h1>${config.title}</h1>
      <p>${config.text}</p>
    </div>
  `;

  return hero;
}

function injectPageHero() {
  if (document.querySelector('.ew-landing') || document.querySelector('.ew-page-hero')) return;

  const config = findHeroConfig(window.location.pathname);
  if (!config) return;

  const content = document.querySelector('.md-content__inner');
  if (!content) return;

  const firstH1 = content.querySelector('h1');
  const hero = buildHero(config);

  if (firstH1) {
    firstH1.insertAdjacentElement('beforebegin', hero);
  } else {
    content.prepend(hero);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectPageHero);
} else {
  injectPageHero();
}
