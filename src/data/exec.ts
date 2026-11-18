/**
 * All page copy. Written for the person who picks the vendor: a CTO, VP Engineering,
 * or CEO comparing AI services firms. (Started life as the "exec" version, hence the export names.)
 *
 * Voice: plain and declarative. No slogans, no adjectives about ourselves. Where a claim
 * cannot be evidenced on the page it is written as a commitment the buyer can check against
 * the proposal, or left out.
 *
 * Lines marked CONFIRM state facts about how cverse works and must be checked by cverse before go-live.
 * SLOT marks a place where a publishable fact (team size, founding year, client outcomes) can be added later.
 */

export const execMeta = {
  title: 'cverse | AI engineering for enterprises',
  description:
    'cverse builds LLM, agent, and forecasting systems for enterprises and runs them in the client’s own cloud. Fixed-price builds after a short discovery. The client owns the code, models, and data.',
};

/** Contact is reached through the header button, so it is not repeated here. */
export const execNav = [
  { label: 'Services', href: '#services' },
  { label: 'How we work', href: '#how-we-work' },
  { label: 'What you receive', href: '#what-you-receive' },
  { label: 'FAQ', href: '#faq' },
  { label: 'About', href: '#about' },
];

export const execCtaLabel = 'Book a scoping call';

export const execHero = {
  eyebrow: 'AI engineering for enterprises',
  titleLine1: 'AI systems that',
  titleLine2: 'run in production.',
  lead:
    'cverse builds LLM, agent, and forecasting systems for enterprises, inside your own cloud. We scope the work with you, build it in short releases, and hand it over with everything your team needs to run it.',
  primaryCta: { label: execCtaLabel, href: '#contact' },
  secondaryCta: { label: 'How we work', href: '#how-we-work' },
  /** Short facts under the buttons. */
  facts: [
    'Fixed price after discovery', // CONFIRM
    'You own the code, models, and data',
    'AWS, Azure, GCP, or on-premise',
  ],
};

export type ExecIcon =
  | 'bot'
  | 'chart-line'
  | 'workflow'
  | 'lock'
  | 'gauge'
  | 'server'
  | 'users'
  | 'phone'
  | 'search'
  | 'git-branch'
  | 'handshake'
  | 'file-check'
  | 'database';

export const execServicesSection = {
  eyebrow: 'Services',
  title: 'What we build',
  intro:
    'Each engagement is scoped to one business outcome and built in your environment. These are the four kinds of work we take on.',
};

export const execServices: { icon: ExecIcon; title: string; description: string; fit: string; tags: string[] }[] = [
  {
    icon: 'bot',
    title: 'Production LLM systems',
    description:
      'Assistants, copilots, and retrieval over your own documents and data. Every system ships with an evaluation suite, guardrails, and monitoring.',
    fit: 'For teams whose pilot has worked but has not been approved for customers or staff.',
    tags: ['Conversational AI', 'RAG', 'LLMOps'],
  },
  {
    icon: 'chart-line',
    title: 'Decision automation and forecasting',
    description:
      'Demand forecasting, anomaly detection, and prediction pipelines connected to the systems where decisions are already made.',
    fit: 'For teams that have the data but still make the decision in a spreadsheet.',
    tags: ['Forecasting', 'Deep learning', 'Process automation'],
  },
  {
    icon: 'workflow',
    title: 'Agentic workflows',
    description:
      'Agents that carry out multi-step work across your APIs and databases, with human approval at the steps you choose and a full audit log.',
    fit: 'For processes that cross several systems and teams and are still done by hand.',
    tags: ['Autonomous agents', 'Tool integration', 'Workflow automation'],
  },
  {
    icon: 'lock',
    title: 'Private models and fine-tuning',
    description:
      'Open or proprietary models adapted to your domain, trained and served in your own cloud. No client data leaves your environment.',
    fit: 'For data that regulation, residency rules, or commercial sensitivity keep away from public APIs.',
    tags: ['Fine-tuning', 'Distillation', 'Private cloud'],
  },
];

export const execStackSection = {
  eyebrow: 'Stack',
  title: 'Tools we have used on recent work',
  intro:
    'We choose tools per engagement and run them in your environment. If your platform team has standardized on Bedrock, Azure OpenAI, or Vertex AI, we build inside that.',
};

export const execStack: { group: string; items: string[] }[] = [
  { group: 'Models and providers', items: ['Anthropic Claude', 'Google Gemini', 'OpenRouter'] },
  { group: 'Serving and local inference', items: ['vLLM', 'Ollama', 'Open WebUI'] },
  { group: 'Video models', items: ['Veo', 'Seedance'] },
  { group: 'Agents and observability', items: ['Hermes', 'Langfuse'] },
  { group: 'Coding tools', items: ['Claude Code', 'Cursor'] },
];

export const execHowSection = {
  eyebrow: 'How we work',
  title: 'How an engagement runs',
  intro:
    'Four stages. You get a fixed scope and price at the end of discovery, before any build work starts.', // CONFIRM
};

