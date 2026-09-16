import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import type { Event, Experience, HomeContent, Localized, Project, SiteSettings, SkillsContent } from '$lib/content/types';

const contentRoot = path.join(process.cwd(), 'content');

async function readJson<T>(filePath: string): Promise<T> {
  const source = await readFile(filePath, 'utf8');
  return JSON.parse(source) as T;
}

async function readLocalized<T>(name: string): Promise<Localized<T>> {
  const content = await readJson<T & { fr: T }>(path.join(contentRoot, `${name}.json`));
  const { fr, ...en } = content;
  return { en: en as T, fr };
}

async function readLocalizedEntries<T>(collection: string): Promise<Localized<T[]>> {
  const directory = path.join(contentRoot, collection);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.json'));
  const entries = await Promise.all(files.map((file) => readJson<Localized<T>>(path.join(directory, file))));
  return {
    en: entries.map(({ en }) => en),
    fr: entries.map(({ fr }) => fr)
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

  return { settings, home, skills, experience, events, projects };
}

export type SiteContent = Awaited<ReturnType<typeof loadContent>>;

export type { HomeContent, Skill, SkillsContent } from '$lib/content/types';