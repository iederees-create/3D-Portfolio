import { useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../../components/SEO';
import { CampaignLink } from '../../content/inbound/InboundMarkdown';
import {
  BOOKING_SUBJECT,
  FORMSUBMIT_URL,
  SITUATION_OPTIONS,
  buildBookingPayload,
  formSubmitSucceeded,
  formatQuizResult,
  readQuizResult,
  situationForQuizResult,
  type SpecialistName,
} from '../../content/inbound/booking';

const SPECIALISTS: Record<SpecialistName, { name: SpecialistName; bookingsUrl: string }> = {
  John: {
    name: 'John',
    bookingsUrl: 'https://bookings.cloud.microsoft/bookwithme/user/0fcffc673c454a8f87f7ef419ecb0545%40d-velop.com?anonymous&ismsaljsauthenabled=true',
  },
  Oksana: {
    name: 'Oksana',
    bookingsUrl: 'https://bookings.cloud.microsoft/book/BookameetingwithOksana@dvelopoffice365.onmicrosoft.com/?ismsaljsauthenabled=true',
  },
};
import { PRIVACY_LINK } from '../../content/inbound/placeholders';
import SapPage from './SapPage';

type Phase = 'form' | 'submitting' | 'sent' | 'send-failed';

const inputClass = 'mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white';

export default function SapArchiveBookPage() {
  const [params] = useSearchParams();
  const storedQuiz = useMemo(() => readQuizResult(), []);
  const quizResultId = params.get('result') || storedQuiz?.id || '';
  const quizHeadline = storedQuiz && storedQuiz.id === quizResultId ? storedQuiz.headline : '';

  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [situation, setSituation] = useState<string>(situationForQuizResult(quizResultId));
  const [specialist, setSpecialist] = useState<SpecialistName | ''>('');
  const [note, setNote] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [phase, setPhase] = useState<Phase>('form');

  const chosen: SpecialistName = specialist === 'Oksana' ? 'Oksana' : 'John';
  const other: SpecialistName = chosen === 'John' ? 'Oksana' : 'John';
  const ready = Boolean(fullName.trim() && workEmail.trim() && company.trim() && jobTitle.trim() && situation && specialist && consent);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || phase === 'submitting') return;

    if (honeypot.trim()) {
      console.info('Booking form honeypot filled. The request was not emailed.');
      setPhase('sent');
      return;
    }

    const payload = buildBookingPayload(
      { fullName, workEmail, company, jobTitle, phone, situation, specialist: specialist as SpecialistName, note },
      {
        sourcePage: params.get('from') || '',
        httpReferrer: document.referrer,
        ref: params.get('ref') || '',
        utmSource: params.get('utm_source') || '',
        utmMedium: params.get('utm_medium') || '',
        utmCampaign: params.get('utm_campaign') || '',
        quizResult: formatQuizResult(quizResultId, quizHeadline),
        submittedAt: new Date().toISOString(),
      },
    );

    setPhase('submitting');
    try {
      const response = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const body = await response.json().catch(() => null);
      if (!formSubmitSucceeded(response.status, body)) {
        throw new Error(`Consultation request was not accepted (${response.status}). Subject: ${BOOKING_SUBJECT}`);
      }
      setPhase('sent');
    } catch (error) {
      console.error(error);
      setPhase('send-failed');
    }
  }

  return (
    <SapPage crumb="Book a consultation">
      <SEO
        title="Book a free SAP archive consultation"
        description="Request a free 30-minute online consultation about SAP document archiving for Private Cloud or on-premise. Your details are sent to Iederees Francis at NextGenWebs before you choose a time."
        path="sap-archive/book/"
      />

      <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-primary-300">Free 30-minute consultation</p>
      <h1 className="text-3xl font-bold text-white sm:text-5xl">Book a free 30-minute consultation</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-300">
        Tell Iederees Francis who is booking, then choose a time for a free 30-minute online consultation with John or Oksana from delaware / d.velop.
      </p>
      <p className="inbound-disclosure mt-6">
        Iederees Francis of NextGenWebs is an independent business-development partner working with delaware. He is not employed by, and does not speak for, SAP, delaware or d.velop. The consultation covers SAP Private Cloud and on-premise landscapes. It does not promise savings.
      </p>

      {phase === 'form' || phase === 'submitting' ? (
        <form className="relative mt-8" onSubmit={onSubmit} data-booking-state="form" noValidate={false}>
          <div className="sap-honeypot" aria-hidden="true">
            <label>
              Company website
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-300 sm:col-span-2">
              Full name
              <input required value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" className={inputClass} />
            </label>
            <label className="text-sm text-slate-300">
              Work email
              <input required type="email" value={workEmail} onChange={(event) => setWorkEmail(event.target.value)} autoComplete="email" className={inputClass} />
            </label>
            <label className="text-sm text-slate-300">
              Phone (optional)
              <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" className={inputClass} />
            </label>
            <label className="text-sm text-slate-300">
              Company
              <input required value={company} onChange={(event) => setCompany(event.target.value)} autoComplete="organization" className={inputClass} />
            </label>
            <label className="text-sm text-slate-300">
              Job title
              <input required value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} autoComplete="organization-title" className={inputClass} />
            </label>
            <label className="text-sm text-slate-300">
              Which situation fits best
              <select required value={situation} onChange={(event) => setSituation(event.target.value)} className={inputClass}>
                <option value="">Choose one</option>
                {SITUATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slate-300">
              Preferred specialist
              <select required value={specialist} onChange={(event) => setSpecialist(event.target.value as SpecialistName | '')} className={inputClass}>
                <option value="">Choose John or Oksana</option>
                <option value="John">John</option>
                <option value="Oksana">Oksana</option>
              </select>
            </label>
            <label className="text-sm text-slate-300 sm:col-span-2">
              Note (optional)
              <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={4} className={inputClass} />
            </label>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            John and Oksana are delaware specialists. You choose the time on the next step. There is no cost and no obligation.
          </p>

          <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-slate-300">
            <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1" />
            <span>
              I agree that Iederees Francis (NextGenWebs) may use these details to arrange this consultation and contact me about it. I can ask for them to be removed at any time. See the{' '}
              <CampaignLink href={PRIVACY_LINK}>privacy notice</CampaignLink>.
            </span>
          </label>

          <button
            type="submit"
            disabled={!ready || phase === 'submitting'}
            className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-bold text-black hover:bg-slate-200 disabled:opacity-40"
          >
            {phase === 'submitting' ? 'Sending your details' : 'Continue to booking'}
          </button>
        </form>
      ) : (
        <div className="mt-8" data-booking-state={phase}>
          {phase === 'sent' ? (
            <>
              <h2 className="text-2xl font-bold text-white">Thank you. Your details are on their way to Iederees Francis.</h2>
              <p className="mt-3 leading-relaxed text-slate-300">
                Next, choose a time for your free 30-minute online consultation. The booking page is hosted separately and does not replace the details you just sent.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white">Your details could not be emailed just now.</h2>
              <p className="mt-3 leading-relaxed text-slate-300">
                You can still book the consultation. If you do, send Iederees Francis your name, work email and company as well, so the booking is not missed.
              </p>
            </>
          )}

          <div className="mt-6 flex flex-col items-start gap-3">
            <a
              href={SPECIALISTS[chosen].bookingsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-black hover:bg-slate-200"
            >
              Book a free 30-minute online consultation with {chosen} from delaware / d.velop
            </a>
            <a
              href={SPECIALISTS[other].bookingsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white hover:bg-white/5"
            >
              Or book a free 30-minute online consultation with {other} from delaware / d.velop
            </a>
          </div>
        </div>
      )}
    </SapPage>
  );
}
