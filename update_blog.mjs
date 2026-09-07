import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesTsPath = path.join(__dirname, 'src/content/blog/articles.ts');
let content = fs.readFileSync(articlesTsPath, 'utf-8');

const newArticles = [
  // Systeme.io
  {
    "slug": "systeme-io-simple-sales-funnel-first-digital-product",
    "title": "Build a Simple Sales Funnel for Your First Digital Product",
    "excerpt": "Learn how to build an automated, simple sales funnel for your first digital product for free using Systeme.io.",
    "datePublished": "2026-09-08",
    "author": "NextGenWebs",
    "category": "Marketing",
    "tags": ["Sales Funnels", "Systeme.io", "Digital Products", "Marketing Automation"],
    "readingTimeMinutes": 5
  },
  {
    "slug": "systeme-io-lead-magnet-from-portfolio-project",
    "title": "Create a Useful Lead Magnet from an Existing Portfolio Project",
    "excerpt": "Learn how to repurpose your existing portfolio projects into high-converting lead magnets and build an automated capture funnel for free using systeme.io.",
    "datePublished": "2026-09-08",
    "author": "NextGenWebs",
    "category": "Marketing",
    "tags": ["Lead Generation", "systeme.io", "Portfolio", "Marketing Funnel"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "systeme-io-five-email-welcome-sequence",
    "title": "How to Write a High-Converting Five-Email Welcome Sequence in Systeme.io",
    "excerpt": "Learn the exact 5-day email sequence you need to turn strangers into loyal customers and how to automate it for free using Systeme.io.",
    "datePublished": "2026-09-08",
    "author": "NextGenWebs",
    "category": "Email Marketing",
    "tags": ["Systeme.io", "Email Marketing", "Welcome Sequence", "Marketing Automation"],
    "readingTimeMinutes": 5
  },
  {
    "slug": "systeme-io-landing-page-freelance-service",
    "title": "How to Build a High-Converting Landing Page for Your Freelance Service",
    "excerpt": "Learn how to build a high-converting landing page for your freelance business for free using Systeme.io.",
    "datePublished": "2026-09-08",
    "author": "NextGenWebs",
    "category": "Marketing",
    "tags": ["Freelance", "Landing Page", "Systeme.io", "Marketing"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "systeme-io-deliver-digital-download",
    "title": "How to Automate Delivering a Digital Download After Purchase in Systeme.io",
    "excerpt": "Learn how to easily set up automated delivery for your digital products like eBooks or templates using Systeme.io's free plan.",
    "datePublished": "2026-09-08",
    "author": "NextGenWebs",
    "category": "E-commerce",
    "tags": ["Systeme.io", "Automation", "Digital Downloads", "E-commerce", "Passive Income"],
    "readingTimeMinutes": 5
  },
  {
    "slug": "systeme-io-design-mini-course",
    "title": "Design a Mini-Course from Something You Already Know",
    "excerpt": "Learn how to transform your existing skills into a profitable mini-course. This step-by-step guide covers everything from outlining to launching for free using Systeme.io.",
    "datePublished": "2026-09-08",
    "author": "NextGenWebs",
    "category": "E-learning",
    "tags": ["Course Creation", "Digital Products", "Systeme.io", "Passive Income", "Marketing"],
    "readingTimeMinutes": 5
  },
  {
    "slug": "systeme-io-tag-subscribers-by-interest",
    "title": "Tag Subscribers by Interest Without Overcomplicating Your Funnel",
    "excerpt": "Learn how to easily segment and tag your email subscribers by interest in Systeme.io without building an overly complicated sales funnel.",
    "datePublished": "2026-09-08",
    "author": "NextGenWebs",
    "category": "Email Marketing",
    "tags": ["Systeme.io", "Email Marketing", "Sales Funnels", "Automation"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "systeme-io-troubleshoot-funnel-conversions",
    "title": "Troubleshoot a Funnel That Gets Visits but Few Signups",
    "excerpt": "Getting traffic to your funnel but no signups? Learn how to diagnose and fix a leaky funnel by checking ad scent, reducing friction, and optimizing for mobile.",
    "datePublished": "2026-09-08",
    "author": "NextGenWebs",
    "category": "Marketing",
    "tags": ["systeme-io", "funnel", "conversion", "marketing", "troubleshooting"],
    "readingTimeMinutes": 5
  },
  {
    "slug": "systeme-io-portfolio-page-vs-sales-funnel",
    "title": "Choose Between a Portfolio Page and a Dedicated Sales Funnel",
    "excerpt": "Discover why you might be losing clients with just a traditional portfolio page and learn how a dedicated sales funnel can skyrocket your conversions using Systeme.io.",
    "datePublished": "2026-09-08",
    "author": "NextGenWebs",
    "category": "Web Design",
    "tags": ["Sales Funnels", "Web Design", "Freelancing", "Systeme.io", "Marketing"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "systeme-io-make-elevenlabs-capstone-launch",
    "title": "Launch a Digital Product with Systeme.io, Make and ElevenLabs (Capstone)",
    "excerpt": "A comprehensive capstone guide to building, marketing, and delivering an AI-generated digital product using Systeme.io, Make, and ElevenLabs.",
    "datePublished": "2026-09-08",
    "author": "NextGenWebs",
    "category": "Marketing",
    "tags": ["Systeme.io", "Make.com", "ElevenLabs", "Automation", "Digital Products"],
    "readingTimeMinutes": 7
  },
  // Make
  {
    "slug": "send-website-enquiries-structured-lead-tracker",
    "title": "Send Website Enquiries to a Structured Lead Tracker",
    "excerpt": "Stop copying and pasting leads from your inbox. Learn how to automate website enquiries directly into a structured database using Make.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Automation",
    "tags": ["Make", "Lead Generation", "Productivity"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "build-client-onboarding-checklist-accepted-enquiry",
    "title": "Build a Client-Onboarding Checklist from an Accepted Enquiry",
    "excerpt": "Automatically spin up a standard onboarding checklist in Asana or Trello the moment a client is marked as won in your CRM.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Automation",
    "tags": ["Make", "Client Onboarding", "CRM"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "turn-meeting-notes-into-tasks-for-human-review",
    "title": "Turn Meeting Notes into Tasks for Human Review",
    "excerpt": "Use AI and Make to extract action items from meeting transcripts and create tasks automatically, ready for your review.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Automation",
    "tags": ["Make", "AI", "Project Management"],
    "readingTimeMinutes": 5
  },
  {
    "slug": "create-weekly-content-planning-digest",
    "title": "Create a Weekly Content-Planning Digest",
    "excerpt": "Never run out of ideas again. Automatically aggregate industry news and your backlog into a weekly Slack digest using Make.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Content Marketing",
    "tags": ["Make", "Content Strategy", "Productivity"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "automate-digital-product-feedback-request",
    "title": "Automate a Digital-Product Feedback Request",
    "excerpt": "Timing is everything. Connect your payment processor to your email tool via Make to perfectly time automated review requests.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Automation",
    "tags": ["Make", "Ecommerce", "Digital Products"],
    "readingTimeMinutes": 5
  },
  {
    "slug": "connect-website-form-to-make-with-webhook",
    "title": "Connect a Website Form to Make with a Webhook",
    "excerpt": "Ditch slow polling. Learn why webhooks are the fastest way to trigger automations and how to set them up for free in Make.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Web Development",
    "tags": ["Make", "Webhooks", "NoCode"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "stop-duplicate-records-in-your-make-scenarios",
    "title": "Stop Duplicate Records in Your Make Scenarios",
    "excerpt": "Learn the \"Search and Route\" pattern to prevent your Make scenarios from creating duplicate entries in your spreadsheets and CRM.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Automation",
    "tags": ["Make", "Data Management", "Best Practices"],
    "readingTimeMinutes": 5
  },
  {
    "slug": "what-happens-when-automation-fails",
    "title": "What Happens When an Automation Fails?",
    "excerpt": "Don't lose data when an API goes down. Discover how to use error handlers and incomplete executions in Make to build fail-safe scenarios.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Automation",
    "tags": ["Make", "Error Handling", "Tech Tips"],
    "readingTimeMinutes": 5
  },
  {
    "slug": "estimate-make-usage-before-you-automate",
    "title": "Estimate Make Usage Before You Automate",
    "excerpt": "Stop guessing your costs. Learn the exact formula for calculating operations and credits in Make before you build your next scenario.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Automation",
    "tags": ["Make", "Pricing", "Operations"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "which-business-task-should-you-automate-first",
    "title": "Which Business Task Should You Automate First?",
    "excerpt": "Don't automate everything at once. Use our interactive priority worksheet to find the highest-impact bottleneck to automate first.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Business Strategy",
    "tags": ["Make", "Automation Matrix", "Productivity"],
    "readingTimeMinutes": 4
  },
  // ElevenLabs
  {
    "slug": "create-voiceover-30-second-product-demo",
    "title": "Create a Voiceover for a 30-Second Product Demo",
    "excerpt": "Learn the exact workflow to script and generate a professional, perfectly-paced AI voiceover for a 30-second product demo using the 75-word rule.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "AI Audio",
    "tags": ["elevenlabs", "voiceover", "product-demo", "video-marketing"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "fix-robotic-sounding-ai-narration",
    "title": "Fix Robotic-Sounding AI Narration",
    "excerpt": "Stop your AI voiceovers from sounding flat and breathless. Discover how to use punctuation to force natural pauses, breathing, and emotional shifts.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "AI Audio",
    "tags": ["elevenlabs", "voiceover", "prompting", "audio-editing"],
    "readingTimeMinutes": 3
  },
  {
    "slug": "pronunciation-problems-ai-voiceovers",
    "title": "Pronunciation Problems in AI Voiceovers: Names, Acronyms and Brand Terms",
    "excerpt": "Does the AI keep butchering your brand name? Learn how to use phonetic spelling and pronunciation dictionaries to guarantee perfect reads every time.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "AI Audio",
    "tags": ["elevenlabs", "voiceover", "pronunciation", "content-creation"],
    "readingTimeMinutes": 3
  },
  {
    "slug": "turn-blog-post-into-short-video-scripts",
    "title": "Turn One Blog Post into Three Short Video Scripts",
    "excerpt": "Don't let your written content go to waste. Learn how to extract 60-second video scripts from your blog posts and voice them with AI for TikTok and Reels.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Content Strategy",
    "tags": ["elevenlabs", "repurposing", "short-form-video", "marketing"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "make-narrated-walkthrough-website-portfolio",
    "title": "Make a Narrated Walkthrough of Your Website or Portfolio",
    "excerpt": "Sending a link isn't enough. Learn how to script and record a 2-minute narrated walkthrough of your portfolio to win more clients.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Freelancing",
    "tags": ["elevenlabs", "portfolio", "web-design", "client-acquisition"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "prepare-voiceover-brief-freelancer",
    "title": "Prepare a Voiceover Brief a Freelancer Can Actually Use",
    "excerpt": "Stop asking voice actors to just 'sound professional'. Learn the 4-part brief template that guarantees you get the right tone from humans and AI alike.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Video Production",
    "tags": ["elevenlabs", "voiceover", "freelance", "production"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "add-narration-digital-product-tutorial",
    "title": "Add Narration to a Digital-Product Tutorial",
    "excerpt": "Silent tutorials frustrate users. Learn the 'See-Say' principle and the easiest workflow for adding professional AI narration to your digital product guides.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Product Management",
    "tags": ["elevenlabs", "tutorials", "customer-success", "saas"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "localize-product-explainer-ai-audio",
    "title": "Localize a Product Explainer with AI Audio",
    "excerpt": "Reach a global audience by localizing your product explainer into 70+ languages in an afternoon. Learn the workflow for translating and syncing AI audio.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Growth Marketing",
    "tags": ["elevenlabs", "localization", "global", "video-marketing"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "choose-elevenlabs-plan-actual-workload",
    "title": "Choose an ElevenLabs Plan for Your Actual Workload",
    "excerpt": "Confused by ElevenLabs pricing? Discover which plan you actually need for your content volume, and avoid violating commercial use rights.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "AI Audio",
    "tags": ["elevenlabs", "pricing", "commercial-rights", "software"],
    "readingTimeMinutes": 4
  },
  {
    "slug": "human-recording-or-ai-voiceover-guide",
    "title": "Human Recording or AI Voiceover? A Practical Decision Guide",
    "excerpt": "Stop guessing between human voice actors and AI generators. Use this practical framework to choose the right audio solution for your specific project.",
    "datePublished": "2026-09-08",
    "author": "Iedrees Francis",
    "category": "Video Production",
    "tags": ["elevenlabs", "voiceover", "production", "ai-vs-human"],
    "readingTimeMinutes": 4
  }
];

const kebabToPascal = (str) => {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Content';
};

// 1. Generate Imports
const newImports = newArticles.map(a => `import ${kebabToPascal(a.slug)} from './${a.slug}';`).join('\n');

// 2. Generate Articles Array Entries
const newArticlesArray = newArticles.map(a => {
  return `  {
    slug: '${a.slug}',
    title: '${a.title.replace(/'/g, "\\'")}',
    excerpt: '${a.excerpt.replace(/'/g, "\\'")}',
    datePublished: '${a.datePublished}',
    dateModified: '${a.datePublished}',
    author: '${a.author}',
    category: '${a.category}',
    tags: ${JSON.stringify(a.tags)},
    readingTimeMinutes: ${a.readingTimeMinutes},
    relatedSlugs: [],
  },`;
}).join('\n');

// 3. Generate Map Entries
const newMapEntries = newArticles.map(a => `  '${a.slug}': ${kebabToPascal(a.slug)},`).join('\n');

// Inject into file
// Insert imports at the end of the existing imports (before the /** comment block)
content = content.replace(/(import .* from '.*';\n)(?=\n\/\*\*)/s, `$1${newImports}\n`);

// Insert into articles array
content = content.replace(/(export const articles: ArticleMeta\[\] = \[\n)/, `$1${newArticlesArray}\n`);

// Insert into map
content = content.replace(/(export const articleContentMap: Record<string, ArticleContentComponent> = {\n)/, `$1${newMapEntries}\n`);

fs.writeFileSync(articlesTsPath, content);
console.log("Updated articles.ts successfully!");
