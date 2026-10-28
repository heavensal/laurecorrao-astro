import { getFixedT, type Locale } from '../i18n/i18n';

export interface LocalReview {
	author: string;
	rating: number;
	text: string;
}

export interface LocalFaq {
	question: string;
	answer: string;
}

/** Shown when FORGE_REVIEWS_ENABLED is not true, or the API cannot be used. */
export function localReviews(locale: Locale): LocalReview[] {
	const value = getFixedT(locale)('Local.reviews', { returnObjects: true });
	return Array.isArray(value) ? (value as LocalReview[]) : [];
}

/** Shown when FORGE_FAQ_ENABLED is not true, or the API cannot be used. */
export function localFaqs(locale: Locale): LocalFaq[] {
	const value = getFixedT(locale)('Local.faqs', { returnObjects: true });
	return Array.isArray(value) ? (value as LocalFaq[]) : [];
}
