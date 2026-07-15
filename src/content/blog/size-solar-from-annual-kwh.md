---
title: "Turn 12 Months of Bills Into the Right System Size"
description: "How to size a solar system from annual kWh: the exact arithmetic to convert a year of usage into a target kilowatt rating, and why it beats rules of thumb."
publishDate: 2026-11-01T08:00:00Z
category: "System Sizing"
tags:
  - system sizing
  - kwh
  - solar sizing
primaryKeyword: "size solar system from annual kwh"
secondaryKeywords:
  - convert kwh usage to solar system size
  - solar sizing from electric bills
relatedCalculators:
  - solar-panel-size-calculator
  - solar-panel-calculator
ogStat:
  value: "~1,400 kWh"
  label: "annual output per kW installed"
relatedArticles:
  - estimate-annual-kwh-usage
  - what-size-solar-system-do-i-need
  - solar-offset-explained
---

There are two ways to guess how much solar you need and one way to actually know. The guesses — size it by your monthly bill in dollars, or size it by the square footage of your house — are the ones salespeople reach for because they're fast. The knowing comes from a single number sitting on twelve months of your own statements: your annual kilowatt-hours. If you have that figure, the sizing is arithmetic, not estimation, and it takes about five minutes.

The dollar method fails because your bill mixes energy charges with fixed fees, taxes, and tiered rates, so two homes with identical usage can pay very different amounts. The square-footage method fails because a 2,000-square-foot house with a heat pump and an EV can use triple the power of the same house on gas heat. Both are proxies for the thing that matters. Annual kWh *is* the thing.

## Start with the one number that counts

Add up the kilowatt-hours — not the dollars — from twelve consecutive monthly bills. A full year matters because usage swings hard between an air-conditioned July and a mild October, and any single month misleads. If you don't have a clean year of statements, [estimating annual kWh without a full history](/blog/estimate-annual-kwh-usage/) walks through reconstructing it from partial data.

Call that annual total your usage. A common US household lands somewhere in the 10,000–12,000 kWh range, but yours is the only one that counts here. Everything downstream is this number divided by how much a kilowatt of solar produces where you live.

## The production side: what one kW gives you

A kilowatt of installed panels doesn't produce a kilowatt-hour per hour — it produces power only when the sun is up and strong, and even then some is lost to heat, wiring, and inverter conversion. The standard shortcut collapses all of that into peak sun hours and a derate factor:

> Annual kWh per installed kW = peak sun hours per day × 365 × derate

Assume a moderate 4.7 peak sun hours and a 0.82 derate — reasonable middle-of-the-road figures, not a promise for your address. That's 4.7 × 365 × 0.82 ≈ **1,400 kWh per kilowatt per year**. Sunnier Southwest roofs push past 1,700; cloudier or steeply shaded ones fall below 1,200. This single production figure is the hinge the whole calculation turns on, so it's worth pinning down for your location rather than borrowing a national average.

## The sizing formula, then a sanity table

With both numbers in hand, the target system size is one division:

> System size (kW) = annual usage (kWh) ÷ annual production per kW

Assume a home using 11,000 kWh a year in a region yielding 1,400 kWh per kW. The math: 11,000 ÷ 1,400 ≈ 7.9 kW. That's the size that offsets roughly 100% of usage on paper. The table below runs the same arithmetic across a few combinations so you can find your own row:

| Annual usage | Production per kW | Target system size |
| --- | --- | --- |
| 8,000 kWh | 1,200 kWh (cloudier) | ~6.7 kW |
| 8,000 kWh | 1,600 kWh (sunnier) | ~5.0 kW |
| 11,000 kWh | 1,400 kWh (moderate) | ~7.9 kW |
| 14,000 kWh | 1,400 kWh (moderate) | ~10.0 kW |
| 14,000 kWh | 1,700 kWh (Southwest) | ~8.2 kW |

Notice that the same house needs a meaningfully different system depending on its sun — which is exactly why a dollar-based or square-foot rule can't produce the right answer. The [full sizing decision](/blog/what-size-solar-system-do-i-need/) layers in the other factors, but this division is the spine of it.

## Why 100% offset isn't automatically the goal

Sizing for a full 100% offset assumes every exported kilowatt-hour is worth the same as one you consume on the spot. Under full retail net metering that holds, and 100% is a fair target. Where exports pay less than retail — an increasingly common arrangement — the last panels you add earn less than the first ones, and sizing slightly below 100% often pays back faster. What a "100% offset" really does to your bill, credits and all, is unpacked in [solar offset, explained](/blog/solar-offset-explained/).

A few practical adjustments to the raw number:

- **Growing loads.** Planning an EV or a heat pump within a few years? Size for the usage you'll have, not the usage you have, since adding panels later means paying fixed permit and mobilization costs twice.
- **Roof limits.** The arithmetic can hand you a 10 kW target that your usable roof can't physically hold. When area is the binding constraint, the [panel size calculator](/solar-panel-size-calculator/) helps translate a target wattage into a panel count and the square footage it needs.
- **Export rules.** If your utility pays well below retail for surplus, bias the size down toward 80–90% of usage and lean on daytime consumption.

Run your own usage and sun figures through the [solar panel calculator](/solar-panel-calculator/) to confirm the hand arithmetic and see the production spread across the seasons. The formula gets you a defensible target in five minutes; the calculator and a real quote refine it. Either way, you're now negotiating from a number you derived, not one a salesperson picked for you.
