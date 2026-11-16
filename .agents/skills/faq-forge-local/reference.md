# FAQ block — reference templates

Adapt paths and theme class names to the target site. Reference implementation: `src/components/HomeResources.astro`, `src/lib/forge-blocks.ts`, `src/lib/local-blocks.ts`.

## Environment

`.env.example`:

```bash
# "true" fetches published FAQs at build time. Empty Forge list → Local.faqs.
FORGE_FAQ_ENABLED=false
FORGE_URL=https://forge.1344.fr/api/v1
FORGE_API_TOKEN=
```

`src/env.d.ts`:

```ts
interface ImportMetaEnv {
	readonly FORGE_FAQ_ENABLED?: string;
	readonly FORGE_URL?: string;
	readonly FORGE_API_TOKEN?: string;
}
```

## `src/lib/forge.ts` (excerpt)

```ts
export function isFaqEnabled(): boolean {
	return import.meta.env.FORGE_FAQ_ENABLED === 'true';
}

export async function fetchForge(path: string, locale?: string): Promise<unknown | null> {
	const apiToken = import.meta.env.FORGE_API_TOKEN;
	if (typeof apiToken !== 'string' || apiToken.length === 0) return null;
	// … fetch with Authorization Bearer, Accept application/json
}

export function asList(payload: unknown): unknown[] {
	if (Array.isArray(payload)) return payload;
	if (
		payload &&
		typeof payload === 'object' &&
		'data' in payload &&
		Array.isArray((payload as { data: unknown }).data)
	) {
		return (payload as { data: unknown[] }).data;
	}
	return [];
}
```

## `src/lib/forge-blocks.ts`

```ts
import type { Locale } from '../i18n/i18n';
import { asList, fetchForge, isFaqEnabled } from './forge';

export interface CmsFaq {
	question: string;
	answer: string;
	position: number;
}

export async function fetchFaqs(locale: Locale): Promise<CmsFaq[] | null> {
	if (!isFaqEnabled()) return null;
	const payload = await fetchForge('faqs', locale);
	if (payload == null) return null;
	const items = asList(payload)
		.flatMap((item): CmsFaq[] => {
			if (!item || typeof item !== 'object') return [];
			const faq = item as { question?: unknown; answer?: unknown; position?: unknown };
			if (typeof faq.question !== 'string' || faq.question.length === 0) return [];
			if (typeof faq.answer !== 'string' || faq.answer.length === 0) return [];
			return [
				{
					question: faq.question,
					answer: faq.answer,
					position: typeof faq.position === 'number' ? faq.position : 0,
				},
			];
		})
		.sort((a, b) => a.position - b.position);
	return items.length ? items : null;
}
```

## `src/lib/local-blocks.ts`

```ts
import { getFixedT, type Locale } from '../i18n/i18n';

export interface LocalFaq {
	question: string;
	answer: string;
}

export function localFaqs(locale: Locale): LocalFaq[] {
	const value = getFixedT(locale)('Local.faqs', { returnObjects: true });
	return Array.isArray(value) ? (value as LocalFaq[]) : [];
}
```

## Astro section (pattern)

```astro
---
import { getFixedT, type Locale } from '../i18n/i18n';
import { fetchFaqs } from '../lib/forge-blocks';
import { localFaqs } from '../lib/local-blocks';

interface Props {
	locale: Locale;
}

const { locale } = Astro.props;
const t = getFixedT(locale);
const faqs = (await fetchFaqs(locale)) ?? localFaqs(locale);
const eyebrow = 'mb-4 text-xs tracking-widest text-rose-laure uppercase';
const heading = 'font-serif text-3xl leading-tight text-ink md:text-4xl';
---

<section class="bg-paper px-6 py-16 md:px-10 lg:px-16" aria-labelledby="faq-title">
	<div class="mx-auto max-w-4xl">
		<p class={`${eyebrow} text-center`}>{t('Resources.faqEyebrow')}</p>
		<h2 id="faq-title" class={`${heading} text-center`}>{t('Resources.faqTitle')}</h2>
		<div class="mt-6">
			{
				faqs.map((faq) => (
					<details class="group border-t border-line last:border-b">
						<summary class="flex cursor-pointer items-center justify-between gap-5 py-5 font-serif text-lg">
							{faq.question}
							<span
								class="text-2xl text-rose-laure transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
								aria-hidden="true"
							>
								+
							</span>
						</summary>
						<p class="max-w-3xl pb-4 text-muted">{faq.answer}</p>
					</details>
				))
			}
		</div>
	</div>
</section>
```

## Forge API item fields

| Field | Use |
| --- | --- |
| `question` | Accordion title; required non-empty string |
| `answer` | Body paragraph; required non-empty string |
| `position` | Sort key ascending; default `0` if missing |

Unpublished or draft Forge entries are absent from `data` (see **forge-ressources**).