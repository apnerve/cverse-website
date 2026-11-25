/**
 * The `writing` collection: paths, labels, ordering and the draft filter, shared by the pages and the home
 * band. Everything that builds an href goes through withBase so the GitHub Pages build keeps working.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { KINDS } from '../content.config';
import { withBase } from './base';

export { KINDS };
export type Kind = (typeof KINDS)[number];
export type Entry = CollectionEntry<'writing'>;

export const WRITING_PATH = '/writing/';

export const KIND_LABELS: Record<Kind, string> = { 'case-study': 'Case study', note: 'Note', guide: 'Guide' };
export const KIND_PLURALS: Record<Kind, string> = { 'case-study': 'Case studies', note: 'Notes', guide: 'Guides' };

export const entryPath = (entry: Entry) => `${WRITING_PATH}${entry.id}/`;
export const entryHref = (entry: Entry) => withBase(entryPath(entry));
export const kindPath = (kind: Kind) => `${WRITING_PATH}kind/${kind}/`;
export const kindHref = (kind: Kind) => withBase(kindPath(kind));

/** Published pieces, newest first. Drafts are excluded everywhere. */
export async function getPublished(): Promise<Entry[]> {
  const entries = await getCollection('writing', ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export async function byKind(kind: Kind): Promise<Entry[]> {
  return (await getPublished()).filter((e) => e.data.kind === kind);
}

/** URL-safe form of a tag, for the tag pages when there are enough pieces to filter. */
export const slugify = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
/** "24 Nov 2026" */
export const formatDate = (d: Date) => dateFormat.format(d);
