import { getFixedT, type Locale } from '../i18n/i18n';
import { siteConfig } from '../site.config';
import { isPublishedLocale, type SiteLocale } from './seo';

const languageTag: Record<SiteLocale, string> = {
	fr: 'fr-FR',
	en: 'en-US',
};

/** BCP 47 tags for languages this site actually publishes. */
export function publishedInLanguage(): string[] {
	return (['fr', 'en'] as const)
		.filter((locale) => isPublishedLocale(locale))
		.map((locale) => languageTag[locale]);
}

function place() {
	const { geo } = siteConfig;
	return {
		address: {
			'@type': 'PostalAddress',
			addressLocality: geo.locality,
			addressRegion: geo.region,
			postalCode: geo.postalCode,
			addressCountry: geo.country,
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: geo.latitude,
			longitude: geo.longitude,
		},
		areaServed: geo.areaServed.map((name) => ({ '@type': 'City', name })),
	};
}

function contactFields(): Record<string, string> {
	const fields: Record<string, string> = {};
	if (siteConfig.contact.email) fields.email = siteConfig.contact.email;
	if (siteConfig.contact.phoneE164) fields.telephone = siteConfig.contact.phoneE164;
	return fields;
}

/** Homepage entity: city-level place. The street address stays off until it is known. */
export function buildHomeJsonLd(homeUrl: string, locale: Locale): Record<string, unknown> {
	const t = getFixedT(locale);
	const orgId = `${homeUrl}#practice`;
	const services = [String(t('Individual.h1')), String(t('Couple.h1')), String(t('HomePage.approachTitle'))];

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['ProfessionalService', 'LocalBusiness'],
				'@id': orgId,
				name: siteConfig.name,
				url: homeUrl,
				description: String(t('Home.metaDescription')),
				image: new URL(siteConfig.ogImageUrl, homeUrl).href,
				...place(),
				...contactFields(),
				inLanguage: publishedInLanguage(),
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: String(t('HomePage.servicesAria')),
					itemListElement: services.map((name) => ({
						'@type': 'Offer',
						itemOffered: { '@type': 'Service', name },
					})),
				},
			},
			{
				'@type': 'WebSite',
				'@id': `${homeUrl}#website`,
				url: homeUrl,
				name: siteConfig.name,
				inLanguage: publishedInLanguage(),
				publisher: { '@id': orgId },
			},
		],
	};
}

/** Legal notice repeats the practice. No street line: that address is not known. */
export function buildLegalNoticeJsonLd(homeUrl: string, locale: Locale): Record<string, unknown> {
	const t = getFixedT(locale);
	return {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		'@id': `${homeUrl}#practice`,
		name: siteConfig.name,
		legalName: siteConfig.legal.name,
		url: homeUrl,
		description: String(t('LegalNotice.metaDescription')),
		image: new URL(siteConfig.ogImageUrl, homeUrl).href,
		...place(),
		...contactFields(),
		inLanguage: publishedInLanguage(),
	};
}

export function buildArticleJsonLd(input: {
	pageUrl: string;
	homeUrl: string;
	locale: Locale;
	title: string;
	description: string;
	publishedAt?: string | null;
	image?: string | null;
}): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: input.title,
		description: input.description,
		inLanguage: input.locale === 'en' ? languageTag.en : languageTag.fr,
		mainEntityOfPage: input.pageUrl,
		...(input.publishedAt ? { datePublished: input.publishedAt } : {}),
		...(input.image ? { image: input.image } : {}),
		author: { '@type': 'Person', name: siteConfig.name },
		publisher: { '@type': 'Organization', name: siteConfig.name, url: input.homeUrl },
	};
}
