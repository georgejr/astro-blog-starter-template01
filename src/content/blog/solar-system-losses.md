---
title: "Why Your 8 kW System Never Actually Produces 8 kW"
description: "Solar system losses explained: the stack of derate factors — temperature, inverter, soiling, wiring — that separates nameplate capacity from the power your meter actually sees."
publishDate: 2026-12-07T16:00:00Z
category: "System Sizing"
tags:
  - system losses
  - derate factors
  - production
primaryKeyword: "solar system losses explained"
secondaryKeywords:
  - solar derate factors
  - nameplate vs real solar output
relatedCalculators:
  - solar-panel-calculator
  - solar-panel-size-calculator
relatedArticles:
  - solar-panel-wattage-explained
  - solar-production-per-kw
  - inverter-clipping
ogStat:
  value: "~14%"
  label: "typical total system losses"
---

An 8 kW solar system will, on its very best day, produce something less than 8 kW — and on an average day, meaningfully less than that. This surprises people who reasonably assume that "8 kW" is what they are buying. It is not a defect or a bad install. The nameplate number describes the panels under idealized laboratory conditions that your roof will essentially never reproduce, and the gap between that lab figure and your delivered power is not one loss but a stack of small ones, each shaving off a few percent. Understanding the stack is what lets you read a production estimate critically instead of feeling shortchanged by it.

## What the nameplate number actually means

The wattage stamped on a panel is measured under Standard Test Conditions: a specific bright irradiance, a cell temperature of 25°C, and a clean panel facing the light squarely. Add up the panels' ratings and you get the system's nameplate DC capacity — the 8 kW in the brochure. It is an honest number, but it is a *rating*, not a promise about your roof, the same way a car's top speed is not its commute average. Understanding [what a panel's wattage rating measures](/blog/solar-panel-wattage-explained/) is the foundation for seeing why real output falls short of it.

Two structural facts push delivered power below nameplate before you even reach the smaller losses. Your panels rarely see full test-condition sunlight, and when they do, they are usually hotter than 25°C — a sunny roof at midday runs far warmer than lab temperature, and panels lose a fraction of a percent of output for every degree above it. Heat, not clouds, is the reason a scorching July afternoon can underperform a crisp, bright spring one.

## The loss stack, layer by layer

Beyond temperature, a series of real-world factors each take a modest cut. Industry modeling tools bundle these into a single "system losses" figure, and the common default lands around 14% — meaning a well-designed system delivers roughly 86% of what its nameplate and raw sunlight would suggest. The exact figure varies with your site and equipment, but the components are consistent:

| Loss factor | Typical rough share | What causes it |
|---|---|---|
| Inverter efficiency | 2–4% | Converting DC to AC is never perfectly lossless |
| Temperature | varies, often 5–10% | Panels running hotter than 25°C on a sunny roof |
| Soiling | 1–5% | Dust, pollen, and grime between rains |
| DC and AC wiring | 2–3% | Resistance in the cables carrying the power |
| Mismatch | 1–2% | Panels never perform identically to one another |
| Shading | 0–20%+ | Trees, chimneys, and obstructions blocking light |
| Connections and availability | 1–3% | Contact resistance, plus rare downtime |

The percentages are illustrative rather than measured for any specific system, and they do not simply add — they compound, each acting on what the previous one left. But the picture is clear: no single villain, just a dozen small taxes that together move an 8 kW nameplate toward something like 6.9 kW of realistic peak AC output on a good day, and an annual energy total governed by all of it plus your local sunlight.

## The two losses worth arguing about

Most of the stack is fixed physics you cannot negotiate. Two entries, though, are design choices worth understanding because they behave differently from the rest.

### Shading is the one that can dwarf everything

Notice the range on the shading row: zero to more than 20%. Every other loss is a few percent; shading alone can exceed the entire rest of the stack combined. It is also the one most within your control at the design stage — through panel placement, tree trimming, and the choice of panel-level electronics that keep one shaded panel from dragging down its neighbors. A production estimate built on a roof with unaddressed afternoon shade is optimistic in a way no temperature or wiring assumption can rescue.

### Inverter clipping looks like a loss but often is not

Systems are frequently designed with more panel capacity than the inverter can pass through at once, so on the brightest moments of the sunniest days the inverter "clips" the peak. On a production graph this looks like lost energy, and it is — but it is usually a *good* trade, because a right-sized inverter costs less and captures more energy across all the ordinary hours than a larger one would return at a handful of peak moments. This is why [inverter clipping is often fine](/blog/inverter-clipping/) rather than a problem to eliminate. It is the rare "loss" that a smart designer chooses on purpose.

## What this means when you read a proposal

The practical upshot is not that solar underdelivers. It is that any *honest* proposal has already priced these losses in — the production estimate you are handed should reflect delivered AC energy, losses and all, not a nameplate fantasy. That is exactly why installers quote annual kWh production rather than just system size, and why the useful yardstick for comparing systems is [kWh produced per kW of capacity](/blog/solar-production-per-kw/), which folds the whole loss stack into one number you can check against your climate.

So when you compare two 8 kW quotes and one projects noticeably higher annual production, the difference is not magic — it is assumptions about this stack: less shading, a cooler-running layout, cleaner wiring design, a different inverter ratio. Ask which loss they trimmed and why. To pressure-test the numbers yourself, the [solar panel calculator](/solar-panel-calculator/) applies realistic losses to your location and system size, and the [panel size calculator](/solar-panel-size-calculator/) helps you see how much nameplate capacity your roof actually needs to hit a given delivered target. The 8 kW on the label was never the point. The kilowatt-hours that reach your meter are.
