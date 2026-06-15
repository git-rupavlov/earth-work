const EW_PAGE_HEROES = [
  {
    match: '/soil/ecological-processes/',
    className: 'ew-page-soil',
    kicker: 'Soil system',
    title: 'Soil & Ecology',
    text: 'Living soil, roots, fungi, organic matter and ecosystem processes.'
  },
  {
    match: '/soil/soil-improvement-strategy/',
    className: 'ew-page-soil',
    kicker: 'Soil strategy',
    title: 'Soil Improvement',
    text: 'Practical steps for building fertility, structure and biological activity.'
  },
  {
    match: '/plants/plant-profiles/',
    className: 'ew-page-plants',
    kicker: 'Plant knowledge',
    title: 'Plants & Profiles',
    text: 'Crop notes, plant roles, edible parts, resilience and system value.'
  },
  {
    match: '/plants/functional-groups/',
    className: 'ew-page-plants',
    kicker: 'Plant functions',
    title: 'Functional Groups',
    text: 'Organizing crops by ecological and practical role inside the system.'
  },
  {
    match: '/plants/crop-matrix/',
    className: 'ew-page-crop-matrix',
    kicker: 'Decision support',
    title: 'Crop Matrix',
    text: 'Compare crops by yield, resilience, soil value, storage and risk.'
  },
  {
    match: '/water/',
    className: 'ew-page-water',
    kicker: 'Resource systems',
    title: 'Water Systems',
    text: 'Capture, store and deliver water with less waste and less panic.'
  },
  {
    match: '/infrastructure/',
    className: 'ew-page-infrastructure',
    kicker: 'Operations base',
    title: 'Infrastructure',
    text: 'Shelter, storage, tools, water tanks, access paths and practical systems.'
  },
  {
    match: '/automation/',
    className: 'ew-page-automation',
    kicker: 'Monitoring',
    title: 'Monitoring & Automation',
    text: 'Sensors, dashboards, irrigation control and field measurements.'
  },
  {
    match: '/experiments/greenhouse-2026/',
    className: 'ew-page-experiments',
    kicker: 'Living laboratory',
    title: 'Greenhouse 2026',
    text: 'Controlled trials, seedlings, sensors and indoor/outdoor experiments.'
  },
  {
    match: '/experiments/bed-layout-2026/',
    className: 'ew-page-experiments',
    kicker: 'Field layout',
    title: 'Bed Layout 2026',
    text: 'Planting layout, zones, access, crop placement and trial structure.'
  },
  {
    match: '/journal/',
    className: 'ew-page-journal',
    kicker: 'Field notes',
    title: 'Field Journal',
    text: 'Observations, logs, failures, lessons and field reports.'
  },
  {
    match: '/project/three-year-plan/',
    className: 'ew-page-plan',
    kicker: 'Roadmap',
    title: '3-Year Plan',
    text: 'Foundations, systems, scaling and long-term project development.'
  },
  {
    match: '/project/overview/',
    className: 'ew-page-principles',
    kicker: 'Project principles',
    title: 'Project Overview',
    text: 'The purpose, principles and direction of the Earth Work project.'
  },
  {
    match: '/project/site-assessment/',
    className: 'ew-page-infrastructure',
    kicker: 'Site context',
    title: 'Site Assessment',
    text: 'Land, access, constraints, infrastructure and practical conditions.'
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

function buildHero(config) {
  const hero = document.createElement('section');
  hero.className = `ew-page-hero ${config.className}`;
  hero.setAttribute('aria-label', config.title);

  hero.innerHTML = `
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
