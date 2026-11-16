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
			streetAddress: siteConfig.legal.street,
			addressLocality: geo.locality,
			addressRegion: geo.region,
			postalCode: geo.postalCode,
			addressCountry: geo.country,
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

function brandLogo(homeUrl: string) {
	return {
		'@type': 'ImageObject' as const,
		url: new URL(siteConfig.logoUrl, homeUrl).href,
		width: siteConfig.logoWidth,
		height: siteConfig.logoHeight,
	};
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
				logo: brandLogo(homeUrl),
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
		logo: brandLogo(homeUrl),
		description: String(t('LegalNotice.metaDescription')),
		image: new URL(siteConfig.ogImageUrl, homeUrl).href,
		...place(),
		...contactFields(),
		inLanguage: publishedInLanguage(),
	};
}

/** Service landing page — WebPage, Service, BreadcrumbList, geo on the provider. */
export function buildServicePageJsonLd(input: {
	pageUrl: string;
	homeUrl: string;
	locale: Locale;
	serviceName: string;
	description: string;
	breadcrumbCurrent: string;
	imageUrl?: string;
}): Record<string, unknown> {
	const t = getFixedT(input.locale);
	const orgId = `${input.homeUrl}#practice`;
	const pageId = `${input.pageUrl}#webpage`;
	const serviceId = `${input.pageUrl}#service`;
	const breadcrumbId = `${input.pageUrl}#breadcrumb`;
	const { address, areaServed } = place();
	const inPerson =
		input.locale === 'en' ? 'In-person consultation' : 'Consultation au cabinet';
	const video = input.locale === 'en' ? 'Video consultation' : 'Consultation en visioconférence';
	const channels = [
		{
			'@type': 'ServiceChannel',
			serviceType: inPerson,
			serviceLocation: {
				'@type': 'Place',
				name: siteConfig.name,
				address,
				...(siteConfig.mapsUrl ? { hasMap: siteConfig.mapsUrl } : {}),
			},
		},
		{
			'@type': 'ServiceChannel',
			serviceType: video,
		},
	];

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': pageId,
				url: input.pageUrl,
				name: input.serviceName,
				description: input.description,
				inLanguage: input.locale === 'en' ? languageTag.en : languageTag.fr,
				isPartOf: { '@id': `${input.homeUrl}#website` },
				about: { '@id': serviceId },
				breadcrumb: { '@id': breadcrumbId },
				...(input.imageUrl
					? {
							primaryImageOfPage: {
								'@type': 'ImageObject',
								url: input.imageUrl,
							},
						}
					: {}),
			},
			{
				'@type': 'BreadcrumbList',
				'@id': breadcrumbId,
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: String(t('Nav.home')),
						item: input.homeUrl,
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: input.breadcrumbCurrent,
						item: input.pageUrl,
					},
				],
			},
			{
				'@type': 'Service',
				'@id': serviceId,
				name: input.serviceName,
				description: input.description,
				provider: { '@id': orgId },
				areaServed,
				availableChannel: channels,
				...(input.imageUrl ? { image: input.imageUrl } : {}),
				...contactFields(),
			},
		],
	};
}

type BookingOfferInput = {
	name: string;
	price: number;
	durationMinutes: number;
	servicePageUrl?: string;
};

type FaqInput = { question: string; answer: string };

