import type { StateNotesMap } from './types';

// Batch 2: HI, ID, IL, IN, IA, KS, KY, LA, ME, MD.
// Hand-written editorial notes; see types.ts for the style contract.
export const batch2: StateNotesMap = {
  HI: {
    netMetering: [
      "Hawaii closed its original net energy metering program to new applicants in October 2015, years ahead of most mainland states, because rooftop solar had already saturated many circuits on Oahu. Legacy NEM customers keep full retail credit for exports, but a home going solar today enrolls in one of the successor programs approved by the Hawaii Public Utilities Commission. Since 2024 the main option at Hawaiian Electric has been the Smart DER program, which replaced Customer Grid-Supply Plus and Smart Export for new applicants.",
      "Under Smart DER, exported energy is credited at rates that differ by time of day, with the most valuable window in the evening peak and a much lower value for midday exports, which is why nearly every new installation on Oahu, Maui and Hawaii Island is paired with a battery. A separate Bring Your Own Device program pays participants for sharing stored energy during peak hours. On Kauai, the KIUC cooperative runs its own purchase arrangements and is not part of the Hawaiian Electric tariffs, so check its current schedule before sizing a system.",
    ],
    incentives: [
      "Hawaii's Renewable Energy Technologies Income Tax Credit is one of the more generous state credits still in force: 35 percent of installed cost, capped at $5,000 per single-family residential system, taken in addition to any federal credit you qualify for. Unused credit can be carried forward, and a refundable election at a reduced amount exists for some filers; confirm the current rules with the Hawaii Department of Taxation.",
      "There is no statewide rebate or SREC market, but the state credit combined with electricity prices near 40 cents per kilowatt-hour gives Hawaii some of the shortest payback periods in the country. The Hawaii Green Infrastructure Authority has offered GEMS on-bill financing for eligible households; availability changes, so verify before counting on it.",
    ],
    utilities: [
      "Hawaiian Electric serves Oahu, Maui County and Hawaii Island as separate operating companies with separate rates, all among the highest in the nation because much of the generation still burns imported fuel. The Kauai Island Utility Cooperative serves Kauai independently. Hawaiian Electric has been introducing time-of-use pricing, and its fixed monthly customer charge is modest, so most of a bill is the volumetric energy charge that self-consumed solar offsets directly. Because export credits under Smart DER are low during the day, savings depend far more on shifting household use and battery discharge into the evening than on how many kilowatt-hours the roof produces.",
    ],
    sources: [
      { label: "Hawaii Public Utilities Commission", url: "https://puc.hawaii.gov/" },
      { label: "Hawaiian Electric customer renewable programs", url: "https://www.hawaiianelectric.com/products-and-services/customer-renewable-programs" },
      { label: "Hawaii State Energy Office", url: "https://energy.hawaii.gov/" },
    ],
  },

  ID: {
    netMetering: [
      "Idaho Power, which serves most of the state, moved new customers with on-site generation from traditional net metering to net billing after an Idaho Public Utilities Commission decision in late 2023. Energy you use as it is produced still offsets the full retail rate, but exports are measured in real time and credited at an export credit rate the utility updates each year, with higher values in summer and in evening hours. Those credits appear as a dollar amount on the bill rather than a bank of kilowatt-hours, and they are worth well under the retail price for most of the year. Systems in place before the December 2019 cutoff keep legacy net metering terms until 2045.",
      "The picture is different in the corners of Idaho served by other utilities. Rocky Mountain Power in the southeast and Avista in the north have continued to offer net metering with kilowatt-hour credits that roll forward month to month, with any surplus at the end of the annual cycle either paid out at a low rate or forfeited depending on the tariff. Cooperatives and municipal utilities set their own terms, so verify the export rules with your specific provider before assuming Idaho Power's structure applies.",
    ],
    incentives: [
      "Idaho does not offer a solar rebate or a renewable energy credit market, but it has an unusual state income tax deduction for residential alternative energy devices. Under Idaho Code 63-3022C, you can deduct 40 percent of the system cost in the year it is installed and 20 percent in each of the following three years, up to $5,000 per year and $20,000 in total. Because it is a deduction rather than a credit, the cash value depends on Idaho's flat income tax rate, which sits a little above 5 percent as of 2026, so the benefit is real but modest.",
      "Idaho does not exempt solar equipment from sales tax and has no statewide property tax exemption for residential systems, so include both in your cost estimate.",
    ],
    utilities: [
      "Idaho Power supplies roughly two-thirds of Idaho households from Boise to Twin Falls and Pocatello, with Rocky Mountain Power covering the southeast around Idaho Falls and Avista serving the Panhandle around Coeur d'Alene and Lewiston. Cooperatives and municipal systems fill in rural areas. Residential rates here are among the lowest in the country, generally near ten cents per kilowatt-hour, which stretches payback periods even though the high desert enjoys strong sunshine. Idaho Power offers an optional time-of-day plan and has sought higher fixed customer charges in recent rate cases; a bigger fixed charge cannot be offset by solar, so watch that line item when comparing bills.",
    ],
    sources: [
      { label: "Idaho Public Utilities Commission", url: "https://puc.idaho.gov/" },
      { label: "Idaho Office of Energy and Mineral Resources", url: "https://oemr.idaho.gov/" },
    ],
  },

  IL: {
    netMetering: [
      "For years Illinois homeowners with ComEd or Ameren Illinois received full retail net metering, with excess generation credited kilowatt-hour for kilowatt-hour and rolled forward through an annual period. That arrangement changed on January 1, 2025 under the Climate and Equitable Jobs Act (CEJA): customers who interconnect after that date are credited only for the supply portion of the rate on exported energy, not the delivery charges, which cuts the value of each exported kilowatt-hour roughly in half. Anyone already interconnected before the change keeps the legacy full retail treatment.",
      "To soften the transition, new customers become eligible for a one-time distributed generation rebate from their utility, paid per kilowatt of smart-inverter capacity, with an additional rebate for paired battery storage. In practice the new regime rewards self-consumption and storage rather than oversized systems that export heavily at midday. Municipal utilities and rural cooperatives are not bound by the CEJA rules and set their own policies, so check with your provider if you are outside ComEd and Ameren territory.",
    ],
    incentives: [
      "Illinois Shines, formally the Adjustable Block Program, is the state's main solar incentive and pays for the renewable energy credits a residential system will generate over 15 years, largely up front once the system is energized. The payment flows through an approved vendor and usually shows up as a discount on the contract price rather than a check to you; block prices step down as capacity fills, so the value of a system installed in 2026 differs from earlier years. Illinois Solar for All targets income-eligible households and environmental justice communities with contracts that limit or eliminate up-front cost and cap what you pay over time.",
      "Beyond those programs, Illinois assesses a solar system for property tax purposes as if it were conventional equipment, which limits the assessment increase, though there is no general sales tax exemption for residential solar. Check the Illinois Power Agency's program guidebook for the current block prices and eligibility.",
    ],
    utilities: [
      "Commonwealth Edison (ComEd) delivers power to Chicago and northern Illinois, Ameren Illinois covers most of central and southern Illinois, and MidAmerican serves the Quad Cities area, with a scattering of municipal utilities and cooperatives elsewhere. Illinois is a retail choice state, so your supply may come from the utility's default rate or an alternative supplier, and the supply price is now the part of the bill that determines export credit value for new solar customers. Both ComEd and Ameren offer hourly pricing plans that can raise savings for households with batteries or flexible loads but complicate the math for a solar-only home. Fixed monthly charges are moderate, and there are no residential demand charges at either utility as of 2026.",
    ],
    sources: [
      { label: "Illinois Shines (Adjustable Block Program)", url: "https://illinoisshines.com/" },
      { label: "Illinois Solar for All", url: "https://www.illinoissolarforall.com/" },
      { label: "Illinois Commerce Commission", url: "https://www.icc.illinois.gov/" },
    ],
  },

  IN: {
    netMetering: [
      "Indiana ended traditional net metering for customers of its investor-owned utilities through Senate Enrolled Act 309 of 2017, with the program closing to new enrollees no later than July 1, 2022. Homes that signed up before the cutoff keep retail net metering for a grandfathering period, until 2047 for systems interconnected before 2018 and until 2032 for those interconnected after. New rooftop systems at Duke Energy Indiana, AES Indiana, NIPSCO, CenterPoint and Indiana Michigan Power instead fall under an excess distributed generation (EDG) tariff.",
      "Under EDG, exports are credited at 125 percent of the utility's average wholesale energy price, which has typically worked out to only a few cents per kilowatt-hour, a fraction of the retail rate, and the netting happens instantaneously rather than over a month, a method the Indiana Supreme Court upheld in 2022. That makes exported energy much less valuable than power you consume as it is produced, so systems in Indiana are best sized to daytime loads or paired with storage. Rural electric cooperatives and municipal utilities were never covered by the statute and offer their own arrangements, some of them more favorable.",
    ],
    incentives: [
      "State-level support in Indiana is thin. The most useful item is a property tax exemption: the assessed value added by a solar system can be excluded from your property taxes if you file the deduction with your county assessor, so the installation should not raise your bill.",
      "There is no state income tax credit, no rebate program, no SREC market and no sales tax exemption for solar equipment, though some utilities and co-ops have run small efficiency or demand-response incentives. The Indiana Office of Energy Development periodically administers grants aimed at public entities and businesses rather than homeowners; verify current residential options before assuming any state money beyond the property tax treatment.",
    ],
    utilities: [
      "Duke Energy Indiana is the largest provider and covers much of central and southern Indiana, AES Indiana serves Indianapolis, NIPSCO covers the northern third of the state, CenterPoint Energy serves the Evansville area and Indiana Michigan Power serves the Fort Wayne and South Bend regions. Roughly a third of Hoosiers get power from cooperatives or municipal utilities with their own solar rules. Residential rates have risen sharply over the past decade and sit above the regional average at several IOUs, which improves the value of self-consumed solar. Most residential tariffs are flat-rate with a fixed monthly charge and no demand charge, though several utilities offer optional time-of-use plans; with low EDG export credits, the goal is to use as much of your production on site as possible.",
    ],
    sources: [
      { label: "Indiana Utility Regulatory Commission", url: "https://www.in.gov/iurc/" },
      { label: "Indiana Office of Energy Development", url: "https://www.in.gov/oed/" },
    ],
  },

  IA: {
    netMetering: [
      "Iowa's two investor-owned utilities, MidAmerican Energy and Interstate Power and Light (Alliant Energy), moved from conventional net metering to an inflow-outflow billing structure that state regulators approved after 2020 legislation. Your meter tracks energy pulled from the grid (inflow) and energy sent out (outflow) separately, and outflow is credited in kilowatt-hours at the retail energy rate, so for most homeowners the economics still resemble net metering as of 2026. Credits roll forward month to month, and once a year unused credits are cashed out at the utility's avoided-cost rate, which is far lower than retail, so a system sized well above annual usage earns little on the surplus.",
      "The statute allows the IOUs to seek a change in outflow compensation after 2027 or once distributed generation reaches a set share of peak demand, so the retail-value outflow credit is not guaranteed forever for new customers, though customers enrolled before any change are expected to keep their terms for a defined period. About half of Iowans are served by municipal utilities or rural electric cooperatives, which are not required to offer inflow-outflow billing and often credit exports at avoided cost instead; confirm your provider's policy before signing a contract.",
    ],
    incentives: [
      "Iowa once offered a state solar tax credit worth a share of the federal credit, but the residential program closed to installations completed after 2021 and the last waitlisted applications were funded in the years that followed, so a new system today receives no state income tax credit. What remains is favorable tax treatment: solar equipment is exempt from Iowa sales tax, and the value a system adds to a home is exempt from property tax for five full assessment years after installation.",
      "A number of co-ops and municipals run their own small rebate programs, and the Iowa Economic Development Authority operates loan and grant programs that are mostly aimed at businesses and farms rather than households.",
    ],
    utilities: [
      "MidAmerican Energy serves Des Moines, Iowa City, Sioux City and the Quad Cities region, while Alliant Energy's Interstate Power and Light covers Cedar Rapids, Dubuque, Ames and much of eastern and central Iowa. The rest of the state relies on a large number of municipal utilities and cooperatives. Rates are near the national average, and Alliant's residential rates run noticeably higher than MidAmerican's. Standard residential tariffs are flat-rate with a fixed customer charge; both IOUs offer optional time-of-use plans, and there are no residential demand charges as of 2026, so solar savings track closely with the energy rate.",
    ],
    sources: [
      { label: "Iowa Utilities Commission", url: "https://iuc.iowa.gov/" },
    ],
  },

  KS: {
    netMetering: [
      "Kansas law requires investor-owned utilities to offer net metering to residential systems up to 15 kilowatts, and Evergy credits excess generation in kilowatt-hours that carry forward from month to month. At the end of the annual cycle any remaining surplus is compensated at a rate tied to the utility's system average cost rather than retail, so the value of large overproduction is limited. A 2014 amendment let utilities place customers with self-generation into a separate rate class, which set up years of dispute over what those customers should pay.",
      "Evergy, then operating as Westar and KCP&L, won approval in 2018 for a demand charge on residential solar customers, but the Kansas Supreme Court struck it down in 2020 as discriminatory pricing, and the Kansas Corporation Commission has since revisited how distributed generation customers are billed. Homeowners considering solar should read the current DG rate schedule closely, because the terms have shifted more than once. Cooperatives and municipal utilities, which serve a large share of rural Kansas, set their own policies and often pay avoided cost for exports.",
    ],
    incentives: [
      "Kansas has no state solar tax credit, no rebate program and no renewable energy credit market for homeowners. The main state benefit is a property tax exemption: a residential solar system installed after 2016 is exempt from property tax for ten years following installation, which keeps a rooftop array from raising your assessment during most of its payback period.",
      "Solar equipment is subject to Kansas sales tax, and there are no state-backed loan programs specific to residential solar as of 2026, though rural customers may qualify for USDA programs on agricultural properties. Strong sunshine across much of the state and relatively low install costs help, but without state money the economics rest on the federal credit and the utility's net metering terms.",
    ],
    utilities: [
      "Evergy, formed from the merger of Westar Energy and Kansas City Power and Light, serves the majority of Kansans through its Kansas Central and Kansas Metro divisions, covering Wichita, Topeka and the Kansas side of the Kansas City area. Liberty (formerly Empire District Electric) serves a corner of the southeast, and dozens of cooperatives and municipal utilities such as Midwest Energy and the Kansas City Board of Public Utilities cover the rest. Evergy offers optional time-of-use plans and carries a larger fixed customer charge than many utilities, which erodes savings from smaller systems. The rate-class history at the KCC means solar customers should compare the DG tariff with the standard residential rate before assuming retail-value offsets.",
    ],
    sources: [
      { label: "Kansas Corporation Commission", url: "https://www.kcc.ks.gov/" },
    ],
  },

  KY: {
    netMetering: [
      "Kentucky rewrote its net metering statute with Senate Bill 100 in 2019, keeping the program name but letting the Public Service Commission set the value of exported energy for customers who interconnect after 2020. In cases decided in 2021 and later, the PSC approved export credits for Louisville Gas and Electric and Kentucky Utilities at a rate below retail, reflecting the utilities' avoided energy and capacity costs rather than the full delivered price, and similar structures followed for Kentucky Power and Duke Energy Kentucky. Exports are netted over short intervals and the credit is applied as a dollar amount, so the economics favor consuming your own production.",
      "Households whose systems were interconnected before the 2020 changeover retain retail kilowatt-hour net metering for 25 years, which is why some older systems look far more lucrative than a new one will. Cooperatives in the Tennessee Valley Authority footprint in western and southern Kentucky follow TVA's distributed generation programs rather than the PSC-approved tariffs, and East Kentucky Power Cooperative members have their own approved terms. Confirm the exact export rate and netting interval with your provider, since the PSC revisits these rates in periodic rate cases.",
    ],
    incentives: [
      "Kentucky offers almost nothing at the state level for rooftop solar. A state tax credit for renewable energy systems expired at the end of 2015 and has not been revived, and there is no rebate program, no SREC market, no sales tax exemption and no statewide property tax exemption for residential solar equipment.",
      "The Kentucky Office of Energy Policy administers federal pass-through programs that occasionally include home energy grants, and some cooperatives run small efficiency rebates, but do not count on state money when estimating payback. That leaves the federal credit and below-retail export compensation to carry the math, so sizing the system against daytime consumption matters more here than in states with richer incentives.",
    ],
    utilities: [
      "Louisville Gas and Electric and Kentucky Utilities, both owned by PPL, serve Louisville, Lexington and most of central Kentucky; Kentucky Power (AEP) covers the eastern coalfield counties; Duke Energy Kentucky serves the northern Kentucky suburbs of Cincinnati. Rural electric cooperatives, many supplied by East Kentucky Power Cooperative or the Tennessee Valley Authority, cover much of the rest. Residential rates in Kentucky have historically been among the lowest in the eastern United States, though Kentucky Power's rates run considerably higher than LG&E and KU. Most tariffs are flat-rate with a fixed monthly charge, and the PSC has approved optional time-of-day rates; low energy rates combined with reduced export value make Kentucky payback periods longer than the national average.",
    ],
    sources: [
      { label: "Kentucky Public Service Commission", url: "https://psc.ky.gov/" },
      { label: "Kentucky Office of Energy Policy", url: "https://eec.ky.gov/Energy/" },
    ],
  },

  LA: {
    netMetering: [
      "The Louisiana Public Service Commission ended retail net metering for new customers with a 2019 rule that took effect at the start of 2020. Systems interconnected under the old rules were grandfathered for 15 years, through the end of 2034, and continue to receive kilowatt-hour credits at the full retail rate. A home going solar now with Entergy Louisiana, Cleco or SWEPCO instead has its exports credited at the utility's avoided cost, a wholesale-based rate typically only a few cents per kilowatt-hour, while energy consumed on site still offsets the retail price.",
      "Because the new rule nets consumption and production within short intervals rather than across a month, timing matters: a family that is out during the day exports most of its production at the low rate. New Orleans is a special case, since Entergy New Orleans is regulated by the New Orleans City Council rather than the LPSC and has followed its own net metering rules, which should be confirmed separately. Cooperatives such as DEMCO and SLEMCO set their own export terms under LPSC oversight.",
    ],
    incentives: [
      "Louisiana once had one of the country's most generous state solar tax credits, worth up to half of system cost, but it was capped and then phased out for purchased systems installed after 2015, and nothing comparable has replaced it. As of 2026 there is no state credit, no rebate and no renewable energy credit market for residential solar.",
      "Solar equipment on a residence is exempt from ad valorem property tax under state law, so an array should not raise your assessment. The Louisiana Department of Energy and Natural Resources runs programs financed by federal funds, including Home Energy Rebates aimed at efficiency; check whether any current program applies to solar before counting on it.",
    ],
    utilities: [
      "Entergy Louisiana serves the largest share of the state, including Baton Rouge and much of south and north Louisiana, with Entergy New Orleans covering the city. Cleco Power serves central Louisiana and parts of the south, SWEPCO covers the Shreveport area, and cooperatives fill in rural parishes. Retail rates are below the national average because natural gas is cheap in the region, which lengthens payback despite abundant sunshine. Residential tariffs are largely flat-rate with fixed customer charges, and Entergy's fuel and storm recovery riders swing bills seasonally; heavy summer air conditioning means daytime solar production lines up well with consumption, which is the main lever for savings under avoided-cost export pricing.",
    ],
    sources: [
      { label: "Louisiana Public Service Commission", url: "https://www.lpsc.louisiana.gov/" },
    ],
  },

  ME: {
    netMetering: [
      "Maine compensates rooftop solar through net energy billing (NEB), which comes in two forms. The kilowatt-hour credit option, used by nearly all residential customers, credits exports one-for-one against future usage, covering both supply and delivery portions, with credits carried forward for twelve months before expiring. A separate tariff-rate option pays a fixed dollar rate per kilowatt-hour and was designed mainly for commercial and community projects.",
      "NEB expanded sharply after 2019 legislation raised project size limits and allowed shared projects, and the resulting costs have been spread across all ratepayers through Central Maine Power and Versant delivery rates. That drew scrutiny from the Governor's Energy Office, the Public Utilities Commission and the Legislature, which enacted reforms in 2023 and 2025 to curb new large and community projects while largely preserving small rooftop systems. As of 2026 a homeowner can still enroll in kWh-credit NEB, but check the PUC's current rules before assuming the terms will hold for decades.",
    ],
    incentives: [
      "Maine has no state solar tax credit, rebate or SREC market for residential systems; net energy billing is the primary state-level benefit. Efficiency Maine, the state's efficiency agency, directs most of its incentive money toward heat pumps, weatherization and electric vehicles rather than solar, though its low-interest home energy loans can sometimes be used for a solar project.",
      "A property tax exemption for solar energy equipment installed after 2019 shields the added value from local assessment; apply through your municipal assessor. Federal money passed through the Governor's Energy Office has funded programs for low-income households, and community solar subscriptions remain an option for homes that cannot host panels.",
    ],
    utilities: [
      "Central Maine Power, owned by Avangrid, delivers electricity to southern and central Maine, and Versant Power serves the Bangor region and northern Maine through two districts with different rates. A handful of consumer-owned utilities, such as Kennebunk Light and Power and Madison Electric Works, serve their towns directly. Maine is a restructured market, so most households buy supply through the PUC-set standard offer while paying the utility for delivery, and both parts are covered by a solar credit under the kWh option. Delivery rates have climbed with grid investment and NEB cost recovery, and total rates are among the highest in the Northeast, which is why payback here can be reasonable despite Maine's modest sun; time-of-use delivery rates are offered but rarely chosen, and fixed charges are moderate.",
    ],
    sources: [
      { label: "Maine Public Utilities Commission", url: "https://www.maine.gov/mpuc/" },
      { label: "Maine Governor's Energy Office", url: "https://www.maine.gov/energy/" },
      { label: "Efficiency Maine", url: "https://www.efficiencymaine.com/" },
    ],
  },

  MD: {
    netMetering: [
      "Maryland still offers full retail net metering to homeowners at all of its regulated utilities, with exports credited kilowatt-hour for kilowatt-hour and carried forward from month to month. Each April, any accumulated surplus is paid out at the utility's commodity energy rate, roughly the supply portion of your bill rather than the full retail price, so a system sized to about a year's usage captures the most value. The statewide program cap was raised to 3,000 megawatts, well above current enrollment, so capacity is not a near-term concern.",
      "Legislation passed in 2024 broadened net metering aggregation, letting a customer apply credits from a system on one property to other accounts they hold in the same utility territory, and the Public Service Commission has been implementing the associated rule changes. Maryland also allows virtual net metering through community solar, which the General Assembly made permanent in 2023. The rules are more stable than in most states, but verify the current interconnection and aggregation details with your utility, since PSC dockets on distributed generation remain active.",
    ],
    incentives: [
      "Maryland offers more state-level help than most Mid-Atlantic states. The Maryland Energy Administration's Residential Clean Energy Rebate Program has paid a flat $1,000 for qualifying rooftop solar systems, subject to annual funding and application windows that can close early, so apply promptly after installation. Solar renewable energy certificates (SRECs) provide ongoing income: the state renewable portfolio standard includes a solar carve-out, and homeowners can sell one SREC for every megawatt-hour produced, at prices that have ranged widely and should be checked before you estimate revenue.",
      "Solar equipment is exempt from the state sales tax and from state property tax, and several counties, including Anne Arundel, Baltimore, Harford and Prince George's, have offered their own property tax credits. The Maryland Solar Access Program adds grants for low-to-moderate income households; program details and budgets change each fiscal year, so confirm with MEA.",
    ],
    utilities: [
      "Baltimore Gas and Electric serves Baltimore and central Maryland, Pepco covers Montgomery and Prince George's counties, Delmarva Power serves the Eastern Shore, Potomac Edison (FirstEnergy) covers western Maryland, and the Southern Maryland Electric Cooperative serves the counties south of Washington, with Choptank Electric Cooperative and a few municipal utilities covering the rest. Maryland is a retail choice state, so supply comes either from the utility's standard offer service or a third-party supplier while the utility handles delivery. Standard residential tariffs are flat-rate with a modest fixed charge and no demand charges, and BGE and Pepco offer optional time-of-use plans; because net metering credits the full retail rate, savings track directly with the combined supply and delivery price, which has risen substantially in recent years.",
    ],
    sources: [
      { label: "Maryland Energy Administration", url: "https://energy.maryland.gov/" },
      { label: "Maryland Public Service Commission", url: "https://www.psc.state.md.us/" },
    ],
  },
};
