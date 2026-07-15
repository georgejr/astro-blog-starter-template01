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

There are two ways to guess how much solar you need and one way to actually know. The two guesses — size it by your monthly bill in dollars, or by the square footage of your house — are the ones salespeople reach for because they take ten seconds and sound authoritative. The way to actually know sits on twelve months of your own statements, in a single number: your annual kilowatt-hours. Once you have that figure, sizing a system becomes arithmetic instead of estimation, and the whole calculation takes about five minutes at the kitchen table.

Both shortcuts are stand-ins for the one quantity that physically determines the answer, and both drift far enough from it to send you toward the wrong system.

## Why a year of kilowatt-hours beats every shortcut

A power bill is a poor measure of how much electricity you burn, because it isn't really a measure of electricity at all — it's a measure of money. Bundled into the total are a fixed monthly customer charge you would pay even at zero usage, per-kilowatt-hour delivery or distribution charges, separate supply charges, state and local taxes, and on many rate plans a tiered structure where the price per kilowatt-hour steps up once you cross a monthly threshold. Two households that each drew exactly 900 kilowatt-hours in the same month can land forty or fifty dollars apart simply because one is on a different rate plan or tipped into a higher tier. Solar offsets the energy you would otherwise buy, counted in kilowatt-hours — it does nothing about that fixed customer charge. So converting a dollar figure into a system size means stripping out every non-energy line item first anyway. Skip the detour and start where the physics starts.

Kilowatt-hours are also the only honest common denominator between homes. A house in a cheap-power state and a house in an expensive-power state can post wildly different bills for the identical 11,000 kilowatt-hours of consumption, yet both need roughly the same-sized array to cover that load, because the panels care about energy produced, not the price the utility attaches to it. Dollars vary with your rate; the array is sized against the electrons.

Square footage is the other tempting proxy, and it is worse. Floor area tells you almost nothing about consumption, because what a home uses depends on what is plugged into it and how it makes heat and hot water. A 2,000-square-foot house on natural-gas heat, a gas water heater, and no electric vehicle might run 7,000 to 8,000 kilowatt-hours a year. Take that identical floor plan, swap in a heat pump for heating and cooling, add a heat-pump water heater, and park an EV that charges in the garage, and it can clear 18,000 to 20,000 — well over double, sometimes triple. A rule that maps square feet to panels is blind to that gap. Annual kilowatt-hours already contains it, because it is the actual electricity the meter counted: every appliance, every degree of heating and cooling, every mile of charging, summed across a year.

Getting the number is mechanical. Add the kilowatt-hours — not the dollars — from twelve consecutive monthly statements. The figure is printed on every bill, usually in smaller type than the amount due, and most utility online portals show a rolling twelve-month total or a bar chart you can read straight off. One caution: if you are on budget or levelized billing, the flat monthly dollar amount is deliberately smoothed and tells you nothing about real usage — dig out the kilowatt-hour reading underneath it. And use gross consumption, the electricity the house actually pulled, not a figure already reduced by an existing solar array or a second meter.

There is a second reason to sum a full year rather than annualize a single statement: billing cycles are not clean calendar months. A meter-read date drifts a few days from cycle to cycle, so one "month" might span 28 days and the next 34, and a hot spell that straddles two reads gets split across them. Over twelve consecutive statements those quirks wash out and you are left with a true annual figure. Pulling a rolling twelve-month total off the utility portal's usage graph works just as well, as long as it is a full year and not a partial one projected forward. Watch, too, for changes that won't appear in last year's kilowatt-hours at all — if you are mid-way through converting gas appliances to electric, finishing a basement, or the household just grew, the past year understates the load the panels will actually face. The bill records the home you had, not the home you are about to have.

A full year matters because usage swings hard with the seasons. An air-conditioned July might pull 1,500 kilowatt-hours while a mild, no-heat, no-AC October drops to 550. Grab any single month, multiply by twelve, and you will either badly oversize or badly undersize depending on which month you happened to grab. If you don't have a clean year of statements — you moved recently, or the account changed hands — [estimating annual kWh without a full history](/blog/estimate-annual-kwh-usage/) walks through reconstructing a defensible number from partial data.

