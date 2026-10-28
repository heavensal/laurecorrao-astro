import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://laurecorrao.fr',
	output: 'static',
	trailingSlash: 'always',
	redirects: {
		'/legal-notice': { status: 301, destination: '/mentions-legales' },
		'/privacy-policy': { status: 301, destination: '/politique-de-confidentialite' },
		'/terms-of-service': { status: 301, destination: '/conditions-generales' },
		'/confidentialite': { status: 301, destination: '/politique-de-confidentialite' },
		'/conditions': { status: 301, destination: '/conditions-generales' },
		'/articles': { status: 301, destination: '/blog' },
	},
});
