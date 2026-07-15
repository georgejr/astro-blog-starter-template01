---
title: "From Roof to Breaker: Solar Wiring and Conduit Basics"
description: "A plain map of solar panel wiring basics: how power moves from the panels through conduit and the inverter to your main breaker panel, and where each piece lives."
publishDate: 2026-11-06T08:00:00Z
category: "Inverters & Components"
tags:
  - wiring
  - conduit
  - components
primaryKeyword: "solar panel wiring basics"
secondaryKeywords:
  - solar conduit runs explained
  - how solar connects to electrical panel
relatedCalculators:
  - solar-panel-calculator
relatedArticles:
  - what-does-a-solar-inverter-do
  - string-vs-microinverters
  - solar-rapid-shutdown
---

Follow one unit of energy from the moment sunlight hits a cell to the moment it runs your refrigerator, and the whole system stops being a mystery box on the roof. The path is short and mostly one-directional: light becomes direct current in the panels, the current travels down a wire into some flavor of inverter, the inverter turns it into the alternating current your house uses, and that AC joins your electrical panel like any other circuit. Everything else — the conduit, the disconnects, the labels — exists to make that path safe and inspectable.

Knowing the map matters even if you'll never touch a wire. It tells you what the installer is quoting, why a conduit run appears on your wall, and which components are doing the real work, so you can read a design instead of trusting it blindly.

## The panels make DC, and something has to convert it

Solar cells produce direct current, one-directional flow at a voltage that rises with sunlight. Your house runs on alternating current at 120/240 volts, so conversion is unavoidable — the only question is where it happens. That single design choice shapes the rest of the wiring.

In a string system, panels are wired in series into a "string," and the combined DC — often a few hundred volts — travels down a single pair of conductors to one central inverter mounted near the electrical panel. In a microinverter or optimizer system, the conversion (or at least the conditioning) happens on each panel, so what leaves the roof is already AC or already managed DC. The consequence for wiring is real: a string design carries higher-voltage DC across your roof and down the wall, while a microinverter design carries AC. Which approach fits a given roof is its own decision, weighed in [string inverters versus microinverters](/blog/string-vs-microinverters/), and it determines whether the risky-to-touch high-voltage DC exists at all.

Whatever the architecture, the box that performs the conversion is the hardest-working component in the system, and [what a solar inverter does](/blog/what-does-a-solar-inverter-do/) is worth understanding before you read a wiring diagram, because everything upstream feeds it and everything downstream depends on it.

## Conduit is the protected highway for the wires

Those conductors don't run loose. Code requires them to travel inside conduit — metal or approved plastic tubing — anywhere they're exposed to weather, physical damage, or the inside of your walls. The conduit is the part you'll actually see: a run of gray or metallic pipe descending from the array, crossing an exterior wall, and entering the equipment area near your meter.

The route is rarely arbitrary. Installers try to keep conduit runs short and straight, because long runs add cost, add a little resistance loss, and add visible pipe on the house. On a roof with the electrical panel far from the array, expect a longer run and sometimes a frank conversation about where the pipe will be visible. Rooftop conductors between panels usually tuck under the modules in flexible whip cabling; the rigid conduit begins where the wiring leaves the array and needs protection on its way down. None of this changes how much energy the array makes — that's a function of panel count and sun, which the [solar panel calculator](/solar-panel-calculator/) estimates from your location — but it does shape the install cost and the look of the finished job.

## The safety hardware between roof and panel

Between the array and your breaker panel sit several devices whose only job is to let people cut power and work safely. They're the reason a solar wiring diagram has more boxes than you'd expect.

A DC disconnect (on string systems) lets a technician or firefighter kill the high-voltage DC coming off the roof. An AC disconnect does the same for the inverter's output before it reaches the panel — many utilities require one they can physically lock open. Rapid-shutdown equipment, now standard on new rooftop installs, drops the voltage on the roof conductors within seconds when triggered, so first responders aren't facing live high-voltage lines on a burning roof; the reasoning behind that requirement is laid out in [rapid shutdown rules](/blog/solar-rapid-shutdown/). You'll also see conspicuous labels at each disconnect and at the main panel, which exist so an inspector or an electrician arriving years later can understand the system at a glance.

These devices add boxes to the wall and line items to the quote, but they're not padding. They're what makes a rooftop power plant something a code inspector will sign off on.

## How the power actually joins your panel

The final connection is where solar meets the rest of your house, and there are two common methods. A backfed breaker adds a dedicated breaker into an open slot in your existing main panel, feeding solar AC onto the bus bars alongside the utility supply. A line-side tap connects the solar between the meter and the main breaker, used when the panel is full or its rating can't accommodate another backfed breaker.

Which one your house needs depends on the panel's size and how much spare capacity it has — a detail the installer checks during the site survey, and occasionally the reason a main-panel upgrade shows up on a quote. Once connected, the array's AC simply blends with grid power on the same bus: your home draws from whichever source is available, solar first when the sun's up, grid when it isn't. From your appliances' point of view, an electron from the roof and an electron from the utility are identical. The whole apparatus of conduit, inverters, and disconnects exists to make that blend safe, legible, and reversible on demand.
