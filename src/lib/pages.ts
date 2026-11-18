import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n/i18n';
import individualHero from '../assets/images/individual/individual_meet.jpg';
import adhdOverview from '../assets/images/adhd/attention-and-organization.webp';
import parentingHero from '../assets/images/parenting/family-conversation.webp';
import coupleHero from '../assets/images/couples/couple-therapy-session.webp';
import approachHero from '../assets/images/individual/at-your-own-pace.webp';
import feesHero from '../assets/images/individual/individual_meet.jpg';
import { fetchFaqs } from './forge-blocks';
import {
	buildBookingPageJsonLd,
	buildHomeJsonLd,
	buildServicePageJsonLd,
	type CatalogService,
	type ServiceOffer,
} from './jsonld';
import { localFaqs } from './local-blocks';
import { absolutePageUrl } from './seo';
import { getFixedT } from '../i18n/i18n';
import { siteConfig } from '../site.config';
import {
	contentPath,
	contentSlugs,
	legalPath,
	legalSlugs,
	localePathPrefix,
	type ContentPageId,
	type LegalPageId,
} from './paths';

export const routedKinds = [
	'home',
	'adhd',
	'parenting',
	'individual',
	'couple',
	'approach',
	'booking',
	'legal-notice',
	'privacy-policy',
	'terms-of-service',
] as const;

export type RoutedKind = (typeof routedKinds)[number];
export type ContentKind = Exclude<RoutedKind, 'home'>;

const serviceJsonLdKinds = ['individual', 'adhd', 'parenting', 'couple', 'approach'] as const;
type ServiceJsonLdKind = (typeof serviceJsonLdKinds)[number];

const serviceJsonLdKeys: Record<ServiceJsonLdKind, { service: string; breadcrumb: string }> = {
	individual: { service: 'Seo.services.individual', breadcrumb: 'Individual.h1' },
	adhd: { service: 'Seo.services.adhd', breadcrumb: 'Adhd.overview.title' },
	parenting: { service: 'Seo.services.parenting', breadcrumb: 'Parenting.h1' },
	couple: { service: 'Seo.services.couple', breadcrumb: 'Couple.h1' },
	approach: { service: 'Approach.h1', breadcrumb: 'Approach.h1' },
};

/** The four support offers, in the order they are presented. */
export const catalogKinds = ['individual', 'couple', 'adhd', 'parenting'] as const;
type CatalogKind = (typeof catalogKinds)[number];

const socialImageByKind: Partial<Record<RoutedKind, ImageMetadata>> = {
	individual: individualHero,
	adhd: adhdOverview,
	parenting: parentingHero,
	couple: coupleHero,
	approach: approachHero,
	booking: feesHero,
};

export function socialImageForKind(kind: RoutedKind): ImageMetadata | undefined {
	return socialImageByKind[kind];
}

export function socialImageAltForKind(t: (key: string) => unknown, kind: RoutedKind): string | undefined {
	if (kind === 'individual') return String(t('Individual.heroAlt'));
	if (kind === 'adhd') return String(t('Adhd.overview.alt'));
	if (kind === 'parenting') return String(t('Parenting.alt'));
	if (kind === 'couple') return String(t('Couple.imageAlt'));
	if (kind === 'approach') return String(t('Approach.heroAlt'));
	if (kind === 'booking') return String(t('Booking.heroAlt'));
	return undefined;
}

type BookingSection = {
	title: string;
	lines?: string[];
	paragraphs?: string[];
	priceAmount?: number;
	durationMinutes?: number;
	relatedPage?: ContentPageId;
};

type Translate = (key: string, options?: { returnObjects?: boolean }) => unknown;

function bookingSections(t: Translate): BookingSection[] {
	const sectionsValue = t('Booking.sections', { returnObjects: true });
	return Array.isArray(sectionsValue) ? sectionsValue : [];
}

type PricedSection = BookingSection & { priceAmount: number; durationMinutes: number };

/** Fee sections with a price and a duration, in display order. */
export function pricedSessions(t: Translate): PricedSection[] {
	return bookingSections(t).filter(
		(section): section is PricedSection =>
			typeof section.priceAmount === 'number' && typeof section.durationMinutes === 'number',
	);
}

function offerFor(t: Translate, kind: ContentPageId): ServiceOffer | undefined {
	const section = pricedSessions(t).find((item) => item.relatedPage === kind);
	return section ? { name: section.title, price: section.priceAmount } : undefined;
}

/** Each support offer with its page, its meta description and, when listed on the fees page, its price. */
export function serviceCatalog(t: Translate, site: URL | undefined, locale: Locale): CatalogService[] {
	return catalogKinds.flatMap((kind: CatalogKind) => {
		const url = absolutePageUrl(site, `${contentPath(locale, kind)}/`);
		if (!url) return [];
		const offer = offerFor(t, kind);
		return [
			{
				name: String(t(`Seo.services.${kind}`)),
				description: pageMeta(t, kind).description,
				url,
				...(offer ? { offer } : {}),
			},
		];
	});
}

/** Lowest to highest session fee, e.g. `60 € – 90 €`. */
export function priceRange(t: Translate, locale: Locale): string | undefined {
	const prices = pricedSessions(t).map((section) => section.priceAmount);
	if (prices.length === 0) return undefined;
	const format = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0,
	});
	const low = format.format(Math.min(...prices));
	const high = format.format(Math.max(...prices));
	return low === high ? low : `${low} – ${high}`;
}

