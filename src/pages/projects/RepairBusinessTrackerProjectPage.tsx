import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

type Job = { ref: string; customer: string; appliance: string; status: string; fault: string; parts: number; labour: number };
const initialJobs: Job[] = [
  { ref: 'JOB-1001', customer: 'Maya Patel', appliance: 'Washing machine', status: 'Awaiting Parts', fault: "Won't drain", parts: 48, labour: 65 },
  { ref: 'JOB-1002', customer: 'Jon Bell', appliance: 'Microwave', status: 'Ready to Complete', fault: 'Sparks inside cavity', parts: 18, labour: 55 },
];
const statuses = ['New', 'Diagnosing', 'Awaiting Parts', 'Ready to Complete', 'Completed', 'Cancelled'];

export default function RepairBusinessTrackerProjectPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [filter, setFilter] = useState('All');
  const [issued, setIssued] = useState(false);
  const visible = useMemo(() => filter === 'All' ? jobs : jobs.filter((j) => j.status === filter), [jobs, filter]);
  const updateStatus = (ref: string, status: string) => setJobs((rows) => rows.map((j) => j.ref === ref ? { ...j, status } : j));
  const reset = () => { setJobs(initialJobs); setIssued(false); };
  const open = jobs.filter((j) => !['Completed', 'Cancelled'].includes(j.status)).length;
  const awaiting = jobs.filter((j) => j.status === 'Awaiting Parts').length;
  return <>
    <Helmet><title>Repair Business Job & Parts Tracker | Iederees Francis</title><meta name="description" content="A fictional-data interactive demo of a repair job, parts stock and invoice workflow." /><link rel="canonical" href="https://iederees-create.github.io/3D-Portfolio/projects/repair-business-job-parts-tracker" /></Helmet>
    <main className="section project-detail repair-demo-page">
      <p className="eyebrow">DEMO • FICTIONAL DATA ONLY</p><h1>Repair Business Job &amp; Parts Tracker</h1>
      <p className="lead">A focused workflow for independent appliance repair technicians: create the job, diagnose it, issue parts, update status and produce an itemised document.</p>
      <div className="project-actions"><button className="cta cta-secondary" onClick={reset}>Reset sample</button><button className="cta" onClick={() => window.print()}>Print / Save PDF</button></div>
      <section className="metrics-grid" aria-label="Dashboard summary">
        {[['Open jobs', open], ['Awaiting parts', awaiting], ['Completed jobs', jobs.filter((j) => j.status === 'Completed').length], ['Low-stock parts', issued ? 1 : 0]].map(([label, value]) => <article className="metric-card" key={String(label)}><span>{label}</span><strong>{value}</strong></article>)}
      </section>
      <section className="card" aria-labelledby="jobs-heading"><div className="section-heading"><h2 id="jobs-heading">Job register</h2><label>Filter status<select value={filter} onChange={(e) => setFilter(e.target.value)}><option>All</option>{statuses.map((s) => <option key={s}>{s}</option>)}</select></label></div>
        {visible.length ? <div className="table-wrap"><table><thead><tr><th>Reference</th><th>Customer</th><th>Appliance / fault</th><th>Status</th><th>Document</th></tr></thead><tbody>{visible.map((job) => <tr key={job.ref}><td><strong>{job.ref}</strong></td><td>{job.customer}</td><td>{job.appliance}<br /><small>{job.fault}</small></td><td><label className="sr-only" htmlFor={`status-${job.ref}`}>Status for {job.ref}</label><select id={`status-${job.ref}`} value={job.status} onChange={(e) => updateStatus(job.ref, e.target.value)}>{statuses.map((s) => <option key={s}>{s}</option>)}</select></td><td><button className="text-button" onClick={() => setIssued(true)}>Issue part</button><br /><button className="text-button" onClick={() => window.print()}>Print invoice</button></td></tr>)}</tbody></table></div> : <p className="empty-state">No jobs match this filter. Reset the fictional sample to continue.</p>}
      </section>
      <section className="project-copy-grid"><article className="card"><h2>Stock ledger, not guesswork</h2><p>Parts are deducted only when an ISSUE movement is recorded. Returns are explicit, and a catalogue price change cannot rewrite an issued invoice snapshot.</p>{issued && <p role="status" className="success-state">Sample issue recorded. In a real workbook this would be one explicit ledger movement, not a side effect of saving the job.</p>}</article><article className="card"><h2>What this demo is—and is not</h2><p>This public page uses local fictional state and has no login, database or receipt upload. The Etsy kit is a spreadsheet/template download; this web demo is a separate proof of the workflow.</p></article></section>
    </main>
  </>;
}