export const execSteps: { icon: ExecIcon; step: string; title: string; description: string }[] = [
  {
    icon: 'phone',
    step: '01',
    title: 'Scoping call, 45 minutes',
    description:
      'You describe the problem. We say whether AI is the right approach, what it would involve, and what we would need from your team. If we are not the right firm for it, we say that on this call.',
  },
  {
    icon: 'search',
    step: '02',
    title: 'Discovery, 2 to 3 weeks', // CONFIRM
    description:
      'Architecture, data audit, and a security review with your engineers and your information security team. The output is a written proposal with scope, timeline, and price.',
  },
  {
    icon: 'git-branch',
    step: '03',
    title: 'Build, in two-week releases', // CONFIRM
    description:
      'Software runs in your environment from the first release. Your engineers have access to the repository throughout.',
  },
  {
    icon: 'handshake',
    step: '04',
    title: 'Handover, or continued support',
    description:
      'Documentation, monitoring, and training for your engineers, then a fixed support period. After that you can retain us or run it yourselves.', // CONFIRM support period length
  },
];

export const execDeliverablesSection = {
  eyebrow: 'What you receive',
  title: 'What you receive at handover',
  intro:
    'Every build includes the following. They are listed here so you can check them against the proposal.',
};

export const execDeliverables: { icon: ExecIcon; title: string; description: string }[] = [
  {
    icon: 'git-branch',
    title: 'Source code in your repository',
    description:
      'All code, prompts, and infrastructure configuration, under your organization’s account, with no cverse runtime or license.',
  },
  {
    icon: 'database',
    title: 'Models and training data',
    description: 'Any fine-tuned model weights and the datasets used to produce them.',
  },
  {
    icon: 'file-check',
    title: 'Evaluation suite',
    description:
      'The test set and scoring harness used during the build, so your team can measure the effect of future changes.',
  },
  {
    icon: 'gauge',
    title: 'Monitoring and alerting',
    description:
      'Dashboards and alerts in your existing tooling, covering latency, cost, error rates, and output quality.',
  },
  {
    icon: 'server',
    title: 'Runbooks and architecture notes',
    description:
      'How the system is deployed, how to roll back, and what to do when a model provider degrades.',
  },
  {
    icon: 'users',
    title: 'Handover sessions',
    description:
      'Working sessions with your engineers, recorded, covering operation and extension of the system.',
  },
];

export const execFaqSection = {
  eyebrow: 'FAQ',
  title: 'Questions buyers usually ask',
  intro: 'Short answers. The scoping call covers anything not here.',
};

export const execFaq: { q: string; a: string }[] = [
  {
    q: 'Do we own what you build?',
    a: 'Yes. Code, models, prompts, evaluation data, and infrastructure configuration are assigned to you. Nothing is licensed back.',
  },
  {
    q: 'Which models do you use?',
    a: 'Whichever fits the task and your constraints: open or proprietary, hosted or inside your VPC. We are not tied to a vendor and will recommend the cheaper model when it meets the requirement.',
  },
  {
    q: 'Are you SOC 2 certified?',
    a: 'cverse is not itself SOC 2 certified. Systems run in your environment under your controls, and we build to the SOC 2 control families: access control, logging, encryption, change management. We complete your security questionnaire during discovery.', // CONFIRM certification status
  },
  {
    q: 'How do you price?',
    a: 'Fixed scope and fixed price, set out in the discovery proposal. Time and materials only if you ask for it.', // CONFIRM
  },
  {
    q: 'What if it breaks after handover?',
    a: 'Each build includes a fixed support period for defects. After that, support is a separate retainer or your team runs it alone.', // CONFIRM support period length
  },
  {
    q: 'Our data is not ready. Is that a blocker?',
    a: 'Usually not a blocker for discovery. Discovery is where we find out what is missing, what can start now, and what the gaps cost in accuracy.',
  },
  {
    q: 'Do you work with our existing team?',
    a: 'Yes. Your engineers have repository access from the first release, and we plan the handover from the start.',
  },
  {
    // Optional: practical, not positioning. Delete if not wanted.
    q: 'Where is the team?',
    a: 'Dubai, UTC+4, which overlaps the working day in Europe, the Gulf, and India. US mornings by arrangement.', // CONFIRM
  },
];

export const execAboutSection = {
  eyebrow: 'About',
  title: 'About cverse',
  intro:
    'cverse (CVerse Ventures FZCO) is an AI engineering firm. We build and operate LLM, agent, and forecasting systems for enterprises, inside the client’s own infrastructure.',
  // SLOT: team size and founding year, e.g. "A team of N engineers, founded in YYYY." Add to the intro when publishable.
};

export const execAboutPoints = [
  {
    title: 'How we build',
    description:
      'We run an internal software factory: coding agents, model routing, automated evaluation, and review gates that take a written specification to tested, deployable software. It is an internal tool, not a product. We use it on client work, and the client receives the output in their own repository like any other code.', // CONFIRM wording
  },
  {
    title: 'References',
    description: 'Available on request after a scoping call.', // CONFIRM, or delete this point
  },
];

// SLOT: client outcomes. When publishable, add a short list (industry, problem, result) between FAQ and About.

export const execContact = {
  eyebrow: 'Contact',
  title: 'Tell us what you are trying to do.',
  body:
    'Two or three lines is enough. We reply within two working days with whether we can help and what a scoping call would cover.', // CONFIRM reply time
  cta: execCtaLabel,
};

export const execFooter = {
  blurb: 'AI engineering for enterprises. LLM, agent, and forecasting systems, built and run in your own cloud.',
  servicesHeading: 'Services',
  serviceLinks: [
    'Production LLM systems',
    'Decision automation and forecasting',
    'Agentic workflows',
    'Private models and fine-tuning',
  ],
  contactHeading: 'Contact',
  legalLinks: [{ label: 'Privacy Policy', href: 'privacy/' }],
};
