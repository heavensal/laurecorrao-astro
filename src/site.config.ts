/**
 * Site metadata shared by SEO, legal pages, and the blog.
 * Street address, SIRET, phone, and email are still unknown: do not invent them.
 */
export const siteConfig = {
	name: 'Laure Corrao',
	lang: 'fr',
	locale: 'fr_FR',
	/**
	 * Languages this site publishes. French only.
	 * Add `'en'` and set `ENABLE_MULTILANG=true` together on the day English is published.
	 */
	publishedLocales: ['fr'] as readonly ('fr' | 'en')[],
	contact: {
		email: '',
		phone: '',
		phoneE164: '',
	},
	legal: {
		name: 'Laure Corrao',
		city: 'Martigues',
	},
} as const;
