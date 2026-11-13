import { ArrowRight, ExternalLink, LockKeyhole, CalendarDays, ClipboardList, LayoutDashboard, Palette } from 'lucide-react';

const siteUrl = 'https://iederees-create.github.io/3D-Portfolio/butterflies-educare/';
const projectUrl = import.meta.env.BASE_URL + 'work/butterflies-educare-school-platform/';

export default function ButterfliesEducareSchoolPlatformCaseStudy() {
  return (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300">
      <p className="lead text-xl font-medium text-slate-200">
        A school website should welcome a parent on their phone and still give the principal the tools
        to manage day-to-day work. Butterflies Educare became more than a brochure: the project connects
        a public school experience, parent accounts, 2027 applications and school management.
      </p>

      <div className="not-prose my-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
          <span className="block text-xs font-bold uppercase tracking-wider text-emerald-300">Project</span>
          <strong className="mt-2 block text-base text-white">School website &amp; portal</strong>
          <span className="mt-1 block text-xs text-slate-300">Real school · public site live</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Audience</span>
          <strong className="mt-2 block text-base text-white">Families and staff</strong>
          <span className="mt-1 block text-xs text-slate-300">Mobile-first UX · Accessible forms</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Stack</span>
          <strong className="mt-2 block text-base text-white">JavaScript &amp; Supabase</strong>
          <span className="mt-1 block text-xs text-slate-300">PostgreSQL · GitHub Pages</span>
        </div>
      </div>

      <h2 className="mt-10 border-b border-white/10 pb-3 text-2xl font-bold text-white">The challenge: one home for disconnected school tasks</h2>
      <p>
        Families needed clear school information and a simpler way to apply for 2027. The principal needed
        oversight of applications, parent enquiries, school events and proposed classes without constantly
        copying information between paper forms, emails and WhatsApp conversations.
      </p>
      <p>
        The school supplied its existing registration form, Code of Conduct and Fees &amp; Payment Policy.
        Rather than invent new requirements, I used these documents to shape the online application journey,
        while preserving the school's existing debit-order arrangements.
      </p>

      <h2 className="mt-10 border-b border-white/10 pb-3 text-2xl font-bold text-white">Designing a welcoming and useful experience</h2>
      <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <Palette className="mb-3 text-emerald-300" size={25} />
          <h3 className="text-lg font-semibold text-white">A distinct school identity</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Warm pastel accents, butterfly imagery, gentle motion and friendly language create an inviting
            public website without overwhelming parents who simply need to find information.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ClipboardList className="mb-3 text-emerald-300" size={25} />
          <h3 className="text-lg font-semibold text-white">Registration made less intimidating</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            The 2027 application is split into five stages, with understandable labels, progress indicators,
            draft saving and a review-before-submit step, all designed to work on a phone.
          </p>
        </div>
      </div>
      <p>
        Parent accounts are separate from general enrolment enquiries. The formal application collects learner
        details, guardian and emergency contacts, optional health information and acknowledgements of school
        policies. The school reviews submissions; sending a form does not automatically offer a place.
      </p>

      <h2 className="mt-10 border-b border-white/10 pb-3 text-2xl font-bold text-white">The workflows behind the website</h2>
      <div className="not-prose my-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 p-5">
          <ClipboardList size={24} className="mb-3 text-emerald-300" />
          <h3 className="font-semibold text-white">Parents</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Account creation, email confirmation, saved applications, status tracking and school messages.</p>
        </div>
        <div className="rounded-2xl border border-white/10 p-5">
          <LayoutDashboard size={24} className="mb-3 text-emerald-300" />
          <h3 className="font-semibold text-white">School administrators</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Application reviews, parent enquiries, announcements, school events and guest-class requests.</p>
        </div>
        <div className="rounded-2xl border border-white/10 p-5">
          <CalendarDays size={24} className="mb-3 text-emerald-300" />
          <h3 className="font-semibold text-white">Guest presenters</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">Explore school calendar opportunities and submit a class proposal for review.</p>
        </div>
      </div>
      <p>
        The principal's private dashboard focuses on managing the school. A separate developer-owner view
        adds deployment health, verified staff permissions and an access-change audit. These privileges are
        controlled in the database and are not offered to ordinary parent accounts.
      </p>

      <h2 className="mt-10 border-b border-white/10 pb-3 text-2xl font-bold text-white">Architecture and children's privacy</h2>
      <p>
        GitHub Pages serves the public site without requiring another paid hosting service. Supabase Auth
        handles sign-in, while PostgreSQL stores private parent and school information. Database Row-Level
        Security and permission checks restrict applications to the relevant parent and authorised school
        administrators; a hidden button is never treated as an access-control mechanism.
      </p>
      <div className="not-prose my-7 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-6">
        <div className="flex items-start gap-3">
          <LockKeyhole size={23} className="mt-1 shrink-0 text-amber-300" />
          <div>
            <h3 className="text-lg font-bold text-white">Show the engineering, not a child's records</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              This portfolio uses illustrated UI concepts rather than real school-account screenshots.
              No child names, medical details, contact records or passwords are exposed as promotional data.
              School privacy policies, retention details and production operating processes still require
              approval and routine review.
            </p>
          </div>
        </div>
      </div>

      <h2 className="mt-10 border-b border-white/10 pb-3 text-2xl font-bold text-white">Release checks and what remains unverified</h2>
      <p>
        One deployment accidentally reduced the rich homepage to a mostly bare page. I traced the regression
        through Git history, restored the interactive sections and strengthened CI checks so a future build
        must include the garden visuals, page sections and school application modules. Automated builds and
        GitHub Pages live-release verification subsequently passed in November 2026.
      </p>
      <p>
        Database permissions for the school administrator and developer-owner accounts were also checked.
        A complete end-to-end live enrolment submission from a parent's browser through the principal's
        review has not yet been independently verified. No invented conversion rates, registration totals
        or parent-satisfaction figures appear in this case study.
      </p>

      <h2 className="mt-10 border-b border-white/10 pb-3 text-2xl font-bold text-white">What the project demonstrates</h2>
      <ul className="list-disc space-y-3 pl-6">
        <li>Translating nontechnical school requirements and policies into understandable software workflows.</li>
        <li>Balancing expressive visual design with usable, responsive forms.</li>
        <li>Developing permission-aware parent, staff and developer experiences on one backend.</li>
        <li>Protecting private learner information and separating it from public portfolio materials.</li>
        <li>Using a real production regression to improve automated release checks.</li>
      </ul>

      <div className="not-prose mt-10 flex flex-col gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Explore the work</p>
          <h3 className="mt-1 text-xl font-bold text-white">Butterflies Educare</h3>
          <p className="mt-2 max-w-xl text-sm text-slate-300">The public school site is open. Parent applications and school management require their own authorised accounts.</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a href={projectUrl} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/20">View project <ArrowRight size={15}/></a>
          <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-slate-950 hover:bg-slate-200">Live school site <ExternalLink size={15}/></a>
        </div>
      </div>
    </div>
  );
}
