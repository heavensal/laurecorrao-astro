export type Article = { slug: string; title: string; excerpt: string; content?: string; publishedAt?: string };
export type Review = { author: string; rating: number; text: string; source?: string };
export type Faq = { question: string; answer: string };

const base = import.meta.env.CONTENTFORGE_API_URL || 'https://contentforge.1344.fr/api/v1';
const token = import.meta.env.CONTENTFORGE_API_TOKEN || '';
const resourceUrls: Record<string, string | undefined> = {
  articles: import.meta.env.CONTENTFORGE_ARTICLES_URL,
  reviews: import.meta.env.CONTENTFORGE_REVIEWS_URL,
  faqs: import.meta.env.CONTENTFORGE_FAQS_URL
};

async function load<T>(kind: string, fallback: T): Promise<T> {
  const explicit = resourceUrls[kind];
  const url = explicit || `${base}/${kind}`;
  if (!token) return fallback;
  try {
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } });
    if (!response.ok) return fallback;
    const payload = await response.json();
    return (Array.isArray(payload) ? payload : payload[kind] || payload.data || fallback) as T;
  } catch { return fallback; }
}

export const fallbackReviews: Review[] = [
  { author: 'Patiente accompagnée', rating: 5, text: 'Une écoute profonde, beaucoup de bienveillance et des outils concrets pour avancer à mon rythme.' },
  { author: 'Couple accompagné', rating: 5, text: 'Nous avons retrouvé un dialogue plus calme et une meilleure compréhension de nos besoins respectifs.' },
  { author: 'Patiente accompagnée', rating: 5, text: 'Un espace sans jugement dans lequel je me suis sentie en confiance dès la première séance.' }
];

export const fallbackFaqs: Faq[] = [
  { question: 'Comment se déroule la première séance ?', answer: 'Ce premier échange permet de comprendre votre situation, vos attentes et ce que vous souhaitez voir évoluer. Nous définissons ensuite ensemble un accompagnement adapté.' },
  { question: 'Puis-je consulter en visioconférence ?', answer: 'Oui. Les accompagnements individuels peuvent avoir lieu au cabinet à Martigues ou à distance, dans un cadre calme et confidentiel.' },
  { question: 'Combien de temps dure une séance ?', answer: 'Une séance individuelle ou de couple dure environ une heure.' },
  { question: 'Les consultations sont-elles remboursées ?', answer: 'Elles ne sont pas prises en charge par l’Assurance maladie. Certaines mutuelles proposent toutefois un forfait annuel ; une facture peut être remise sur demande.' },
  { question: 'Comment déplacer ou annuler un rendez-vous ?', answer: 'Merci de prévenir au moins 24 heures à l’avance. Les modalités figurent dans votre confirmation de rendez-vous.' }
];

export const fallbackArticles: Article[] = [
  { slug: 'quand-consulter-un-therapeute', title: 'Quand consulter un thérapeute ?', excerpt: 'Quelques repères pour reconnaître le moment où demander de l’aide peut devenir un véritable soutien.', publishedAt: '2026-10-01', content: '<p>Il n’est pas nécessaire d’attendre que la souffrance devienne insupportable. Un accompagnement peut être utile lorsque les mêmes difficultés se répètent, que les émotions prennent trop de place ou que vous ne parvenez plus à retrouver seul votre équilibre.</p><p>La première séance sert justement à poser ce que vous traversez et à déterminer, ensemble, la forme d’accompagnement qui vous conviendra.</p>' },
  { slug: 'restaurer-le-dialogue-dans-le-couple', title: 'Restaurer le dialogue dans le couple', excerpt: 'Comprendre les mécanismes qui bloquent les échanges pour retrouver une communication plus apaisée.', publishedAt: '2026-09-15', content: '<p>Lorsque chaque échange se transforme en conflit, chacun finit souvent par se protéger plutôt que par écouter. La thérapie offre un espace neutre où les deux partenaires peuvent exprimer leur vécu et entendre celui de l’autre.</p><p>L’objectif n’est pas de désigner un responsable, mais d’identifier les mécanismes relationnels et de construire de nouvelles façons de communiquer.</p>' }
];

export const getArticles = () => load<Article[]>('articles', fallbackArticles);
export const getReviews = () => load<Review[]>('reviews', fallbackReviews);
export const getFaqs = () => load<Faq[]>('faqs', fallbackFaqs);
