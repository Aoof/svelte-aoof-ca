import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Project } from '$lib/content/types';
import { trackQr } from '$lib/qr';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { content, lang } = await parent();
  const track = content.tracks.find((entry) => entry.slug === params.track);
  if (!track) error(404, 'Not found');

  const featured = track.featured
    .map((slug) => content.projects.find((project) => project.slug === slug))
    .filter((project): project is Project => !!project);
  const more = content.projects.filter(
    (project) => project.tracks.includes(track.slug) && !track.featured.includes(project.slug)
  );
  const experience = content.experience.filter((entry) => entry.tracks.includes(track.slug));
  const stack = [...new Set([...featured, ...more].flatMap((project) => project.stack))];
  const others = content.tracks.filter((entry) => entry.slug !== track.slug);

  const { url, svg } = await trackQr(lang, track.slug);
  return { track, featured, more, experience, stack, others, cardUrl: url, qr: svg };
};
