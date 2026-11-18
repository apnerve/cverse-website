export const landingPages = ['/'];
export const legalPages = ['/privacy/'];
/** Review-only pages: tested for errors, a11y and links, but not for navigation. */
export const reviewPages = ['/brand/'];
export const allPages = [...landingPages, ...legalPages, ...reviewPages];

/** Headline typeface; the body uses Timeless Grotesk once its files are added, Inter until then. */
export const expectedFont = 'Space Grotesk Variable';
