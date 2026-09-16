import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(value: string): string {
  return DOMPurify.sanitize(value);
}