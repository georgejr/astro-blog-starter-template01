import type { StateNotesMap } from './types';

// Batch 3: MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ.
// Editorial notes written September 2026. Program terms drift; every
// paragraph hedges the moving parts rather than quoting figures we cannot
// stand behind.
export const batch3: StateNotesMap = {
  MA: {
    netMetering: [
      'Massachusetts still credits exported solar at close to the full retail rate for typical rooftop systems. A home array of 10 kW or less (25 kW on a three-phase service) is exempt from the statewide net metering caps, so a homeowner does not have to worry about a utility territory running out of room. Credits accrue in dollars rather than kilowatt-hours and roll forward month to month without expiring, and surplus credits can even be assigned to another account on the same utility.',
      'Larger installations, such as a big barn roof over 25 kW, fall into the "market net metering credit" tier that pays roughly 60 percent of retail, and they count against the caps that have periodically filled up at National Grid. For a house, a kilowatt-hour sent out at midday is worth about the same as one bought at night, which is why sizing to 100 percent of annual usage works well here.',
    ],
    incentives: [
      'The Solar Massachusetts Renewable Target (SMART) program pays a fixed per-kilowatt-hour incentive for ten years on residential systems, on top of the bill savings from net metering. Blocks of capacity have declined in value as they filled, and the Department of Energy Resources adopted a revised "SMART 3.0" structure that changes eligibility, adders and payment mechanics, so verify what the current block pays before you sign a contract. The incentive is administered through the utilities and paid to whoever owns the system, which matters if you lease.',
      'The state also offers a 15 percent residential income tax credit worth up to $1,000, a sales tax exemption on solar equipment, and a 20-year exemption from added property tax on the system. Owners who add a battery can enroll in ConnectedSolutions through Eversource or National Grid under Mass Save, which pays a seasonal amount per kilowatt of average discharge during summer peak events.',
    ],
    utilities: [
      'Eversource and National Grid serve most of the state, with Unitil covering Fitchburg and a few nearby towns and roughly 40 municipal light plants (Braintree, Reading, Taunton and others) running their own systems. Municipal customers often pay far less per kilowatt-hour and are not covered by the state net metering statute, so their solar payback tends to be longer. On the investor-owned side, Massachusetts residential rates run above 30 cents per kilowatt-hour once supply and delivery are combined, among the highest in the country, which is the main reason solar payback periods here are short despite the modest sunshine.',
    ],
    sources: [
      { label: 'Massachusetts SMART program (DOER)', url: 'https://www.mass.gov/info-details/solar-massachusetts-renewable-target-smart-program' },
    ],
  },

  MI: {
    netMetering: [
      'Traditional net metering ended in Michigan after the 2016 energy laws, and new customers at DTE Energy and Consumers Energy enroll in a "distributed generation" program instead. The tariff separates inflow from outflow: power you draw from the grid is billed at the full retail rate, while power you send out is credited only at the power-supply component of the rate, which leaves out most distribution charges. In practice an exported kilowatt-hour is worth somewhere around half to two-thirds of an imported one, and the exact figure depends on your rate schedule, so ask your utility for the current outflow credit.',
      'For years each utility could stop accepting new participants once enrolled capacity reached 1 percent of its average peak load, and Consumers Energy hit that ceiling before voluntarily raising it. The 2023 clean energy legislation lifted the statutory limit substantially (to 10 percent of average peak load), so queue risk is no longer a practical concern for a home installation as of 2026. Since exports are worth less than imports, a system sized a little below annual usage, or paired with a battery, usually pencils out better than an oversized one.',
    ],
    incentives: [
      'Michigan has no state tax credit, rebate or performance payment for residential solar, and neither of the big utilities offers a rooftop incentive of note. The one statewide program worth knowing is Michigan Saves, the nonprofit green bank, whose authorized lenders offer below-market financing for solar and battery projects. Solar equipment is not exempt from the 6 percent sales tax.',
      'On the property tax side, a 2019 change allows an alternative energy system on a home to be excluded from a true-cash-value reassessment, though how assessors apply it varies by township, so confirm with your local assessor. The federal credit therefore does most of the heavy lifting here, and the case for going solar rests on the utility rate itself rather than on state programs.',
    ],
    utilities: [
      'DTE Energy serves southeast Michigan including Detroit, Consumers Energy covers most of the rest of the Lower Peninsula, and smaller providers such as Indiana Michigan Power, Upper Peninsula Power, the Lansing Board of Water and Light, and co-ops like Cherryland and Great Lakes Energy fill in the remainder. Both DTE and Consumers moved residential customers onto default time-of-use pricing, with summer afternoon and evening peaks priced well above overnight rates. A south- or west-facing array offsets those expensive hours directly, and the same peak-to-off-peak gap is what makes a battery attractive here.',
    ],
    sources: [
      { label: 'Michigan Saves financing', url: 'https://michigansaves.org' },
      { label: 'Michigan Public Service Commission', url: 'https://www.michigan.gov/mpsc' },
    ],
  },

  MN: {
    netMetering: [
      'Minnesota was the first state to require net metering, and the statute still covers every utility, including cooperatives and municipal systems. Systems under 40 kW at investor-owned utilities are credited at the retail rate, and a homeowner can choose either to roll surplus forward as a bill credit or to be paid for it monthly. Co-ops and munis must offer net metering too, though many of them apply their own fixed monthly fees to solar customers, which the legislature permitted and which can noticeably trim savings.',
      'The state pioneered the "value of solar" methodology in 2014 as an alternative to net metering, but as of 2026 Xcel Energy uses it only for community solar garden subscriptions, not for rooftop arrays. Systems between 40 kW and 1 MW at the investor-owned utilities fall under different compensation rules, so this matters only for a very large residential or farm installation.',
    ],
    incentives: [
      'Xcel Energy customers can apply for Solar*Rewards, a performance-based payment per kilowatt-hour over ten years for systems under 20 kW, with a higher payment tier for income-qualified households. Funding is allocated annually and applications open in waves, so the program can close partway through a year; check availability before you count on it. Minnesota Power and some co-ops have run their own smaller rebate programs in the past, and several co-ops still offer them intermittently.',
      'Solar equipment is exempt from state sales tax, and the value of a residential PV system is excluded from property tax under state law. Minnesota also has no statewide solar income tax credit, so the combination of net metering, Solar*Rewards where available and the federal credit makes up the full picture.',
    ],
    utilities: [
      'Xcel Energy is by far the largest provider, serving the Twin Cities and much of southern Minnesota, while Minnesota Power covers the Duluth and Iron Range region and Otter Tail Power serves the west. The remaining customers are split among municipal utilities and roughly four dozen rural electric cooperatives supplied by Great River Energy and other generation-and-transmission co-ops. Xcel residential rates sit near the national average, and its optional time-of-use plan can raise or lower solar value depending on when a household uses power. Co-op customers should ask specifically about the fixed monthly charge for distributed generation before signing a contract, since it is the single biggest variable in Minnesota solar economics.',
    ],
    sources: [
      { label: 'Minnesota Department of Commerce', url: 'https://mn.gov/commerce' },
    ],
  },

  MS: {
    netMetering: [
      'Mississippi does not offer retail-rate net metering. Under the Public Service Commission rules first adopted in 2015 and revised in 2022, Entergy Mississippi and Mississippi Power credit exported energy at the utility avoided cost plus a fixed adder per kilowatt-hour, and the adder is larger for income-qualified customers. Because avoided cost is a wholesale-type figure, an exported kilowatt-hour is worth substantially less than one you would have bought, so self-consumption drives most of the savings.',
      'The 2022 revisions added an upfront cash benefit for early residential participants, with a larger amount for low-income households, subject to enrollment limits that may already be exhausted, so ask the utility whether that benefit is still available. Electric cooperatives, which serve a large share of the state, and the northern counties supplied through TVA are outside these rules and set their own distributed generation terms.',
    ],
    incentives: [
      'There is no Mississippi state tax credit, sales tax exemption or property tax exemption for home solar as of 2026, and the state has not funded a residential rebate. The low-income adder and the early-adopter benefit inside the net metering rule are the only state-driven sweeteners, and both apply solely to Entergy Mississippi and Mississippi Power customers.',
      'For everyone else the federal investment tax credit is the whole incentive stack, so the financial case leans on inexpensive installation pricing, high summer air-conditioning loads that a rooftop array offsets directly, and rising utility rates. A battery paired with the system can raise savings by shifting exported energy into evening self-use, though it also adds cost that the state does nothing to offset.',
    ],
    utilities: [
      'Entergy Mississippi supplies the western half of the state including Jackson, Mississippi Power covers the Gulf Coast and southeast, and 25 electric cooperatives (many supplied by Cooperative Energy, others by TVA) serve most rural areas. Residential rates are below the national average, which stretches payback periods compared with the Northeast, but bills are still large because summer usage is heavy. Neither investor-owned utility defaults residential customers to time-of-use pricing, so a flat rate plus avoided-cost export credit is the normal arrangement, and your savings scale with how much of the daytime output you use inside the house.',
    ],
    sources: [
      { label: 'Mississippi Public Service Commission', url: 'https://www.psc.ms.gov' },
    ],
  },

  MO: {
    netMetering: [
      'Under the Missouri Easy Connection Act, every electric utility must offer net metering for systems up to 100 kW, and residential exports are credited at the retail energy rate. Any surplus in a month becomes a kilowatt-hour credit applied to the next bill, and the credits keep rolling forward through a 12-month cycle. Whatever remains unused at the end of that cycle is forfeited to the utility with no payment, so a system sized above annual consumption gives away its extra output.',
      'Ameren Missouri and Evergy both handle interconnection under the same statute, though each has its own application, fee and inspection process, and municipal utilities such as City Utilities of Springfield and Columbia Water & Light follow the same rules. Because the credit is essentially retail, orientation matters less here than in states with net billing, and a battery is an optional convenience rather than a necessity for value.',
    ],
    incentives: [
      'The state renewable energy standard passed by voters in 2008 required Ameren and Evergy to pay per-watt rebates on customer solar, and those rebates helped launch the market, but they stepped down over time and have largely ended or been exhausted; check the utility website for any remaining program before assuming a payment. Missouri offers no state income tax credit for solar.',
      'Solar systems on a home are exempt from property tax under state law, a point the legislature clarified in 2022 after some counties began assessing them. The Missouri Division of Energy has periodically run low-interest energy loan programs, and some co-ops and munis offer their own small rebates, so it is worth a call to your specific provider.',
    ],
    utilities: [
      'Ameren Missouri serves St. Louis and eastern Missouri, Evergy covers Kansas City and the western counties, and Liberty (formerly Empire District) supplies the southwest around Joplin, with municipal utilities and about 40 rural cooperatives handling the rest. Residential rates are among the lower ones in the Midwest, roughly in the low-to-mid teens of cents per kilowatt-hour, which lengthens payback relative to coastal states but has been rising steadily. Both investor-owned utilities have introduced optional time-of-use plans; on the standard flat rate a south-facing roof and full-retail net metering keep the math simple.',
    ],
    sources: [
      { label: 'Missouri Public Service Commission', url: 'https://psc.mo.gov' },
    ],
  },

  MT: {
    netMetering: [
      'NorthWestern Energy, which serves most Montanans, must net meter systems up to 50 kW, and the same statute applies to Montana-Dakota Utilities in the east. Exports offset consumption one for one at the retail rate within the billing month, and any surplus carries forward as a kilowatt-hour credit. At the end of an annual period, remaining credits are granted to the utility without compensation, so the design rewards matching system size to yearly usage rather than overbuilding.',
      'The Public Service Commission has rejected NorthWestern proposals to add demand charges or reduce export credits for solar customers, and the retail-rate arrangement has held through 2026, though the utility periodically revisits the topic in rate cases. Rural electric cooperatives, which cover much of the state geographically, are not bound by the same statute and often have their own net metering or net billing tariffs with different size limits.',
    ],
    incentives: [
      'Montana repealed its Alternative Energy Systems income tax credit beginning with the 2022 tax year, so the state credit that older articles mention no longer exists. What remains is a property tax exemption that shields a residential solar system from adding to assessed value for ten years after installation, and the absence of a state sales tax means no tax is charged on equipment in the first place.',
      'The Department of Environmental Quality runs the Alternative Energy Revolving Loan Program, which offers fixed-rate loans for homeowners installing solar, and terms are set each year. Beyond that there are no statewide rebates, though some co-ops and NorthWestern have occasionally run small efficiency or battery pilots.',
    ],
    utilities: [
      'NorthWestern Energy serves the populous western and central corridor including Billings, Missoula, Bozeman and Helena; Montana-Dakota Utilities covers the eastern plains; and 25 rural cooperatives such as Flathead Electric and Yellowstone Valley Electric serve everyone else. NorthWestern has pushed through significant rate increases since 2023, moving residential prices from below average toward the middle of the pack, which improves solar returns. Its residential tariff is a flat rate, so the value of an exported kilowatt-hour is the same as an imported one and roof orientation matters mainly for total production.',
    ],
    sources: [
      { label: 'Montana Public Service Commission', url: 'https://psc.mt.gov' },
    ],
  },

  NE: {
    netMetering: [
      'Nebraska is the only state served entirely by public power, and state law requires every district and municipal utility to net meter systems of 25 kW or less. Exports offset use within the month at retail, surplus carries forward as a credit, and at the end of each annual period the utility pays for any remaining excess at its avoided-cost rate. That payout is small compared with the retail rate, so it acts as a floor rather than a reward for oversizing.',
      'The law also caps net metering at 1 percent of a utility\'s peak demand, a threshold no major provider has approached. Because each utility writes its own tariff within the statute, details such as the avoided-cost figure, meter fees and whether a system above 25 kW can interconnect on other terms vary between OPPD, NPPD, LES and the smaller municipals.',
    ],
    incentives: [
      'No state tax credit, rebate or SREC-style payment exists for residential solar in Nebraska as of 2026, and solar equipment is not exempt from sales tax. The Dollar and Energy Saving Loan program, administered through the state energy office and local lenders, has historically offered low-interest financing for renewable installations, though funding and rate terms change from year to year.',
      'Some public power utilities have run their own programs, such as OPPD community solar subscriptions and LES sustainable energy incentives, and these can be worth asking about even if they are not rooftop rebates. Otherwise the 30 percent federal credit and Nebraska\'s reasonable installation costs carry the economics.',
    ],
    utilities: [
      'Omaha Public Power District serves the Omaha metro, Lincoln Electric System covers Lincoln, and Nebraska Public Power District supplies much of the rest of the state directly or as wholesale to municipal and rural systems. Public power keeps residential rates among the lowest in the country, which is good for bills but makes solar payback longer than the national average. OPPD has moved toward rate designs with higher fixed charges and optional time-of-use plans, and LES bills by season; in both cases the fixed component is unaffected by solar, so savings come only from the energy portion of the bill.',
    ],
    sources: [
      { label: 'Omaha Public Power District', url: 'https://www.oppd.com' },
      { label: 'Nebraska Public Power District', url: 'https://www.nppd.com' },
    ],
  },

  NV: {
    netMetering: [
      'Nevada restored net metering in 2017 with Assembly Bill 405 after a period in which exports had been cut to wholesale value and the residential market collapsed. The law set four tiers of export credit as a percentage of retail, stepping down from 95 percent to 75 percent as each 80 MW block filled, and new NV Energy customers have been in the final 75 percent tier for several years. Once enrolled, that percentage is guaranteed for 20 years, and unused credits roll over indefinitely rather than resetting annually.',
      'A 75 percent credit still makes exporting worthwhile, but it creates a modest advantage for using power on site, which is why time-of-use rates and batteries feature heavily in Nevada proposals. Customers of cooperatives such as Valley Electric Association or municipal providers like Boulder City are outside the NV Energy tariff and should confirm the local rule.',
    ],
    incentives: [
      'Nevada does not have a state income tax and therefore no solar income tax credit. State law exempts qualifying renewable energy systems from adding to a property\'s assessed value, and Nevada has granted sales and property tax abatements to renewable projects, although the abatements are aimed at utility-scale developers rather than homeowners. Verify with your county assessor how a residential array is treated.',
      'NV Energy has offered a residential battery storage incentive for customers who pair storage with solar and enroll in a time-of-use rate, with the payment sized to the battery capacity and larger for those on TOU pricing; the program has budget caps and has been revised more than once, so check its status directly. The utility also runs a solar access program that reduces bills for income-qualified customers without requiring a rooftop system.',
    ],
    utilities: [
      'NV Energy, operating as Nevada Power in the south and Sierra Pacific Power in the north, serves nearly 90 percent of the state, with Valley Electric Association, Overton Power, Mt. Wheeler Power and a few municipal systems covering the rest. Rates in southern Nevada are moderate, and summer cooling loads in Las Vegas are enormous, so a rooftop system displaces a large volume of expensive afternoon consumption. NV Energy\'s optional time-of-use plan prices late-afternoon and evening summer hours much higher than the rest of the day, which helps solar-plus-storage households and can hurt a solar-only home whose usage peaks after sunset.',
    ],
    sources: [
      { label: 'Public Utilities Commission of Nevada', url: 'https://puc.nv.gov' },
    ],
  },

  NH: {
    netMetering: [
      'New Hampshire replaced full retail net metering in 2017 with a net metering tariff that credits monthly surplus at the default energy service rate plus the transmission charge plus a quarter of the distribution charge. Non-bypassable items such as the system benefits charge and stranded cost recovery are not credited, so an exported kilowatt-hour is worth less than an imported one but still captures most of the bill. Within a billing month, however, solar output offsets consumption at the full rate.',
      'Credits carry forward without expiring, and customers can request a cash-out of accumulated credits once a year. Systems up to 100 kW qualify under the small-customer rules, and legislation since 2022 has pushed the upper limit for larger customer-generators to 5 MW, a change that matters for farms and towns more than for a typical house.',
    ],
    incentives: [
      'The Department of Energy administers a residential renewable electric rebate funded through the Renewable Energy Fund; it pays a per-watt amount with a cap around a thousand dollars, and it has been suspended or waitlisted when annual funding runs out, so confirm availability before you rely on it. Because the state has no sales tax, equipment is purchased tax-free, and there is no state income tax on wages that a credit could offset.',
      'Property tax treatment is set town by town: state law lets each municipality adopt an exemption for solar systems, and most larger towns have, but some have not, so check with your town office. Utilities also offer time-of-use and battery pilot programs, including a Liberty Utilities battery program that has operated in phases.',
    ],
    utilities: [
      'Eversource serves most of the state, Unitil covers the Seacoast around Portsmouth and the Concord area, Liberty Utilities handles a band from Salem to Lebanon, and New Hampshire Electric Cooperative supplies much of the rural north and Lakes Region under its own board-set net metering policy. Municipal systems in Wolfeboro, Woodsville and a few other towns round out the map. Residential rates are high, typically well above 20 cents per kilowatt-hour once supply and delivery are combined, which shortens payback even with the trimmed export credit, and default energy service prices reset twice a year, so the credit value moves with them.',
    ],
    sources: [
      { label: 'New Hampshire Department of Energy', url: 'https://www.energy.nh.gov' },
      { label: 'New Hampshire Public Utilities Commission', url: 'https://www.puc.nh.gov' },
    ],
  },

  NJ: {
    netMetering: [
      'New Jersey offers full retail net metering: exported kilowatt-hours offset imported ones at the same rate, and any monthly surplus rolls forward as a credit. At the close of a 12-month annualized period, which the customer may choose, remaining credits are paid out at the utility avoided-cost or wholesale rate, a figure much lower than retail. Sizing a system to roughly annual consumption keeps the year-end payout small and the retail-rate offset large.',
      'Every investor-owned utility follows the same Board of Public Utilities rules, and there is no statewide capacity cap that has restricted residential enrollment. Municipal utilities in Vineland, Butler and a handful of other towns run separate programs.',
    ],
    incentives: [
      'The Successor Solar Incentive (SuSI) program pays residential net-metered owners through its Administratively Determined Incentive track, issuing one SREC-II for each megawatt-hour produced at a fixed price for 15 years. The residential rate was set at $85 per SREC-II when the program launched in 2021; verify the current figure with the NJ Clean Energy Program, since the Board has adjusted other SuSI tiers over time. Your registration must be approved before the system is energized, so a licensed installer should handle it.',
      'Solar equipment and installation are exempt from the state sales tax, and a residential system is exempt from property tax. Income-qualified households can pursue community solar subscriptions and the state\'s federally funded low-income solar initiatives, and the utilities offer on-bill or third-party financing in some territories.',
    ],
    utilities: [
      'PSE&G serves the densely populated corridor from Bergen County through Newark to Trenton, Jersey Central Power & Light covers the northwest and much of the Shore, Atlantic City Electric supplies the south, and Rockland Electric serves a small area near the New York line. Residential rates rose sharply in 2025 as regional capacity costs flowed through, pushing typical all-in prices above 20 cents per kilowatt-hour, which improves the solar payback. Supply can be purchased from a third-party retailer, but net metering credits are applied through the utility, and the default flat residential rate means exports are worth the same as imports at any hour.',
    ],
    sources: [
      { label: 'NJ Clean Energy Program', url: 'https://njcleanenergy.com' },
      { label: 'New Jersey Board of Public Utilities', url: 'https://www.nj.gov/bpu' },
    ],
  },
};
