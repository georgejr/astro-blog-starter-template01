---
title: "Your EV as a Home Backup Battery: Vehicle-to-Home Basics"
description: "Vehicle-to-home backup power uses your EV's battery to run the house in an outage. Here's the hardware and wiring it takes — and how V2H compares to a wall battery."
publishDate: 2026-11-28T16:00:00Z
category: "Batteries & Storage"
tags:
  - vehicle-to-home
  - ev backup
  - batteries and storage
primaryKeyword: "vehicle to home backup power"
secondaryKeywords:
  - v2h explained
  - ev powering your house
relatedCalculators:
  - solar-battery-calculator
relatedArticles:
  - how-home-solar-batteries-work
  - solar-battery-during-power-outage
  - whole-home-vs-partial-backup
ogStat:
  value: "60–80 kWh"
  label: "typical EV battery capacity"
---

A home battery mounted on the garage wall typically holds somewhere around 10 to 13 kilowatt-hours. The battery sitting in your driveway holds five or six times that. A typical EV pack runs roughly 60 to 80 kilowatt-hours — enough, on paper, to carry a house through days of an outage rather than hours. Vehicle-to-home, or V2H, is the technology that tries to unlock that enormous battery for the house, turning the car from a thing you charge into a thing that can power your home when the grid goes down.

The appeal is obvious the moment you see the capacity gap laid out that way. The complication is that a car battery was never built to back up a house, and bridging the two takes specific hardware, a compatible vehicle, and some real electrical work. The honest way to understand V2H is to set it against the dedicated home battery it competes with, because the trade-offs come into focus immediately: enormous capacity you have already paid for, weighed against reliability and readiness you have to buy separately. Neither one wins outright, and which matters more depends entirely on your household.

## The battery you already own

An EV is, functionally, the largest battery most households will ever own, and for the vast majority of its life it does nothing but sit still. That capacity normally serves a single job — moving the car — and stays idle the roughly 90% of the time the vehicle is parked in a driveway or a garage. V2H aims squarely at that idle time. Instead of the car's battery only ever accepting power to charge, it discharges power back out through the same connection, feeding your home's circuits during an outage or, in some setups, during expensive grid hours. You are not buying new storage; you are trying to get a second job out of storage you already own.

It helps to separate three terms that get tangled together, because they describe genuinely different capabilities. Vehicle-to-load, or V2L, is the simplest: an outlet built into the car itself that can power a few plug-in devices directly, with no house wiring involved at all. It is handy for a camp site or a single appliance, but it is not home backup. Vehicle-to-home, or V2H, is the one this article is about — here the car powers your home's actual circuits through your electrical panel, so lights, outlets, and hardwired appliances come back to life the way they would with any battery backup. Vehicle-to-grid, or V2G, goes a step further still, sending power from the car back onto the utility grid, which brings in a layer of utility approval and metering that keeps it beyond most homeowners for now. For backup power, V2H is the target, and the other two are best understood as its simpler cousin and its more ambitious one.

## What it actually takes

Making a car power a house is not as simple as running the charge cable in reverse. Several distinct pieces have to be in place, and missing any one of them stops the whole thing cold, so it is worth knowing what the full setup demands before you count on the capacity in your driveway.

At the center of it is a bidirectional charger. An ordinary EV charger only ever pushes power into the car; V2H requires a charger that can also pull power out and convert the car's DC battery into the alternating current your home runs on. This unit is the heart of the system and the main added expense, and it is a meaningfully different — and pricier — device than a standard charging station. Alongside it, you need a vehicle that actually supports discharge. The car's battery management system has to permit exporting power for V2H, and only a growing but still limited set of models and charging standards allow it today; a vehicle that was not designed to export power cannot be coaxed into it, no matter what charger you bolt to the wall. You also need a way to isolate the house from the grid. Just like any battery backup, a V2H system must disconnect your home from the utility before it energizes your circuits, so it can never back-feed a line that a utility worker might be handling during the outage. That is the same anti-islanding safety logic that governs [how home solar batteries work](/blog/how-home-solar-batteries-work/), handled here by a transfer switch or an equivalent automatic disconnect. Finally, you need a defined set of backed-up circuits, because you rarely want — or can afford the car's range to run — the entire house. Most setups route backup power to a critical-load subpanel that feeds only the essentials, which is the same whole-home-versus-essentials decision every backup system faces, weighed in [whole-home vs partial backup](/blog/whole-home-vs-partial-backup/).