/** Home JSON-LD. The FAQ follows the same Forge-or-local rule as the visible section. */
export async function homeJsonLd(site: URL | undefined, locale: Locale) {
	const homeUrl = absolutePageUrl(site, '');
	if (!homeUrl) return undefined;
	const t = getFixedT(locale);
	const faqs = (await fetchFaqs(locale)) ?? localFaqs(locale);
	return buildHomeJsonLd({
		homeUrl,
		locale,
		services: serviceCatalog(t, site, locale),
		faqs: faqs.map(({ question, answer }) => ({ question, answer })),
		priceRange: priceRange(t, locale),
	});
}

function bookingJsonLdData(t: Translate, site: URL | undefined, locale: Locale) {
	const sections = bookingSections(t);
	const offers = pricedSessions(t).map((section) => {
		const related = section.relatedPage;
		const servicePageUrl = related
			? absolutePageUrl(site, `${contentPath(locale, related)}/`)
			: undefined;
		return { name: section.title, price: section.priceAmount, servicePageUrl };
	});
	let policyIndex = 0;
	const faqs = sections
		.filter((section) => section.paragraphs?.length && !section.lines)
		.map((section) => {
			const base = (section.paragraphs ?? []).join(' ');
			const answer =
				policyIndex === 0
					? `${String(t('Booking.cancelLead'))} ${siteConfig.contact.phone}. ${base}`
					: base;
			policyIndex += 1;
			return { question: section.title, answer };
		});
	return { offers, faqs };
}

function isServiceJsonLdKind(kind: RoutedKind): kind is ServiceJsonLdKind {
	return (serviceJsonLdKinds as readonly string[]).includes(kind);
}

const contentByKind: Partial<Record<ContentKind, ContentPageId>> = {
	adhd: 'adhd',
	parenting: 'parenting',
	individual: 'individual',
	couple: 'couple',
	approach: 'approach',
	booking: 'booking',
};

const legalByKind: Partial<Record<ContentKind, LegalPageId>> = {
	'legal-notice': 'legalNotice',
	'privacy-policy': 'privacyPolicy',
	'terms-of-service': 'termsOfService',
};

const metaNamespace: Record<RoutedKind, string> = {
	home: 'Home',
	adhd: 'Adhd',
	parenting: 'Parenting',
	individual: 'Individual',
	couple: 'Couple',
	approach: 'Approach',
	booking: 'Booking',
	'legal-notice': 'LegalNotice',
	'privacy-policy': 'Privacy',
	'terms-of-service': 'Terms',
};

export function slugFor(locale: Locale, kind: ContentKind): string {
	const contentId = contentByKind[kind];
	if (contentId) return contentSlugs[locale][contentId];
	const legalId = legalByKind[kind];
	if (!legalId) throw new Error(`Unknown page kind: ${kind}`);
	return legalSlugs[locale][legalId];
}

/** Public path without a trailing slash. Home is `''` in French and `en` in English. */
export function pathFor(locale: Locale, kind: RoutedKind): string {
	if (kind === 'home') return localePathPrefix(locale) === 'en/' ? 'en' : '';
	const contentId = contentByKind[kind];
	if (contentId) return contentPath(locale, contentId);
	const legalId = legalByKind[kind];
	if (!legalId) throw new Error(`Unknown page kind: ${kind}`);
	return legalPath(locale, legalId);
}

export function frenchStaticPaths() {
	const kinds = [...Object.keys(contentByKind), ...Object.keys(legalByKind)] as ContentKind[];
	return kinds.map((kind) => ({ params: { slug: slugFor('fr', kind) }, props: { kind } }));
}

export function englishStaticPaths() {
	const pages = frenchStaticPaths().map(({ props }) => ({
		params: { slug: slugFor('en', props.kind) },
		props,
	}));
	return [{ params: { slug: undefined }, props: { kind: 'home' as const } }, ...pages];
}

export function pageMeta(t: (key: string) => unknown, kind: RoutedKind) {
	const namespace = metaNamespace[kind];
	return {
		title: String(t(`${namespace}.metaTitle`)),
		description: String(t(`${namespace}.metaDescription`)),
	};
}

export function alternateUrls(site: URL | undefined, kind: RoutedKind) {
	const frPath = pathFor('fr', kind);
	const enPath = pathFor('en', kind);
	return {
		fr: absolutePageUrl(site, frPath ? `${frPath}/` : ''),
		en: absolutePageUrl(site, `${enPath}/`),
	};
}

export function pageJsonLd(input: {
	site: URL | undefined;
	locale: Locale;
	kind: RoutedKind;
	t: (key: string) => unknown;
	imageUrl?: string;
}): Record<string, unknown> | undefined {
	const homeUrl = absolutePageUrl(input.site, '');
	const pagePath = pathFor(input.locale, input.kind);
	const pageUrl = absolutePageUrl(input.site, pagePath ? `${pagePath}/` : '');
	if (!homeUrl || !pageUrl) return undefined;

	if (isServiceJsonLdKind(input.kind)) {
		const keys = serviceJsonLdKeys[input.kind];
		const meta = pageMeta(input.t, input.kind);
		return buildServicePageJsonLd({
			pageUrl,
			homeUrl,
			locale: input.locale,
			serviceName: String(input.t(keys.service)),
			description: meta.description,
			breadcrumbCurrent: String(input.t(keys.breadcrumb)),
			imageUrl: input.imageUrl,
			offer: input.kind === 'approach' ? undefined : offerFor(input.t, input.kind),
		});
	}

	if (input.kind === 'booking') {
		const meta = pageMeta(input.t, input.kind);
		const { offers, faqs } = bookingJsonLdData(input.t, input.site, input.locale);
		return buildBookingPageJsonLd({
			pageUrl,
			homeUrl,
			locale: input.locale,
			pageName: meta.title,
			description: meta.description,
			breadcrumbCurrent: String(input.t('Booking.h1')),
			offers,
			faqs,
			imageUrl: input.imageUrl,
		});
	}

	return undefined;
}
