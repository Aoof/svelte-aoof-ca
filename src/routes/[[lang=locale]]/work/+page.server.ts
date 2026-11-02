import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, parent }) => {
  const { content } = await parent();
  const wanted = url.searchParams.get('track');
  const active = content.tracks.some((track) => track.slug === wanted) ? wanted : null;
  const projects = active ? content.projects.filter((project) => project.tracks.includes(active)) : content.projects;
  return { active, projects };
};
