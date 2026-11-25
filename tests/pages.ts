export const landingPages = ['/'];
export const legalPages = ['/privacy/'];
/** Case-study routes: the index and every published entry (slugs are hard-coded; tests cannot import astro:content). */
export const caseStudyPages = ['/case-studies/', '/case-studies/open-weight-serving-poc/'];
/** Review-only pages: tested for errors, a11y and links, but not for navigation. */
export const reviewPages = ['/brand/'];
export const allPages = [...landingPages, ...legalPages, ...caseStudyPages, ...reviewPages];

/** Typeface for headings and body. */
export const expectedFont = 'IBM Plex Sans Variable';
