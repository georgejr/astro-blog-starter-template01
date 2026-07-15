---
title: "Powering a Refrigerator With Solar: The Real Panel Math"
description: "How many solar panels to run a refrigerator? Usually one, sometimes two. Here's the daily-kWh math for grid-tied offset and true off-grid fridge setups."
publishDate: 2026-10-02T08:00:00Z
category: "System Sizing"
tags:
  - appliances
  - refrigerator
  - system sizing
primaryKeyword: "how many solar panels to run a refrigerator"
secondaryKeywords:
  - refrigerator solar power requirements
  - fridge kwh solar panels
relatedCalculators:
  - solar-panel-calculator
relatedArticles:
  - solar-panel-output-per-day
  - what-uses-most-electricity-home
ogStat:
  value: "1–2 panels"
  label: "to offset a typical fridge"
---

A refrigerator is the appliance people most often ask about because it runs around the clock, which feels like it should demand a lot of solar. It does not. A modern fridge is one of the more efficient always-on loads in the house, and the honest answer to how many panels it takes usually lands at one, occasionally two. The math that gets you there is worth doing carefully, because the same steps apply to sizing solar for any appliance.

## Start with the fridge's daily appetite

Everything begins with kilowatt-hours per day, not watts. A refrigerator's compressor cycles on and off, so its nameplate wattage tells you little about daily consumption. What matters is the total energy it draws over 24 hours, and that varies more by age and type than most people expect.

The figures below are representative daily-consumption assumptions, not measurements of any specific unit. Your fridge's actual draw depends on its age, size, ambient temperature, and how often the door opens.

| Refrigerator type | Assumed daily use | Assumed annual use |
| --- | --- | --- |
| Modern efficient full-size | 1.0–1.5 kWh/day | ~365–550 kWh/yr |
| Older full-size (10+ years) | 2.0–3.0 kWh/day | ~730–1,100 kWh/yr |
| Compact / mini fridge | 0.4–0.8 kWh/day | ~150–290 kWh/yr |
| Large or second garage fridge | 2.0–4.0 kWh/day | ~730–1,460 kWh/yr |

The spread is the point. Replacing a fifteen-year-old garage fridge can cut the load in half, which changes the panel answer before you touch the solar side of the equation. If you are not sure where your own appliances land, [the biggest electricity users in a home](/blog/what-uses-most-electricity-home/) puts the fridge in context against everything else on your bill.

## Translating kWh into panels

Once you have a daily kWh figure, the panel count comes from how much a single panel produces where you live. A modern residential panel of roughly 400 watts produces, on an average day, its wattage times your local sun hours times a real-world efficiency factor.

Assume a 400 W panel, 4.5 average daily sun hours, and a 0.80 factor for inverter, wiring, and temperature losses. That panel yields about 400 × 4.5 × 0.80 = 1,440 watt-hours, or roughly 1.4 kWh per day. A modern fridge drawing 1.2 kWh/day is covered by that single panel with a little to spare. An older fridge at 2.5 kWh/day needs closer to two. The per-panel side of this is worked through in more detail in [what one solar panel produces in a day](/blog/solar-panel-output-per-day/).

Two panels, then, comfortably cover almost any single household refrigerator across most of the country. In the cloudy North the same fridge might need the second panel; in the sunny Southwest one panel with margin is common. The [solar panel calculator](/solar-panel-calculator/) lets you plug in your own sun hours and appliance load instead of leaning on these averages.

## Grid-tied is simpler than it sounds

If your home is connected to the grid, "running the fridge on solar" really means offsetting the fridge's annual energy use with panel production over the year. You are not literally powering the compressor from a specific panel at each moment. Your solar feeds the house and the grid during the day, and the fridge draws from the grid at 2 a.m. when the panels are dark. Net metering or your utility's export credit reconciles the two.

That framing matters because it removes the storage problem entirely. A grid-tied home does not need a battery to "keep the fridge running" through the night; the grid does that job, and the panels simply cancel out the energy on your bill. One or two panels' worth of annual production offsets the fridge, and you would never add them in isolation anyway, since they fold into whole-home system sizing.

## Off-grid changes the whole calculation

Take away the grid and the fridge becomes a genuinely harder load, because now you have to power it at night from stored energy. Off-grid fridge sizing is really battery sizing plus enough panel to refill that battery every day.

Two rules of thumb apply. First, size the battery to carry the fridge's full daily draw plus a margin for cloudy days, since the compressor keeps cycling whether the sun is out or not. Second, size the panels to recharge that battery in the available sun hours, which usually means more panel than the grid-tied answer, because you are refilling storage rather than just offsetting a meter. An off-grid fridge that a single panel would "offset" on grid might need two or three panels plus a dedicated battery to run reliably through a stretch of gray weather. Off-grid loads deserve their own full accounting, which [sizing an off-grid system from your load list](/blog/off-grid-solar-system-sizing/) walks through appliance by appliance.

## FAQ

### How many solar panels does it take to run a refrigerator?

For a typical modern full-size refrigerator, one 400 W panel covers it in sunny regions and two provide comfortable margin almost anywhere. An older or oversized fridge can push that to two or three. The exact answer depends on the fridge's daily kWh and your local sun hours.

### Can one solar panel really power a fridge?

On a grid-tied home, one modern panel can offset an efficient refrigerator's annual energy use across much of the country. Off-grid is different: one panel may generate enough total energy, but you also need a battery to bridge the overnight hours when the panel produces nothing.

### Do I need a battery to run my refrigerator on solar?

Only off-grid. A grid-connected home uses the grid as its overnight "battery," so no storage is required to keep the fridge cold. Off-grid setups need a battery sized to carry the fridge's full daily consumption, plus a cushion for cloudy stretches.
