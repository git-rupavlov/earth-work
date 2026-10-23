# Monitoring & Automation

Monitoring turns field conditions into usable signals. Automation turns repeated manual work into controlled systems.

The point is not to replace observation. The point is to make observation less random, because guessing soil moisture by vibes is how plants become victims of optimism.

## Focus areas

- soil moisture sensing;
- temperature and humidity monitoring;
- water tank level tracking;
- greenhouse environment monitoring;
- irrigation control;
- simple alerts;
- dashboards and long-term logs;
- low-power sensor nodes.

## Likely hardware

- ESP32 or Raspberry Pi Pico class controllers;
- SHT temperature and humidity sensors;
- BMP/BME pressure and environment sensors;
- soil moisture probes;
- relay or MOSFET irrigation control;
- solar or low-voltage power where useful.

## Design goals

1. Measure before acting.
2. Keep systems simple enough to repair.
3. Prefer local-first data collection.
4. Avoid fragile cloud dependencies for critical tasks.
5. Use automation only where it reduces repetitive work.

## Current documentation links

- [Greenhouse 2026](../experiments/greenhouse-2026.md)
- [Bed Layout 2026](../experiments/bed-layout-2026.md)
- [Water Systems](../water/index.md)