/** Fees and booking page — WebPage, tariffs as Offer, optional FAQPage, practice geo. */
export function buildBookingPageJsonLd(input: {
	pageUrl: string;
	homeUrl: string;
	locale: Locale;
	pageName: string;
	description: string;
	breadcrumbCurrent: string;
	offers: BookingOfferInput[];
	faqs: FaqInput[];
	imageUrl?: string;
}): Record<string, unknown> {
	const t = getFixedT(input.locale);
	const orgId = `${input.homeUrl}#practice`;
	const pageId = `${input.pageUrl}#webpage`;
	const breadcrumbId = `${input.pageUrl}#breadcrumb`;
	const catalogId = `${input.pageUrl}#offers`;
	const faqId = `${input.pageUrl}#faq`;
	const placeId = `${input.pageUrl}#practice-place`;
	const { address, areaServed } = place();
	const reserveLabel =
		input.locale === 'en' ? 'Book a free introductory conversation' : 'Réserver un échange gratuit';
	const inPerson =
		input.locale === 'en' ? 'In-person consultation' : 'Consultation au cabinet';
	const video = input.locale === 'en' ? 'Video consultation' : 'Consultation en visioconférence';

	const offerNodes = input.offers.map((offer) => {
		const serviceId = `${input.pageUrl}#service-${offer.price}-${offer.durationMinutes}`;
		return {
			'@type': 'Offer',
			price: offer.price,
			priceCurrency: 'EUR',
			availability: 'https://schema.org/InStock',
			url: `${input.pageUrl}#agenda`,
			itemOffered: {
				'@type': 'Service',
				'@id': serviceId,
				name: offer.name,
				...(offer.servicePageUrl ? { url: offer.servicePageUrl } : {}),
				provider: { '@id': orgId },
				areaServed,
				offers: {
					'@type': 'Offer',
					price: offer.price,
					priceCurrency: 'EUR',
				},
				...(offer.durationMinutes
					? { duration: `PT${offer.durationMinutes}M` }
					: {}),
				availableChannel: [
					{
						'@type': 'ServiceChannel',
						serviceType: inPerson,
						serviceLocation: {
							'@type': 'Place',
							name: siteConfig.name,
							address,
							...(siteConfig.mapsUrl ? { hasMap: siteConfig.mapsUrl } : {}),
						},
					},
					{ '@type': 'ServiceChannel', serviceType: video },
				],
			},
		};
	});

	const graph: Record<string, unknown>[] = [
		{
			'@type': 'WebPage',
			'@id': pageId,
			url: input.pageUrl,
			name: input.pageName,
			description: input.description,
			inLanguage: input.locale === 'en' ? languageTag.en : languageTag.fr,
			isPartOf: { '@id': `${input.homeUrl}#website` },
			breadcrumb: { '@id': breadcrumbId },
			...(input.imageUrl
				? {
						primaryImageOfPage: {
							'@type': 'ImageObject',
							url: input.imageUrl,
						},
					}
				: {}),
			mainEntity: { '@id': catalogId },
			about: { '@id': placeId },
			potentialAction: {
				'@type': 'ReserveAction',
				name: reserveLabel,
				target: {
					'@type': 'EntryPoint',
					urlTemplate: `${input.pageUrl}#agenda`,
					inLanguage: input.locale === 'en' ? languageTag.en : languageTag.fr,
					actionPlatform: [
						'https://schema.org/DesktopWebPlatform',
						'https://schema.org/MobileWebPlatform',
					],
				},
			},
		},
		{
			'@type': 'Place',
			'@id': placeId,
			name: siteConfig.name,
			address,
			...(siteConfig.mapsUrl ? { hasMap: siteConfig.mapsUrl } : {}),
		},
		{
			'@type': 'BreadcrumbList',
			'@id': breadcrumbId,
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: String(t('Nav.home')),
					item: input.homeUrl,
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: input.breadcrumbCurrent,
					item: input.pageUrl,
				},
			],
		},
		{
			'@type': 'OfferCatalog',
			'@id': catalogId,
			name: input.pageName,
			url: input.pageUrl,
			provider: { '@id': orgId },
			itemListElement: offerNodes,
		},
	];

	if (input.faqs.length > 0) {
		graph.push({
			'@type': 'FAQPage',
			'@id': faqId,
			isPartOf: { '@id': pageId },
			mainEntity: input.faqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer,
				},
			})),
		});
	}

	return {
		'@context': 'https://schema.org',
		'@graph': graph,
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
		publisher: {
			'@type': 'Organization',
			name: siteConfig.name,
			url: input.homeUrl,
			logo: brandLogo(input.homeUrl),
		},
	};
}