Put all of that together and a V2H installation ends up looking a great deal like installing a home battery, because electrically that is exactly what you are doing. The charger, the transfer switch, the subpanel, the interconnection paperwork — it is the same infrastructure. The car simply supplies the storage that a wall unit would otherwise provide, which is both the whole point and the source of every trade-off that follows.

## V2H versus a wall battery, and the catch that decides it

The honest way to judge V2H is against the product it would replace: a fixed home battery. The two solve the same problem from opposite directions, and each wins on a different axis. On capacity, V2H wins decisively. A single EV pack dwarfs one or even two wall batteries, so for a long, multi-day outage the car can outlast dedicated storage that would cost a fortune to match kilowatt-hour for kilowatt-hour. You already bought that capacity for transportation, and V2H is an attempt to draw a second dividend from money you have spent. On readiness, the wall battery wins just as decisively. It is bolted to the house, always charged, always present, and it engages the instant the grid drops without anyone lifting a finger. Its behavior in an outage is predictable and hands-off, the experience described in [what happens when the grid goes down with a battery](/blog/solar-battery-during-power-outage/). A car cannot promise any of that, and the reason comes down to one stubborn fact.

The defining limitation of V2H is mobility. A home battery is, by definition, always where you need it. A car is a car — it might be at the office, on a road trip two states away, or sitting at 15% charge in the driveway after a long day exactly when the outage hits. The huge capacity advantage only exists when the vehicle happens to be parked, plugged in, and holding enough charge to spare. And the tension does not end there: if you plan to drive the next morning, every kilowatt-hour you pull overnight to run the fridge is range you will not have at dawn. Backup power and mobility are competing for the same battery, and only one of them can win on a given night. A wall battery never forces that choice, because it exists to do exactly one thing and it never leaves. That trade — backup versus mobility — is the real cost of V2H, and it makes the car excellent for backup precisely when you are home and staying put, which is often exactly when a storm knocks the power out, yet useless on the days your routine has the car somewhere else. Whether that pattern fits depends entirely on how your household actually drives.

## Where V2H makes sense today

V2H is most compelling for a household that already owns, or is about to buy, a capable EV, wants outage protection, and would rather not pay a second time for a separate wall of storage. In that situation the car's battery is a resource already on the balance sheet, and V2H is simply a way to put it to work during the hours it would otherwise sit idle. For essential-load backup, the size of your actual loads matters far more than the raw pack size — a fridge, some lights, a few outlets, and a furnace fan draw a modest amount, and even a partly charged car can carry them for a long time. The [solar battery calculator](/solar-battery-calculator/) helps translate those specific loads into the kilowatt-hours a night of backup really needs, whether that energy ends up coming from a wall unit or a driveway.

One worry comes up often enough to answer directly: does powering the house wear out the car's battery? In practice, occasional backup duty is a small demand next to the pack's total lifetime. An EV battery is engineered to endure thousands of charge cycles over the life of the car, and running the fridge and a few lights through a handful of outages a year barely registers against that budget. Manufacturers set their own terms for which discharge modes the warranty permits, so it is worth reading those before you count on the feature. But the fear that a few backup nights will noticeably shorten the pack's life does not hold up — it is the daily driving and charging that ages an EV battery, not the rare storm that keeps you home.

For a household that wants guaranteed, hands-off backup regardless of where the car happens to be, a fixed battery remains the more dependable answer, and the two approaches are not mutually exclusive. Some owners keep a modest wall battery for instant, always-present coverage of the essentials and lean on the car for the long tail of a multi-day outage, getting the reliability of one and the endurance of the other. As bidirectional hardware becomes cheaper and compatible vehicles more common, V2H is steadily shifting from a novelty toward a genuine third option that sits alongside a home battery and a backup generator. The capacity in the driveway is real, and it is substantial. The only question worth answering honestly, before you count on it, is whether that battery will reliably be there — parked, plugged in, and charged — on the night you actually need it.
