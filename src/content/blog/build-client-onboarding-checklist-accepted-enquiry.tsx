import AffiliateDisclosure from '../../components/AffiliateDisclosure';

export default function BuildClientOnboardingChecklistAcceptedEnquiryContent() {
  return (
    <div className="space-y-8 text-slate-300 leading-relaxed">
      <p className="text-lg text-slate-200">
        Winning a new client is a great feeling. Scrambling to figure out what needs to be done next? Not so much. Let's automate the onboarding handoff.
      </p>

      <AffiliateDisclosure />

      <p>
        When an enquiry turns into an accepted project, multiple things need to happen: contracts need to be sent, folders need to be created, and tasks need to be assigned. Instead of relying on memory, you can use Make to automatically generate a standardized onboarding checklist the moment a lead is marked as "Won."
      </p>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">The Workflow Strategy</h2>
        <p>
          We will trigger an automation when a status changes in your CRM (like Pipedrive, HubSpot, or a custom Notion board). Make watches for this status update and then communicates with your task management tool (Asana, ClickUp, or Trello) to spin up a fresh checklist.
        </p>
        <p className="mt-4">
          This automation is heavily reliant on triggers. Make allows up to 2 active scenarios on its Free plan, with a minimum interval of 15 minutes between runs. This is perfectly fine for client onboarding, which doesn't typically require sub-second latency!
          If you want to try it out, <a href="https://www.make.com/en/register?pc=nextgenwebs2026" rel="sponsored noopener" className="text-blue-400 underline hover:text-blue-300">register for a Make account here</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">How to Build the Scenario</h2>
        <ol className="list-decimal list-inside mt-4 space-y-4">
          <li>
            <strong className="text-white">The Trigger (CRM):</strong> Set your first module to watch for updated records in your CRM. Add a filter between the first and second module: only proceed if `Status` equals `Closed Won`.
          </li>
          <li>
            <strong className="text-white">Create the Project (Project Management):</strong> Add a module for your task manager (e.g., Asana "Create a Project"). Name it dynamically using the client's name from step 1 (e.g., `Onboarding: {"{{Client Name}}"}`).
          </li>
          <li>
            <strong className="text-white">Populate Tasks (Iterator & Modules):</strong> You can use a Make Iterator or predefined templates in your task manager to create tasks like "Send Welcome Email", "Draft Invoice", and "Create Shared Google Drive Folder."
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">Why this matters</h2>
        <p>
          Consistency is the hallmark of a premium service provider. By automating the creation of your checklist, you guarantee that no client gets a sub-par experience simply because you were having a busy day. Everything is ready for you to execute.
        </p>
      </section>
    </div>
  );
}
