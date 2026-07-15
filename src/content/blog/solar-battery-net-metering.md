---
title: "How Batteries Change the Net Metering Math"
description: "When a solar battery and net metering compete: why storing power beats exporting it under net billing, but rarely pays under full retail net metering."
publishDate: 2026-11-03T08:00:00Z
category: "Batteries & Storage"
tags:
  - batteries
  - net metering
  - self consumption
primaryKeyword: "solar battery and net metering"
secondaryKeywords:
  - net metering with battery storage
  - self consumption vs net metering
relatedCalculators:
  - solar-battery-calculator
  - solar-roi-calculator
relatedArticles:
  - net-billing-vs-net-metering
  - solar-export-rates
  - solar-battery-payback-impact
---

A home battery and the grid do the same job for your solar system: they both soak up surplus power at midday and give it back after sunset. The battery does it in your garage; the grid does it through net metering. So the real question a battery poses isn't "storage or no storage" — it's "should I store my surplus in a box I bought, or in the grid I'm already connected to?" And the answer flips entirely depending on how your utility credits the power you send back.

Under one compensation structure the grid is a nearly perfect, free battery, and buying a physical one to do the same thing is hard to justify on economics alone. Under another, the grid pays you pennies for surplus it later sells back to you at full price — and suddenly keeping your own energy makes obvious sense. Everything below is about telling those two situations apart.

## The grid as a battery: full retail net metering

Classic net metering treats an exported kilowatt-hour and an imported one as equal. Send 1 kWh to the grid at noon, pull 1 kWh back at 8 p.m., and the meter nets them to zero. In effect the grid stores your surplus at a one-to-one ratio, charges you nothing to do it, and never wears out. A physical battery can't beat those terms on economics — it costs thousands, loses a slice of energy on every charge-discharge cycle, and degrades over years. If your only goal is bill savings and you have true retail net metering, a battery is competing against a free, lossless, infinite store.

That's why, under full net metering, batteries get bought for reasons other than the energy arithmetic: backup power when the grid goes down, resilience in outage-prone areas, or the simple wish to keep the lights on independent of the utility. Those are legitimate motivations — they're just not the bill-savings case, and it's worth being honest about which one is driving the purchase. What a battery does to the payback figure specifically is worked through in [adding a battery and your solar payback](/blog/solar-battery-payback-impact/).

## When exporting pays less than importing

The picture inverts the moment your utility credits exports below the retail rate — the net-billing and inflow-outflow structures that are steadily replacing classic net metering. Now there's a spread between what you're paid for surplus and what you pay to buy power back, and that spread is exactly what a battery captures.

Consider the flow. Your panels produce a surplus kilowatt-hour at midday. You can export it for an export credit, or store it and use it that evening instead of buying a kilowatt-hour at retail. Storing it is worth the retail rate you avoid; exporting it is worth only the export credit. The difference between those two numbers — before accounting for the battery's round-trip losses — is the value the battery earns on every cycle. The wider the gap, the faster storage pays. The mechanics of that gap are the whole subject of [net billing vs. net metering](/blog/net-billing-vs-net-metering/), and the specific figures your utility uses are its [export rates](/blog/solar-export-rates/).

### A side-by-side on one surplus kilowatt-hour

The table follows a single exported-then-reimported kWh under three common compensation regimes, using labeled assumptions: a $0.17 retail rate, and a battery that returns about 90% of what it stores.

| Compensation structure | Value of exporting 1 kWh | Value of storing then using it | Battery advantage |
| --- | --- | --- | --- |
| Full retail net metering | $0.17 credit | ~$0.153 (after storage loss) | None — export wins |
| Net billing at $0.08 export | $0.08 credit | ~$0.153 | ~$0.073 per kWh |
| Minimal export credit ($0.03) | $0.03 credit | ~$0.153 | ~$0.123 per kWh |

Read across the rows and the logic is stark. When exports pay full retail, the small round-trip loss means storing actually loses a little versus exporting. When exports pay a fraction of retail, every stored kilowatt-hour is worth roughly the retail rate you dodge, and the battery earns the spread. The battery's economic case is essentially a bet on that spread being wide and staying wide.

## What self-consumption actually looks like

"Self-consumption" is the name for using your own generation rather than exporting it, and a battery is the tool that maximizes it. Without storage, your self-consumption is capped at whatever the house happens to be using while the sun shines — often less than half of what the panels make on a mild, low-usage day. The rest exports whether you like it or not.

A battery lets you keep that midday surplus and spend it in the evening peak, when both your usage and, frequently, your rates are highest. Under time-of-use pricing this compounds: you're not just avoiding a retail import, you're avoiding a *peak* import, which can be the priciest power of the day. Three factors govern how much a battery can shift:

- **The size of your daily surplus.** A system sized close to your usage exports little, leaving the battery less to work with. A system that overproduces gives it more to capture.
- **Round-trip efficiency.** Every battery loses some energy converting and storing — commonly around 10%. That loss is why storing never quite equals a full-retail export, and it's baked into the numbers above.
- **Usable capacity and depth of discharge.** A battery you can only cycle partway holds less useful energy than its nameplate suggests, which shapes how much of your evening it can actually cover.

## Deciding for your own bill

The decision reduces to two questions asked in order. First: does your utility still offer full retail net metering, or has it moved to a lower export credit? If it's full net metering, the grid is already the best battery you'll ever own for pure savings, and a physical battery has to justify itself on backup and resilience instead. If exports pay less than retail, the spread between your import and export rates is the yardstick — the wider it is, the stronger the storage case.

Second: how much surplus do you actually generate to store, and how much of your usage lands after dark when the battery would discharge? A battery only earns its keep on energy it can capture and later displace. Run your own surplus, rates, and export credit through the [solar battery calculator](/solar-battery-calculator/) to see how many cycles a battery would actually complete, and the [solar ROI calculator](/solar-roi-calculator/) to fold that into a payback. The battery-versus-grid question has a clean answer once you know which side of the net-metering line your utility sits on — it just isn't the same answer for everyone.
