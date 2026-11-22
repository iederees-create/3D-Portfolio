import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { CampaignLink } from '../../content/inbound/InboundMarkdown';
import quizData from '../../content/inbound/quiz.json';
import { BOOKING_LINK, PRIVACY_LINK, SAP_GUIDE_PATH } from '../../content/inbound/placeholders';
import { scoreQuiz, type OutcomeId, type QuizQuestion } from '../../content/inbound/scoreQuiz';
import { hireMailto, whatsappLink } from '../../lib/contact';
import SapPage from './SapPage';

const questions = quizData.questions as QuizQuestion[];

interface LeadFields {
  firstName: string;
  email: string;
  company: string;
  jobTitle: string;
}

const emptyFields: LeadFields = { firstName: '', email: '', company: '', jobTitle: '' };

function resultMessage(headline: string, body: string, fields: LeadFields): string {
  return [
    'SAP Archive Readiness Check',
    headline,
    '',
    body,
    '',
    `First name: ${fields.firstName}`,
    `Work email: ${fields.email}`,
    `Company: ${fields.company}`,
    `Job title: ${fields.jobTitle}`,
    '',
    'Please send me my result and the guide.',
  ].join('\n');
}

function NextStep({ step }: { step: string }) {
  const lead = 'Read the guide';
  if (!step.startsWith(lead)) return <>{step}</>;
  return (
    <>
      <Link to={SAP_GUIDE_PATH} className="text-primary-300 underline underline-offset-2">{lead}</Link>
      {step.slice(lead.length)}
    </>
  );
}

export default function SapArchiveQuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [fields, setFields] = useState<LeadFields>(emptyFields);
  const [consent, setConsent] = useState(false);

  const question = questions[step];
  const result = useMemo(() => (done ? scoreQuiz(questions, answers) : null), [done, answers]);
  const outcome = result ? quizData.results[result.primary] : null;

  function select(optionId: string) {
    setAnswers((current) => ({ ...current, [question.id]: optionId }));
  }

  function openMessage(kind: 'email' | 'whatsapp') {
    if (!consent || !outcome || !result) return;
    const text = resultMessage(outcome.headline, outcome.body, fields);
    const href = kind === 'email'
      ? hireMailto('SAP Archive Readiness Check result', text)
      : whatsappLink(text);
    window.location.href = href;
  }

  return (
    <SapPage crumb="Readiness check">
      <SEO
        title={quizData.title}
        description={quizData.subtitle}
        path="sap-archive/check/"
      />

      <p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-primary-300">About 3 minutes</p>
      <h1 className="text-3xl font-bold text-white sm:text-5xl">{quizData.title}</h1>
      <p className="mt-4 text-lg text-slate-300">{quizData.subtitle}</p>
      <p className="inbound-disclosure mt-6">{quizData.disclosure}</p>

      {!done || !result || !outcome ? (
        <form
          className="mt-10"
          onSubmit={(event) => {
            event.preventDefault();
            if (!answers[question.id]) return;
            if (step === questions.length - 1) setDone(true);
            else setStep((current) => current + 1);
          }}
        >
          <p className="mb-4 text-sm font-semibold text-slate-400">Question {step + 1} of {questions.length}</p>
          <fieldset>
            <legend className="mb-6 text-2xl font-bold text-white">{question.text}</legend>
            <div className="grid gap-3">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.id;
                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 text-sm leading-relaxed transition-colors ${
                      selected ? 'border-white bg-white/10 text-white' : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={selected}
                      onChange={() => select(option.id)}
                      className="mt-1"
                    />
                    <span>{option.text}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              disabled={step === 0}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!answers[question.id]}
              className="rounded-full bg-white px-5 py-3 text-sm font-bold text-black hover:bg-slate-200 disabled:opacity-40"
            >
              {step === questions.length - 1 ? 'See my result' : 'Next'}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-10" data-result={result.primary}>
          <p className="text-xs font-bold uppercase tracking-[.22em] text-primary-300">Your result</p>
          <h2 className="mt-3 text-3xl font-bold text-white">{outcome.headline}</h2>
          <p className="mt-4 leading-relaxed text-slate-300">{outcome.body}</p>

          {result.also.length > 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-bold text-slate-200">Also worth a look</h3>
              <ul className="mt-3 space-y-3">
                {result.also.map((id: OutcomeId) => (
                  <li key={id}>
                    <p className="font-semibold text-white">{quizData.outcomes[id].label}</p>
                    <p className="text-sm text-slate-400">{quizData.outcomes[id].short}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <p className="font-semibold text-white">Next</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
              {outcome.next_steps.map((stepText) => (
                <li key={stepText}><NextStep step={stepText} /></li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={SAP_GUIDE_PATH} className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white hover:bg-white/5">
                Read the guide
              </Link>
              <CampaignLink href={BOOKING_LINK} cta>
                {outcome.cta_text}
              </CampaignLink>
            </div>
          </div>

          <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-xl font-bold text-white">Want your result and the guide by email?</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              First name · Work email · Company · Job title. This page does not save what you type. Email and WhatsApp open on your device, and you send the message yourself.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="text-sm text-slate-300">
                First name
                <input
                  value={fields.firstName}
                  onChange={(event) => setFields((current) => ({ ...current, firstName: event.target.value }))}
                  autoComplete="given-name"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white"
                />
              </label>
              <label className="text-sm text-slate-300">
                Work email
                <input
                  type="email"
                  value={fields.email}
                  onChange={(event) => setFields((current) => ({ ...current, email: event.target.value }))}
                  autoComplete="email"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white"
                />
              </label>
              <label className="text-sm text-slate-300">
                Company
                <input
                  value={fields.company}
                  onChange={(event) => setFields((current) => ({ ...current, company: event.target.value }))}
                  autoComplete="organization"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white"
                />
              </label>
              <label className="text-sm text-slate-300">
                Job title
                <input
                  value={fields.jobTitle}
                  onChange={(event) => setFields((current) => ({ ...current, jobTitle: event.target.value }))}
                  autoComplete="organization-title"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white"
                />
              </label>
            </div>
            <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-slate-300">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-1"
              />
              <span>
                Send me my result and the guide. I agree that Iederees Francis (NextGenWebs) may contact me about this topic. I can unsubscribe at any time. See the{' '}
                <CampaignLink href={PRIVACY_LINK}>privacy notice</CampaignLink>.
              </span>
            </label>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={!consent}
                onClick={() => openMessage('email')}
                className="rounded-full bg-white px-5 py-3 text-sm font-bold text-black disabled:opacity-40"
              >
                Email my result
              </button>
              <button
                type="button"
                disabled={!consent}
                onClick={() => openMessage('whatsapp')}
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white disabled:opacity-40"
              >
                Send on WhatsApp
              </button>
            </div>
          </section>

          <button
            type="button"
            onClick={() => { setDone(false); setStep(0); }}
            className="mt-8 text-sm font-semibold text-slate-400 hover:text-white"
          >
            Start again
          </button>
        </div>
      )}

      <p className="mt-12 text-sm leading-relaxed text-slate-500">{quizData.footer}</p>
    </SapPage>
  );
}
