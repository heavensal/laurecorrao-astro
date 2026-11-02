/**
 * Site metadata shared by SEO, legal pages, and the blog.
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
		phone: '06 69 31 64 50',
		phoneE164: '+33669316450',
	},
	legal: {
		name: 'Laure Corrao',
		building: 'Les Jardins de Louis',
		street: '9 impasse Le Maroni — Saint-Jean',
		postalCode: '13110',
		city: 'Port-de-Bouc',
	},
	/** Practice service area. */
	geo: {
		locality: 'Port-de-Bouc',
		region: 'Bouches-du-Rhône',
		postalCode: '13110',
		country: 'FR',
		areaServed: ['Port-de-Bouc'],
	},
} as const;
