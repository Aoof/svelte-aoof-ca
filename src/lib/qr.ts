import QRCode from 'qrcode';
import { href } from '$lib/i18n';
import type { Locale } from '$lib/content/types';

/** SVG markup for a QR code that points at a track page. Generated on the server. */
export function trackQr(lang: Locale, slug: string) {
  const url = `https://aoof.ca${href(lang, `/hire/${slug}`)}`;
  return QRCode.toString(url, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    color: { dark: '#17151a', light: '#0000' }
  }).then((svg) => ({ url, svg }));
}
