import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function TurnMeetingNotesIntoTasksForHumanReviewContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        AI transcriptions have made meetings much easier to document. But a transcript is just a giant wall of text. The real value is in turning those transcripts into actionable tasks.
      </p>

      <AffiliateDisclosure />

      <p>
        If you use tools like Otter.ai, Fathom, or Zoom's AI companion, you already have meeting transcripts. The bottleneck is reading through them to assign action items. Using Make, you can capture that transcript, send it to an AI model for processing, and automatically generate tasks in your project management system—ready for human review.
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Blueprint</h2>
        <p>
          This is an advanced scenario that utilizes Large Language Models (LLMs) alongside standard API integrations. Because complex AI modules may consume more processing time, they might behave differently than simple webhooks when it comes to credit usage, though standard triggers consume 1 credit.
        </p>
        <p className="mt-4">
          Make's webhook limits—up to 5MB payloads and 30 requests per second—mean you can easily send lengthy meeting notes directly into your scenario. Try building this today: <a href="https://www.make.com/en/register?pc=nextgenwebs2026" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">Register for a Make account</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Step-by-Step Configuration</h2>
        <ol className="list-decimal list-inside mt-4 space-y-4">
          <li>
            <strong className="text-white">The Trigger (Webhook/API):</strong> Set up a module to receive your meeting notes. If your transcription tool supports webhooks (like Fathom), send the final transcript payload directly to Make.
          </li>
          <li>
            <strong className="text-white">AI Processing (OpenAI/Anthropic):</strong> Connect the OpenAI or Anthropic module. Pass the transcript text in the prompt and ask the AI to: "Extract all action items from this transcript. Format the output as a JSON array containing 'TaskName', 'Assignee', and 'Deadline'."
          </li>
          <li>
            <strong className="text-white">Parse JSON:</strong> Use Make's built-in JSON parser module to convert the AI's text output into data bundles.
          </li>
          <li>
            <strong className="text-white">Create Tasks:</strong> Use a module for your task manager (Asana, ClickUp, Notion). Map the parsed data (TaskName, Assignee, Deadline) to create individual tasks. Set their status to "Needs Review."
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Golden Rule: Human in the Loop</h2>
        <p>
          Never let AI assign live tasks directly to your team without oversight. AI can hallucinate deadlines or misinterpret ownership. By setting the automated task status to "Needs Review," you (or a project manager) can quickly verify the list in 30 seconds rather than spending 20 minutes writing them from scratch.
        </p>
      </section>
    </div>
  );
}
