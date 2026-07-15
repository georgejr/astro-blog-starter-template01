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

An 8 kW solar system will, on its very best day, produce something less than 8 kW — and on an average day, meaningfully less than that. This surprises people who reasonably assume that "8 kW" is simply what they are buying, the way "gallon" means a gallon. It is not a defect, a bad install, or a sign anyone cheated you. The nameplate number describes the panels under idealized laboratory conditions that your roof will essentially never reproduce, and the gap between that lab figure and your delivered power is not one loss but a stack of small ones, each shaving off a few percent. Understanding the stack is what lets you read a production estimate critically instead of feeling shortchanged by it — and it is what lets you tell an honest proposal from an optimistic one.

## What the nameplate number actually means

The wattage stamped on a solar panel is measured under Standard Test Conditions, a specific and deliberately generous set of circumstances: a bright, defined irradiance level, a cell temperature held at exactly 25°C, and a spotless panel facing the light squarely head-on. Add up all your panels' ratings and you get the system's nameplate DC capacity — the 8 kW printed in the brochure and on the contract. It is an honest number and a useful one for comparing panels against each other, but it is a *rating*, not a promise about your particular roof on a particular afternoon. It relates to your real output the same way a car's advertised top speed relates to your morning commute: both are true, and neither describes what actually happens day to day. Getting clear on [what a panel's wattage rating actually measures](/blog/solar-panel-wattage-explained/) is the foundation for seeing why real output sits below it, and why that is normal rather than alarming.

Two structural facts push delivered power below nameplate before you even reach the smaller, itemized losses. The first is sunlight itself. Your panels only rarely see the full test-condition irradiance the rating assumes, because real sunlight varies with the time of day, the season, the angle of the sun, atmospheric haze, and passing clouds. Most operating hours happen under less than peak light. The second fact is temperature, and it works in a way that catches people off guard. When panels *do* catch strong midday sun, they are almost always far hotter than the 25°C the lab assumed — a dark panel absorbing direct sun on a summer roof can run 30 to 40 degrees above the surrounding air. Silicon panels lose a fraction of a percent of their output for every degree above that reference temperature, so heat quietly erodes production exactly when the sun is strongest. This is why a scorching, cloudless July afternoon can underperform a crisp, bright day in spring: the spring day is nearly as sunny but the panels run cooler, and cooler panels are more efficient. Heat, not clouds, is the counterintuitive villain of peak summer production.

## The loss stack, layer by layer

Beyond temperature, a series of real-world factors each take a modest, individual cut. Industry modeling tools bundle all of them into a single "system losses" figure, and the common default lands right around 14% — meaning a well-designed, well-sited system delivers roughly 86% of what its nameplate and the raw available sunlight would together suggest. The exact figure varies with your site, your equipment, and your climate, but the components are consistent from one system to the next:

| Loss factor | Typical rough share | What causes it |
|---|---|---|
| Inverter efficiency | 2–4% | Converting DC to AC is never perfectly lossless |
| Temperature | varies, often 5–10% | Panels running hotter than 25°C on a sunny roof |
| Soiling | 1–5% | Dust, pollen, and grime between rains |
| DC and AC wiring | 2–3% | Resistance in the cables carrying the power |
| Mismatch | 1–2% | Panels never perform identically to one another |
| Shading | 0–20%+ | Trees, chimneys, and obstructions blocking light |
| Connections and availability | 1–3% | Contact resistance, plus rare downtime |

The percentages are illustrative rather than measured for any one specific system, and — this is the part people miss — they do not simply add up. They compound, each factor acting on whatever the previous one already left behind. A 3% inverter loss applied to output that soiling has already trimmed removes 3% of the smaller number, not of the original nameplate, which is why stacking a handful of single-digit losses lands you around 14% total rather than the 20-plus you would get by naive addition. But the qualitative picture is what matters: there is no single villain here, no one component quietly stealing your power. There is instead a dozen small, unavoidable taxes that together move an 8 kW nameplate toward something like 6.9 kW of realistic peak AC output on a good day — and an annual energy total governed by all of it plus how much sun your specific location actually receives across the year.

