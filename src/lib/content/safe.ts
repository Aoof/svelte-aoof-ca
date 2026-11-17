/** Editors can type any string into a link field; only http(s), mailto and site-relative links get through. */
export function safeUrl(value: string | undefined): string {
  if (!value) return '';
  const url = value.trim();
  if (url.startsWith('/') && !url.startsWith('//') && !url.startsWith('/\\')) return url;
  if (url.startsWith('#')) return url;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol) ? url : '';
  } catch {
    return '';
  }
}

/** Escape a JSON string so it cannot close a surrounding <script> element. */
const escapes: Record<string, string> = {
  '<': '\\u003c',
  '>': '\\u003e',
  '&': '\\u0026',
  [String.fromCharCode(0x2028)]: '\\u2028',
  [String.fromCharCode(0x2029)]: '\\u2029'
};

export function jsonForScript(value: unknown): string {
  return JSON.stringify(value).replace(new RegExp('[' + Object.keys(escapes).join('') + ']', 'g'), (char) => escapes[char]);
}
