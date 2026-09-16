import type { LayoutServerLoad } from './$types';
import { loadContent } from '$lib/server/content';

export const load: LayoutServerLoad = async () => ({
  content: await loadContent()
});