import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogIndexPage from './pages/BlogIndexPage';
import ArticlePage from './pages/ArticlePage';

/**
 * Top-level router. The homepage keeps its existing single-page,
 * anchor-scroll experience (sections at /#work, /#about, /#blog,
 * /#credentials, /#contact); the blog gets real per-article URLs so each
 * post is independently linkable, indexable, and shareable.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<ArticlePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
