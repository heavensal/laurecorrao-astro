import defaultSocialImage from '../assets/images/home/reference-laure.jpeg';
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

export type ServiceOffer = { name: string; price: number };

export type CatalogService = {
	name: string;
	description: string;
	url: string;
	offer?: ServiceOffer;
};

export type FaqEntry = { question: string; answer: string };

type Translate = ReturnType<typeof getFixedT>;

const practiceId = (homeUrl: string) => `${homeUrl}#practice`;
const personId = (homeUrl: string) => `${homeUrl}#laure-corrao`;

function address() {
	const { geo } = siteConfig;
	return {
		'@type': 'PostalAddress',
		streetAddress: siteConfig.legal.street,
		addressLocality: geo.locality,
		addressRegion: geo.region,
		postalCode: geo.postalCode,
		addressCountry: geo.country,
	};
}

function coordinates() {
	return {
		'@type': 'GeoCoordinates',
		latitude: siteConfig.geo.latitude,
		longitude: siteConfig.geo.longitude,
	};
}

/** In person across the department, by video across the country. */
function areaServed() {
	return [
		{ '@type': 'AdministrativeArea', name: siteConfig.serviceArea.inPerson },
		{ '@type': 'Country', name: siteConfig.serviceArea.video },
	];
}

function openingHours() {
	return siteConfig.openingHours.map(({ days, opens, closes }) => ({
		'@type': 'OpeningHoursSpecification',
		dayOfWeek: days.map((day) => `https://schema.org/${day}`),
		opens,
		closes,
	}));
}

function mapLink(): Record<string, string> {
	return siteConfig.mapsUrl ? { hasMap: siteConfig.mapsUrl } : {};
}

function practicePlace() {
	return {
		'@type': 'Place',
		name: siteConfig.name,
		address: address(),
		geo: coordinates(),
		...mapLink(),
	};
}

function channels(t: Translate) {
	return [
		{
			'@type': 'ServiceChannel',
			serviceType: String(t('Seo.inPersonChannel')),
			serviceLocation: practicePlace(),
		},
		{ '@type': 'ServiceChannel', serviceType: String(t('Seo.videoChannel')) },
	];
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

function portraitUrl(homeUrl: string): string {
	return new URL(defaultSocialImage.src, homeUrl).href;
}

function sameAs(): Record<string, readonly string[]> {
	return siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {};
}

/** Self-contained provider reference so each page resolves the practice on its own. */
function providerRef(homeUrl: string) {
	return {
		'@type': 'ProfessionalService',
		'@id': practiceId(homeUrl),
		name: siteConfig.name,
		url: homeUrl,
		address: address(),
		...contactFields(),
	};
}

function practiceNode(homeUrl: string, description: string) {
	return {
		'@type': ['ProfessionalService', 'LocalBusiness'],
		'@id': practiceId(homeUrl),
		name: siteConfig.name,
		url: homeUrl,
		logo: brandLogo(homeUrl),
		image: portraitUrl(homeUrl),
		description,
		address: address(),
		geo: coordinates(),
		...mapLink(),
		areaServed: areaServed(),
		openingHoursSpecification: openingHours(),
		...contactFields(),
		founder: { '@id': personId(homeUrl) },
		knowsLanguage: publishedInLanguage(),
		...sameAs(),
	};
}

function personNode(homeUrl: string, t: Translate) {
	const knowsAbout = t('Seo.knowsAbout', { returnObjects: true });
	return {
		'@type': 'Person',
		'@id': personId(homeUrl),
		name: siteConfig.name,
		jobTitle: String(t('Layout.brandSubtitle')).split(' · '),
		url: homeUrl,
		image: portraitUrl(homeUrl),
		worksFor: { '@id': practiceId(homeUrl) },
		workLocation: practicePlace(),
		...(Array.isArray(knowsAbout) ? { knowsAbout: knowsAbout.map(String) } : {}),
		...sameAs(),
	};
}

function offerFields(offer: ServiceOffer | undefined, url?: string) {
	if (!offer) return {};
	return {
		offers: {
			'@type': 'Offer',
			name: offer.name,
			price: offer.price,
			priceCurrency: 'EUR',
			...(url ? { url } : {}),
		},
	};
}

function faqNode(id: string, faqs: FaqEntry[], extra: Record<string, unknown> = {}) {
	return {
		'@type': 'FAQPage',
		'@id': id,
		...extra,
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer },
		})),
	};
}

