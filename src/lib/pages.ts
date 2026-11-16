import type { ImageMetadata } from 'astro';
import type { Locale } from '../i18n/i18n';
import individualHero from '../assets/images/individual/individual_meet.jpg';
import adhdOverview from '../assets/images/adhd/attention-and-organization.webp';
import parentingHero from '../assets/images/parenting/family-conversation.webp';
import coupleHero from '../assets/images/couples/couple-therapy-session.webp';
import approachHero from '../assets/images/individual/at-your-own-pace.webp';
import { buildServicePageJsonLd } from './jsonld';
import { absolutePageUrl } from './seo';
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
	individual: { service: 'Individual.h1', breadcrumb: 'Individual.h1' },
	adhd: { service: 'Adhd.overview.title', breadcrumb: 'Adhd.overview.title' },
	parenting: { service: 'Parenting.h1', breadcrumb: 'Parenting.h1' },
	couple: { service: 'Couple.h1', breadcrumb: 'Couple.h1' },
	approach: { service: 'Approach.h1', breadcrumb: 'Approach.h1' },
};

const socialImageByKind: Partial<Record<RoutedKind, ImageMetadata>> = {
	individual: individualHero,
	adhd: adhdOverview,
	parenting: parentingHero,
	couple: coupleHero,
	approach: approachHero,
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
	return undefined;
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
		});
	}

	return undefined;
}
