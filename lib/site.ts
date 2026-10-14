import type { Metadata } from 'next';

export const SITE_URL = 'https://claraverse-3d-agency.vercel.app';
export const SITE_NAME = 'Claraverse';
export const CONTACT_EMAIL = 'hello@claraverse.in';

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const pageTitle = `${title} — ${SITE_NAME}`;

  return {
    title: { absolute: pageTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: pageTitle,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
    },
  };
}
