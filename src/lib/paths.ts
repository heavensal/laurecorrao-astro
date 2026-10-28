import { isMultilangEnabled, type Locale } from '../i18n/i18n';

/** Internal link compatible with a non-root `base` in astro.config.mjs. */
export function pageHref(path: string): string {
	const base = import.meta.env.BASE_URL;
	const clean = path.startsWith('/') ? path.slice(1) : path;
	return base + clean;
}

/** URL path segments that do not change with the page language. */
export const pageRoutes = {
	home: '',
	englishHome: 'en/',
	blog: 'blog',
} as const;

/**
 * Public legal slugs, one set per locale.
 * French pages stay on French slugs even when English is added under `/en/`.
 */
export const legalSlugs = {
	fr: {
		legalNotice: 'mentions-legales',
		privacyPolicy: 'politique-de-confidentialite',
		termsOfService: 'conditions-generales',
	},
	en: {
		legalNotice: 'legal-notice',
		privacyPolicy: 'privacy-policy',
		termsOfService: 'terms-of-service',
	},
} as const;

export type LegalPageId = keyof typeof legalSlugs.fr;

/** Public content slugs. The keys are code. The values are addresses. */
export const contentSlugs = {
	fr: {
		individual: 'accompagnement-individuel',
		couple: 'therapie-de-couple',
		approach: 'mon-approche',
		booking: 'tarifs-et-rendez-vous',
	},
	en: {
		individual: 'individual-support',
		couple: 'couples-therapy',
		approach: 'my-approach',
		booking: 'fees-and-appointments',
	},
} as const;

export type ContentPageId = keyof typeof contentSlugs.fr;

/** Public path for a content page, with `en/` only when English routes are on. */
export function contentPath(locale: Locale, page: ContentPageId): string {
	return `${localePathPrefix(locale)}${contentSlugs[locale][page]}`;
}

export function legalSlug(locale: Locale, page: LegalPageId): string {
	return legalSlugs[locale][page];
}

/** Public path, with `en/` only when English routes are on. */
export function legalPath(locale: Locale, page: LegalPageId): string {
	return `${localePathPrefix(locale)}${legalSlug(locale, page)}`;
}

/** `en/` only when `.env` turns English routes on. A French-only site never links under `/en/`. */
export function localePathPrefix(locale: Locale): string {
	return locale === 'en' && isMultilangEnabled() ? 'en/' : '';
}

export function homePathForLocale(locale: Locale): string {
	return localePathPrefix(locale) === 'en/' ? pageRoutes.englishHome : pageRoutes.home;
}
