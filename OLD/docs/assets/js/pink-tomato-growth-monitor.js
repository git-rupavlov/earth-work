function applyPinkTomatoGrowthPhases() {
  if (typeof EW_PLANT_MONITOR_ASSETS === 'undefined') return;

  const asset = EW_PLANT_MONITOR_ASSETS.find(item => item.assetId === 'solanum_lycopersicum_pink_dream');
  if (!asset) return;

  asset.logs = [
    '2026-05-12 | Day of planting | height trend = 10 cm | sprout stage',
    '2026-05-13 - 2026-05-22 | establishment phase | growth rate ≈ 0.5 cm/day | height trend = 15 cm',
    '2026-05-23 - 2026-06-05 | vegetative acceleration | growth rate ≈ 1.5 cm/day | height trend = 36 cm',
    '2026-06-06 - 2026-06-19 | rapid vegetative growth | growth rate ≈ 2.1 cm/day | current height trend = 65 cm',
    '2026-06-17 07:00 | cloudy, 19°C | pruning and propagation event',
    '2026-06-17 07:05 | side shoot #1 | direct soil propagation started',
    '2026-06-17 07:10 | side shoot #2 | water rooting propagation started'
  ];

  asset.chartData = [
    { label: 'May 12', value: 10, metric: 'height_cm', instance: 'pink_dream_group' },
    { label: 'May 22', value: 15, metric: 'height_cm', instance: 'pink_dream_group' },
    { label: 'Jun 05', value: 36, metric: 'height_cm', instance: 'pink_dream_group' },
    { label: 'Jun 19', value: 65, metric: 'height_cm', instance: 'pink_dream_group' }
  ];

  asset.metrics = Array.from(new Set([
    ...asset.metrics,
    'growth_rate_cm_per_day',
    'height_trend_cm',
    'growth_phase'
  ]));
}

applyPinkTomatoGrowthPhases();
