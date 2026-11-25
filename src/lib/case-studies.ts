/**
 * Case-study collection helpers: one place for draft filtering, ordering, and URLs,
 * so the index page, the detail route, and the home-page section never disagree.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './base';

export type CaseStudy = CollectionEntry<'case-studies'>;

export const CASE_STUDIES_PATH = '/case-studies/';

/** Site-relative path with a trailing slash (for canonical URLs and Shell `path`). */
export const caseStudyPath = (entry: CaseStudy) => `${CASE_STUDIES_PATH}${entry.id}/`;

/** Base-prefixed href for anchors; works at the domain root and under a sub-path. */
export const caseStudyHref = (entry: CaseStudy) => withBase(caseStudyPath(entry));

/** Published entries, newest first. */
export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  const all = await getCollection('case-studies', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}
