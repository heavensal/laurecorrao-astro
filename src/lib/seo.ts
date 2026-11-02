import { isMultilangEnabled } from '../i18n/i18n';
import { siteConfig } from '../site.config';

export type SiteLocale = 'fr' | 'en';

const localeOrder: readonly SiteLocale[] = ['fr', 'en'];

/**
 * True when this brochure site publishes that language.
 * English also requires `ENABLE_MULTILANG=true`, so a French-only `.env` never announces `/en/`.
 */
export function isPublishedLocale(locale: SiteLocale): boolean {
	if (locale === 'en' && !isMultilangEnabled()) return false;
	return siteConfig.publishedLocales.some((published) => published === locale);
}

/**
 * Open Graph alternate locale.
 * Omitted on a single-language site so the head does not advertise a translation that is not published.
 */
export function publishedOgLocaleAlternate(pageLocale: SiteLocale): 'fr_FR' | 'en_US' | undefined {
	if (!isPublishedLocale('fr') || !isPublishedLocale('en')) return undefined;
	return pageLocale === 'fr' ? 'en_US' : 'fr_FR';
}

/** Build absolute URL for a path segment (e.g. `politique-de-confidentialite`, `en/privacy-policy`). */
export function absolutePageUrl(site: URL | undefined, pathFromBase: string): string | undefined {
	if (!site) return undefined;
	const base = import.meta.env.BASE_URL;
	const clean = pathFromBase.startsWith('/') ? pathFromBase.slice(1) : pathFromBase;
	return new URL(base + clean, site).href;
}

/**
 * hreflang for the locales in `siteConfig.publishedLocales` only.
 * `x-default` repeats the site default (French).
 * A URL is included only when the caller passes it.
 */
export function buildAlternateLanguages(
	urls: Partial<Record<SiteLocale, string | undefined>>,
): { hreflang: string; href: string }[] | undefined {
	const entries: { hreflang: string; href: string }[] = [];
	for (const locale of localeOrder) {
		const href = urls[locale];
		if (!href || !isPublishedLocale(locale)) continue;
		entries.push({ hreflang: locale, href });
	}
	const fallback = urls[siteConfig.lang];
	if (fallback && isPublishedLocale(siteConfig.lang)) {
		entries.push({ hreflang: 'x-default', href: fallback });
	}
	return entries.length ? entries : undefined;
}

export function buildLegalAlternateLanguages(
	frUrl: string | undefined,
	enUrl: string | undefined,
): { hreflang: string; href: string }[] | undefined {
	return buildAlternateLanguages({ fr: frUrl, en: enUrl });
}
