import { assistantKnowledge } from '../data/assistantKnowledge';
export function answerLocally(input: string) {
  const q = input.toLowerCase();
  let best = assistantKnowledge[0]; let score = 0;
  for (const item of assistantKnowledge) { const hits = item.keys.reduce((n, key) => n + (q.includes(key) ? 1 : 0), 0); if (hits > score) { best = item; score = hits; } }
  if (!score) return { answer: 'I’m a demo assistant trained on NextGenWebs services and projects. Try asking what we build, about Hydro Clean, templates, AI chatbots, pricing direction, or how to contact us.', confidence: 0.18, links: ['/contact/'], quickReplies: ['What do you build?', 'Show Hydro Clean', 'How do I contact you?'] };
  return { answer: best.answer, confidence: Math.min(0.98, 0.55 + score * 0.18), links: best.links, quickReplies: ['Show latest projects', 'What is included?', 'How do I contact you?'] };
}
