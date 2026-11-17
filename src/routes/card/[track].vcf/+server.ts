import type { EntryGenerator, RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { loadContent } from '$lib/server/content';

export const prerender = true;

/** RFC 6350 text escaping, so a stray comma, semicolon or newline in the content cannot add vCard fields. */
const esc = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/([,;])/g, '\\$1');

export const entries: EntryGenerator = async () => {
  const { tracks } = await loadContent('en');
  return tracks.map((track) => ({ track: track.slug }));
};

export const GET: RequestHandler = async ({ params }) => {
  const { tracks, settings } = await loadContent('en');
  const track = tracks.find((entry) => entry.slug === params.track);
  if (!track) error(404, 'Not found');

  const card = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Mousa;Abdulrahman;;;',
    'FN:Abdulrahman Mousa',
    'NICKNAME:Aoof',
    `TITLE:${esc(track.title)}`,
    `EMAIL;TYPE=INTERNET:${esc(settings.contact.email)}`,
    'ADR;TYPE=WORK:;;;Montreal;QC;;Canada',
    'URL:https://aoof.ca',
    `URL:${settings.social.linkedin.replace(/[\r\n]/g, '')}`,
    `URL:${settings.social.github.replace(/[\r\n]/g, '')}`,
    'END:VCARD',
    ''
  ].join('\r\n');

  return new Response(card, {
    headers: {
      'content-type': 'text/vcard; charset=utf-8',
      'content-disposition': 'attachment; filename="abdulrahman-mousa.vcf"'
    }
  });
};
