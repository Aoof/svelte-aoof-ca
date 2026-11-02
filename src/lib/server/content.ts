import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { newestFirst } from '$lib/i18n';
import type {
  Event,
  Experience,
  HomeContent,
  Locale,
  Project,
  SiteSettings,
  Story,
  Track
} from '$lib/content/types';

const contentRoot = path.join(process.cwd(), 'content');

async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, 'utf8')) as T;
}

/** Files with the English copy at the root and the French copy under `fr`. */
async function readLocalized<T>(name: string, lang: Locale): Promise<T> {
  const content = await readJson<Record<string, unknown> & { fr: T }>(path.join(contentRoot, `${name}.json`));
  const { fr, ...en } = content;
  return (lang === 'fr' ? fr : en) as T;
}

/** One file per entry, each holding `{ en, fr }`. */
async function readEntries<T>(collection: string, lang: Locale): Promise<T[]> {
  const directory = path.join(contentRoot, collection);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.json')).sort();
  const entries = await Promise.all(files.map((file) => readJson<Record<Locale, T>>(path.join(directory, file))));
  return entries.map((entry) => entry[lang]);
}

/** Content editors write Markdown or HTML; visitors only ever get sanitized HTML. */
function rich(value: string | undefined): string {
  if (!value) return '';
  const withKeywords = value.replace(/;\[(.*?)\]/g, '<strong>$1</strong>');
  const html = marked.parse(withKeywords, { async: false }) as string;
  return DOMPurify.sanitize(html).replace(
    /<a (?=[^>]*href="https?:\/\/)/g,
    '<a target="_blank" rel="noopener noreferrer" '
  );
}

function richStory(story: Story | undefined): Story | undefined {
  if (!story) return undefined;
  const result: Story = {};
  for (const key of ['problem', 'did', 'with', 'result'] as const) {
    if (story[key]) result[key] = rich(story[key]);
  }
  return Object.keys(result).length ? result : undefined;
}

const kindOrder = { job: 0, education: 1, volunteering: 2, other: 3 } as const;

export async function loadContent(lang: Locale) {
  const [settings, home, tracks, projects, experience, events] = await Promise.all([
    readLocalized<SiteSettings>('settings', lang),
    readLocalized<HomeContent>('home', lang),
    readEntries<Track>('tracks', lang),
    readEntries<Project>('projects', lang),
    readEntries<Experience>('experience', lang),
    readEntries<Event>('events', lang)
  ]);

  return {
    settings,
    home: {
      ...home,
      description: rich(home.description),
      passion: rich(home.passion),
      looking_for: rich(home.looking_for)
    } satisfies HomeContent,
    tracks: [...tracks].sort((a, b) => a.order - b.order),
    projects: projects
      .map((project): Project => ({
        ...project,
        description: rich(project.description),
        story: richStory(project.story)
      }))
      .sort(newestFirst),
    experience: experience
      .map((entry) => ({ ...entry, description: rich(entry.description) }))
      .sort((a, b) => kindOrder[a.kind] - kindOrder[b.kind] || newestFirst(a, b)),
    events: events
      .map((event) => ({ ...event, summary: rich(event.summary) }))
      .sort((a, b) => b.date.localeCompare(a.date))
  };
}

export type SiteContent = Awaited<ReturnType<typeof loadContent>>;