function breadcrumbNode(id: string, homeUrl: string, t: Translate, current: string, pageUrl: string) {
	return {
		'@type': 'BreadcrumbList',
		'@id': id,
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: String(t('Nav.home')), item: homeUrl },
			{ '@type': 'ListItem', position: 2, name: current, item: pageUrl },
		],
	};
}

/** Homepage: the practice, its founder, the services and the FAQ shown on the page. */
export function buildHomeJsonLd(input: {
	homeUrl: string;
	locale: Locale;
	services: CatalogService[];
	faqs: FaqEntry[];
	priceRange?: string;
}): Record<string, unknown> {
	const { homeUrl } = input;
	const t = getFixedT(input.locale);
	const graph: Record<string, unknown>[] = [
		{
			...practiceNode(homeUrl, String(t('Home.metaDescription'))),
			...(input.priceRange ? { priceRange: input.priceRange } : {}),
			hasOfferCatalog: {
				'@type': 'OfferCatalog',
				name: String(t('HomePage.servicesAria')),
				itemListElement: input.services.map((service) => ({
					'@type': 'Offer',
					...(service.offer ? { price: service.offer.price, priceCurrency: 'EUR' } : {}),
					itemOffered: {
						'@type': 'Service',
						'@id': `${service.url}#service`,
						name: service.name,
						description: service.description,
						url: service.url,
						provider: { '@id': practiceId(homeUrl) },
						areaServed: areaServed(),
					},
				})),
			},
		},
		personNode(homeUrl, t),
		{
			'@type': 'WebSite',
			'@id': `${homeUrl}#website`,
			url: homeUrl,
			name: siteConfig.name,
			inLanguage: publishedInLanguage(),
			publisher: { '@id': practiceId(homeUrl) },
		},
	];
	if (input.faqs.length > 0) graph.push(faqNode(`${homeUrl}#faq`, input.faqs, { url: homeUrl }));

	return { '@context': 'https://schema.org', '@graph': graph };
}

/** Legal notice repeats the practice with its legal name. */
export function buildLegalNoticeJsonLd(homeUrl: string, locale: Locale): Record<string, unknown> {
	const t = getFixedT(locale);
	return {
		'@context': 'https://schema.org',
		...practiceNode(homeUrl, String(t('LegalNotice.metaDescription'))),
		legalName: siteConfig.legal.name,
	};
}

/** Service landing page: WebPage, Service, BreadcrumbList. */
export function buildServicePageJsonLd(input: {
	pageUrl: string;
	homeUrl: string;
	locale: Locale;
	serviceName: string;
	description: string;
	breadcrumbCurrent: string;
	imageUrl?: string;
	offer?: ServiceOffer;
}): Record<string, unknown> {
	const t = getFixedT(input.locale);
	const pageId = `${input.pageUrl}#webpage`;
	const serviceId = `${input.pageUrl}#service`;
	const breadcrumbId = `${input.pageUrl}#breadcrumb`;

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': pageId,
				url: input.pageUrl,
				name: input.serviceName,
				description: input.description,
				inLanguage: languageTag[input.locale],
				isPartOf: { '@id': `${input.homeUrl}#website` },
				about: { '@id': serviceId },
				breadcrumb: { '@id': breadcrumbId },
				...(input.imageUrl
					? { primaryImageOfPage: { '@type': 'ImageObject', url: input.imageUrl } }
					: {}),
			},
			breadcrumbNode(breadcrumbId, input.homeUrl, t, input.breadcrumbCurrent, input.pageUrl),
			{
				'@type': 'Service',
				'@id': serviceId,
				name: input.serviceName,
				description: input.description,
				url: input.pageUrl,
				provider: providerRef(input.homeUrl),
				areaServed: areaServed(),
				availableChannel: channels(t),
				...(input.imageUrl ? { image: input.imageUrl } : {}),
				...offerFields(input.offer),
			},
		],
	};
}

