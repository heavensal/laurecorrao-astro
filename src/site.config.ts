/**
 * Site metadata shared by SEO, legal pages, and the blog.
 * Street address, SIRET, phone, and email are still unknown: do not invent them.
 * `geo` is the commune of Martigues, not the practice door.
 */
export const siteConfig = {
	name: 'Laure Corrao',
	lang: 'fr' as const,
	locale: 'fr_FR' as const,
	/**
	 * Languages this site publishes. French only.
	 * Add `'en'` and set `ENABLE_MULTILANG=true` together on the day English is published.
	 */
	publishedLocales: ['fr'] as readonly ('fr' | 'en')[],
	/** Browser theme color — rose used on primary actions */
	themeColor: '#a55955',
	ogImageUrl: 'images/reference-laure.jpeg',
	ogImageWidth: 750,
	ogImageHeight: 585,
	/** @example '@laurecorrao' — leave empty if unused */
	twitterHandle: '' as string,
	contact: {
		email: '',
		phone: '',
		phoneE164: '',
	},
	legal: {
		name: 'Laure Corrao',
		city: 'Martigues',
	},
	/**
	 * Public geography of the commune (Wikipedia: 43°24′19″N 5°02′51″E).
	 * Postal code 13500 belongs to the commune. It is not a street address.
	 */
	geo: {
		latitude: 43.4053,
		longitude: 5.0475,
		locality: 'Martigues',
		region: 'Bouches-du-Rhône',
		postalCode: '13500',
		country: 'FR',
		areaServed: ['Martigues'],
	},
} as const;
