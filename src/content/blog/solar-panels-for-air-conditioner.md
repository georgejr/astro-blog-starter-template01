---
title: "Sizing Solar for Central Air Conditioning"
description: "How many solar panels to run an air conditioner? Convert your AC's size into kilowatts and cooling-season kWh, then into a panel count, with worked assumptions."
publishDate: 2026-10-12T16:00:00Z
category: "System Sizing"
tags:
  - cooling
  - system sizing
  - summer
primaryKeyword: "how many solar panels to run an air conditioner"
secondaryKeywords:
  - solar sizing for central ac
  - air conditioner solar power needs
relatedCalculators:
  - how-many-solar-panels-do-i-need
  - solar-panel-size-calculator
relatedArticles:
  - air-conditioner-electricity-usage
  - what-size-solar-system-do-i-need
  - can-battery-run-air-conditioner
ogStat:
  value: "6–10 panels"
  label: "to cover central AC in summer"
---

A central air conditioner is, electrically, one big motor. The compressor pumps refrigerant, and pumping refrigerant takes power — a lot of it, concentrated in the months you're already producing the most solar. That overlap is convenient, but "how many panels to run the AC" hides two different questions inside it. One is about power: can your array supply the compressor's draw at the moment it kicks on? The other is about energy: how many panels does it take to offset a whole summer of cooling? They have different answers, and confusing them is where sizing goes wrong.

## From tons to kilowatts to kilowatt-hours

Cooling capacity is measured in tons or BTUs — one ton equals 12,000 BTU per hour of heat removal. That's the cooling the unit delivers, not the electricity it consumes. The electrical draw depends on efficiency, rated as SEER or EER: a higher number means more cooling per watt.

### The instantaneous draw

As a planning assumption, a modern central unit pulls somewhere around 1 kilowatt of electricity per ton while the compressor is running. So a 3-ton system draws roughly 3 kW when it's actively cooling, plus a few hundred watts for the air handler's blower. That's the number that matters for the power question. A 6 kW array at midday, producing near its rating in full sun, covers a 3 kW compressor with room to spare — so on a sunny afternoon, a modestly sized system runs the AC directly and sends the leftover to the grid or your home. The compressor's startup surge is brief and, on a grid-tied system, drawn seamlessly from the grid, so it rarely dictates panel count.

### The seasonal energy

Panel count is really set by energy, not power, because your AC doesn't run continuously — it cycles on and off to hold a temperature. Over a cooling season it might average only a handful of full-power hours a day, but across weeks that adds up. How much depends on your climate, house, and thermostat far more than on the nameplate: the same 3-ton unit uses a fraction as much in a mild coastal summer as in a Phoenix August. [Air conditioning and your kWh](/blog/air-conditioner-electricity-usage/) breaks down what actually drives that seasonal total.

## A panel count you can actually use

To turn cooling load into panels, offset the cooling season's kilowatt-hours the same way you'd offset any other load: divide the annual cooling kWh by what one panel produces in a year. As a planning assumption, a 420 W panel in a sunny region produces very roughly 500–600 kWh per year after real-world losses. The table below pairs assumption-based cooling-season usage with the panels needed to cover it.

| AC size | Running draw (approx) | Cooling-season use (assumption) | Panels to offset |
| --- | --- | --- | --- |
| 2 ton | ~2 kW | ~1,500–2,500 kWh | 3–5 |
| 3 ton | ~3 kW | ~2,500–4,000 kWh | 5–8 |
| 4 ton | ~4 kW | ~3,500–5,500 kWh | 7–10 |

For a typical central system working through a hot-climate summer, that lands at roughly 6–10 panels of added capacity dedicated to the cooling load. Treat it as a starting estimate, not a spec: a well-insulated house with a high-SEER unit sits at the low end, while a leaky house cooled to 68°F sits above the table entirely. Because your own usage swings so widely, size against your bills, not the chart — the [how many solar panels do I need](/how-many-solar-panels-do-i-need/) calculator applies your region's sun hours to your real numbers.

## Why timing makes the AC an unusually good fit for solar

Most household loads are scattered across the day, but air conditioning peaks precisely when the sun is highest — hot, sunny afternoons. That alignment means a large share of your AC's electricity can be consumed directly from your own panels as it's produced, rather than bought from the grid or exported at a discount. Cooling load is one of the few big residential loads that naturally self-consumes solar, which is part of why solar and AC pencil out well together in hot states.

The alignment isn't perfect. Cooling often lingers into the evening as the house sheds the day's heat, after production has dropped off. Those evening kilowatt-hours come from the grid on a standard system, or from a battery if you have one. Whether storage is worth it just to keep the AC running through a summer evening or an outage is its own calculation — [can a home battery run your air conditioner](/blog/can-battery-run-air-conditioner/) works through the power and duration math, which is stricter than the offset math here.

## Sizing the AC into the whole system, not beside it

The cleanest way to handle cooling is not to size a separate "AC array." It's to make sure your annual usage figure — the one you size the entire system from — already includes a full year of summer bills. If it does, the cooling load is baked in, and no extra step is needed. The panel counts above are useful mainly for a specific case: you're adding central air the house didn't have before, or replacing a window unit with central cooling, and you want to size solar for a load that isn't yet in your billing history.

In that situation, estimate the added cooling kWh, add it to your current annual usage, and size once against the new total. Buying the capacity while the crew is already installing is far cheaper than adding panels later for a load you could have seen coming. The full method — annual kWh, sun hours, losses, and roof reality — is laid out in [what size solar system do you need](/blog/what-size-solar-system-do-i-need/), and it absorbs the air conditioner without treating it as a special case. When you're ready to check whether the extra panels physically fit, the [solar panel size calculator](/solar-panel-size-calculator/) translates the added capacity into roof area.
