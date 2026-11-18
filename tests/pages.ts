export const variants = ['corporate', 'dark', 'motion'] as const;
export type Variant = (typeof variants)[number];

/** Extra versions that reuse a theme but carry their own content. */
export const extraVersions = ['exec'] as const;
const versions = [...variants, ...extraVersions];

export const landingPages = versions.map((v) => `/${v}/`);
export const legalPages = [
  ...variants.flatMap((v) => [`/${v}/privacy/`, `/${v}/terms/`]),
  ...extraVersions.map((v) => `/${v}/privacy/`), // exec has no terms page
];
export const allPages = ['/', ...landingPages, ...legalPages];

export const expectedFont: Record<Variant, string> = {
  corporate: 'Space Grotesk Variable',
  dark: 'Space Grotesk Variable',
  motion: 'Allo',
};