Call that annual total your usage. A common US household lands somewhere in the 10,000 to 12,000 kilowatt-hour range, but that average is useless to you; yours is the only figure that belongs in the calculation. Everything downstream is just this number divided by how much a kilowatt of solar produces where you live.

## The arithmetic that turns usage into a system size

Here is the piece that trips people up: a kilowatt of installed panels does not produce a kilowatt-hour every hour. It produces its rated power only when the sun is strong and square on the array, which is a fraction of daylight, and even then a slice is lost to heat, wiring resistance, and the conversion from DC to AC. The standard way to collapse all of that into one workable figure uses two inputs — peak sun hours and a derate factor.

Peak sun hours is not the number of hours the sun is above the horizon. It is the number of hours' worth of full-strength sun — 1,000 watts per square meter — your location receives in an average day, once the weak morning and evening light is flattened into equivalent full-strength hours. A derate factor then accounts for the real-world losses a nameplate rating ignores: inverter conversion of a few percent, DC and AC wiring resistance, dust and pollen soiling on the glass, the efficiency drop as cells heat up on a hot roof, small panel-to-panel mismatch, and the occasional hour of downtime. Rolled together, a derate somewhere around 0.80 to 0.85 is typical for a healthy install.

The formula that ties them together:

> Annual kWh per installed kW = peak sun hours per day × 365 × derate

Assume a moderate 4.7 peak sun hours and a 0.82 derate — reasonable middle-of-the-road figures, not a promise for your specific address. That works out to 4.7 × 365 × 0.82 ≈ **1,400 kilowatt-hours per kilowatt per year**. Sunny Southwest roofs push past 1,700; cloudier, higher-latitude, or partly shaded roofs fall below 1,200. This single production figure is the hinge the entire calculation turns on, so it is worth pinning down for your actual location — a solar production estimator or a local installer's modeling — rather than borrowing a national average that could be off by a third.

With both numbers in hand, the target system size is one division:

> System size (kW) = annual usage (kWh) ÷ annual production per kW

Take a home using 11,000 kilowatt-hours a year in a region that yields 1,400 per kilowatt. The math is 11,000 ÷ 1,400 ≈ 7.9 kW. That is the size that offsets roughly 100% of usage on paper. To turn that into panels, divide by the wattage of the modules you are quoted: at 400 watts each, 7.9 kW is about twenty panels. The table below runs the same arithmetic across a few combinations so you can find the row closest to your own situation:

| Annual usage | Production per kW | Target system size |
| --- | --- | --- |
| 8,000 kWh | 1,200 kWh (cloudier) | ~6.7 kW |
| 8,000 kWh | 1,600 kWh (sunnier) | ~5.0 kW |
| 11,000 kWh | 1,400 kWh (moderate) | ~7.9 kW |
| 14,000 kWh | 1,400 kWh (moderate) | ~10.0 kW |
| 14,000 kWh | 1,700 kWh (Southwest) | ~8.2 kW |

The rows make the point that a dollar rule or a square-foot rule can never capture: the same 8,000-kilowatt-hour house needs a 6.7 kW system in a cloudy climate but only 5.0 kW where the sun is strong — a swing of more than 25% driven by geography alone, before anyone looks at the roof. Two identical families with identical bills in different states need visibly different systems, and only the kilowatt-hour-plus-production math sees it. The [full sizing decision](/blog/what-size-solar-system-do-i-need/) layers in roof orientation, shading, and budget, but this single division is the spine everything else hangs on.

