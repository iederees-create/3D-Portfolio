/** Shared contact paths (same values the project detail pages already use). */
export const CONTACT_EMAIL = 'iedereesfrancis@gmail.com';
export const WHATSAPP_NUMBER = '27629494708';

export function hireMailto(subject = 'Project enquiry from your portfolio', body?: string) {
  const query = [`subject=${encodeURIComponent(subject)}`];
  if (body) query.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${CONTACT_EMAIL}?${query.join('&')}`;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
