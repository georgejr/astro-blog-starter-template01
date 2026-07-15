---
title: "Will a Battery Actually Save You Money on Time-of-Use Rates?"
description: "The real breakeven math on home battery arbitrage: whether the peak-to-off-peak price spread on a time-of-use rate covers the cost of cycling a battery every day."
publishDate: 2027-01-05T08:00:00Z
category: "Batteries & Storage"
tags:
  - batteries
  - time-of-use
  - arbitrage
primaryKeyword: "will a battery save money on time-of-use rates"
secondaryKeywords:
  - battery peak off-peak price spread
  - time of use battery breakeven
  - battery rate arbitrage math
relatedCalculators:
  - solar-battery-calculator
  - electricity-bill-calculator
relatedArticles:
  - time-of-use-rates-solar
  - battery-round-trip-efficiency
  - solar-battery-operating-modes
ogStat:
  value: "~$0.30/kWh"
  label: "Spread that starts to justify cycling"
---

There's a tidy story people tell themselves about home batteries and time-of-use rates: charge the battery when power is cheap, discharge it when power is expensive, pocket the difference, and let the thing pay for itself. It sounds like a savings account that fills up every afternoon. The trouble is that the story leaves out the two numbers that decide whether it's true — how big the price gap between peak and off-peak actually is, and how much it costs you to move a kilowatt-hour through the battery in the first place. Once you put real figures on those two things, battery arbitrage on a time-of-use plan turns out to be a genuinely good deal in a few situations and a money-loser dressed up as a strategy in a lot of others. The math isn't hard, but it's unforgiving, and it's worth doing before you spend five figures on storage in the hope that the rate spread will bail you out.

## The spread has to beat the cost of a round trip

Every kilowatt-hour you cycle through a battery costs you something, and that cost is the hurdle any arbitrage has to clear. Two things eat into the spread. The first is round-trip efficiency: a battery doesn't give back everything you put in. A lithium home battery typically returns somewhere around 85 to 90% of the energy used to charge it, with the rest lost as heat in the cells and the inverter. That means to get one usable kilowatt-hour out at peak, you have to buy roughly 1.1 to 1.18 kilowatt-hours at the off-peak rate. The efficiency loss is small but it's real, and it nibbles at the top of your spread before you've earned a cent. The mechanics of that loss, and why the number on the spec sheet isn't the number you actually get, are laid out in [round-trip efficiency](/blog/battery-round-trip-efficiency/), and it's the first subtraction in any honest arbitrage calculation.

The second and larger cost is wear. A battery has a finite number of cycles in it before its capacity fades to the point of replacement, and every arbitrage cycle spends one of them. This is the cost people conveniently forget. If a battery costs, say, $12,000 installed and its warranty or realistic life is around 6,000 full cycles, then each full cycle "costs" roughly $2 in hardware amortization — spread across the usable kilowatt-hours you move, that's real money per kWh. The exact figure depends on the battery's price, its usable capacity, and its cycle life, but the point stands: cycling a battery daily for arbitrage is not free, because you are steadily consuming an expensive asset that has to be replaced someday. Any savings pitch that compares only the peak rate to the off-peak rate, and ignores the amortized cost of the wear you're inflicting, is selling you an incomplete number.

Put those together and you get a rule of thumb worth carrying into any battery conversation. To break even on pure arbitrage, the peak-to-off-peak price spread has to exceed the sum of your efficiency loss and your per-kWh wear cost. As a rough gate, spreads below about $0.20 per kilowatt-hour rarely justify cycling a battery for money alone, spreads around $0.30 start to make the case, and spreads north of $0.40 to $0.50 — the kind you see on some aggressive time-of-use plans in high-cost regions — can genuinely work. The precise threshold moves with your battery's cost and cycle life, but if the gap between your cheap hours and your expensive hours is only a dime or fifteen cents, the battery will almost certainly wear out faster than it saves, and you'd have been better off leaving the money in a boring index fund. The way time-of-use rates interact with solar and storage more broadly is worth understanding first, and it's covered in [time-of-use rates and solar](/blog/time-of-use-rates-solar/).

## A worked example, with the assumptions on the table

Numbers make this concrete, so consider a plausible household. Assume a time-of-use plan with a peak rate of $0.42 per kilowatt-hour in the late afternoon and evening, and an off-peak rate of $0.14 overnight — a spread of $0.28. Assume a battery with 10 kilowatt-hours of usable capacity, 90% round-trip efficiency, an installed cost of $11,000, and a realistic life of 5,000 cycles before meaningful capacity loss. And assume you can reliably fill it every night off-peak and empty it every peak period — a best case that ignores the days you can't, which we'll come back to.

