import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { content } = await parent();
  const project = content.projects.find((entry) => entry.slug === params.slug);
  if (!project) error(404, 'Not found');
  return { project };
};
