/**
 * @file insightforge-airflow-data-pipeline.tsx
 * @description Blog post: "InsightForge Evolves: From CSV Analytics Dashboard to an
 *              Automated Data Pipeline" — a follow-up to insightforge-business-analytics-studio.tsx
 * @project     InsightForge Business Analytics Studio
 * @author      Iederees Francis — NextGenWebs, Cape Town, South Africa
 * @portfolio   https://iederees-create.github.io/3D-Portfolio/
 * @liveDemo    https://iederees-create.github.io/insightforge-business-analytics-dashboard/
 * @repo        https://github.com/iederees-create/insightforge-business-analytics-dashboard
 * @stack       Apache Airflow, Python, pandas, TaskFlow API, React, TypeScript, Vite
 * @keywords    apache airflow tutorial, python etl pipeline, data engineering project,
 *              airflow taskflow api, csv data pipeline, data quality automation,
 *              idempotent airflow dag, airflow dag design, etl best practices
 */

const LIVE_DEMO_URL =
  'https://iederees-create.github.io/insightforge-business-analytics-dashboard/';
const GITHUB_URL =
  'https://github.com/iederees-create/insightforge-business-analytics-dashboard';

export default function InsightforgeAirflowDataPipelineContent() {
  return (
    <>
      <div className="prose prose-invert prose-lg max-w-none text-slate-300">

        <h2 id="recap" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          A Quick Recap: What InsightForge Originally Did
        </h2>
        <p className="mb-6">
          When I first shipped <strong>InsightForge Business Analytics Studio</strong> (see the{' '}
          <a href="/blog/insightforge-business-analytics-studio/" className="text-primary-400 hover:text-primary-300 font-semibold">
            original write-up
          </a>
          ), the goal was a fully client-side business intelligence dashboard: upload a CSV of
          sales, customer, or review data, map your columns, and get an interactive dashboard,
          customer segmentation, sentiment insights, forecasts, a scenario planner, and
          downloadable reports — all running in the browser tab, with nothing ever uploaded
          anywhere. That no-code experience hasn't changed. It still works exactly as it did,
          with zero code changes required to keep using it.
        </p>
        <p className="mb-6">
          What has changed is what happens <em>before</em> a buyer opens that CSV.
        </p>

        <h2 id="the-next-problem" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          Why Manual CSV Preparation Was the Next Problem to Solve
        </h2>
        <p className="mb-6">
          The browser dashboard is deliberately a one-shot tool: you open it, upload a file, and
          explore. That's exactly right for a business owner doing an ad-hoc analysis. It's the
          wrong shape for someone who wants the <em>same</em> discovery → cleaning → KPI
          calculation → export sequence to run automatically every night against fresh exports
          from three different source systems — sales, customers, and reviews — without a human
          re-uploading anything. That's an orchestration problem, not a browser problem, and it
          called for a real ETL pipeline rather than a bigger web app.
        </p>

        <h2 id="what-i-learned" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          What I Learned About Data Engineering, ETL, and Orchestration
        </h2>
        <p className="mb-6">
          This was my first production-shaped Apache Airflow project, built alongside a LinkedIn
          Learning course (<em>Hands-On Introduction: Data Engineering</em> — now listed on my{' '}
          <a href="/credentials" className="text-primary-400 hover:text-primary-300 font-semibold">Credentials page</a>
          ). The single biggest mental shift from web development to data engineering is that a
          pipeline's real product isn't a UI — it's a guarantee. A guarantee that the same inputs
          produce the same outputs every time, that a partial failure doesn't leave corrupted data
          behind, and that when something does fail, the log tells you exactly which file and
          column to look at rather than a bare stack trace. Orchestration tools like Airflow exist
          to make those guarantees enforceable rather than aspirational — retries, dependency
          ordering, and a metadata store that remembers what already ran.
        </p>

        <h2 id="dag-design" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          How the Airflow DAG Was Designed
        </h2>
        <p className="mb-6">
          The DAG has seven tasks, wired with Airflow's modern TaskFlow API (<code>@dag</code>/
          <code>@task</code> decorators instead of hand-built <code>PythonOperator</code>s):
        </p>
        <pre className="bg-black/40 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-6">
{`discover_inputs → validate_schema → clean_and_deduplicate → join_datasets
  → calculate_metrics → export_dashboard_data → generate_quality_report`}
        </pre>
        <img
          src={`${import.meta.env.BASE_URL}projects/insightforge/13-pipeline-architecture-dag.webp`}
          alt="InsightForge Airflow ETL pipeline task graph, rendered directly from the live DAG object's task_dict and downstream_task_ids"
          className="rounded-xl border border-white/10 w-full mb-2"
          loading="lazy"
        />
        <p className="text-sm text-slate-500 mb-6">
          The DAG graph above, generated straight from the live DAG object — not hand-drawn.
        </p>
        <p className="mb-6">
          Every task is a thin adapter: it pulls a couple of plain values out of Airflow's
          execution context, calls one pure Python function from a separate <code>transforms/</code>
          module, and returns a small dict for the next task. All the actual pandas work — reading
          CSVs, coercing types, deduplicating, joining, computing KPIs — lives in those
          <code>transforms/</code> functions, which know nothing about Airflow. That separation
          means a standalone CLI (<code>python -m cli.run_pipeline</code>) can call the exact same
          functions the DAG calls, so there's exactly one implementation of the logic, not two
          that can silently drift apart. The final task, <code>generate_quality_report</code>,
          deliberately fans in from five upstream tasks — it needs to summarise validation,
          cleaning, joining, metrics, and export together, not just the step immediately before it.
        </p>

        <h2 id="extract-validate-transform-load" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          Extract, Validate, Transform, and Load
        </h2>
        <p className="mb-6">
          <strong>Extract</strong> (<code>discover_inputs</code>) confirms sales.csv, customers.csv,
          and reviews.csv all exist, counts their rows, and fingerprints each with a SHA-256
          checksum before anything else touches them. <strong>Validate</strong>{' '}
          (<code>validate_schema</code>) checks that every required column (date, order ID, and
          revenue for sales; customer ID for customers; rating for reviews) is actually present,
          and counts missing values and type violations per column — a missing revenue value is
          treated as missing, never silently coerced to zero. <strong>Transform</strong>{' '}
          (<code>clean_and_deduplicate</code> and <code>join_datasets</code>) standardises text
          fields, collapses case/whitespace variants of the same category label to whichever
          variant is most common, removes exact duplicate rows, and left-joins sales to customers
          and to per-product review aggregates. <strong>Load</strong>{' '}
          (<code>export_dashboard_data</code>) writes a CSV whose headers deliberately match the
          exact vocabulary the browser dashboard's own column-mapping wizard scores against — more
          on that below.
        </p>

        <h2 id="schema-checks" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          Schema Checks, Missing Values, and Duplicate Handling
        </h2>
        <p className="mb-6">
          I generated a synthetic dataset (1,513 sales rows, 400 customers, 250 reviews — entirely
          fictional, seeded for reproducibility) with data-quality problems injected on purpose:
          missing revenue values, a couple of malformed dates, exact-duplicate rows, order IDs
          that legitimately repeat with different content, sales rows referencing a customer ID
          that doesn't exist in the customer file, and inconsistent category-label casing. Running
          the real pipeline against that data produces a genuine{' '}
          <strong>92/100 data-quality score</strong> with real, traceable findings — not a
          fabricated demo number. A deliberate design choice: exact duplicate rows are removed
          automatically (they're unambiguous errors), but a duplicate order ID with{' '}
          <em>different</em> row content is flagged and reported, never silently deleted — it
          might be a legitimate multi-line order, and that's a judgement call a human should make,
          not the pipeline.
        </p>
        <img
          src={`${import.meta.env.BASE_URL}projects/insightforge/12-pipeline-data-quality.webp`}
          alt="InsightForge Data Quality Lab independently re-detecting the same data-quality issues the Airflow pipeline's own quality report found"
          className="rounded-xl border border-white/10 w-full mb-2"
          loading="lazy"
        />
        <p className="text-sm text-slate-500 mb-6">
          The browser dashboard's own Data Quality Lab, run against the pipeline's output —
          independently re-detecting the same issues the pipeline's quality report already found.
        </p>

        <h2 id="dependencies-retries-logging" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          Task Dependencies, Retries, Logging, and Failure Recovery
        </h2>
        <p className="mb-6">
          Every task gets two retries with exponential backoff by default. More importantly, every
          failure mode has a purpose-built exception — <code>InputDiscoveryError</code>,{' '}
          <code>SchemaValidationError</code>, <code>JoinIntegrityError</code> — that names the
          offending file, column, or row count directly in the message. A pipeline that fails with
          "KeyError: 'revenue'" three levels deep in a pandas traceback is useless at 3am; a
          pipeline that fails with "sales.csv is missing required column(s): ['revenue']" is
          something you can act on immediately. Idempotency is the other half of failure recovery:
          output for a given logical date always lands in the same deterministic path, every write
          is atomic (write to a temp file, then rename into place), and the synthetic input data is
          static rather than regenerated at run time. I verified this isn't just a design
          intention — a test runs the full pipeline twice for the same logical date and diffs
          every output file byte-for-byte, and it passes.
        </p>

        <h2 id="dashboard-integration" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          Connecting Pipeline Outputs to the InsightForge Dashboard
        </h2>
        <p className="mb-6">
          "Dashboard-compatible" is a claim I wanted to actually verify, not just assert. The
          pipeline's KPI formulas (revenue, orders, average order value, profit margin,
          repeat-customer rate, RFM-style segmentation thresholds) mirror the exact TypeScript
          calculation modules the browser app uses. The exported CSV's headers ("Date", "Order
          ID", "Revenue", "Category", and so on) match the same keyword vocabulary the dashboard's
          Import Wizard auto-detects against. So I loaded the pipeline's real output straight into
          the running dashboard: every mappable column auto-detected with zero manual
          configuration, and the dashboard's own independently-computed headline numbers — revenue
          $289,656.41, 1,500 orders — matched the pipeline's own KPI calculation exactly.
        </p>
        <img
          src={`${import.meta.env.BASE_URL}projects/insightforge/11-pipeline-dashboard-output.webp`}
          alt="InsightForge Business Performance Dashboard loaded with real output from the Airflow pipeline, showing revenue and order KPIs matching the pipeline's own independently-computed numbers"
          className="rounded-xl border border-white/10 w-full mb-2"
          loading="lazy"
        />
        <p className="text-sm text-slate-500 mb-6">
          Two independent implementations of the same KPI formulas — one in Python inside the
          pipeline, one in TypeScript inside the dashboard — agreeing to the cent.
        </p>

        <h2 id="testing" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          Testing the Complete Workflow
        </h2>
        <p className="mb-6">
          The pipeline has <strong>30 pytest tests</strong> across three tiers: fast unit tests for
          each transformation module (no Airflow import at all, so they run in well under a
          second), a DAG-import test that parses the DAG with Airflow's own <code>DagBag</code>{' '}
          and asserts the seven task IDs and their dependency edges match spec exactly, and a full
          synthetic end-to-end run that exercises the real pipeline against the real sample data
          and checks the idempotency guarantee described above. On top of the automated suite, I
          ran the DAG for real via <code>airflow dags test insightforge_etl 2026-08-16</code> — a
          genuine, complete, successful run of all seven tasks in dependency order, with real data
          passed between tasks through XCom.
        </p>
        <p className="mb-6">
          One more test worth mentioning: an XCom size guard. Airflow tasks pass data to each
          other through its metadata database, and it's a classic beginner mistake to pass a whole
          DataFrame through it. Every task in this DAG passes only file paths and small metadata
          dicts — verified by a test that runs the real pipeline and asserts every task's payload
          stays under 10KB and is safely JSON-serialisable.
        </p>

        <h2 id="challenges" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          Technical Challenges and Lessons Learned
        </h2>
        <p className="mb-6">
          The machine I built this on turned out to be a genuinely useful constraint: no Docker
          installed, and free memory tight enough that running Airflow's full webserver +
          scheduler process (<code>airflow standalone</code>) risked destabilising the whole
          system. Rather than skip verification, that forced a better set of habits: use{' '}
          <code>airflow dags test</code> for a full synchronous run instead of standing up
          persistent daemons, use <code>DagBag</code> import checks instead of a running
          webserver, and — when even the Graph-view screenshot depends on a missing{' '}
          <code>graphviz</code> binary with no sudo access to install it — read the DAG object's
          own <code>task_dict</code> and render the real structure directly, rather than either
          faking a screenshot or giving up on the diagram entirely. The rendered graph in this
          post is exactly that: derived from the live DAG, not a UI screenshot, and the README says
          so plainly.
        </p>
        <p className="mb-6">
          A second, more mundane lesson: adding a Python virtual environment inside a JavaScript
          monorepo is not free. Vitest doesn't exclude arbitrary directories by default, and
          Apache Airflow's Python package ships its own bundled React frontend source — including
          <code>.test.tsx</code> files — inside <code>site-packages</code>. The first time I ran
          the existing app's test suite after adding the pipeline, Vitest tried to collect and run
          Airflow's internal frontend tests and failed on 46 files that have nothing to do with
          this project. The fix was a one-line <code>exclude</code> pattern in the Vite config —
          but it's a reminder that "keep the new thing separate" needs to be enforced by config,
          not just by good intentions and a different folder name.
        </p>

        <h2 id="whats-next" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          What I'd Improve Next
        </h2>
        <p className="mb-6">
          The Docker setup (<code>Dockerfile</code> + <code>docker-compose.yaml</code>) is authored
          but genuinely untested end-to-end — I validated the same pinned Airflow version through
          a local virtualenv instead, and the docs say so explicitly rather than implying otherwise.
          Getting real Docker CI coverage on that path is the top of my list. After that: a
          lightweight scheduled trigger (the DAG currently runs on manual trigger, with{' '}
          <code>schedule="@daily"</code> available as a one-line config change for anyone who wants
          real recurring runs), and extending the join stage to reconcile partial/late-arriving
          files rather than requiring all three inputs to exist upfront.
        </p>

        <h2 id="cta" className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
          Try It Yourself
        </h2>
        <p className="mb-6">
          The dashboard is still free to explore at{' '}
          <a href={LIVE_DEMO_URL} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">
            the InsightForge live demo
          </a>
          , and the full source — dashboard, optional Python analyst toolkit, and the new Airflow
          pipeline — is on{' '}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">
            GitHub
          </a>
          . You can also read the full{' '}
          <a href="/work/insightforge-business-analytics-studio/" className="text-primary-400 hover:text-primary-300 font-semibold">
            InsightForge case study
          </a>{' '}
          for the complete before/after picture.
        </p>
        <p className="mb-6">
          If you're weighing whether your product needs a real data-engineering layer — not just a
          bigger frontend — I'd be glad to talk it through. I'm <strong>Iederees Francis</strong>,
          founder of <strong>NextGenWebs</strong> in Cape Town, South Africa.
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-300">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:iedereesfrancis@gmail.com" className="text-primary-400 hover:text-primary-300 font-semibold">
              iedereesfrancis@gmail.com
            </a>
          </li>
          <li>
            <strong>WhatsApp:</strong>{' '}
            <a href="https://wa.me/27629494708" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">
              +27 62 949 4708
            </a>
          </li>
          <li>
            <strong>Portfolio:</strong>{' '}
            <a href="https://iederees-create.github.io/3D-Portfolio/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 font-semibold">
              iederees-create.github.io/3D-Portfolio
            </a>
          </li>
        </ul>

      </div>
    </>
  );
}
