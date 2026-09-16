import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import type { Event, Experience, HomeContent, Localized, Locale, Project, SiteSettings, SkillsContent } from '$lib/content/types';

const contentRoot = path.join(process.cwd(), 'content');

async function readJson<T>(filePath: string): Promise<T> {
  const source = await readFile(filePath, 'utf8');
  return JSON.parse(source) as T;
}

async function readLocalized<T>(name: string): Promise<Localized<T>> {
  try {
    const content = await readJson<Localized<T> & { fr?: T }>(path.join(contentRoot, `${name}.json`));
    if ('en' in content && 'fr' in content) {
      return content as Localized<T>;
    }

    const localizedContent = content as Record<string, unknown> & { fr?: T };
    const { fr, ...en } = localizedContent;
    return { en: en as T, fr: fr as T };
  } catch {
    // Keep compatibility with locale-suffixed files during the migration.
  }

  const [en, fr] = await Promise.all([
    readJson<T>(path.join(contentRoot, `${name}.en.json`)),
    readJson<T>(path.join(contentRoot, `${name}.fr.json`))
  ]);

  return { en, fr };
}

async function readLocalizedEntries<T>(collection: string): Promise<Localized<T[]>> {
  const directory = path.join(contentRoot, collection);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.json'));
  const entries = await Promise.all(files.map(async (file) => ({
    file,
    value: await readJson<T>(path.join(directory, file))
  })));

  const mergedEntries = entries.filter(({ file }) => !/\.(en|fr)\.json$/.test(file));
  if (mergedEntries.length > 0) {
    return {
      en: mergedEntries.map(({ value }) => (value as Localized<T>).en),
      fr: mergedEntries.map(({ value }) => (value as Localized<T>).fr)
    };
  }

  return {
    en: entries.filter(({ file }) => file.endsWith('.en.json')).map(({ value }) => value),
    fr: entries.filter(({ file }) => file.endsWith('.fr.json')).map(({ value }) => value)
  };
}

export async function loadContent() {
  const [settings, home, skills, experience, events, projects] = await Promise.all([
    readLocalized<SiteSettings>('settings'),
    readLocalized<HomeContent>('home'),
    readJson<SkillsContent>(path.join(contentRoot, 'skills.json')),
    readLocalizedEntries<Experience>('experience'),
    readLocalizedEntries<Event>('events'),
    readLocalizedEntries<Project>('projects')
  ]);

  return { settings, home, skills, experience, events, projects, about: { en: { experience: experience.en, events: events.en }, fr: { experience: experience.fr, events: events.fr } } };
}

export type SiteContent = Awaited<ReturnType<typeof loadContent>>;
export type LocalizedSiteContent = {
  settings: SiteSettings;
  home: HomeContent;
  skills: SkillsContent;
  experience: Experience[];
  events: Event[];
  projects: Project[];
};

export function getLocaleContent(content: SiteContent, locale: string): LocalizedSiteContent {
  const selectedLocale: Locale = locale === 'fr' ? 'fr' : 'en';

  return {
    settings: content.settings[selectedLocale],
    home: content.home[selectedLocale],
    skills: content.skills,
    experience: content.experience[selectedLocale],
    events: content.events[selectedLocale],
    projects: content.projects[selectedLocale]
  };
}

export type { HomeContent, Skill, SkillsContent } from '$lib/content/types';