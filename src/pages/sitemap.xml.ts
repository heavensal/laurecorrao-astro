import { isMultilangEnabled } from '../i18n/i18n';
import { fetchPublishedSummaries } from '../lib/forge-blog';
import { contentSlugs, legalSlugs, type ContentPageId } from '../lib/paths';

const contentIds: ContentPageId[] = ['individual', 'couple', 'approach', 'booking'];

export async function GET() {
	const articles = await fetchPublishedSummaries('fr');
	const englishArticles = isMultilangEnabled() ? await fetchPublishedSummaries('en') : [];
	const routes = [
		'',
		...contentIds.map((id) => `${contentSlugs.fr[id]}/`),
		`${legalSlugs.fr.legalNotice}/`,
		`${legalSlugs.fr.privacyPolicy}/`,
		`${legalSlugs.fr.termsOfService}/`,
		...(articles.length ? ['blog/', ...articles.map((article) => `blog/${article.slug}/`)] : []),
		...(isMultilangEnabled()
			? [
					'en/',
					...contentIds.map((id) => `en/${contentSlugs.en[id]}/`),
					`en/${legalSlugs.en.legalNotice}/`,
					`en/${legalSlugs.en.privacyPolicy}/`,
					`en/${legalSlugs.en.termsOfService}/`,
					...(englishArticles.length
						? ['en/blog/', ...englishArticles.map((article) => `en/blog/${article.slug}/`)]
						: []),
				]
			: []),
	];
	const body =
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		routes.map((route) => `<url><loc>https://laurecorrao.fr/${route}</loc></url>`).join('') +
		'</urlset>';
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
