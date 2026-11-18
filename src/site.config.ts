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
	themeColor: '#a35753',
	/** Square brand mark — used in JSON-LD and Google Business */
	logoUrl: 'images/laure_corrao_icon-512.png',
	logoWidth: 512,
	logoHeight: 512,
	/** @example '@laurecorrao' — leave empty if unused */
	twitterHandle: '' as string,
	/**
	 * Public profiles of the practice, announced as JSON-LD `sameAs`.
	 * Canonical Google Business Profile (place `ChIJ4_ykK3ofthIR3m5vGSE3JU0`).
	 * The share link https://maps.app.goo.gl/pQQG2QyqmeJTivFA6 opens the same listing.
	 */
	sameAs: ['https://www.google.com/maps/place/?q=place_id:ChIJ4_ykK3ofthIR3m5vGSE3JU0'] as readonly string[],
	contact: {
		email: '',
		phone: '06 69 31 64 50',
		phoneE164: '+33669316450',
	},
	legal: {
		name: 'Laure Corrao',
		building: 'Les Jardins de Louis',
		street: '9 Imp. "Le Maroni"',
		postalCode: '13110',
		city: 'Port-de-Bouc',
	},
	/** Google Business Profile, also used for directions. */
	mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ4_ykK3ofthIR3m5vGSE3JU0',
	/** Embedded map (centered on the practice address) for in-page display. */
	mapsEmbedUrl:
		'https://maps.google.com/maps?q=9+Imp.+%22Le+Maroni%22,+13110+Port-de-Bouc,+France&hl=fr&z=17&ie=UTF8&iwloc=&output=embed',
	/** Practice location. Coordinates from the Base Adresse Nationale. */
	geo: {
		locality: 'Port-de-Bouc',
		region: 'Bouches-du-Rhône',
		postalCode: '13110',
		country: 'FR',
		latitude: 43.422002,
		longitude: 5.003038,
	},
	/** In person across the department, by video across the country. */
	serviceArea: {
		inPerson: 'Bouches-du-Rhône',
		video: 'France',
	},
	/** Structured copy of `Footer.hoursSchedule`. Keep both in sync. */
	openingHours: [
		{
			days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			opens: '09:00',
			closes: '18:00',
		},
	],
} as const;
