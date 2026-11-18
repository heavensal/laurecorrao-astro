import type { APIRoute } from 'astro';
import { getFixedT, type Locale } from '../i18n/i18n';
import { fetchFaqs } from '../lib/forge-blocks';
import { fetchPublishedSummaries } from '../lib/forge-blog';
import { localFaqs } from '../lib/local-blocks';
import { pageMeta, pricedSessions, serviceCatalog } from '../lib/pages';
import { bookingHref, contentPath, legalPath, localePathPrefix } from '../lib/paths';
import { absolutePageUrl } from '../lib/seo';
import { siteConfig } from '../site.config';

export const prerender = true;

type HoursRow = { day: string; hours: string };

const locale: Locale = 'fr';

export const GET: APIRoute = async ({ site }) => {
	const t = getFixedT(locale);
	const url = (path: string) => absolutePageUrl(site, path) ?? path;
	const label = (key: string) => String(t(`Seo.llms.${key}`));

	const hoursValue = t('Footer.hoursSchedule', { returnObjects: true });
	const hours = (Array.isArray(hoursValue) ? (hoursValue as HoursRow[]) : [])
		.map((row) => `${row.day} ${row.hours}`)
		.join(', ');
	const faqs = (await fetchFaqs(locale)) ?? localFaqs(locale);
	const posts = await fetchPublishedSummaries(locale);
	const approach = pageMeta(t, 'approach');
	const booking = pageMeta(t, 'booking');
	const legalPages = [
		['legalNotice', 'Footer.linkLegal'],
		['privacyPolicy', 'Footer.linkPrivacy'],
		['termsOfService', 'Footer.linkTerms'],
	] as const;

	const lines = [
		`# ${siteConfig.name}`,
		'',
		`> ${t('Home.metaDescription')}`,
		'',
		label('summary'),
		'',
		`## ${label('practiceHeading')}`,
		'',
		`- ${label('address')} : ${t('HomePage.practiceAddress')} (${siteConfig.mapsUrl})`,
		`- ${label('phone')} : ${siteConfig.contact.phone}`,
		`- ${label('hours')} : ${hours}`,
		`- ${label('area')} : ${label('areaBody')}`,
		`- ${label('booking')} : ${label('bookingBody')} (${url(bookingHref(locale))})`,
		'',
		`## ${label('servicesHeading')}`,
		'',
		...serviceCatalog(t, site, locale).map((service) => `- [${service.name}](${service.url}) : ${service.description}`),
		`- [${t('Nav.approach')}](${url(`${contentPath(locale, 'approach')}/`)}) : ${approach.description}`,
		'',
		`## ${label('feesHeading')}`,
		'',
		...pricedSessions(t).map((section) => `- ${section.title} — ${(section.lines ?? []).join(', ')}`),
		`- [${booking.title}](${url(`${contentPath(locale, 'booking')}/`)}) : ${booking.description}`,
		'',
		`## ${label('faqHeading')}`,
		'',
		...faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
		...(posts.length
			? [
					`## ${label('articlesHeading')}`,
					'',
					...posts.map(
						(post) =>
							`- [${post.title}](${url(`${localePathPrefix(locale)}blog/${post.slug}/`)})${post.description ? ` : ${post.description}` : ''}`,
					),
					'',
				]
			: []),
		`## ${label('legalHeading')}`,
		'',
		...legalPages.map(([page, key]) => `- [${t(key)}](${url(`${legalPath(locale, page)}/`)})`),
	];

	return new Response(`${lines.join('\n').trim()}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
