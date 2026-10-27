import { getArticles } from '../lib/contentforge';
export async function GET() {
 const articles=await getArticles();
 const routes=['','accompagnement-individuel/','therapie-de-couple/','mon-approche/','tarifs-et-rendez-vous/','mentions-legales/','confidentialite/','conditions/','articles/',...articles.map(article=>`articles/${article.slug}/`)];
 return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(route=>`<url><loc>https://laurecorrao.fr/${route}</loc></url>`).join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});
}
