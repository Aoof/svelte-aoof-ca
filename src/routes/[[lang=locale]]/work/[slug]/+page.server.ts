import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';
import { loadContent } from '$lib/server/content';

export const entries: EntryGenerator = async () => {
  const { projects } = await loadContent('en');
  return projects.flatMap(({ slug }) => [
    { lang: undefined, slug },
    { lang: 'fr', slug }
  ]);
};

export const load: PageServerLoad = async ({ params, parent }) => {
  const { content } = await parent();
  const project = content.projects.find((entry) => entry.slug === params.slug);
  if (!project) error(404, 'Not found');
  return { project };
};
