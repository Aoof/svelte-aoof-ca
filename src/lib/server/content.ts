import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { dev } from '$app/environment';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { newestFirst } from '$lib/i18n';
import { safeUrl } from '$lib/content/safe';
import type {
  Event,
  Experience,
  HomeContent,
  ImageVariants,
  Locale,
  Project,
  SiteSettings,
  Story,
  Track
} from '$lib/content/types';

const contentRoot = path.join(process.cwd(), 'content');
const manifestPath = path.join(process.cwd(), 'static', 'media', 'optimized', 'manifest.json');

async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, 'utf8')) as T;
}

let manifest: Promise<Record<string, ImageVariants>> | undefined;

/** Variants come from scripts/optimize-images.js; without them (plain `vite dev`) images fall back to the original. */
async function resolveImage(image: string | undefined): Promise<ImageVariants | undefined> {
  if (!image) return undefined;
  manifest ??= readJson<Record<string, ImageVariants>>(manifestPath).catch(() => ({}));
  return (await manifest)[image];
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
  // Byte-order marks and zero-width characters sneak in when text is pasted into the CMS.
  const clean = value
    .replace(/[\uFEFF\u200B-\u200D\u2060]/g, '')
    .replace(/(\n- [^\n]*)\n{2,}(?=- )/g, '$1\n');
  const withKeywords = clean.replace(/;\[(.*?)\]/g, '<strong>$1</strong>');
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

/** Long entries show the intro and two bullets; the remaining bullets go behind a toggle. */
function splitBullets(html: string): { lead: string; more: string; moreCount: number } {
  const list = html.match(/<ul>([\s\S]*?)<\/ul>/);
  const items = list?.[1].match(/<li>[\s\S]*?<\/li>/g) ?? [];
  if (!list || items.length < 4) return { lead: html, more: '', moreCount: 0 };
  const before = html.slice(0, list.index);
  const after = html.slice((list.index ?? 0) + list[0].length);
  return {
    lead: `${before}<ul>${items.slice(0, 2).join('')}</ul>`,
    more: `<ul>${items.slice(2).join('')}</ul>${after}`,
    moreCount: items.length - 2
  };
}

const kindOrder = { job: 0, education: 1, volunteering: 2, other: 3 } as const;

const cache = new Map<Locale, ReturnType<typeof build>>();

export function loadContent(lang: Locale) {
  if (dev) return build(lang);
  if (!cache.has(lang)) cache.set(lang, build(lang));
  return cache.get(lang)!;
}

async function build(lang: Locale) {
  const [settings, home, tracks, projects, experience, events] = await Promise.all([
    readLocalized<SiteSettings>('settings', lang),
    readLocalized<HomeContent>('home', lang),
    readEntries<Track>('tracks', lang),
    readEntries<Project>('projects', lang),
    readEntries<Experience>('experience', lang),
    readEntries<Event>('events', lang)
  ]);

  settings.social = {
    github: safeUrl(settings.social.github),
    linkedin: safeUrl(settings.social.linkedin),
    discord: safeUrl(settings.social.discord)
  };

  return {
    settings,
    home: {
      ...home,
      description: rich(home.description),
      passion: rich(home.passion),
      looking_for: rich(home.looking_for)
    } satisfies HomeContent,
    tracks: tracks.map((track) => ({ ...track, resume: safeUrl(track.resume) })).sort((a, b) => a.order - b.order),
    projects: (
      await Promise.all(
        projects.map(
          async (project): Promise<Project> => ({
            ...project,
            description: rich(project.description),
            story: richStory(project.story),
            links: (project.links ?? []).map((link) => ({ ...link, url: safeUrl(link.url) })).filter((link) => link.url),
            imageVariants: await resolveImage(project.image)
          })
        )
      )
    ).sort(newestFirst),
    experience: experience
      .map((entry) => {
        const description = rich(entry.description);
        const { lead, more, moreCount } = splitBullets(description);
        return {
          ...entry,
          description,
          descriptionLead: lead,
          descriptionMore: more,
          moreCount,
          link: safeUrl(entry.link)
        };
      })
      .sort((a, b) => kindOrder[a.kind] - kindOrder[b.kind] || newestFirst(a, b)),
    events: (
      await Promise.all(
        events.map(async (event) => ({
          ...event,
          summary: rich(event.summary),
          link: safeUrl(event.link),
          imageVariants: await resolveImage(event.image)
        }))
      )
    ).sort((a, b) => b.date.localeCompare(a.date))
  };
}

export type SiteContent = Awaited<ReturnType<typeof build>>;
