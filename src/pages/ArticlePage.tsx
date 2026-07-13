import { useParams, Link } from 'react-router-dom';
import ArticleLayout from '../components/blog/ArticleLayout';
import SEO from '../components/SEO';
import { articleContentMap, getArticleBySlug } from '../content/blog/articles';

/**
 * Renders a single article at /blog/:slug/. The article body (a React
 * component registered in articleContentMap) is part of the initial React
 * tree for this route — it is not fetched or revealed behind a click, so
 * it is present in the component tree as soon as the route mounts.
 *
 * Nav/footer chrome comes from the global <Navbar>/<Footer> in App.tsx,
 * which wraps every route — this page only owns its own content.
 */
export default function ArticlePage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const meta = getArticleBySlug(slug);
  const Content = articleContentMap[slug];

  if (!meta || !Content) {
    return (
      <>
        <SEO title="Article not found" description="This article could not be found." path={`blog/${slug}/`} noIndex />
        <div className="pt-40 pb-24 px-6 max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Article not found</h1>
          <p className="text-slate-400 mb-8">This article doesn't exist or may have been moved.</p>
          <Link to="/blog/" className="text-primary-400 hover:text-primary-300 font-semibold">
            ← Back to all articles
          </Link>
        </div>
      </>
    );
  }

  return (
    <ArticleLayout meta={meta}>
      <Content />
    </ArticleLayout>
  );
}
