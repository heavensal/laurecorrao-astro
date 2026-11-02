// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

/**
 * Astro configuration for the Laure Corrao brochure site.
 *
 * SEO: Update `site` and `base` when deploying to production.
 *
 * Deployment scenarios:
 * - Custom domain: site = 'https://laurecorrao.fr', base = '/'
 * - GitHub Pages without a custom domain: site = 'https://heavensal.github.io', base = '/laurecorrao-astro'
 */

// SEO: Production site URL (canonical URLs, sitemap, Open Graph)
const site = 'https://laurecorrao.fr';

// SEO: Base path ('/' for the custom domain, '/repo-name' for GitHub Pages)
const base = '/';

// https://astro.build/config
export default defineConfig({
	site,
	base,
	output: 'static',
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => !new URL(page).pathname.replace(/\/$/, '').endsWith('/404'),
		}),
	],
	redirects: {
		'/legal-notice': { status: 301, destination: '/mentions-legales' },
		'/privacy-policy': { status: 301, destination: '/politique-de-confidentialite' },
		'/terms-of-service': { status: 301, destination: '/conditions-generales' },
		'/confidentialite': { status: 301, destination: '/politique-de-confidentialite' },
		'/conditions': { status: 301, destination: '/conditions-generales' },
		'/articles': { status: 301, destination: '/blog' },
	},
	vite: {
		plugins: [tailwind()],
	},
});
