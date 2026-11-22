import { readFileSync } from 'node:fs';
import { scoreQuiz, type QuizQuestion } from '../src/content/inbound/scoreQuiz.ts';

const quiz = JSON.parse(readFileSync(new URL('../src/content/inbound/quiz.json', import.meta.url), 'utf8'));
const questions = quiz.questions as QuizQuestion[];

let failed = 0;

function check(name: string, answers: Record<string, string>, primary: string, also: string[], scores?: Record<string, number>) {
  const result = scoreQuiz(questions, answers);
  const alsoOk = result.also.join(',') === also.join(',');
  const scoresOk = !scores || (['A', 'B', 'C', 'W'] as const).every((id) => result.scores[id] === scores[id]);
  if (result.primary !== primary || !alsoOk || !scoresOk) {
    failed += 1;
    console.error('FAIL', name, result);
    return;
  }
  console.log('OK', name, result.primary, result.also.join('+') || '-', result.scores);
}

// ECC + shared drives + not connected + ask a colleague + no plan + manual audit.
check('example B, also A', {
  q1: 'q1a', q2: 'q2c', q3: 'q3c', q4: 'q4d', q5: 'q5c', q6: 'q6c',
}, 'B', ['A'], { A: 5, B: 10, C: 1, W: 0 });

// ECC + SharePoint + manual linking + folder search + being discussed + partial retention.
check('example C, also A and B', {
  q1: 'q1a', q2: 'q2b', q3: 'q3b', q4: 'q4c', q5: 'q5b', q6: 'q6b',
}, 'C', ['A', 'B'], { A: 5, B: 3, C: 7, W: 0 });

// S/4HANA live, legacy retired, integrated archive, all strong answers.
check('example W', {
  q1: 'q1d', q2: 'q2a', q3: 'q3a', q4: 'q4a', q5: 'q5a', q6: 'q6a',
}, 'W', [], { A: 1, B: 0, C: 0, W: 11 });

// A and C tie at 4, W is not strictly higher, B stays under 3.
check('tie A and C', {
  q1: 'q1a', q2: 'q2b', q3: 'q3a', q4: 'q4b', q5: 'q5a', q6: 'q6b',
}, 'A', ['C'], { A: 4, B: 1, C: 4, W: 4 });

// All situations below 3, so the result is W.
check('below threshold is W', {
  q1: 'q1d', q2: 'q2d', q3: 'q3a', q4: 'q4b', q5: 'q5a', q6: 'q6a',
}, 'W', [], { A: 1, B: 2, C: 1, W: 7 });

// W is strictly higher, and A still scores 3 or more, so A is also worth a look.
check('W higher, also A', {
  q1: 'q1a', q2: 'q2a', q3: 'q3a', q4: 'q4a', q5: 'q5a', q6: 'q6a',
}, 'W', ['A'], { A: 4, B: 0, C: 0, W: 10 });

// W is tied with A, not strictly higher, so A wins and W is not the result.
check('W tie does not win', {
  q1: 'q1a', q2: 'q2a', q3: 'q3a', q4: 'q4a', q5: 'q5d', q6: 'q6d',
}, 'A', []);

if (failed > 0) {
  console.error(`${failed} scoring check(s) failed`);
  process.exit(1);
}
console.log('All scoring checks passed');
