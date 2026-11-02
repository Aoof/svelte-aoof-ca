import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { href } from '$lib/i18n';

export const GET: RequestHandler = ({ params }) => redirect(301, href(params.lang === 'fr' ? 'fr' : 'en', '/work'));
