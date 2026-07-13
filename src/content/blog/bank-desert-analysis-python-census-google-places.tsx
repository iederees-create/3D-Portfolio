/**
 * Article #2: "How to Build a Bank Desert Analysis Project with Python,
 * Pandas, Census Data and Google Places". Transcribed verbatim from
 * content-staging/bank-desert-analysis-article.md — only the format changed
 * (Markdown -> semantic JSX), no wording added, removed, shortened, or
 * rewritten in the body. The closing academic-integrity line at the bottom
 * of the article body is preserved exactly and reused (not replaced by
 * punchier marketing copy) in the closing CTA box below the body.
 */

const LIVE_DEMO_URL = 'https://iederees-create.github.io/bank-desert-analysis-student-lab/';

export default function BankDesertAnalysisContent() {
  return (
    <>
      <div className="prose prose-invert prose-lg max-w-none text-slate-300">
        <h2 id="what-is-a-bank-desert-analysis" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">What is a bank desert analysis?</h2>
        <p className="mb-6">
          A "bank desert" is an area — a neighbourhood, a ZIP code, a county — where residents have unusually limited access to mainstream financial services: bank branches, credit unions, and other federally insured institutions. The term is descriptive, not a formal government designation, and that distinction matters more than it sounds like it should. A bank desert analysis project asks a version of one question: does physical or practical access to financial services vary across a region, and if so, does that variation line up with other conditions like income or poverty?
        </p>
        <p className="mb-6">
          That's it. It's a geography-and-statistics project wearing a policy-relevant hat. Which is exactly why it shows up so often as a capstone or coursework assignment for data analysis, data science, economics, geography, and public-policy students — it touches Census data, API work, geospatial analysis, and inferential statistics in one self-contained package, using data that's genuinely public and genuinely interesting.
        </p>

        <h2 id="why-the-project-is-useful" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why the project is useful</h2>
        <p className="mb-6">
          Three things make this a good learning project rather than just a good-sounding one. First, the data sources are real, free, and well-documented — you're not synthesizing a toy dataset from scratch, you're wrangling actual government and commercial data with actual quirks (missing values, inconsistent geography codes, rate limits). Second, the analysis has a natural progression from descriptive to inferential — you can stop after a solid exploratory-data-analysis section and still have a defensible project, or push into regression and defend a more ambitious claim. Third, it forces you to confront a distinction that shows up in almost every applied statistics course and that a lot of students only really learn by tripping over it themselves: correlation is not causation, and a cross-sectional snapshot cannot tell you <em>why</em> a pattern exists, only <em>that</em> it exists.
        </p>

        <h2 id="typical-research-questions" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Typical research questions</h2>
        <p className="mb-6">
          Good research questions for this project are specific about geography, variables, and scope. Vague versions ("are poor areas underbanked?") are hard to operationalize and easy to overclaim from. Better versions look like:
        </p>
        <ul className="list-disc pl-6 space-y-3 mb-8 text-slate-300">
          <li>Within [a specific metro area or state], how does the number of bank branches per 10,000 residents vary with the Census-tract poverty rate?</li>
          <li>Do areas with higher concentrations of alternative financial services (payday lenders, check-cashers) also have lower reputable-institution density, after controlling for population density?</li>
          <li>Is there a measurable difference in average distance-to-nearest-bank between urban and rural ZIP codes in [region], and does that gap track with public-transit access?</li>
          <li>Has bank-branch density in [region] changed between two ACS vintages, and does the change correlate with demographic shifts?</li>
        </ul>
        <p className="mb-6">
          Notice that none of these assert an answer. They name a geography, a unit of analysis, a dependent variable, and at least one independent variable — which is most of the work of turning a vague topic into a gradable research design.
        </p>

        <h2 id="data-sources-commonly-required" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Data sources commonly required</h2>
        <p className="mb-6">
          Four categories of data typically feed a project like this:
        </p>
        <ol className="list-decimal pl-6 space-y-3 mb-8 text-slate-300">
          <li><strong className="text-white">Demographic and economic data</strong> — the U.S. Census Bureau's American Community Survey (ACS) is the standard source for poverty rate, median household income, population, and geographic boundaries, available via a free public API.</li>
          <li><strong className="text-white">Financial-institution location data</strong> — the FDIC's BankFind Suite provides official, government-sourced bank branch location data; NCUA publishes an equivalent for credit unions. Both are free and don't require a paid key.</li>
          <li><strong className="text-white">Optional supplementary location data</strong> — Google Places API (paid, requires your own billed API key with usage limits) or OpenStreetMap (free, community-sourced, variable completeness) can help locate alternative financial services or verify institution details the government datasets don't capture as granularly.</li>
          <li><strong className="text-white">Geographic boundary and reference data</strong> — Census TIGER/Line shapefiles, or a simpler pre-joined boundary file, if you're mapping at the tract or ZIP Code Tabulation Area (ZCTA) level.</li>
        </ol>
        <p className="mb-6">
          A responsible project plan lists, for each source, exactly which fields it needs and what year/vintage it's pulling — API variable codes and file formats change over time, and citing a source without a vintage is a common way to lose easy credit.
        </p>

        <h2 id="suggested-project-architecture" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Suggested project architecture</h2>
        <p className="mb-6">
          A clean version of this pipeline looks roughly like:
        </p>
        <pre className="mb-6 overflow-x-auto rounded-xl bg-black/40 border border-white/10 p-4 text-sm text-slate-300"><code>{`[Census ACS API] ──┐
                    ├──▶ [clean & join on geography ID] ──▶ [analysis-ready table]
[FDIC / NCUA data] ─┘                                              │
                                                                    ├──▶ [descriptive stats + EDA]
[optional: Places/OSM] ──▶ [geocode / distance calc] ─────────────┤
                                                                    ├──▶ [maps & charts]
                                                                    └──▶ [regression / correlation]`}</code></pre>
        <p className="mb-6">
          The unglamorous middle step — joining everything onto a shared geography identifier — is where most of the actual work and most of the actual bugs live. Decide your unit of analysis (tract, ZIP, county) before you pull a single API response, because reconciling mismatched geography levels after the fact is painful.
        </p>

        <h2 id="selecting-census-variables" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Selecting Census variables</h2>
        <p className="mb-6">
          The ACS exposes thousands of variables by cryptic code (e.g. <code>B19013_001E</code> for median household income, <code>B17001_002E</code> for population below poverty). A few practical rules: always check the current variable list against the Census Bureau's own API documentation rather than an old blog post, since codes are occasionally deprecated or restructured between vintages; prefer estimates with reasonable margins of error at your chosen geography level (tract-level ACS 5-year estimates are more stable than 1-year estimates for small areas, at the cost of being less current); and record the exact table and vintage you pulled so your methodology section is reproducible.
        </p>
        <p className="mb-6">
          A minimal request might look like:
        </p>
        <pre className="mb-6 overflow-x-auto rounded-xl bg-black/40 border border-white/10 p-4 text-sm text-slate-300"><code>{`GET https://api.census.gov/data/2022/acs/acs5
    ?get=NAME,B19013_001E,B17001_002E,B01003_001E
    &for=tract:*
    &in=state:{FIPS}+county:{FIPS}
    &key={YOUR_KEY}`}</code></pre>
        <p className="mb-6">
          Every serious project should include an error-handling path for the common failure modes: a missing or invalid API key (401/403), an invalid geography or variable code (400 with a specific message worth reading, not just catching), and rate limiting (429) — these are the errors students hit most often, and they're all fixable in minutes once you know what they mean.
        </p>

        <h2 id="preparing-financial-institution-location-data" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Preparing financial-institution location data</h2>
        <p className="mb-6">
          FDIC BankFind and NCUA data typically arrive as tables with an institution ID, name, address, and lat/lon (or an address you'll need to geocode). If you're supplementing with Google Places or OpenStreetMap for alternative lenders, decide your inclusion criteria <em>before</em> pulling data — "payday lender" and "check-cashing service" aren't always cleanly tagged categories, and an ad hoc decision made mid-analysis is a common source of quiet bias. Whatever definition you use, write it down; it's a limitation either way, and an explicit one is a strength, not a weakness, in a student write-up.
        </p>

        <h2 id="cleaning-and-joining-datasets" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Cleaning and joining datasets</h2>
        <p className="mb-6">
          This is where pandas earns its keep. A typical cleaning pass involves: coercing geography IDs to a consistent string format (leading zeros in FIPS codes are a classic silent bug — a county code of <code>"023"</code> becoming the integer <code>23</code> will break every join downstream), deduplicating institution records (multiple branches of the same bank at slightly different addresses are not duplicates; the same branch pulled from two sources is), and deciding — explicitly — how to handle missing values rather than letting <code>NaN</code> propagate silently into your statistics.
        </p>
        <pre className="mb-6 overflow-x-auto rounded-xl bg-black/40 border border-white/10 p-4 text-sm text-slate-300"><code>{`# Illustrative only — not a complete pipeline
demo = demo.assign(geo_id=demo["geo_id"].astype(str).str.zfill(11))
banks = banks.dropna(subset=["latitude", "longitude"])
merged = demo.merge(banks_by_geo, on="geo_id", how="left")
merged["bank_count"] = merged["bank_count"].fillna(0)`}</code></pre>
        <p className="mb-6">
          That <code>fillna(0)</code> is a real methodological choice, not a formatting detail — a missing join means "no bank matched to this area's ID," which is different from "we don't know," and treating it as zero should be a deliberate, stated decision.
        </p>

        <h2 id="calculating-bank-density-and-distance" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Calculating bank density and distance</h2>
        <p className="mb-6">
          Two access measures show up in nearly every version of this project: <strong className="text-white">density</strong> (institutions per 10,000 residents, or per square mile) and <strong className="text-white">distance</strong> (typically the haversine great-circle distance from a population-weighted area centroid to the nearest reputable institution). Haversine distance is a reasonable and standard approximation for this purpose; it is not the same as drive time, and saying so explicitly in your limitations section is worth more than pretending otherwise.
        </p>
        <pre className="mb-6 overflow-x-auto rounded-xl bg-black/40 border border-white/10 p-4 text-sm text-slate-300"><code>{`from math import radians, sin, cos, sqrt, atan2

def haversine_miles(lat1, lon1, lat2, lon2):
    R = 3958.8  # Earth radius in miles
    dlat, dlon = radians(lat2 - lat1), radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    return 2 * R * atan2(sqrt(a), sqrt(1 - a))`}</code></pre>

        <h2 id="building-maps-and-visualisations" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Building maps and visualisations</h2>
        <p className="mb-6">
          A choropleth map (areas shaded by a value — poverty rate, or your own access score) reads faster than a table, but it can also mislead through the modifiable areal unit problem: the same underlying data can look very different depending on how you draw the boundaries. Pair every map with at least one non-spatial chart — a poverty-rate-vs-bank-density scatter plot with a regression line is the workhorse of this project — and consider an accessible data-table alternative so the finding doesn't live only in a graphic.
        </p>

        <h2 id="selecting-statistical-methods" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Selecting statistical methods</h2>
        <p className="mb-6">
          Start descriptive before you go inferential: report means, medians, and spread before you report a p-value. Pearson correlation is appropriate for roughly linear relationships between two continuous variables; Spearman is more robust if your data is skewed or you only care about rank order. Simple linear regression extends a bivariate correlation into a predictive line; multiple regression lets you add controls (population density, urban/rural classification) so you're not attributing a whole relationship to one variable that's really riding along with a confound. Whatever you choose, check your sample size against the method's practical minimum before you trust the output — a regression run on eight data points is decoration, not evidence.
        </p>

        <h2 id="correlation-versus-causation" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Correlation versus causation</h2>
        <p className="mb-8">
          This is the section every instructor is quietly grading hardest. A statistically significant correlation between poverty rate and bank density in a cross-sectional dataset tells you the two move together across your sample; it does not tell you that poverty causes bank scarcity, that bank scarcity causes poverty, or that a third factor (population density, historical redlining, transportation infrastructure) doesn't explain both. If your design is cross-sectional — one snapshot in time, no control group, no intervention — causal language in your conclusion is a claim your data can't support, no matter how clean the regression looks.
        </p>

        <h2 id="common-project-mistakes" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Common project mistakes</h2>
        <p className="mb-6">
          The recurring ones, roughly in order of frequency: mismatched geography IDs breaking joins silently (the merge "succeeds" and just produces a lot of quiet <code>NaN</code>s); running regression on too few observations; picking a definition of "reputable institution" or "poverty" after seeing the data, rather than before (this is a subtle form of the same problem as p-hacking); treating a configurable access-score threshold as an objective cutoff instead of a modeling choice; and writing a conclusion that states a causal or generalizable finding the design can't actually support.
        </p>

        <h2 id="data-ethics-and-limitations" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Data ethics and limitations</h2>
        <p className="mb-6">
          Financial-access data touches real communities, and area-level statistics carry a specific risk called the ecological fallacy: a pattern true of an area (say, a high poverty rate) does not mean it's true of every individual within it. Be careful with language that implies moral judgment about a place or its residents. Document your data's vintage and coverage gaps, and be explicit that institution counts don't capture service quality, language access, or actual usage — presence isn't the same as access.
        </p>

        <h2 id="project-submission-checklist" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Project submission checklist</h2>
        <p className="mb-8">
          Before you call a project done: every variable has a written operational definition; every data source and its vintage year is documented; your unit of analysis is stated and consistent throughout; you've checked sample size against your method's minimum; you've addressed multicollinearity if using multiple predictors; you've stated how you handled missing data and why; you've explicitly distinguished correlation from causation in your write-up; and your conclusion is your own interpretation, not a template's.
        </p>

        <h2 id="how-the-student-lab-helps" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">How the Student Lab helps</h2>
        <p className="mb-8">
          Everything above is real work, and doing it well the first time — correctly joining geography IDs, choosing a defensible statistical method, writing limitations that actually hold up — is exactly the kind of thing that's faster with a working reference environment next to you. The{' '}
          <a href={LIVE_DEMO_URL} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline decoration-primary-500/30 underline-offset-4">
            Bank Desert Analysis Student Lab
          </a>{' '}
          is a Python + Pandas + Jupyter toolkit and an interactive web app built around this exact workflow: a guided research-design builder, a Census/Google-Places data-source planner, an import-and-cleaning wizard, a transparent (student-configurable) access-score builder, a statistics lab that shows its formulas and limitations for every result, and ten guided notebooks that run end-to-end on synthetic demonstration data. It is a study aid and project-starter kit, not a finished assignment — see the note below.
        </p>

        <h2 id="frequently-asked-questions" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Frequently asked questions</h2>
        <dl className="space-y-6 mb-8">
          <div>
            <dt className="text-white font-semibold mb-1.5">Do I need a paid API key to try this?</dt>
            <dd className="text-slate-300">No. The Census ACS API is free with a registered key, and the Student Lab's synthetic demonstration data path needs no key at all. Google Places is optional and bring-your-own-key only.</dd>
          </div>
          <div>
            <dt className="text-white font-semibold mb-1.5">Is bank density the same as bank access?</dt>
            <dd className="text-slate-300">No — it's one measurable proxy among several (distance, transit access, service hours, language access all matter too), and a careful project says so.</dd>
          </div>
          <div>
            <dt className="text-white font-semibold mb-1.5">Can I use this for a country other than the US?</dt>
            <dd className="text-slate-300">The specific APIs referenced here (Census ACS, FDIC BankFind, NCUA) are US-specific; the analytical approach — density, distance, correlation, regression — generalizes to other countries if you substitute your own national data sources.</dd>
          </div>
          <div>
            <dt className="text-white font-semibold mb-1.5">What's the minimum sample size for a regression?</dt>
            <dd className="text-slate-300">There's no universal number, but single digits is a red flag. Aim for at least 20-30 observations for a simple regression, more for multiple predictors, and always report your actual n.</dd>
          </div>
          <div>
            <dt className="text-white font-semibold mb-1.5">Should I use tract-level or county-level data?</dt>
            <dd className="text-slate-300">Tract-level gives more geographic detail but noisier estimates (bigger margins of error); county-level is more stable but can mask within-county variation. Pick based on your research question and say why.</dd>
          </div>
          <div>
            <dt className="text-white font-semibold mb-1.5">Is a choropleth map required?</dt>
            <dd className="text-slate-300">No — it's a strong communication tool but not a methodological requirement. A well-labeled scatter plot with a regression line often does more analytical work than a map.</dd>
          </div>
          <div>
            <dt className="text-white font-semibold mb-1.5">Can this project prove income inequality causes fewer bank branches?</dt>
            <dd className="text-slate-300">Not from cross-sectional data alone — see the correlation-versus-causation section above. You can document an association and discuss plausible mechanisms without claiming to have proven one.</dd>
          </div>
        </dl>

        <p className="italic text-slate-400 border-t border-white/10 pt-6">
          This article is a general guide, not a completed assignment — see the{' '}
          <a href={LIVE_DEMO_URL} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline decoration-primary-500/30 underline-offset-4">
            Bank Desert Analysis Student Lab
          </a>{' '}
          for guided tools, and its academic-integrity notice for what you're expected to do with any of this yourself.
        </p>
      </div>

      {/* Closing CTA — reuses the article's own academic-integrity framing verbatim rather than replacing it with punchier marketing copy. */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mt-10 mb-2">
        <p className="text-sm text-slate-400 mb-5">
          This article is a general guide, not a completed assignment — the Student Lab below is a study aid and project-starter kit, not a finished assignment.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={LIVE_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-400 text-white font-bold py-3 px-6 rounded-full text-sm tracking-wide transition-colors"
          >
            Try the Bank Desert Analysis Student Lab
          </a>
          <a
            href={`${import.meta.env.BASE_URL}#credentials`}
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold py-3 px-6 rounded-full text-sm tracking-wide transition-colors"
          >
            See my data-analysis credentials
          </a>
        </div>
      </div>
    </>
  );
}
