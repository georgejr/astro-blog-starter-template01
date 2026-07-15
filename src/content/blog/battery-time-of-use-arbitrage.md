---
title: "Charging Cheap, Discharging Smart: Off-Peak Battery Arbitrage"
description: "Battery time of use arbitrage means charging on cheap off-peak power and discharging during expensive peaks. The spread math, round-trip losses, and when it pays."
publishDate: 2026-10-29T16:00:00Z
category: "Batteries & Storage"
tags:
  - batteries
  - time-of-use
  - arbitrage
primaryKeyword: "battery time of use arbitrage"
secondaryKeywords:
  - charge battery off peak rates
  - tou rate battery strategy
relatedCalculators:
  - solar-battery-calculator
  - solar-roi-calculator
relatedArticles:
  - time-of-use-rates-solar
  - solar-battery-operating-modes
  - battery-round-trip-efficiency
---

A home battery is usually sold as a place to stash your afternoon solar for the evening. But if your utility charges different prices at different hours, the battery can do something a trader would recognize: buy energy when it's cheap, hold it, and use it when the same energy would cost several times as much. You never sell anything back — you simply avoid buying at the painful rate by spending what you stored at the gentle one. That maneuver is battery time-of-use arbitrage, and whether it's worth doing comes down to a spread, a loss, and a bit of wear.

## The idea: buy low, avoid buying high

Time-of-use rates split the day into pricing windows. Overnight and midday tend to be cheap; the late-afternoon-into-evening stretch, when everyone gets home and demand spikes, is expensive — sometimes dramatically so. A battery lets you decouple *when you buy* power from *when you use* it. Charge the battery from the grid during a cheap window, then discharge it to run your house through the expensive one, and every kilowatt-hour you pull from the battery during peak is a kilowatt-hour you didn't buy at the peak price.

Note what's different from the usual solar story. Solar self-consumption stores *your own free generation*. Arbitrage stores *cheap purchased grid power*. The two can run on the same battery on the same day — solar fills it when the sun's out, the grid tops it off overnight — but the arbitrage case stands on its own even for a battery with no solar attached, as long as the rate spread is wide enough. The distinction between these operating strategies is laid out in [battery operating modes decoded](/blog/solar-battery-operating-modes/).

## Where the round-trip loss eats the spread

Here's the catch that turns a clean idea into an arithmetic problem: a battery doesn't give back everything you put in. Pushing energy in and pulling it out both cost a little, lost as heat in the conversion. Round-trip efficiency — energy out divided by energy in — typically runs around 90% for a modern home battery, so 10 kWh in yields about 9 kWh out. That missing tenth means you have to *buy more* cheap kilowatt-hours than you'll actually avoid buying at peak, which shrinks the gross spread into a smaller net one. The full mechanics of that loss, and why it hides in the spec sheet, are in [round-trip efficiency](/blog/battery-round-trip-efficiency/).

The rule that falls out: arbitrage only makes sense when the price gap between cheap and expensive hours is wide enough to survive the round-trip haircut and still leave a worthwhile margin. A narrow spread gets eaten by losses and isn't worth the battery wear.

## Running a full cycle, with numbers

Work an illustrative cycle, every figure an assumption you'd replace with your own tariff.

| Window | Assumed rate | Battery action |
| --- | --- | --- |
| Off-peak (overnight) | $0.12 / kWh | Charge |
| Peak (4–9 p.m.) | $0.45 / kWh | Discharge |

The gross spread is $0.33 per kWh. Now apply the 90% round-trip efficiency. To deliver 9 kWh during peak, you charged 10 kWh overnight at $0.12, spending $1.20. Those 9 kWh displace peak power worth 9 × $0.45 = $4.05. Net gain for the cycle: $4.05 − $1.20 = $2.85, or about $0.32 saved per kWh delivered. Run that most days of the year on a battery cycling roughly 10 kWh, and it adds up to real money — several hundred dollars annually under these placeholder rates.

Now shrink the spread to test the rule. If off-peak were $0.18 and peak $0.28, the gross gap is $0.10. Charging 10 kWh costs $1.80 to deliver 9 kWh worth $2.52 — a net of $0.72, barely $0.08 per delivered kWh. That thin margin may not justify the extra daily cycle. The [solar battery calculator](/solar-battery-calculator/) lets you drop your own peak and off-peak rates in and see which side of that line you fall on, and the [solar ROI calculator](/solar-roi-calculator/) folds the result into the system's overall return.

## When arbitrage should give way to storing solar

If you have solar, the battery can't be in two places at once, and its most valuable job usually isn't grid arbitrage — it's holding your own free solar for the evening peak, which avoids peak power at *zero* input cost instead of the off-peak rate. On a sunny day, filling the battery from panels beats filling it from the grid every time. Arbitrage earns its place on the days and in the seasons when solar can't fill the battery: cloudy stretches, short winter days, or a home whose evening load outruns what the panels banked. Many systems handle this automatically, prioritizing solar and only reaching for cheap grid power when the sun falls short — the coordination logic covered in [time-of-use rates and solar](/blog/time-of-use-rates-solar/).

## The wear-and-tear footnote

Every arbitrage cycle is a charge and discharge the battery wouldn't otherwise perform, and batteries wear by cycles. Cycling hard every single day to chase a thin spread trades warranty life for marginal savings — a bad deal if the spread is small. When the gap is wide, the savings comfortably outrun the incremental wear and arbitrage is clearly worth it; when it's narrow, you may be spending battery life to earn pennies. The honest version of the strategy weighs the daily gain against the cost of a cycle, and only runs the play when the spread makes the trade lopsided in your favor.
