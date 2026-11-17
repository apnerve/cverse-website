export const variants = ['corporate', 'dark', 'motion'] as const;
export type Variant = (typeof variants)[number];

export const landingPages = variants.map((v) => `/${v}/`);
export const legalPages = variants.flatMap((v) => [`/${v}/privacy/`, `/${v}/terms/`]);
export const allPages = ['/', ...landingPages, ...legalPages];

export const expectedFont: Record<Variant, string> = {
  corporate: 'Timeless Grotesk',
  dark: 'Space Grotesk Variable',
  motion: 'Allo',
};
