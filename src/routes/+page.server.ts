import type { PageServerLoad } from './$types';
import { loadContent } from '$lib/server/content';

export const load: PageServerLoad = async () => ({
  content: await loadContent()
});