Two small wrinkles keep the arithmetic honest. First, systems are sold in DC kilowatts — the sum of the panel nameplates — while the inverter is often rated a little lower on the AC side, so a quote might read "8.0 kW DC with a 7.6 kW inverter." That is normal; your 7.9 kW target is a DC figure, and the slightly smaller inverter is expected, not a shortfall. Second, cross-check the output the quote implies. A 7.9 kW system in a 1,400 region should make about 7.9 × 1,400 ≈ 11,060 kilowatt-hours, which lines up with the 11,000 target. If a salesperson claims a 6 kW system will cover that same 11,000 in the same region, the arithmetic says it can't — 6 × 1,400 is only 8,400 — and that mismatch is your cue to ask exactly which production assumption they used. Installers also round to whole panels, so you will rarely land on your target to the decimal; a system a few hundred watts over or under is normal and fine.

## When 100% offset is the wrong target

Sizing for a clean 100% offset quietly assumes that every kilowatt-hour you export is worth exactly as much as one you consume the instant you make it. Under full retail net metering that assumption holds — a kilowatt-hour sent to the grid at noon offsets one pulled back at 8 p.m. at the same rate — and 100% is a fair target. But full retail net metering is fading. More utilities now pay less for exported power than they charge for imported power, whether through a net-billing structure or a separate, lower export rate. The moment that is true, the economics inside your own array stop being uniform: the first panels offset full-price grid electricity, while the last panels — the ones producing surplus you can't use as it's made — earn only the discounted export credit yet cost exactly as much to buy and install. Payback stretches on that final tranche. What a "100% offset" actually does to your bill once credits and fixed charges are counted is unpacked in [solar offset, explained](/blog/solar-offset-explained/).

That is why the raw division is a starting point, not a verdict. Three adjustments matter most, and the first is your own future. If you expect usage to climb — an EV in the driveway or a heat-pump conversion within a couple of years — size for the usage you will have, not the usage you have now. A typical commuter's EV adds roughly 3,000 to 4,000 kilowatt-hours a year; a heat pump can add several thousand more depending on your climate and how you heat today. Adding panels later is not a simple matter of bolting on a few more, either. You pay the fixed permit, interconnection, and crew-mobilization costs a second time, and a small add-on job usually runs a higher price per watt than the original install. Building the growth in up front is almost always cheaper than a second visit.

The roof can overrule the arithmetic outright. The math might hand you a 10 kW target that your usable roof simply can't hold. At 400 watts a panel, 10 kW is about twenty-five modules, and each needs roughly 18 square feet, so you are hunting for something like 450 square feet of unshaded, decently oriented roof — before you subtract fire-code setbacks, vents, and dormers. When area is the binding constraint, the [panel size calculator](/solar-panel-size-calculator/) helps translate a target wattage into a panel count and the square footage it actually demands, so you find out on paper rather than on install day.

The export rules are the third lever. If your utility pays well below retail for surplus, bias the target down toward 80 to 90% of usage and lean harder on daytime consumption — running big loads while the sun is up so more of your production offsets full-price imports instead of earning the discounted export rate. The panels you don't buy because they would only ever export cheaply are panels that were never going to pay for themselves quickly.

The last-panel economics are easy to make concrete. Say the jump from a 7.9 kW system to a 9.5 kW one adds about 1.6 kW, or roughly 2,240 extra kilowatt-hours a year at 1,400 per kW. If most of that extra production gets exported at, say, half your retail rate, those panels earn half as much per kilowatt-hour as the first 7.9 kW did — while still costing full price per watt to install. That is not an argument against them; it is the reason to add them only when a real, growing load will consume the output at full value rather than push it onto the grid for pennies.

There is often an external ceiling on all this anyway. Many utilities cap an interconnected residential system at a percentage of your historical usage — commonly somewhere around 100 to 125% — so even a homeowner who wants to oversize for a future EV may need documented justification, such as a signed vehicle purchase, to size past recent consumption. Check that limit before you fall for a big round number, because it can quietly overrule the target the arithmetic produced.

Run your own usage and sun-hour figures through the [solar panel calculator](/solar-panel-calculator/) to confirm the hand arithmetic and to see how the production spreads across the seasons rather than arriving in one convenient lump. The formula gets you a defensible target in five minutes; the calculator and a real installer's site model refine it against your roof and your rate plan. Either way, you walk into the quote conversation negotiating from a number you derived yourself — not one a salesperson picked for you.
