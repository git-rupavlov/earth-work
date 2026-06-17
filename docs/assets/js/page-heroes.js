const EW_PAGE_HEROES = [
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
    match: '/sprout-lab/',
    className: 'ew-page-sprout-lab',
    image: 'sprout-lab.webp',
    kicker: 'Indoor production lab',
    title: 'Sprout Lab',
    text: 'Kълнове, микрозеленчуци, разсад, тестове за кълняемост и оптимизация на процеси.'
  },
  {
    match: '/experiments/greenhouse-2026/',
    className: 'ew-page-experiments',
    image: 'experiments.webp',
    kicker: 'Living laboratory',
    title: 'Greenhouse 2026',
    text: 'Controlled trials, seedlings, sensors and indoor/outdoor experiments.'
  },
  {
    match: '/experiments/bed-layout-2026/',
    className: 'ew-page-experiments',
    image: 'experiments.webp',
    kicker: 'Field layout',
    title: 'Bed Layout 2026',
    text: 'Planting layout, zones, access, crop placement and trial structure.'
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
    match: '/project/three-year-plan/',
    className: 'ew-page-plan',
    image: 'plan.webp',
    kicker: 'Roadmap',
    title: '3-Year Plan',
    text: 'Foundations, systems, scaling and long-term project development.'
  },
  {
    match: '/project/overview/',
    className: 'ew-page-principles',
    image: 'principles.webp',
    kicker: 'Project principles',
    title: 'Project Overview',
    text: 'The purpose, principles and direction of NoMad\'s Farm.'
  },
  {
    match: '/project/site-assessment/',
    className: 'ew-page-infrastructure',
    image: 'infrastructure.webp',
    kicker: 'Site context',
    title: 'Site Assessment',
    text: 'Land, access, constraints, infrastructure and practical conditions.'
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
    <img class="ew-page-hero-image" src="${imgSrc}" alt="" aria-hidden="true" loading="eager" decoding="async" />
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
