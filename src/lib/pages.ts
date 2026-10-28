import type { Locale } from '../i18n/i18n';
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

const contentByKind: Partial<Record<ContentKind, ContentPageId>> = {
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
