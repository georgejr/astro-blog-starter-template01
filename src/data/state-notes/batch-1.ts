import type { StateNotesMap } from './types';

// Batch 1: AL, AK, AZ, AR, CA, CO, CT, DE, FL, GA
// Editorial notes written September 2026. Program terms change; every entry
// hedges where a figure or rule is likely to move.
export const batch1: StateNotesMap = {
  AL: {
    netMetering: [
      `Statewide net metering does not exist in Alabama, and the Public Service Commission has never required utilities to credit rooftop exports at the retail rate. Alabama Power buys surplus power from home systems under its Purchase of Alternative Energy rider at roughly its avoided cost, a small fraction of what you pay for electricity. Because of that gap, the value of a system here comes almost entirely from power you consume the moment it is produced.`,
      `The bigger issue is a monthly capacity reservation charge that Alabama Power applies to customers with solar, billed per kilowatt of installed capacity under its Rider RGB. Solar advocates challenged the charge before the PSC and in federal court, but it remained in effect as of 2026, so build it into any payback estimate. Homes in the northern counties served by TVA distributors face a different arrangement: TVA closed its legacy buyback program to new entrants years ago, and its current distributed-generation terms pay for exports at avoided cost rather than retail.`,
    ],
    incentives: [
      `Alabama offers no state income tax credit, no rebate program, and no sales or property tax exemption aimed at residential solar. The AlabamaSAVES loan program serves commercial and industrial borrowers rather than homeowners. In practice the federal residential credit has carried nearly all of the incentive value for Alabama households; confirm its current status with a tax professional, since federal rules changed after 2025.`,
      `A few electric cooperatives and TVA distributors run small efficiency rebates from time to time, but nothing that materially changes the economics of a rooftop array. Low-cost financing through a credit union or a home equity line is usually the most useful lever available, and it is worth asking installers whether they can price a system without the export-dependent assumptions used in other states.`,
    ],
    utilities: [
      `Alabama Power, a Southern Company subsidiary, serves the majority of the state from Birmingham and Montgomery down to Mobile. Northern Alabama is served by TVA local power companies including Huntsville Utilities, Decatur Utilities and Cullman Electric Cooperative, while much of the rural south relies on cooperatives supplied by PowerSouth. Alabama Power's standard residential rate combines a fixed monthly base charge with a fairly flat per-kilowatt-hour price, plus an optional time-advantage plan with cheaper off-peak power. With retail prices below the national average and no retail credit for exports, sizing a system to match daytime use matters more here than in most states, and a battery can help capture power that would otherwise be sold for pennies.`,
    ],
    sources: [
      { label: 'Alabama Public Service Commission', url: 'https://psc.alabama.gov/' },
    ],
  },

  AK: {
    netMetering: [
      `Alaska's net metering rules, adopted by the Regulatory Commission of Alaska in 2010, apply only to the larger utilities and cap residential systems at 25 kilowatts. Within a billing period your production offsets your consumption kilowatt-hour for kilowatt-hour, but any excess left at the end of the month is credited at the utility's non-firm avoided-cost rate rather than the retail price. Each utility's program is also capped at a small share of its total load, so confirm there is still room before you sign a contract.`,
      `Chugach Electric, Matanuska Electric Association and Golden Valley Electric Association all interconnect residential systems under these terms, as do Homer Electric and Alaska Electric Light and Power in Juneau. Smaller rural utilities under the Power Cost Equalization program are generally exempt from the net metering requirement, so households in those communities need to ask their utility directly. Long summer days push a lot of production into months when a home uses little power, which makes the monthly avoided-cost true-up more consequential here than in the Lower 48.`,
    ],
    incentives: [
      `There is no state solar tax credit or rebate in Alaska, and the state has no sales tax to exempt. State law does allow municipalities to exempt residential renewable energy systems from property tax, and the Municipality of Anchorage has adopted such an exemption; check with your borough assessor to see whether yours has followed. The Alaska Housing Finance Corporation offers interest-rate reductions on mortgages for energy-efficient homes and has periodically run rebate programs that can include solar, though funding comes and goes.`,
      `The Alaska Energy Authority manages the Renewable Energy Fund, which mostly backs community and utility-scale projects rather than individual rooftops. Federal Solar for All funding awarded to the state in 2024 targets lower-income households, but treat installer claims about it with caution until program terms are published.`,
    ],
    utilities: [
      `Nearly all Alaskans are served by member-owned cooperatives or municipal utilities. Chugach Electric covers Anchorage, MEA serves the Mat-Su valley, GVEA serves Fairbanks and the interior, Homer Electric covers the Kenai Peninsula, and AEL&P serves Juneau, with more than a hundred small utilities serving villages off the road system. Residential prices on the Railbelt are well above the national average and have been climbing as Cook Inlet natural gas supplies tighten, while Fairbanks and rural communities pay considerably more. Most of these utilities bill a customer charge plus a flat energy rate with a fuel adjustment, so the savings from solar track your retail rate closely but remain limited by the winter months when panels produce very little.`,
    ],
    sources: [
      { label: 'Regulatory Commission of Alaska', url: 'https://rca.alaska.gov/' },
      { label: 'Alaska Energy Authority', url: 'https://www.akenergyauthority.org/' },
      { label: 'Alaska Housing Finance Corporation', url: 'https://www.ahfc.us/' },
    ],
  },

  AZ: {
    netMetering: [
      `The Arizona Corporation Commission ended retail net metering in 2016 and replaced it with a net billing structure for the utilities it regulates, including APS and TEP. Power you use on site still offsets retail purchases, but anything sent to the grid is credited at an export rate derived from the Resource Comparison Proxy method, which is well below the retail price. That export rate is reset for new customers each year and can decline by up to 10 percent annually, though whatever rate you interconnect under is locked in for ten years.`,
      `Salt River Project is a public power district outside the Commission's jurisdiction and sets its own solar terms, historically pairing a low export credit with a demand-based price plan for solar customers. APS also requires solar homes to take service on a time-of-use or demand plan and applies a grid access charge tied to system size. Because exports earn so much less than retail, self-consumption and battery pairing carry more weight in Arizona than the raw amount of sunshine suggests.`,
    ],
    incentives: [
      `Arizona provides a state income tax credit for residential solar equal to 25 percent of the installed cost, capped at 1,000 dollars per residence. Solar equipment is exempt from state transaction privilege tax, and a separate statute treats solar devices as adding no value to your home for property tax assessment, which avoids a higher tax bill after installation. These three provisions have been stable for many years, but confirm the tax credit form and rules with the Arizona Department of Revenue when you file.`,
      `Utility incentives shift more often. APS and SRP have each run residential battery incentive programs in recent years, and some cooperatives such as Trico and Sulphur Springs Valley have offered their own solar or storage terms, so check the current offering before assuming a rebate.`,
    ],
    utilities: [
      `APS serves the largest share of the state, including most of metro Phoenix, Flagstaff and Yuma; SRP covers much of the East Valley and central Phoenix; TEP serves Tucson and UNS Electric covers Mohave and Santa Cruz counties. Cooperatives including Trico, Sulphur Springs Valley, Mohave Electric and Navopache handle rural areas. Summer air conditioning dominates household usage, and both APS and SRP push solar customers onto plans with late-afternoon peak pricing or demand charges that reward shifting load away from the 4 to 7 pm window. A system oriented partly west, or a battery that discharges during the evening peak, usually improves savings more than simply adding panels.`,
    ],
    sources: [
      { label: 'Arizona Corporation Commission', url: 'https://www.azcc.gov/' },
    ],
  },

  AR: {
    netMetering: [
      `For most of the past decade Arkansas had one of the friendlier policies in the South: full one-to-one retail net metering under Act 827 of 2019, with excess credits rolling forward month to month. Act 278 of 2023 changed that for systems interconnected after September 30, 2024, moving new customers to net billing in which exports are credited at an avoided-cost rate set through the Public Service Commission rather than the retail price. Customers who interconnected before the deadline keep their retail-rate treatment for a grandfathering period that runs into 2040.`,
      `Under the new arrangement the electricity you consume as it is produced is still worth the full retail rate, but the surplus you send back is worth only a few cents per kilowatt-hour on most utilities. Ask your utility for the specific avoided-cost figure it uses and whether it varies by season, because those numbers are filed with the Commission and updated periodically.`,
    ],
    incentives: [
      `Arkansas offers no state income tax credit, rebate or sales tax exemption for residential solar, and solar equipment is not exempt from property tax assessment. Third-party leasing and power purchase agreements have been legal since Act 464 of 2019, which opened the door to installers offering systems with little or no money down. The Arkansas Energy Office within the Department of Energy and Environment periodically administers federally funded programs, including Solar for All dollars aimed at lower-income households, so it is worth checking there for current opportunities.`,
      `A few electric cooperatives and municipal utilities run modest efficiency rebates, but none provide meaningful solar incentives. Homeowners here should build their decision around the federal tax credit, if they qualify for it, and the relatively low installed cost per watt that competitive local installers can offer.`,
    ],
    utilities: [
      `Entergy Arkansas is by far the largest provider, serving Little Rock and much of the central and southern parts of the state. SWEPCO covers the western counties around Fayetteville and Texarkana, OG&E serves the Fort Smith area, and Liberty serves a small corner in the northwest. Roughly a third of Arkansans are members of electric cooperatives such as First Electric, Carroll Electric and Ozarks Electric, with municipal systems including Conway Corp, Jonesboro City Water and Light and North Little Rock Electric. Retail prices are among the lowest in the country, with mostly flat residential rates and seasonal summer adjustments, which lengthens solar payback compared with high-cost states even though sunshine is decent.`,
    ],
  },

  CA: {
    netMetering: [
      `New rooftop solar customers of PG&E, Southern California Edison and San Diego Gas and Electric fall under the Net Billing Tariff, commonly called NEM 3.0, which took effect in April 2023. Exports are valued using the state's Avoided Cost Calculator at hourly rates that are typically a small fraction of the retail price during most daytime hours, with the notable exception of a few late-summer evening hours when export values spike. Customers who interconnected under NEM 2.0 before the cutoff keep retail-rate treatment for twenty years.`,
      `The practical effect is that batteries went from optional to central: storing midday production and discharging it during the 4 to 9 pm peak captures far more value than exporting it. Publicly owned utilities play by different rules; LADWP continued to offer retail net metering as of 2026, and SMUD credits exports under its own solar and storage rate. Community choice aggregator customers receive the utility's delivery credit plus a generation credit set by the CCA, which is sometimes slightly more generous.`,
    ],
    incentives: [
      `California's largest state program is the Self-Generation Incentive Program, which pays rebates on home batteries, with the richest tiers reserved for low-income households, medical baseline customers and homes in high fire-threat areas that face frequent shutoffs. A residential solar and storage equity budget was added to SGIP in 2024, so income-qualified households may be able to pair panels with a subsidized battery. DAC-SASH, delivered by GRID Alternatives, installs no-cost or deeply discounted systems for qualifying homeowners in disadvantaged communities.`,
      `The state also excludes newly installed solar from property tax reassessment, though that exclusion carries a sunset date at the start of 2027 unless the Legislature extends it again. There is no state income tax credit or sales tax exemption for solar. Municipal utilities such as SMUD and LADWP have run their own rebates for storage and efficiency, and those are worth checking separately.`,
    ],
    utilities: [
      `PG&E serves Northern and Central California, SCE covers most of Southern California outside San Diego and Los Angeles proper, and SDG&E serves San Diego County; their residential rates are the highest in the continental United States. Many Californians buy generation through community choice aggregators such as MCE, Clean Power Alliance and San Diego Community Power while paying the utility for delivery, and public utilities including LADWP, SMUD and the Imperial Irrigation District set rates independently. Solar customers of the three investor-owned utilities must take an electrification time-of-use rate with a fixed monthly charge, cheap overnight power and steep 4 to 9 pm peak prices. A flat monthly fixed charge approved in 2024 lowers per-kilowatt-hour prices somewhat, which slightly trims the value of each kilowatt-hour a system offsets; verify the current schedule before running numbers.`,
    ],
    sources: [
      { label: 'CPUC Net Billing Tariff (NEM 3.0)', url: 'https://www.cpuc.ca.gov/nemrevisit' },
      { label: 'Self-Generation Incentive Program', url: 'https://www.selfgenca.com/' },
    ],
  },

  CO: {
    netMetering: [
      `Colorado requires its investor-owned utilities, Xcel Energy and Black Hills Energy, to offer retail-rate net metering, and cooperatives and municipal utilities must offer a version of it as well. Excess kilowatt-hours from a sunny month roll forward as credits, and Xcel customers choose between letting credits roll indefinitely or cashing out the balance once a year at an avoided-cost rate. Systems are generally limited to about 120 percent of the home's annual consumption, so oversizing for a future electric car has to be justified up front.`,
      `Since Xcel moved residential customers onto a default time-of-use rate, exports are credited at the price in effect for the hour they occur, which means midday production earns the off-peak or mid-peak rate rather than the pricey 3 to 7 pm weekday peak. Cooperatives such as Holy Cross Energy and United Power set their own terms for excess generation, and some pay less than retail for it, so co-op members should read the fine print.`,
    ],
    incentives: [
      `Colorado exempts qualifying solar components from state sales and use tax and exempts residential renewable energy systems from property tax, so a new array should not raise your assessment. Xcel's Solar*Rewards program pays a modest per-kilowatt-hour performance incentive over a multi-year contract, with a considerably higher income-qualified tier; the standard rate has been reduced several times, so check the current filing before counting on it. Xcel has also paid enrollment incentives for home batteries that it can dispatch during grid events.`,
      `The Colorado Clean Energy Fund's RENU loan offers below-market financing for solar and efficiency through participating contractors, and the Colorado Energy Office administers weatherization and low-income solar efforts. The state's recent income tax credits target heat pumps and electric vehicles rather than solar panels.`,
    ],
    utilities: [
      `Xcel Energy serves Denver, Boulder, the northern Front Range and Grand Junction, roughly two thirds of the state, while Black Hills Energy serves Pueblo and parts of southern Colorado at noticeably higher rates. Colorado Springs Utilities, Fort Collins Utilities, Longmont and Loveland run municipal systems, and cooperatives including United Power, CORE Electric, Holy Cross, Poudre Valley and La Plata serve suburban and mountain communities. Xcel's default residential rate is time-of-use with a weekday afternoon peak that is much more expensive in summer, and it carries a monthly service charge that solar cannot offset. Municipal and co-op rates are often flat and somewhat cheaper, so payback periods vary widely across the state even for identical roofs.`,
    ],
    sources: [
      { label: 'Colorado Public Utilities Commission', url: 'https://puc.colorado.gov/' },
      { label: 'Colorado Energy Office', url: 'https://energyoffice.colorado.gov/' },
    ],
  },

  CT: {
    netMetering: [
      `Connecticut retired traditional net metering for new customers at the start of 2022 and replaced it with the Residential Renewable Energy Solutions tariff, a twenty-year program overseen by PURA for Eversource and United Illuminating customers. You pick one of two options at interconnection. Under the netting option, production offsets your consumption at the retail rate within each billing period and a per-kilowatt-hour incentive is paid on everything the system generates; under the buy-all option, every kilowatt-hour is sold to the utility at a fixed tariff rate while you keep buying all of your power at retail.`,
      `Incentive and buy-all rates are reset by PURA each program year for new enrollees, with higher rates available to low-income households and homes in distressed municipalities. The netting option tends to suit homes with steady daytime usage, while buy-all can win for very efficient homes or those with unfavorable retail rates; ask your installer to model both. Customers of municipal utilities such as Wallingford, Norwich and Groton are outside the tariff and follow their own local rules.`,
    ],
    incentives: [
      `Connecticut exempts residential solar equipment from sales and use tax and exempts the added value of a home solar system from property tax. The Connecticut Green Bank no longer pays upfront solar rebates, since that role moved into the tariff, but its Smart-E Loan program provides low-interest financing for solar and related upgrades through local credit unions and banks. Energize CT, funded through the utilities, focuses on efficiency assessments and rebates that pair well with a solar project.`,
      `Energy Storage Solutions, launched in 2022, pays an upfront incentive per kilowatt-hour of battery capacity plus performance payments when the utility calls on the battery during peak periods, with larger incentives for income-eligible customers. Program budgets are tiered and step down as capacity is claimed, so confirm the current tier before committing.`,
    ],
    utilities: [
      `Eversource serves the majority of Connecticut households, and United Illuminating, part of Avangrid, serves the New Haven and Bridgeport areas along the coast. A handful of municipal utilities, including Wallingford Electric, Groton Utilities and Norwich Public Utilities, serve their own towns at lower rates. Residential prices in Connecticut are among the highest in the nation, driven by delivery charges and public benefits fees, and both large utilities bill a flat per-kilowatt-hour rate with a modest customer charge rather than a time-of-use default. That high, flat rate is the main reason solar payback periods in the state are shorter than the cloudy winters would suggest.`,
    ],
    sources: [
      { label: 'Connecticut PURA', url: 'https://portal.ct.gov/pura' },
      { label: 'Connecticut Green Bank', url: 'https://www.ctgreenbank.com/' },
      { label: 'Energy Storage Solutions', url: 'https://energystoragect.com/' },
    ],
  },

  DE: {
    netMetering: [
      `Delaware law requires Delmarva Power, the Delaware Electric Cooperative and the municipal utilities to offer retail-rate net metering to residential customers. Surplus kilowatt-hours in a given month carry forward as a credit on the next bill, and after twelve months a customer can ask to be paid out for any remaining balance at the utility's supply rate. Systems can be sized up to roughly 110 percent of the home's expected annual use, which leaves a little room for growth in consumption.`,
      `The three utility types handle the details differently, particularly around how the supply and delivery portions of the bill are credited and how excess is cashed out. The cooperative in particular has revised its policies for new solar members over the years, so anyone in Kent or Sussex County should ask for the current interconnection terms before signing.`,
    ],
    incentives: [
      `Delaware's Green Energy Program, administered through the Department of Natural Resources and Environmental Control and funded by utility ratepayers, offers upfront grants for residential solar in Delmarva Power territory, with the cooperative and municipal utilities running their own smaller versions. Grant levels are set per watt with a per-project cap and have been adjusted downward as installation costs fell, so check the current schedule and whether funds are available for the year. Delaware has no sales tax and no state income tax credit for solar.`,
      `Solar renewable energy certificates are a second income stream: Delmarva runs an annual SREC procurement in which homeowners can bid to sell their certificates under long-term fixed-price contracts, and certificates can otherwise be sold on the PJM market. DNREC has also piloted low-income solar programs, and the Delaware Sustainable Energy Utility offers energy loans that can cover solar.`,
    ],
    utilities: [
      `Delmarva Power, an Exelon company, serves New Castle County and parts of Kent and Sussex, making it the state's largest provider; the Delaware Electric Cooperative serves most of the rural south, and nine municipal utilities including Dover, Newark, Milford and Lewes serve their own cities through the Delaware Municipal Electric Corporation. Delmarva's residential rate is a flat energy charge plus a customer charge, with generation supplied at a standard offer price that changes periodically. Retail prices sit somewhat above the national average, and with retail net metering intact the savings per kilowatt-hour are straightforward to estimate.`,
    ],
    sources: [
      { label: 'Delaware Public Service Commission', url: 'https://depsc.delaware.gov/' },
      { label: 'Delaware DNREC', url: 'https://dnrec.delaware.gov/' },
    ],
  },

  FL: {
    netMetering: [
      `Florida's Public Service Commission rule requires investor-owned utilities to credit rooftop exports at the full retail rate, netted monthly, with any surplus rolled forward and paid out once a year at the utility's avoided-cost rate. Systems of 10 kilowatts or less are placed in the simplest tier, with no application fee or extra insurance, while larger residential systems face added requirements. A 2022 bill that would have phased retail net metering down was vetoed, and the rule remained intact as of 2026.`,
      `Municipal utilities and cooperatives are not bound by the Commission rule and set their own policies, which range from retail net metering to net billing at the utility's fuel cost. JEA in Jacksonville, for example, moved to crediting exports well below retail several years ago, while some co-ops and city utilities still net at retail. If you are outside FPL, Duke or TECO territory, the utility's own solar page is the place to start.`,
    ],
    incentives: [
      `Solar energy systems are exempt from Florida sales tax, and residential renewable energy devices are exempt from property tax assessment, so a rooftop array adds nothing to your tax bill despite raising your home's value. Florida has no state income tax, which means no state tax credit exists, and there is no statewide rebate.`,
      `Financing tools fill some of the gap: the Solar and Energy Loan Fund operates in a number of counties, PACE financing is available in many jurisdictions, and state law prevents homeowner associations from prohibiting solar installations. FPL's SolarTogether program is a community solar subscription rather than a rooftop incentive, so do not confuse the two when a salesperson mentions it.`,
    ],
    utilities: [
      `Florida Power and Light serves more customers than any other utility in the country, covering the east coast, Southwest Florida and, after absorbing Gulf Power, the western Panhandle; Duke Energy Florida serves the Tampa Bay suburbs and central Florida, and TECO serves Tampa itself. Municipal systems such as JEA, OUC in Orlando, Lakeland Electric and Gainesville Regional Utilities, along with cooperatives like Withlacoochee, Clay Electric and LCEC, cover the rest. FPL's rates are comparatively low with a two-tier structure that prices the first thousand kilowatt-hours cheaper, plus a minimum monthly bill; Duke's rates run higher. Heavy summer air conditioning means most homes consume a large share of their solar output on site, but the low retail price keeps payback periods moderate rather than short.`,
    ],
    sources: [
      { label: 'Florida Public Service Commission', url: 'https://www.psc.state.fl.us/' },
    ],
  },

  GA: {
    netMetering: [
      `Georgia Power's standard treatment for rooftop solar is instantaneous netting: power used at the moment it is produced offsets retail purchases, but every kilowatt-hour that flows to the grid is bought at a solar avoided-cost rate that has run only a few cents. In 2019 the Public Service Commission created a monthly netting program capped at 5,000 customers, which filled within about two years, and the Commission declined to expand it in subsequent rate cases. As of 2026, verify with Georgia Power and the PSC whether any renewed monthly netting option is open before assuming one.`,
      `Electric membership corporations and the municipal systems that buy from MEAG Power are only required to purchase output from small systems and set their own credit rates, so terms vary by co-op. A few EMCs offer monthly netting programs of their own with limited enrollment, while others pay strictly avoided cost, which makes the question of which utility serves your address a decisive one.`,
    ],
    incentives: [
      `Georgia currently provides no state tax credit, rebate, or sales or property tax exemption for residential solar; the state's clean energy property tax credit expired after 2014 and has not been revived. Third-party ownership through leases and power purchase agreements has been permitted since the Solar Power Free-Market Financing Act of 2015, which gives homeowners access to no-money-down offers.`,
      `The main newer option is Georgia BRIGHT, a solar leasing program from the nonprofit Capital Good Fund that targets low- and moderate-income households and grew with federal Solar for All funding administered in part through the Georgia Environmental Finance Authority. Eligibility and pricing are income-based, so it is worth checking even if you have been quoted a conventional system.`,
    ],
    utilities: [
      `Georgia Power, a Southern Company subsidiary, serves metro Atlanta and most of the state's cities, while forty-one electric membership corporations such as Jackson EMC, Cobb EMC, Sawnee EMC and Walton EMC serve the suburbs and rural areas, and MEAG Power supplies roughly fifty city-owned systems. Georgia Power's residential rates have risen sharply since 2023 as costs from the Vogtle nuclear expansion and fuel recovery were passed through. Its standard rate is seasonal and tiered, with optional Nights and Weekends time-of-use and a demand-based Smart Usage plan, and the rising retail price improves the case for self-consumed solar even though exports remain poorly compensated. EMC rates are set locally and often include a wholesale power cost adjustment, so two neighbors on different utilities can see quite different payback math.`,
    ],
    sources: [
      { label: 'Georgia Public Service Commission', url: 'https://psc.ga.gov/' },
    ],
  },
};