That compounding is also why chasing any single loss to zero rarely pays. Cleaning panels obsessively to eliminate a 2% soiling loss, or paying a large premium for an inverter that is one point more efficient, buys back a slice of a slice. The losses that are worth real attention are the ones that can be large, and there are only two of those.

## The two losses worth arguing about

Most of the stack is fixed physics you cannot negotiate — you will not talk temperature or wiring resistance out of existing. But two entries behave differently from the rest, and both deserve thought at the design stage because they are choices rather than constants.

### Shading is the one that can dwarf everything else

Look again at the shading row and notice its range: zero to more than 20%. Every other loss in the table is a few percent at most. Shading alone can exceed the entire rest of the stack combined, which makes it categorically different from its neighbors. It is also, crucially, the loss most within your control while the system is still on paper — through where the panels are placed on the roof, whether a problem tree gets trimmed or worked around, and whether the design uses panel-level electronics that stop one shaded panel from dragging down the whole string it belongs to. Shading losses are non-linear, too: a shadow falling across even part of a single panel can cost more production than its physical size suggests, because of how panels are wired in series. A production estimate built on a roof with unaddressed afternoon shade is optimistic in a way that no temperature assumption or wiring choice can rescue, because the shaded hours are simply gone. This is the loss to interrogate hardest in any proposal, and the one where an honest installer's number and a careless one's can diverge dramatically.

### Inverter clipping looks like a loss but usually is not one

Systems are frequently designed on purpose with more panel capacity than the inverter can pass through at any single instant, so on the brightest moments of the sunniest days the inverter "clips" the very top of the production peak, holding output at its maximum rather than letting it spike higher. On a production graph this shows up as a flat-topped curve, and the missing triangle above the flat top is genuinely energy the system could theoretically have made. But it is almost always a *good* trade rather than a mistake. A right-sized, slightly smaller inverter costs less to buy and captures more energy across all the ordinary, non-peak hours than a larger inverter would ever return at the handful of clipped midday moments. This is why [inverter clipping is usually fine](/blog/inverter-clipping/) and often deliberately engineered in, rather than a flaw to eliminate. It is the rare "loss" that a smart designer chooses on purpose, trading a sliver of peak production for lower equipment cost and better overall economics.

## What this means when you read a proposal

The practical upshot of all this is not that solar underdelivers or that you are being sold a fantasy. It is that any *honest* proposal has already priced these losses in before it reaches you. The production estimate you are handed should reflect delivered AC energy — losses and all — not a nameplate figure multiplied by raw sun hours. This is precisely why reputable installers quote annual kWh production rather than just system size in kilowatts: the kWh figure is the one that has the whole loss stack baked into it. It is also why the most useful yardstick for comparing one system against another is [kWh produced per kW of capacity](/blog/solar-production-per-kw/), a single number that folds the entire loss stack together and can be checked against what your climate reasonably supports. A proposal quoting production that implies a suspiciously low total loss, given your roof and region, is worth a hard question.

So when you compare two quotes for 8 kW systems and one projects noticeably higher annual production than the other, the difference is not magic and it is not necessarily better equipment. It is assumptions about this stack — less shading, a cooler-running layout, a cleaner wiring design, a different inverter-to-panel ratio. The right response is to ask *which* loss the more optimistic quote trimmed, and why, and whether that assumption holds for your actual roof. To pressure-test the numbers for yourself before you sign anything, the [solar panel calculator](/solar-panel-calculator/) applies realistic losses to your specific location and system size, and the [panel size calculator](/solar-panel-size-calculator/) helps you see how much nameplate capacity your roof genuinely needs to hit a given delivered target once the losses are counted. The 8 kW printed on the label was never really the point. The kilowatt-hours that actually reach your meter, after every layer of the stack has taken its cut, are the number your bill will care about.
