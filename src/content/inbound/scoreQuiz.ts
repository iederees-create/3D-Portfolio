export type OutcomeId = 'A' | 'B' | 'C' | 'W';

export interface QuizOption {
  id: string;
  text: string;
  points: Partial<Record<OutcomeId, number>>;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface ScoreResult {
  scores: Record<OutcomeId, number>;
  primary: OutcomeId;
  also: OutcomeId[];
}

const SITUATIONS: OutcomeId[] = ['A', 'B', 'C'];
/** Ties between situations use this order. W is not a situation. */
const TIE_BREAK: OutcomeId[] = ['A', 'C', 'B'];

/**
 * Score the SAP Archive Readiness Check.
 *
 * 1. Sum points per outcome.
 * 2. If A, B and C are all below 3, the result is W.
 * 3. Otherwise the highest of A, B and C wins, unless W is strictly higher than each of them.
 * 4. Ties between situations break in the order A, C, B.
 * 5. Every other situation scoring 3 or more is "Also worth a look".
 */
export function scoreQuiz(questions: QuizQuestion[], answers: Record<string, string>): ScoreResult {
  const scores: Record<OutcomeId, number> = { A: 0, B: 0, C: 0, W: 0 };

  for (const question of questions) {
    const selected = question.options.find((option) => option.id === answers[question.id]);
    if (!selected) continue;
    for (const [key, value] of Object.entries(selected.points)) {
      const id = key as OutcomeId;
      scores[id] += value ?? 0;
    }
  }

  const allSituationsBelow3 = SITUATIONS.every((id) => scores[id] < 3);
  const wStrictlyHigher = SITUATIONS.every((id) => scores.W > scores[id]);

  let primary: OutcomeId;
  if (allSituationsBelow3 || wStrictlyHigher) {
    primary = 'W';
  } else {
    const max = Math.max(...SITUATIONS.map((id) => scores[id]));
    primary = TIE_BREAK.find((id) => scores[id] === max) ?? 'A';
  }

  const also = SITUATIONS
    .filter((id) => id !== primary && scores[id] >= 3)
    .sort((a, b) => scores[b] - scores[a] || TIE_BREAK.indexOf(a) - TIE_BREAK.indexOf(b));

  return { scores, primary, also };
}
