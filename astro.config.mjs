// @ts-check
import { execSync } from 'node:child_process';
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

try {
	process.loadEnvFile('.env');
} catch {
	// No local .env: CI passes the variables in the environment.
}
const env = process.env;

/** Last commit that touched the site source. Forge rebuilds do not move it. Needs full history in CI. */
function sourceUpdatedAt() {
	try {
		const iso = execSync('git log -1 --format=%cI -- src public', { encoding: 'utf8' }).trim();
		if (iso) return new Date(iso).toISOString();
	} catch {
		// Not a git checkout: fall back to the build date.
	}
	return new Date().toISOString();
}

/** Publication date of each French Forge article, by slug. Empty when articles are off or Forge is unreachable. */
async function fetchArticleDates() {
	/** @type {Map<string, string>} */
	const dates = new Map();
	if (env.FORGE_ARTICLES_ENABLED !== 'true' || !env.FORGE_API_TOKEN) return dates;
	const forgeUrl = (env.FORGE_URL || 'https://forge.1344.fr/api/v1').replace(/\/$/, '');
	try {
		const response = await fetch(`${forgeUrl}/articles?locale=fr`, {
			headers: { Authorization: `Bearer ${env.FORGE_API_TOKEN}`, Accept: 'application/json' },
		});
		if (!response.ok) return dates;
		const payload = await response.json();
		const list = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
		for (const article of list) {
			if (typeof article?.slug !== 'string' || typeof article?.published_at !== 'string') continue;
			const date = new Date(article.published_at);
			if (!Number.isNaN(date.getTime())) dates.set(article.slug, date.toISOString());
		}
	} catch {
		// The sitemap keeps the source date for blog URLs.
	}
	return dates;
}

const siteUpdatedAt = sourceUpdatedAt();
/** @type {Promise<Map<string, string>> | undefined} */
let articleDates;

// https://astro.build/config
export default defineConfig({
	site,
	base,
	output: 'static',
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => !new URL(page).pathname.replace(/\/$/, '').endsWith('/404'),
			async serialize(item) {
				const path = new URL(item.url).pathname.slice(base.replace(/\/$/, '').length);
				const blogPath = path.match(/^\/(?:en\/)?blog\/(?:([^/]+)\/)?$/);
				if (!blogPath) return { ...item, lastmod: siteUpdatedAt };
				articleDates ??= fetchArticleDates();
				const dates = await articleDates;
				const latest = [...dates.values()].sort().at(-1);
				const lastmod = blogPath[1] ? dates.get(blogPath[1]) : latest;
				return { ...item, lastmod: lastmod ?? siteUpdatedAt };
			},
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
