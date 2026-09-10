import type { StateNotesMap } from './types';

export const batch5: StateNotesMap = {
  SD: {
    netMetering: [
      "There is no statewide net metering mandate in South Dakota, which puts it in a small minority of states. Utilities are only required to buy surplus generation under the federal PURPA framework, and most of them pay an avoided-cost rate for every kilowatt-hour that flows onto the grid rather than crediting it at the retail price. That avoided-cost figure is tied to wholesale power costs and is typically a fraction of what you pay for electricity, so exported energy is worth much less than energy you use yourself.",
      "A few cooperatives and municipal utilities have chosen to offer net-metering-style crediting on their own, and the investor-owned utilities each have a distributed generation tariff with its own buyback rate and metering setup. Because the arrangement lives in individual tariffs instead of state law, ask your utility for its current small-generator or cogeneration schedule before sizing a system. Arrays sized to match daytime use, or paired with a battery, tend to pencil out better here than oversized systems that lean on exports.",
    ],
    incentives: [
      "South Dakota offers no state income tax credit for solar, mainly because the state has no personal income tax to credit against. The one meaningful state-level break is a property tax exemption for renewable energy systems under five megawatts: a portion of the assessed value the system adds to your home is excluded from taxation, calculated as the greater of a fixed dollar amount or a percentage of the system's value. Check with your county director of equalization about how it is applied locally.",
      "State sales and use tax still applies to equipment and installation, so include it when comparing quotes. Beyond the 30 percent federal credit, some rural cooperatives run occasional rebates or on-bill financing, and the USDA REAP grant can cover a share of costs for farms and rural small businesses.",
    ],
    utilities: [
      "Black Hills Energy serves Rapid City and much of the western part of the state, Xcel Energy covers Sioux Falls and nearby communities, NorthWestern Energy handles a swath of eastern towns, and Otter Tail Power and MidAmerican serve smaller pockets. Most rural customers buy from a member cooperative supplied by East River Electric or Rushmore Electric, while roughly three dozen municipal utilities take power through Missouri River Energy Services or Heartland Energy. Residential rates sit near the national average, and because most of these utilities pay avoided cost for exports, the value of solar depends heavily on how much of your output you consume on site.",
    ],
    sources: [
      { label: "South Dakota Public Utilities Commission", url: "https://puc.sd.gov/" },
    ],
  },

  TN: {
    netMetering: [
      "Almost the entire state buys its power from the Tennessee Valley Authority, and TVA does not allow its local power companies to offer traditional net metering. Instead, a rooftop system reduces the electricity you pull from the grid at your normal retail rate, while any surplus that flows back is purchased separately at TVA's avoided-cost rate through its Dispersed Power Production arrangement. The older Green Power Providers program, which paid a premium for all generation, closed to new participants at the end of 2019 and is not coming back.",
      "Getting connected runs through your local power company's Green Connect interconnection process, which sets the metering configuration and paperwork. Because the export rate is far lower than retail, installers in the Valley usually size systems to match daytime loads rather than to cover an entire annual bill. Northeast Tennessee around Kingsport is served by Appalachian Power rather than TVA and follows that utility's own distributed generation terms, so check which supplier you have before assuming any of this applies.",
    ],
    incentives: [
      "Tennessee has no state income tax on wages, so there is no state solar credit, and the state has never run a rebate program for residential panels. The tax code does treat certified green energy production facilities favorably for property tax purposes, valuing solar equipment at a small fraction of its installed cost, and installers often handle the certification paperwork with the state. Sales tax generally still applies to residential installations unless a specific exemption fits, so ask for a quote with tax itemized.",
      "TVA's EnergyRight program and the Home Uplift initiative focus on efficiency and weatherization for income-qualified households rather than solar, though pairing the two can shrink the system you need. The federal 30 percent credit remains the biggest single incentive here, and as of 2026 you should verify whether any TVA distributed generation incentive has been reintroduced before you sign.",
    ],
    utilities: [
      "The local power companies that actually bill you include Nashville Electric Service, Memphis Light, Gas and Water, EPB in Chattanooga, Knoxville Utilities Board, and Middle Tennessee Electric, plus dozens of smaller municipal systems and cooperatives, all buying wholesale power from TVA. Retail rates run below the national average, which stretches the payback period for solar compared with the coasts. Several local power companies have also added grid access or fixed charges that do not shrink when you generate your own power, so a system that fits your daytime consumption pattern will perform better than one built around selling surplus.",
    ],
    sources: [
      { label: "Tennessee Valley Authority", url: "https://www.tva.com/" },
    ],
  },

  TX: {
    netMetering: [
      "Texas leaves solar export compensation entirely to individual utilities and retailers, so there is no statewide net metering law. In the deregulated ERCOT market, which covers Dallas, Houston, and most of the state, you choose a retail electric provider and can pick a solar buyback plan from companies such as Reliant, TXU, Green Mountain Energy, Octopus Energy, or Rhythm. Some plans credit exports at your full energy rate, some pay a wholesale-linked rate, and many limit credits to what you consume in a month or let them expire at the end of the contract.",
      "Outside the competitive market, municipal utilities and co-ops set their own rules. Austin Energy uses a Value of Solar tariff that pays for every kilowatt-hour you generate at a fixed rate while billing your full consumption at standard rates, and CPS Energy in San Antonio has used retail-based crediting that it has been reviewing. Cooperatives such as Pedernales and CoServ each publish their own tariffs, while El Paso Electric and Entergy Texas operate under regulated buyback terms overseen by the Public Utility Commission.",
    ],
    incentives: [
      "The state has no personal income tax, which rules out a state credit, but Texas does exempt the value a solar system adds to your home from property tax under Section 11.27 of the Tax Code, which requires filing a form with the appraisal district. The Texas solar rights law limits how far homeowners associations can restrict rooftop panels, which matters in the many deed-restricted neighborhoods around the big metros.",
      "Utility rebates have historically done much of the work here: Austin Energy still offered a residential solar rebate tied to completing its solar education course as of 2026, CPS Energy ran rebate rounds for years before scaling them back, and Oncor funded installer-administered incentives in its territory that have been reduced over time. Funding for these programs is set annually and often runs out mid-year, so confirm availability before you rely on it.",
    ],
    utilities: [
      "In ERCOT, the wires companies that own the poles and meters are Oncor in North Texas, CenterPoint in Houston, AEP Texas along the coast and in the south, and Texas-New Mexico Power in scattered areas; your retail provider is a separate company that sets the energy price. Austin Energy and CPS Energy are large municipal utilities, and cooperatives like Pedernales Electric are among the biggest in the country. Entergy Texas, El Paso Electric, SWEPCO, and Xcel's Southwestern Public Service sit outside ERCOT and are fully regulated. Delivery charges from the wires company are billed per kilowatt-hour you import and are not offset by exports, and free-nights or time-of-use plans can either help or hurt solar depending on your usage.",
    ],
    sources: [
      { label: "Public Utility Commission of Texas", url: "https://www.puc.texas.gov/" },
      { label: "Texas Comptroller: property tax exemptions", url: "https://comptroller.texas.gov/taxes/property-tax/exemptions/" },
    ],
  },

  UT: {
    netMetering: [
      "Rocky Mountain Power closed traditional net metering to new customers in late 2017 and, after a transition period, moved to a net billing structure approved by the Public Service Commission in a 2020 settlement. Under net billing your imports and exports are netted over short intervals rather than a full month, and exported energy earns an export credit that is set well below the retail rate, with different values for summer and winter and for on-peak and off-peak hours. Unused credits roll forward but are cleared once a year, and the export rate itself can be adjusted in future commission proceedings.",
      "Municipal utilities such as Provo, St. George, Logan, Murray, and Bountiful, along with cooperatives like Dixie Power and Moon Lake Electric, are not bound by the Rocky Mountain Power tariff and set their own rules; some still offer retail-style net metering, others have adopted their own export rates. Because compensation is meant to reflect the utility's value of exported power, self-consumption and battery storage carry more weight in Utah than in retail net metering states.",
    ],
    incentives: [
      "Utah's residential Renewable Energy Systems Tax Credit once covered a quarter of system cost up to a capped amount, but the cap stepped down each year and the credit ended for systems installed after 2023, so it is no longer available for new installations. The state's sales tax exemption for renewable energy equipment is written for large generating facilities rather than rooftop arrays, so plan on paying sales tax unless your installer documents an exemption that applies.",
      "Rocky Mountain Power's Wattsmart Battery program pays an upfront incentive and ongoing bill credits to customers who enroll a compatible home battery for utility dispatch, and it is the most substantial state-level offer as of 2026. Verify current terms directly with the utility, since program budgets are set annually.",
    ],
    utilities: [
      "Rocky Mountain Power, part of PacifiCorp, serves roughly four out of five Utahns including Salt Lake City, Ogden, and most of the Wasatch Front. Provo Power, St. George Energy Services, Logan Light and Power, Murray City Power, and other municipal systems supplied through UAMPS cover many cities, with Dixie Power, Moon Lake Electric, and Garkane Energy serving rural areas. Residential rates are among the lowest in the West, and Rocky Mountain Power uses seasonal tiered pricing with an optional time-of-use rate that shifts value toward late-afternoon and evening hours. Low rates plus below-retail export credits mean payback here depends on abundant sun and careful system sizing more than on the tariff.",
    ],
    sources: [
      { label: "Utah Public Service Commission", url: "https://psc.utah.gov/" },
      { label: "Rocky Mountain Power", url: "https://www.rockymountainpower.net/" },
    ],
  },

  VT: {
    netMetering: [
      "Vermont's net metering rules, set by the Public Utility Commission under Rule 5.100, apply to systems up to 500 kilowatts and credit exports against your bill using a per-kilowatt-hour value tied to a statewide blended residential rate. Two adjustors modify that value: a REC adjustor that adds to the credit if you transfer your renewable energy certificates to the utility and subtracts if you keep them, and a siting adjustor that favors rooftops and preferred locations over open-field installations.",
      "The commission reviews these adjustors on a two-year cycle and has trimmed them in successive updates, so a system permitted in 2026 earns less per exported kilowatt-hour than one from several years ago, though the underlying retail rate has risen. Credits carry forward for twelve months before expiring, which matters in a state where summer surpluses have to cover long, dark winters. Applications go through the PUC's ePUC system with a certificate of public good, and the process is standardized across Green Mountain Power, Burlington Electric, and the cooperatives.",
    ],
    incentives: [
      "Solar equipment is exempt from Vermont's sales tax, and net metered systems up to 50 kilowatts are exempt from the statewide education property tax, with many towns also opting to exempt them from municipal property tax. There is no state income tax credit for residential solar. The main money in Vermont has shifted toward storage: Green Mountain Power's Bring Your Own Device program pays enrolled battery owners an upfront incentive and bill credits in exchange for letting the utility draw on the battery during peaks, and its Powerwall lease program offers Tesla batteries for a monthly fee.",
      "Efficiency Vermont handles the state's efficiency and heat pump rebates, which can be stacked with solar to cover a larger share of your energy use. Confirm current battery program terms, since incentive levels and enrollment caps have changed more than once.",
    ],
    utilities: [
      "Green Mountain Power serves about three-quarters of the state, with Burlington Electric Department covering the largest city, Vermont Electric Cooperative and Washington Electric Cooperative serving rural members, and a dozen small municipal utilities buying through the Vermont Public Power Supply Authority. Retail electricity prices are among the highest in the country, which is why net metering credits linked to the residential rate remain valuable even after adjustor reductions. Green Mountain Power also offers time-of-use and electric vehicle rates that reward shifting load to overnight hours. Snow and short winter days reduce output, but the high rates and stable credit structure keep payback periods competitive with sunnier states.",
    ],
    sources: [
      { label: "Vermont Public Utility Commission", url: "https://puc.vermont.gov/" },
      { label: "Green Mountain Power", url: "https://greenmountainpower.com/" },
    ],
  },

  VA: {
    netMetering: [
      "Net metering in Virginia was expanded by the 2020 Clean Economy Act, which raised the residential limit to 25 kilowatts, allowed systems sized up to 150 percent of the previous year's usage, and lifted the aggregate program cap for Dominion Energy and Appalachian Power to six percent of peak load. Exports are credited at the full retail rate and carry forward month to month, and at the end of each twelve-month period you can either keep rolling credits or sell the surplus to the utility at avoided cost.",
      "The same law authorized minimum monthly bills for net metering customers, which the State Corporation Commission has applied to both Dominion and Appalachian Power, and it triggered formal reviews of net metering once each utility's participation reached a set threshold. Appalachian Power's review concluded in 2024 with retail crediting largely preserved, and Dominion's followed; the outcomes are still shaping successor terms, so check the SCC's current orders before assuming today's credit structure will hold for a system installed in 2026. Cooperatives follow similar rules but administer them separately.",
    ],
    incentives: [
      "Virginia does not offer a state solar tax credit or a statewide rebate for homeowners. Localities may exempt solar equipment from property tax under state code Section 58.1-3661, and many counties and cities have adopted the exemption, so ask your commissioner of the revenue whether yours has. Sales tax applies to installations at the standard rate.",
      "Dominion Energy has run a residential battery pilot that pays enrolled customers for allowing the utility to dispatch their storage, and it periodically offers demand response programs; Appalachian Power's offerings are more limited. Virginia Energy was awarded federal Solar for All funding to serve low-income households, though the status of that federal program has been unsettled since 2025, so verify what has actually launched.",
    ],
    utilities: [
      "Dominion Energy Virginia serves about two-thirds of the state including Richmond, Northern Virginia, and Hampton Roads; Appalachian Power covers the southwest from Roanoke to the coalfields; Old Dominion Power serves a small far-southwest corner; and thirteen electric cooperatives such as NOVEC, Rappahannock, and Shenandoah Valley serve much of rural Virginia alongside municipal systems in Danville, Manassas, and elsewhere. Dominion's residential rate is close to the national average and carries a growing list of riders, while Appalachian Power's rates have climbed steadily. Retail crediting means each exported kilowatt-hour is worth roughly what you pay, so savings scale with your usage, though the minimum bill sets a floor you cannot go below regardless of how much you generate.",
    ],
    sources: [
      { label: "Virginia State Corporation Commission", url: "https://www.scc.virginia.gov/" },
      { label: "Virginia Energy", url: "https://energy.virginia.gov/" },
    ],
  },

  WA: {
    netMetering: [
      "Washington's net metering statute covers systems up to 100 kilowatts and requires every utility to credit exports at the retail rate, kilowatt-hour for kilowatt-hour, until its cumulative net metered capacity reaches four percent of its 1996 peak demand. Credits roll forward month to month, but any surplus remaining on March 31 is zeroed out with no payment, so a system sized to produce far more than you use over a year hands the excess to the utility for free.",
      "Once a utility crosses the capacity threshold it can propose alternative compensation, and a few of the faster-growing service territories have begun that conversation, so ask whether yours is near its cap. Many utilities, including Seattle City Light and Puget Sound Energy, have said they will continue net metering beyond the statutory minimum for now. Interconnection is handled by each utility under its own process, with the Utilities and Transportation Commission overseeing the investor-owned companies.",
    ],
    incentives: [
      "The most important state incentive is the sales tax exemption: solar systems up to 100 kilowatts are fully exempt from state and local sales tax on equipment and installation, which is worth several percent of project cost given Washington's high combined rates, and as of 2026 the exemption runs through the end of 2029. Washington has no state income tax, so there is no tax credit, and the state's older production incentive program closed to new applications once its funding cap was reached.",
      "The Department of Commerce received a federal Solar for All award to build low-income rooftop and community solar programs, and it has also run its own low-income community solar grants; the federal piece has been in flux since 2025, so check what is actually enrolling. Several utilities, including Snohomish PUD and Puget Sound Energy, offer loans, rebates, or battery pilots that come and go with annual budgets.",
    ],
    utilities: [
      "Puget Sound Energy is the largest utility, serving the suburbs around Seattle and much of western Washington, while Seattle City Light and Tacoma Power are big municipal systems, Avista serves Spokane and the east, Pacific Power covers the southeast, and public utility districts such as Snohomish, Clark, Chelan, Grant, Douglas, and Benton serve their counties. Hydropower makes Washington's electricity some of the cheapest in the country, and in mid-Columbia PUD territory rates can be a third of the national average, which stretches solar payback considerably. Puget Sound Energy and Seattle City Light charge closer to typical rates and use tiered residential pricing, making solar more attractive there despite cloudier skies. Eastern Washington gets substantially more sun but pairs it with lower rates.",
    ],
    sources: [
      { label: "Washington Utilities and Transportation Commission", url: "https://www.utc.wa.gov/" },
      { label: "Washington Department of Revenue", url: "https://dor.wa.gov/" },
    ],
  },

  WV: {
    netMetering: [
      "West Virginia's net metering law allows residential systems up to 25 kilowatts to connect and receive kilowatt-hour credits against their bill, with participation capped at three percent of each utility's peak demand. Credits have historically been worth the full retail rate and carry forward from month to month, and the Public Service Commission's rules apply to Appalachian Power, Wheeling Power, Mon Power, and Potomac Edison alike.",
      "The value of that credit has been contested. Appalachian Power and Wheeling Power asked the commission in their 2023 rate case to pay new solar customers an avoided-cost rate of a few cents per kilowatt-hour instead of retail, and the commission declined in its 2024 order, but the utilities have signaled they intend to keep raising the issue. Existing customers were expected to keep their terms under either outcome. Before you sign, check the commission's current net metering rules and your utility's tariff, and ask your installer what happens to your credit rate if the rules change after interconnection.",
    ],
    incentives: [
      "State support for residential solar is close to nonexistent. West Virginia once had a residential solar tax credit, but it expired in 2013 and has not been revived, and there is no state rebate, sales tax exemption, or property tax exemption specific to home solar. The six percent sales tax applies to equipment and installation.",
      "One meaningful change came in 2021 when the legislature legalized third-party power purchase agreements for on-site solar, opening the door to no-money-down arrangements with installers who own the system. The West Virginia Office of Energy has pursued federal Solar for All funding for low-income households, though the federal program's status has been uncertain since 2025. The federal 30 percent credit does the heavy lifting here, and rapidly rising utility rates are quietly becoming the strongest financial argument for going solar in the state.",
    ],
    utilities: [
      "Appalachian Power and its affiliate Wheeling Power, both part of American Electric Power, serve the southern and western counties around Charleston and Huntington, while Mon Power and Potomac Edison, both FirstEnergy companies, cover the north and the Eastern Panhandle. A handful of small cooperatives and municipal systems fill in the gaps. Residential rates were among the nation's lowest a decade ago but have risen faster than almost anywhere else, driven by coal plant costs and fuel recovery, and both utility groups continue to file for increases. Under retail net metering that rising rate directly raises the value of every kilowatt-hour your panels produce.",
    ],
    sources: [
      { label: "West Virginia Public Service Commission", url: "https://psc.wv.gov/" },
    ],
  },

  WI: {
    netMetering: [
      "Wisconsin's Public Service Commission requires investor-owned utilities to offer net metering for systems up to 20 kilowatts, and most have voluntarily extended that limit to larger residential systems. Netting happens on a monthly basis: within a billing period, exports offset imports one for one, but any excess left at the end of the month is bought back at a lower rate that varies by utility and is often close to the utility's avoided cost rather than retail.",
      "That monthly reset is the key difference from annual net metering states and makes summer overproduction less valuable, so installers here tend to size systems close to annual consumption rather than above it. Alliant Energy and We Energies have both proposed changes to how they credit solar in recent rate cases, and the commission has been examining distributed generation compensation more broadly, so verify the current tariff for your utility. Cooperatives and municipal utilities are not covered by the commission's net metering rule and set their own buyback terms.",
    ],
    incentives: [
      "Focus on Energy, the statewide efficiency and renewables program funded by utility customers, offers a flat rebate for residential solar installations completed by a participating installer, with a larger amount for income-qualified households; the rebate has been a few hundred dollars in recent years and is subject to annual funding. Wisconsin also exempts solar equipment from sales tax and exempts the value solar systems add to a property from property tax, both of which apply without a separate application.",
      "There is no state income tax credit, though some cooperatives supplied by Dairyland Power offer their own rebates. Federal Solar for All funding was awarded to Wisconsin for low-income households but its status has been unsettled since 2025, so confirm what is actually available.",
    ],
    utilities: [
      "We Energies serves Milwaukee and the southeast, Alliant Energy's Wisconsin Power and Light covers the south-central and western counties, Madison Gas and Electric serves the capital, Xcel Energy handles the west along the Minnesota border, and Wisconsin Public Service covers Green Bay and the north; smaller municipal utilities buy through WPPI Energy and rural cooperatives through Dairyland Power. Residential rates at the large utilities run above the Midwest average, with We Energies and MGE among the higher-priced, and fixed monthly customer charges of fifteen to twenty dollars that solar does not offset. Higher rates improve solar economics, while the monthly netting and modest winter sun mean a well-sized system, not an oversized one, produces the best return.",
    ],
    sources: [
      { label: "Public Service Commission of Wisconsin", url: "https://psc.wi.gov/" },
      { label: "Focus on Energy", url: "https://focusonenergy.com/" },
    ],
  },

  WY: {
    netMetering: [
      "Wyoming law requires utilities to offer net metering for customer systems up to 25 kilowatts, crediting exports against consumption at the retail rate within each billing month. Any net excess that accumulates carries forward through the calendar year, and at year end the utility pays you for whatever remains at its avoided-cost rate, which is a small fraction of retail and effectively resets the account.",
      "Several legislative attempts between 2019 and 2021 to replace this framework with avoided-cost crediting or new fees failed, and the statute has stayed intact, though the debate could resurface in any session. Rocky Mountain Power, Black Hills Energy, and Montana-Dakota Utilities all file net metering tariffs with the Public Service Commission, while cooperatives and municipal utilities implement the statute through their own policies and interconnection requirements. Some cooperatives add facilities charges for solar customers, so read the tariff before you sign.",
    ],
    incentives: [
      "Wyoming has no personal income tax and offers no state solar credit, rebate, or property tax exemption for home systems, and the four percent state sales tax plus local additions applies in full to solar equipment and installation. State policy has focused on coal, gas, and wind at utility scale rather than on rooftop programs.",
      "What remains is the 30 percent federal credit, occasional cooperative rebates or on-bill financing for efficiency and electrification, and the USDA REAP grant for agricultural producers and rural small businesses, which can pay a meaningful share of a barn or shop system. The Wyoming Energy Authority does not run residential incentives. Given the limited support, low equipment prices and strong sun matter more than programs when weighing a system here.",
    ],
    utilities: [
      "Rocky Mountain Power is the largest provider, serving Casper, Laramie, Rock Springs, and much of the south and center, Black Hills Energy covers Cheyenne, and Montana-Dakota Utilities serves Sheridan and the northeast. Cooperatives such as High Plains Power, High West Energy, Powder River Energy, Carbon Power and Light, and Lower Valley Energy in the Jackson area serve most rural customers, and municipal utilities in Cody, Powell, and Torrington buy through the Wyoming Municipal Power Agency. Residential rates are among the lowest in the nation and Lower Valley's hydro-based pricing is lower still, which lengthens payback despite excellent sun and high elevation. Because the year-end surplus is bought at avoided cost, matching system size to annual usage is the surest way to capture value.",
    ],
    sources: [
      { label: "Wyoming Public Service Commission", url: "https://psc.wyo.gov/" },
    ],
  },
};
