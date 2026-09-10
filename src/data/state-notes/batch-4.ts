import type { StateNotesMap } from './types';

// Batch 4: NM, NY, NC, ND, OH, OK, OR, PA, RI, SC
export const batch4: StateNotesMap = {
  NM: {
    netMetering: [
      "New Mexico's Public Regulation Commission requires investor-owned utilities to offer net metering, and the compensation depends on system size. Residential arrays of 10 kW or smaller are credited for exports at the full retail rate, with the credit carried forward on the bill from month to month; larger systems are paid at the utility's avoided cost, which is usually well under half the retail price. PNM, El Paso Electric and Southwestern Public Service each file their own tariff language, so the carryover mechanics and any annual true-up differ slightly by utility.",
      "Because most rooftop systems fall under the 10 kW line, a typical homeowner sees each exported kilowatt-hour offset a purchased one. Verify the current tariff before signing, since the PRC has periodically opened dockets on distributed generation charges.",
    ],
    incentives: [
      "The state's Solar Market Development Tax Credit returns 10% of the installed cost of a solar system, up to $6,000, against New Mexico income tax. It is administered by the Energy, Minerals and Natural Resources Department, and homeowners must apply for certification through EMNRD within 12 months of installation. Annual statewide funding is capped, and the legislature raised that cap in 2024 while extending the credit; even so, applications are approved in order until the year's allocation is exhausted, so file early. Verify the cap and deadline for the current tax year with EMNRD.",
      "Solar equipment is also excluded from property tax assessment in New Mexico, so a new array should not raise your county valuation. A gross receipts tax deduction has applied to solar sales and installation as well; ask your installer whether they apply it. Combined with the federal 30% credit, the state credit brings the effective first-year discount to roughly 40% for most households.",
    ],
    utilities: [
      "Public Service Company of New Mexico (PNM) serves Albuquerque, Santa Fe and much of the central and northwestern state, El Paso Electric covers Las Cruces and the southern counties, and Xcel Energy's Southwestern Public Service subsidiary handles the eastern plains around Clovis and Hobbs. Rural electric cooperatives fill in most of the remaining territory, and their net metering terms are set by their own boards rather than the PRC. PNM's residential rates run near the national average and include a time-of-day option; because net metering credits track retail rates, savings scale with whatever rate you pay. High elevation and abundant sun mean a New Mexico array produces more per installed watt than the same panels would in most other states.",
    ],
    sources: [
      { label: 'EMNRD Energy Conservation and Management Division', url: 'https://www.emnrd.nm.gov/ecmd/' },
      { label: 'New Mexico Public Regulation Commission', url: 'https://www.prc.nm.gov/' },
    ],
  },

  NY: {
    netMetering: [
      "Rooftop solar in New York's investor-owned utility territories is compensated under what the Public Service Commission calls Phase One Net Metering. Exports are credited at the full retail kilowatt-hour rate and roll forward month to month, with any surplus at the end of your chosen annual cycle cashed out at the utility's avoided-cost rate. Systems interconnected since January 1, 2022 also pay a Customer Benefit Contribution, a fixed monthly charge assessed per kilowatt of installed capacity that varies by utility and is meant to fund efficiency and low-income programs.",
      "The alternative is the Value of Distributed Energy Resources tariff, better known as the Value Stack, which prices exports by their hourly energy value plus separate capacity, environmental and locational components. It is mostly used by community solar and larger projects; residential installers keep homeowners on Phase One because the credits are simpler and generally worth more. On Long Island, LIPA and PSEG Long Island set their own net metering rules outside PSC jurisdiction.",
    ],
    incentives: [
      "New York layers several incentives on top of the federal credit. The state's Solar Energy System Equipment Credit is worth 25% of system cost up to $5,000 against state income tax, and unused credit carries forward for five years. NYSERDA's NY-Sun program pays an upfront rebate to your installer on a declining block schedule; as of 2026 the standard residential blocks in some regions are fully subscribed, though the Affordable Solar adder for income-qualified households may still be open, so confirm the current block with your installer.",
      "Residential solar equipment is exempt from the 4% state sales tax, and many counties and cities waive their local portion as well. Under Real Property Tax Law section 487, the added value of a solar system is exempt from property taxes for 15 years unless your municipality has opted out. New York City goes further with a property tax abatement for solar that is claimed over several years; verify the current percentage with the NYC Department of Buildings.",
    ],
    utilities: [
      "Con Edison serves New York City and Westchester, National Grid covers upstate from Buffalo to Albany, NYSEG and Rochester Gas & Electric (both Avangrid) serve the Southern Tier, Finger Lakes and Rochester, Central Hudson handles the mid-Hudson Valley, and PSEG Long Island operates the LIPA grid. Con Edison's retail rates are among the highest in the country, so net metering credits there are worth far more per kilowatt-hour than in National Grid's upstate territory, where rates sit closer to the national average. The Customer Benefit Contribution is a flat charge per kilowatt, so it trims a small fixed amount every month regardless of production.",
    ],
    sources: [
      { label: 'NYSERDA NY-Sun program', url: 'https://www.nyserda.ny.gov/All-Programs/NY-Sun' },
      { label: 'NYS Solar Energy System Equipment Credit', url: 'https://www.tax.ny.gov/pit/credits/solar_energy_system_equipment_credit.htm' },
    ],
  },

  NC: {
    netMetering: [
      "Duke Energy Carolinas and Duke Energy Progress moved to a new net metering structure for customers interconnecting from October 2023 onward, following a settlement approved by the North Carolina Utilities Commission. New solar customers choose between two tariffs. The Residential Solar Choice option pairs net metering with a time-of-use rate, nets production against usage within each pricing period, credits any monthly surplus at an avoided-cost rate, and applies a minimum monthly bill along with non-bypassable charges.",
      "The second option, the Bridge Rate, keeps a flat energy price with a minimum bill and, for systems above a size threshold, a grid access fee; it was intended as a transition and has an enrollment deadline, so ask whether it is still open. Customers under the older full-retail rules were grandfathered for a set number of years. Dominion Energy North Carolina and the state's electric cooperatives run separate net metering tariffs, most of them closer to traditional retail crediting.",
    ],
    incentives: [
      "North Carolina's 35% state tax credit expired at the end of 2015, and no replacement exists as of 2026. The most notable current incentive is Duke Energy's PowerPair program, launched in 2024, which pays a per-watt rebate on new solar plus a per-kilowatt-hour rebate on a paired battery for Duke Carolinas and Duke Progress customers. Enrollment was capped and handled in application windows, and participants may be asked to enroll the battery in a utility control program, so check availability before assuming the rebate.",
      "State law also removes most of a solar system's appraised value from property tax, which keeps your county assessment from climbing after installation; confirm how your county applies the exemption. Some cooperatives and municipal utilities run their own small rebates, but no statewide rebate or low-interest loan program is currently active.",
    ],
    utilities: [
      "Duke Energy Carolinas serves Charlotte, the Triad and the western mountains, Duke Energy Progress covers Raleigh, Wilmington and the eastern plain, and Dominion Energy North Carolina handles a corner of the northeast around Elizabeth City. Roughly a quarter of the state's customers get power from 26 electric cooperatives or municipal systems such as those in Wilson and Greenville, each with its own board-set solar terms. Duke's residential rates are below the national average, which caps how much each net-metered kilowatt-hour can save, and the time-of-use requirement means shifting laundry and EV charging away from the evening peak matters more than it did under flat-rate net metering. A battery improves the math by holding midday output for the pricier evening hours.",
    ],
    sources: [
      { label: 'North Carolina Utilities Commission', url: 'https://www.ncuc.gov/' },
    ],
  },

  ND: {
    netMetering: [
      "Net metering in North Dakota is among the least generous in the country. Public Service Commission rules require investor-owned utilities to accept generation from systems up to 100 kW, but any energy you export beyond what you use in the month is credited at the utility's avoided cost, roughly the wholesale price of power, rather than the retail rate. That means a kilowatt-hour sent to the grid is worth a fraction of the one you buy back.",
      "The practical consequence is that sizing matters more here than elsewhere: an array built to cover daytime loads with little surplus pays back better than an oversized one. Cooperatives, which serve much of the rural state, are not bound by the PSC rule and set their own terms, and several offer a similar avoided-cost buyback. Verify the exact crediting method in your utility's tariff before choosing a system size.",
    ],
    incentives: [
      "No North Dakota income tax credit is available for residential solar; the state's former credit, which spread 15% of cost across five years, expired for systems installed after 2014. What remains is a property tax exemption: solar, wind and geothermal equipment on a home is exempt from local property tax for five years following installation, so a new array does not raise your assessment during that window.",
      "There is no state sales tax exemption for solar equipment and no state rebate program as of 2026. The federal 30% credit therefore carries almost the entire incentive load, and it is worth checking whether your cooperative offers any rebate through its wholesale supplier before assuming none exists.",
    ],
    utilities: [
      "Xcel Energy serves Fargo, Grand Forks and Minot, Montana-Dakota Utilities covers Bismarck, Dickinson and the western oil patch, and Otter Tail Power serves Jamestown, Devils Lake and much of the eastern countryside. Electric cooperatives such as Cass County Electric, Capital Electric and Verendrye serve the rest, with wholesale power largely from Basin Electric and Minnkota. Residential rates in North Dakota are among the lowest in the nation, which is the biggest drag on solar payback; low rates plus avoided-cost export credits mean savings depend almost entirely on displacing your own daytime consumption. Long summer days offset the northern latitude somewhat, and a steeper snow-shedding tilt is worth discussing with an installer.",
    ],
    sources: [
      { label: 'North Dakota Public Service Commission', url: 'https://psc.nd.gov/' },
    ],
  },

  OH: {
    netMetering: [
      "Ohio's net metering rules, set by the Public Utilities Commission of Ohio, look like traditional net metering but pay less than they first appear. Investor-owned utilities credit exported energy only at the generation, or supply, component of the bill and not the distribution and transmission charges, so a credited kilowatt-hour is worth roughly half to two-thirds of what you pay for one. Credits roll forward monthly, and a customer can request that any accumulated balance be paid out once a year.",
      "If you buy generation from a competitive retail supplier rather than the utility's standard service offer, ask how that supplier handles net metering, because some do not credit exports at all and the utility only applies the generation credit to its own supply customers. Municipal utilities and cooperatives are outside PUCO jurisdiction and write their own policies, which in some cases are more generous.",
    ],
    incentives: [
      "Ohio offers little at the state level. The solar carve-out in the renewable portfolio standard was eliminated by House Bill 6 in 2019, so Ohio solar renewable energy certificates now trade for only a few dollars each and rarely justify the registration effort for a home system. There is no state income tax credit and no statewide rebate.",
      "Property tax treatment is uneven: state law provides an exemption for larger qualified energy projects, while residential arrays depend on county practice and local abatements that cities such as Cleveland and Cincinnati have adopted. The Ohio Treasurer's ECO-Link rate-reduction loan program has been paused and revived over the years, so check whether it is accepting applications. Some utilities offer small energy efficiency rebates that can pair with a solar project.",
    ],
    utilities: [
      "AEP Ohio serves Columbus and much of central and southern Ohio, FirstEnergy's three subsidiaries (Ohio Edison, The Illuminating Company and Toledo Edison) cover Akron, Cleveland and Toledo, AES Ohio serves the Dayton area, and Duke Energy Ohio handles Cincinnati. Ohio is a retail-choice state, so the generation price on your bill can come from the utility's standard service offer or from a competitive supplier, and that price is what your export credits are worth. Because distribution charges are unaffected by solar, homeowners save more by consuming production on site than by exporting. Retail rates sit near the national average, and cloudy winters mean a well-oriented roof matters.",
    ],
    sources: [
      { label: 'Public Utilities Commission of Ohio', url: 'https://puco.ohio.gov/' },
    ],
  },

  OK: {
    netMetering: [
      "The Oklahoma Corporation Commission requires regulated utilities to offer net metering to customers with systems up to 300 kW, but it does not require them to purchase surplus energy at the retail rate. In practice OG&E and Public Service Company of Oklahoma net your production against usage within each billing month and treat any remaining excess at an avoided-cost value, which is far below the price you pay for electricity.",
      "A 2014 state law also allows utilities to seek a separate rate class or charge for customers with rooftop generation; proposals along those lines have surfaced in rate cases, and the commission has not always approved them. Because the export value is low and could change, Oklahoma installers generally size arrays to match daytime consumption rather than to zero out the annual bill. Confirm the current tariff language with OG&E or PSO before signing.",
    ],
    incentives: [
      "Oklahoma has no state income tax credit, rebate or sales tax exemption for residential solar, and solar equipment is not exempt from property tax. The federal 30% credit is the only major incentive, which is why payback here leans heavily on the state's strong sunlight and on self-consumption rather than subsidies.",
      "A handful of cooperatives and municipal utilities periodically offer energy efficiency rebates that can be combined with a solar project, and Oklahoma law limits how far homeowner associations can restrict a rooftop installation. Check with your utility and the Corporation Commission for any new programs, since the policy picture has been stable but is reviewed periodically.",
    ],
    utilities: [
      "Oklahoma Gas & Electric serves Oklahoma City, Norman and much of the central and western state, while Public Service Company of Oklahoma, an AEP subsidiary, covers Tulsa and the northeast. Cooperatives under the Oklahoma Association of Electric Cooperatives and municipal systems supplied by the Oklahoma Municipal Power Authority serve the rest. Residential rates are well below the national average, so each kilowatt-hour a system produces displaces a cheap one and payback stretches longer than in high-cost states. Both OG&E, with its SmartHours plan, and PSO offer time-of-use pricing that rewards shifting loads to the afternoon hours when panels are producing, and summer air conditioning peaks line up reasonably well with solar output.",
    ],
    sources: [
      { label: 'Oklahoma Corporation Commission', url: 'https://oklahoma.gov/occ.html' },
    ],
  },

  OR: {
    netMetering: [
      "Oregon requires every utility, investor-owned and consumer-owned alike, to offer net metering for residential systems up to 25 kW. Portland General Electric and Pacific Power credit exports at the full retail kilowatt-hour rate and roll unused credits forward month to month. Once a year, at the end of March, any credits still on the account are not paid out to the customer but transferred to the utility's low-income bill assistance program, so an oversized system gives its surplus away.",
      "Consumer-owned utilities such as the Eugene Water & Electric Board and the public utility districts follow the same state statute but set their own details, including the annual reset date and whether small surpluses are paid. The rule of thumb Oregon installers use is to size for roughly 100% of annual usage and no more. Check your utility's net metering tariff for the current annual true-up terms.",
    ],
    incentives: [
      "The Oregon Department of Energy runs the Solar + Storage Rebate Program, which pays a rebate through your contractor for a rooftop system and an additional amount for a paired battery, with larger rebates for low- and moderate-income households. Funding depends on legislative appropriations and has been exhausted mid-cycle in past years, so ask your installer whether the program is currently accepting reservations.",
      "Energy Trust of Oregon offers incentives to PGE and Pacific Power customers, including its Solar Within Reach program for income-qualified homes; standard incentive levels have been reduced over time, so verify current amounts. Residential solar is exempt from property tax under state law, and Oregon has no sales tax at all. The former Residential Energy Tax Credit ended in 2017 and has not been replaced.",
    ],
    utilities: [
      "Portland General Electric serves Portland, Salem and the Willamette Valley core, Pacific Power covers Bend, Medford, Corvallis, Albany and the coast, and Idaho Power serves the far east. Eugene is served by EWEB, and dozens of public utility districts, municipal systems and cooperatives serve the rest, many with rates well below the investor-owned utilities thanks to Bonneville Power Administration hydropower. Because net metering credits at retail, a PGE customer paying higher rates saves more per kilowatt-hour than a PUD customer with cheap hydro. PGE offers time-of-day pricing that can raise the value of evening consumption shifted to a battery. Cloudy winters mean western Oregon arrays earn most of their credits between May and September, which is where the March annual reset comes into play.",
    ],
    sources: [
      { label: 'Oregon Solar + Storage Rebate Program (ODOE)', url: 'https://www.oregon.gov/energy/Incentives/Pages/Solar-Storage-Rebate-Program.aspx' },
      { label: 'Energy Trust of Oregon', url: 'https://www.energytrust.org/' },
    ],
  },

  PA: {
    netMetering: [
      "Pennsylvania's net metering rules, adopted by the Public Utility Commission under the Alternative Energy Portfolio Standards Act, credit exported energy at the full retail rate for residential systems up to 50 kW. Excess kilowatt-hours roll forward each month, and at the end of the annual period ending in May the utility pays out any remaining balance at its price-to-compare, which is the generation portion of the rate.",
      "Because Pennsylvania is a retail-choice state, the electric distribution company handles net metering for customers on default service; if you switch to a competitive supplier, confirm that the supplier honors net metering credits, as terms vary. Systems can be sized up to 200% of annual usage under the rules, but anything beyond your own consumption only earns the lower annual cash-out rate.",
    ],
    incentives: [
      "Pennsylvania's strongest state-level incentive is its solar renewable energy certificate market. Under the AEPS solar carve-out, each megawatt-hour your system produces earns one SREC that utilities and suppliers buy to meet their obligations; since Act 40 of 2017 closed the market to out-of-state systems, prices have held in a modest range that adds a meaningful but not dominant amount to annual returns. You register through the PUC's AEPS program and typically sell through an aggregator.",
      "There is no state income tax credit, sales tax exemption or property tax exemption for residential solar. The Philadelphia Energy Authority has run a per-watt Solar Rebate for city residents, though funding has been intermittent, and Solarize campaigns in Philadelphia and several counties have offered group-purchase pricing. The old PA Sunshine rebate ended in 2013.",
    ],
    utilities: [
      "PECO serves Philadelphia and its suburbs, PPL Electric Utilities covers Allentown, Harrisburg, Lancaster and Scranton, Duquesne Light serves Pittsburgh, and FirstEnergy's four Pennsylvania subsidiaries (Met-Ed, Penelec, Penn Power and West Penn Power) cover Reading, Erie, Johnstown and much of the west. Smaller utilities include UGI, Citizens' Electric and several cooperatives. Retail rates in PECO and PPL territory are somewhat above the national average, while Duquesne and the western FirstEnergy territories run closer to it, so savings per kilowatt-hour vary by region. Your net metering credit tracks the full delivered rate, but the annual cash-out uses only the generation portion, so a system that slightly undersizes annual usage extracts the most value.",
    ],
    sources: [
      { label: 'Pennsylvania Public Utility Commission', url: 'https://www.puc.pa.gov/' },
      { label: 'PA AEPS program (SREC registration)', url: 'https://pennaeps.com/' },
    ],
  },

  RI: {
    netMetering: [
      "Rhode Island offers two distinct paths for compensating rooftop solar, and homeowners must choose one. Under standard net metering with Rhode Island Energy, production up to 100% of your on-site consumption is credited at the full retail rate, and production between 100% and 125% of usage earns a lower excess credit close to the utility's avoided cost; credits carry forward on the bill.",
      "The alternative is the Renewable Energy Growth program, a feed-in tariff in which every kilowatt-hour your system generates, whether used on site or exported, is paid at a fixed rate locked for 20 years, while you buy all your electricity from the utility at retail. The Distributed Generation Board sets REG rates annually and enrollment is capped by program year; the tariff has been attractive for small systems but is not stackable with the state's Renewable Energy Fund grant, so run both scenarios before deciding.",
    ],
    incentives: [
      "The Renewable Energy Fund, administered by Rhode Island Commerce, provides small-scale solar grants paid per installed watt up to a cap for homeowners who choose net metering rather than REG. Grant amounts are set by round and depend on available funding, so confirm the current rate with your installer, who usually submits the application. Solar equipment is exempt from Rhode Island sales tax, and state law exempts residential solar systems from property tax so the array does not increase your assessment.",
      "A residential renewable energy income tax credit exists in Rhode Island statute, but its availability has changed over the years and it should be verified with the Division of Taxation before you count on it. The Office of Energy Resources also runs periodic financing and battery pilot programs worth asking about.",
    ],
    utilities: [
      "Rhode Island Energy, owned by PPL since it acquired Narragansett Electric from National Grid in 2022, serves nearly every home in the state; the Pascoag Utility District and Block Island Power Company are the small exceptions. Residential rates are among the highest in the country and the supply component swings sharply between winter and summer pricing periods, which makes full-retail net metering credits unusually valuable and explains why payback periods are shorter than the state's modest sunshine would suggest. Under REG, by contrast, your return is fixed for 20 years and does not benefit when rates rise. Customers on the utility's last-resort supply versus a competitive supplier should confirm how credits are applied to the supply portion.",
    ],
    sources: [
      { label: 'Rhode Island Office of Energy Resources', url: 'https://energy.ri.gov/' },
      { label: 'Rhode Island Public Utilities Commission', url: 'https://ripuc.ri.gov/' },
    ],
  },

  SC: {
    netMetering: [
      "South Carolina's Energy Freedom Act of 2019 replaced legacy retail net metering with what Duke Energy and Dominion Energy South Carolina call Solar Choice metering, which applies to customers who interconnected from mid-2021 onward. Under Solar Choice you are placed on a time-of-use rate, production is netted against consumption within each pricing period, and any exported energy left over is credited at an avoided-cost rate well below retail. A minimum monthly bill and non-bypassable charges apply, and Duke adds a small grid access fee for larger systems.",
      "Households that enrolled under the earlier one-for-one net metering rules were grandfathered for a fixed period rather than switched immediately. Santee Cooper and the electric cooperatives, which are outside Public Service Commission jurisdiction, have their own distributed generation rates, several of which also credit exports at avoided cost. Ask for the exact tariff sheet from your utility, since credit values are updated periodically.",
    ],
    incentives: [
      "South Carolina offers one of the larger state tax credits still available: 25% of system cost against state income tax, limited to $3,500 per year or half your tax liability, whichever is less, with unused credit carried forward for up to 10 years. The credit is claimed on Department of Revenue form TC-38 and applies to solar water heating and small wind as well.",
      "Residential solar systems of 20 kW or less are exempt from property tax under state law, so the array does not raise your county assessment. There is no state sales tax exemption or statewide rebate; some cooperatives and Santee Cooper have offered rebates on and off, and Duke has occasionally extended battery incentive programs into South Carolina, so ask what is open this year.",
    ],
    utilities: [
      "Duke Energy Carolinas serves Greenville, Spartanburg and the Upstate, Duke Energy Progress covers Florence and the Pee Dee, Dominion Energy South Carolina (formerly SCE&G) serves Columbia, Charleston and Aiken, and state-owned Santee Cooper serves the Grand Strand and Berkeley County while supplying the 20 cooperatives that cover most rural territory. Retail rates are close to the national average, but the time-of-use structure under Solar Choice means the value of a solar kilowatt-hour depends heavily on when it is used: midday production offsets cheaper off-peak power, while the pricey evening peak arrives after output falls. A battery or shifting flexible loads into the afternoon makes a larger difference here than in flat-rate states.",
    ],
    sources: [
      { label: 'SC Office of Regulatory Staff (Energy Office)', url: 'https://ors.sc.gov/' },
      { label: 'SC Department of Revenue', url: 'https://dor.sc.gov/' },
    ],
  },
};