Start with the gross benefit of one cycle. Discharging 10 kWh during peak avoids buying 10 kWh at $0.42, worth $4.20. But charging that 10 kWh of usable energy at 90% efficiency means buying about 11.1 kWh off-peak at $0.14, costing $1.55. So the gross arbitrage gain per cycle is $4.20 minus $1.55, or $2.65. That looks encouraging until you subtract wear. The battery cost $11,000 for 5,000 cycles, so each full cycle amortizes about $2.20 of hardware. Net of wear, the cycle nets $2.65 minus $2.20, or about $0.45. Do that every day for a year and you've saved roughly $164 — on an $11,000 asset. The arbitrage is technically positive, but it's earning you well under 2% a year on the money, and that's before you account for the days the battery sits half-used because you didn't have a full peak load to discharge into.

The table below shows how sensitive that result is to the one number that matters most — the spread — holding the same 10 kWh battery, 90% efficiency, and $2.20-per-cycle wear cost:

| Peak rate | Off-peak rate | Spread | Net per cycle (after efficiency + wear) | Annual (365 cycles) |
|---|---|---|---|---|
| $0.30 | $0.14 | $0.16 | about −$0.65 | about −$237 |
| $0.42 | $0.14 | $0.28 | about $0.45 | about $164 |
| $0.55 | $0.13 | $0.42 | about $2.05 | about $748 |

The lesson jumps out. At a $0.16 spread, this battery loses money every single day it cycles — you're spending $2.20 of battery life to capture less than that in rate savings. At $0.28 it barely clears the bar. Only at a genuinely wide spread does arbitrage produce the kind of return that would make a financial planner nod. And notice what's driving the swing: it's almost entirely the peak rate, because the wear cost is fixed and the efficiency loss is small. Your utility's rate design, not your battery's cleverness, decides whether this works. Before you trust any of these figures, model your own plan's actual peak and off-peak rates in the [electricity bill calculator](/electricity-bill-calculator/) so you're working from your real spread rather than the illustrative one here — and remember that every assumption above is a stated assumption, not a promise. Cheaper batteries, longer cycle lives, or wider spreads all move the answer in your favor; the reverse moves it against you fast.

## When storage still makes sense — and it often does

If pure arbitrage on a modest spread barely breaks even, why do so many households add batteries anyway? Because saving money on the rate spread is usually not the main reason a battery earns its keep, and treating it as the only reason sets up a disappointing verdict. The clearest value most owners get is backup power: when the grid goes down, a battery keeps the lights, the fridge, and the internet running, and that reliability has a value that has nothing to do with time-of-use arbitrage. If you live somewhere with frequent outages, the resilience alone may justify the purchase, with any rate savings as a bonus rather than the core case. Judging a backup-focused battery purely on its arbitrage return is like judging a generator by how much it lowers your electric bill — it's answering the wrong question.

The second place storage genuinely shines is when it's paired with solar under an export structure that pays you less for exported power than you pay to buy it back. In that setup, the battery isn't arbitraging the utility's cheap and expensive hours — it's storing your own solar production, which cost you nothing to generate, so you can use it in the evening instead of exporting it at a low rate and buying grid power at a high one. That's a much better spread than off-peak-to-peak arbitrage, because your "charge cost" is free solar rather than purchased off-peak power, and it stacks with time-of-use rates rather than depending on them. How much a battery moves the needle on a solar system's overall economics is worked through in [adding a battery and what it does to your solar payback](/blog/solar-battery-payback-impact/), and the answer there is usually more favorable than standalone arbitrage.

The practical takeaway is to be honest about which job you're buying the battery to do. If your goal is pure rate arbitrage with no solar and no outage concern, run the numbers against your actual spread and your actual battery cost before you commit — and be prepared for the math to say no on a modest time-of-use plan, because most modest plans don't offer a spread wide enough to beat the wear. Setting the battery to a time-of-use optimization mode makes sense only once you've confirmed the spread clears the hurdle; the different ways a battery can be programmed, and when each pays, are covered in [battery operating modes decoded](/blog/solar-battery-operating-modes/). And to pressure-test a specific battery size against your usage and rate before spending anything, the [solar battery calculator](/solar-battery-calculator/) lets you model capacity against your load so you're sizing to a real need rather than a hopeful spreadsheet. A battery can absolutely save money on the right time-of-use plan — but "the right plan" means a wide spread, a cheap-enough battery, and ideally solar or backup value carrying part of the load, not a dime-a-kilowatt-hour gap and a hope that the arbitrage adds up.