type BookingOfferInput = {
	name: string;
	price: number;
	servicePageUrl?: string;
};

/** Fees and booking page: WebPage, tariffs as Offer, optional FAQPage, practice place. */
export function buildBookingPageJsonLd(input: {
	pageUrl: string;
	homeUrl: string;
	locale: Locale;
	pageName: string;
	description: string;
	breadcrumbCurrent: string;
	offers: BookingOfferInput[];
	faqs: FaqEntry[];
	imageUrl?: string;
}): Record<string, unknown> {
	const t = getFixedT(input.locale);
	const pageId = `${input.pageUrl}#webpage`;
	const breadcrumbId = `${input.pageUrl}#breadcrumb`;
	const catalogId = `${input.pageUrl}#offers`;
	const placeId = `${input.pageUrl}#practice-place`;
	const agendaUrl = `${input.pageUrl}#agenda`;

	const offerNodes = input.offers.map((offer) => ({
		'@type': 'Offer',
		name: offer.name,
		price: offer.price,
		priceCurrency: 'EUR',
		availability: 'https://schema.org/InStock',
		url: agendaUrl,
		itemOffered: {
			'@type': 'Service',
			name: offer.name,
			...(offer.servicePageUrl ? { url: offer.servicePageUrl } : {}),
			provider: { '@id': practiceId(input.homeUrl) },
			areaServed: areaServed(),
			availableChannel: channels(t),
		},
	}));

	const graph: Record<string, unknown>[] = [
		{
			'@type': 'WebPage',
			'@id': pageId,
			url: input.pageUrl,
			name: input.pageName,
			description: input.description,
			inLanguage: languageTag[input.locale],
			isPartOf: { '@id': `${input.homeUrl}#website` },
			breadcrumb: { '@id': breadcrumbId },
			...(input.imageUrl
				? { primaryImageOfPage: { '@type': 'ImageObject', url: input.imageUrl } }
				: {}),
			mainEntity: { '@id': catalogId },
			about: { '@id': placeId },
			potentialAction: {
				'@type': 'ReserveAction',
				name: String(t('Seo.reserveAction')),
				target: {
					'@type': 'EntryPoint',
					urlTemplate: agendaUrl,
					inLanguage: languageTag[input.locale],
					actionPlatform: [
						'https://schema.org/DesktopWebPlatform',
						'https://schema.org/MobileWebPlatform',
					],
				},
			},
		},
		{ ...practicePlace(), '@id': placeId },
		breadcrumbNode(breadcrumbId, input.homeUrl, t, input.breadcrumbCurrent, input.pageUrl),
		{
			'@type': 'OfferCatalog',
			'@id': catalogId,
			name: input.pageName,
			url: input.pageUrl,
			provider: providerRef(input.homeUrl),
			itemListElement: offerNodes,
		},
	];

	if (input.faqs.length > 0) {
		graph.push(faqNode(`${input.pageUrl}#faq`, input.faqs, { isPartOf: { '@id': pageId } }));
	}

	return { '@context': 'https://schema.org', '@graph': graph };
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
		inLanguage: languageTag[input.locale],
		mainEntityOfPage: input.pageUrl,
		...(input.publishedAt ? { datePublished: input.publishedAt } : {}),
		...(input.image ? { image: input.image } : {}),
		author: {
			'@type': 'Person',
			'@id': personId(input.homeUrl),
			name: siteConfig.name,
			url: input.homeUrl,
		},
		publisher: {
			'@type': 'Organization',
			'@id': practiceId(input.homeUrl),
			name: siteConfig.name,
			url: input.homeUrl,
			logo: brandLogo(input.homeUrl),
		},
	};
}
