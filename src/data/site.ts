/**
 * Single source of truth for all copy, links and contact details.
 * Every version of the page renders from this file.
 */

export type Variant = 'corporate' | 'dark' | 'motion';

export const variants: Record<Variant, { name: string; blurb: string; font: string }> = {
  corporate: {
    name: 'Corporate',
    blurb: 'Blue and white. Classic enterprise palette with Timeless Grotesk.',
    font: 'Timeless Grotesk',
  },
  dark: {
    name: 'Dark',
    blurb: 'Dark mode with a teal accent, set in Space Grotesk.',
    font: 'Space Grotesk',
  },
  motion: {
    name: 'Motion',
    blurb: 'Subtle hero and button animation, set in Allo with its own palette.',
    font: 'Allo',
  },
};

export const site = {
  name: 'cverse',
  legalName: 'CVerse Ventures FZCO',
  title: 'cverse — Enterprise AI-Native Services & Solutions',
  description:
    'cverse designs, engineers, and deploys enterprise AI: LLMOps and conversational AI, process automation and analytics, custom agentic workflows, and model fine-tuning for large organizations.',
  url: 'https://cverse.ai',
  email: 'info@cverse.ai',
  address: {
    lines: ['DDP, Building A1, Dubai Silicon Oasis', 'Dubai 341041, UAE'],
    locality: 'Dubai',
    postalCode: '341041',
    country: 'AE',
  },
  /**
   * Social profiles. Leave a URL empty to hide that icon.
   * TODO: fill in the real profile URLs.
   */
  social: {
    linkedin: '',
    x: '',
  },
};

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Why cverse', href: '#why-cverse' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'AI-Native Services for the Enterprise',
  titleLine1: 'Architecting AI Systems',
  titleLine2: 'at Enterprise Scale',
  lead:
    'We design, engineer, and deploy high-performance custom AI systems and agentic workflows, combining advanced deep-tech expertise with battle-tested deployment architectures.',
  primaryCta: { label: 'Explore Services', href: '#services' },
  secondaryCta: { label: 'Get in Touch', href: '#contact' },
  panel: {
    heading: 'cverse',
    caption: 'system status',
    code: [
      { comment: '# enterprise deployment' },
      { key: 'stack', value: 'llmops + agents + rag' },
      { key: 'clouds', value: 'aws · azure · gcp · on-prem' },
      { key: 'compliance', value: 'SOC 2-aligned', highlight: true },
      { key: 'vendor', value: 'agnostic' },
    ],
    status: 'Real-time monitoring active',
  },
};

export type IconName =
  | 'cpu'
  | 'trending-down'
  | 'workflow'
  | 'layers'
  | 'globe'
  | 'shield-check'
  | 'git-branch';

export const services: { icon: IconName; title: string; description: string; tags: string[] }[] = [
  {
    icon: 'cpu',
    title: 'Enterprise AI & LLMOps',
    description:
      'Bespoke engineering of enterprise-grade conversational interfaces and LLM orchestrations. We construct, fine-tune, and deploy secure agent systems with robust governance, guardrails, and rapid integration.',
    tags: ['Conversational AI', 'LLMOps Systems', 'Retrieval (RAG)'],
  },
  {
    icon: 'trending-down',
    title: 'Process Automation & Consumer Analytics',
    description:
      'State-of-the-art predictive modeling and retail optimization services. We build custom deep learning pipelines that transform enterprise telemetry and raw data into real-time business decisions.',
    tags: ['Deep Learning', 'Process Automation', 'Forecasting'],
  },
  {
    icon: 'workflow',
    title: 'Custom Agentic Workflows & Tool Integration',
    description:
      'We conceptualize and build autonomous, goal-directed AI agents capable of multi-step reasoning, contextual memory usage, and direct native database and API execution without human intervention.',
    tags: ['Autonomous Agents', 'Workflow Automation', 'API Engineering'],
  },
  {
    icon: 'layers',
    title: 'Deep Tech Model Fine-Tuning & Custom R&D',
    description:
      'Core model customization services. We domain-adapt, distill, and align open or proprietary foundational LLMs on secure isolated clouds to preserve competitive intellectual advantage.',
    tags: ['Model Distillation', 'Custom Datasets', 'Private Cloud AI'],
  },
];

export const servicesSection = {
  eyebrow: 'Services',
  title: 'Our AI-Native Services',
  intro:
    'We deliver end-to-end bespoke AI services designed to integrate perfectly with the mission-critical systems of forward-thinking enterprises.',
};

export const pillars: { icon: IconName; title: string; short: string; description: string }[] = [
  {
    icon: 'globe',
    title: 'Global Deployment',
    short: 'Multi-region, multi-cloud, built for millions of requests.',
    description:
      'Our systems are designed to handle millions of requests across distributed cloud environments with low, predictable latency.',
  },
  {
    icon: 'shield-check',
    title: 'Enterprise Security',
    short: 'SOC 2-aligned controls, PII masking, granular access.',
    description:
      'Security controls aligned to SOC 2, with built-in data privacy, PII masking, and granular access control for sensitive industrial data.',
  },
  {
    icon: 'git-branch',
    title: 'Vendor Agnostic',
    short: 'AWS, Azure, GCP, or on-premise. Your stack, not ours.',
    description:
      "Seamless integration with existing tech stacks, whether you're on AWS, Azure, GCP, or on-premise infrastructure.",
  },
];

export const whySection = {
  eyebrow: 'Why cverse',
  title: 'Engineered for Enterprise Scale',
  intro:
    "We don't just build models; we build systems. Our approach focuses on the rigorous requirements of global enterprises, ensuring reliability, security, and measurable ROI.",
};

export const aboutSection = {
  eyebrow: 'About',
  title: 'The strategic partner for enterprises',
  intro:
    'cverse is the strategic partner for enterprises looking to leverage AI at scale. We build the infrastructure and intelligence that powers the next generation of industry solutions.',
};

export const aboutPoints = [
  {
    title: 'Mission-critical by design',
    description:
      'Every engagement starts from the systems your business already depends on. We design for integration, observability, and graceful failure from day one, not as an afterthought.',
  },
  {
    title: 'Systems, not just models',
    description:
      'A model is one component. We deliver the data pipelines, evaluation harnesses, guardrails, and operations around it, so results hold up in production and the ROI is measurable.',
  },
  {
    title: 'Battle-tested architectures',
    description:
      'Our reference architectures have shipped at enterprise scale, from conversational interfaces to autonomous agentic workflows. We reuse what is proven instead of starting from zero.',
  },
];

export const footer = {
  blurb:
    'The strategic partner for enterprises looking to leverage AI at scale. We build the infrastructure and intelligence that powers the next generation of industry solutions.',
  servicesHeading: 'AI-Native Services',
  serviceLinks: [
    'Enterprise AI & LLMOps',
    'Process Automation',
    'Custom Agentic Workflows',
    'Deep Tech Model Tuning',
  ],
  contactHeading: 'Contact',
  reach:
    'Serving enterprises worldwide. Engagements across North America, Europe, the Middle East, and Asia-Pacific.',
  legalLinks: [
    { label: 'Privacy Policy', href: 'privacy/' },
    { label: 'Terms of Service', href: 'terms/' },
  ],
};
