export const landingPages = ['/'];
export const legalPages = ['/privacy/'];
/** Review-only pages: tested for errors, a11y and links, but not for navigation. */
export const reviewPages = ['/brand/'];
export const allPages = [...landingPages, ...legalPages, ...reviewPages];

/** Typeface for headings and body. */
export const expectedFont = 'IBM Plex Sans Variable';
