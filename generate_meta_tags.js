import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found. Make sure to run this after vite build.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const siteUrl = 'https://iederees-create.github.io/3D-Portfolio/';

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateHtml(urlPath, title, description, image) {
  const fullUrl = siteUrl + urlPath;
  const imageUrl = image ? (image.startsWith('http') ? image : siteUrl + image.replace(/^\//, '')) : '';
  
  // Create the meta tags block
  const metaTags = `
    <!-- Dynamic Open Graph Tags -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    ${imageUrl ? `<meta property="og:image" content="${imageUrl}" />` : ''}
    
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${fullUrl}" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
    ${imageUrl ? `<meta property="twitter:image" content="${imageUrl}" />` : ''}
  `;

  // Inject meta tags before </head>
  return baseHtml.replace('</head>', metaTags + '\n  </head>');
}

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// URLs for sitemap
const sitemapUrls = [
  '',
  'work/',
  'about/',
  'blog/',
  'contact/',
  'credentials/'
];

// 1. Process Projects
console.log('Processing projects...');
const workPageContent = fs.readFileSync(path.join(__dirname, 'src/pages/WorkPage.tsx'), 'utf8');

// Match project objects in the projects array
// Looking for { title: '...', description: '...', ... coverImage: import.meta.env.BASE_URL + '...', }
const projectBlocks = workPageContent.split('{\n    title:');

for (let i = 1; i < projectBlocks.length; i++) {
  const block = projectBlocks[i];
  
  const titleMatch = block.match(/^\s*'([^']+)'/);
  const titleMatchDouble = block.match(/^\s*"([^"]+)"/);
  const title = (titleMatch && titleMatch[1]) || (titleMatchDouble && titleMatchDouble[1]);
  
  const descMatch = block.match(/description:\s*'([^']+)'/);
  const descMatchDouble = block.match(/description:\s*"([^"]+)"/);
  const description = (descMatch && descMatch[1]) || (descMatchDouble && descMatchDouble[1]) || '';
  
  const coverImageMatch = block.match(/coverImage:\s*(?:import\.meta\.env\.BASE_URL\s*\+\s*|`\$\{import\.meta\.env\.BASE_URL\}|)'([^']+)'/);
  const coverImageMatchTemplate = block.match(/coverImage:\s*`\$\{import\.meta\.env\.BASE_URL\}([^`]+)`/);
  const coverImage = (coverImageMatch && coverImageMatch[1]) || (coverImageMatchTemplate && coverImageMatchTemplate[1]) || '';
  
  if (title) {
    const slug = slugify(title);
    const urlPath = `work/${slug}/`;
    const imagePath = coverImage ? coverImage : '';
    
    const projectHtml = generateHtml(
      urlPath, 
      `${title} | NextGenWebs`, 
      description, 
      imagePath
    );
    
    const outPath = path.join(distDir, 'work', slug, 'index.html');
    ensureDirectoryExistence(outPath);
    fs.writeFileSync(outPath, projectHtml);
    console.log(`Generated: ${urlPath}`);
    sitemapUrls.push(urlPath);
  }
}

// 2. Process Articles
console.log('Processing articles...');
const articlesContent = fs.readFileSync(path.join(__dirname, 'src/content/blog/articles.ts'), 'utf8');
const articleBlocks = articlesContent.split('{\n    slug:');

for (let i = 1; i < articleBlocks.length; i++) {
  const block = articleBlocks[i];
  
  const slugMatch = block.match(/^\s*'([^']+)'/);
  const slug = slugMatch ? slugMatch[1] : null;
  
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const titleMatchDouble = block.match(/title:\s*"([^"]+)"/);
  const title = (titleMatch && titleMatch[1]) || (titleMatchDouble && titleMatchDouble[1]) || '';
  
  const descMatch = block.match(/excerpt:\s*'([^']+)'/);
  const descMatchDouble = block.match(/excerpt:\s*"([^"]+)"/);
  const description = (descMatch && descMatch[1]) || (descMatchDouble && descMatchDouble[1]) || '';
  
  const coverImageMatch = block.match(/coverImage:\s*(?:import\.meta\.env\.BASE_URL\s*\+\s*|`\$\{import\.meta\.env\.BASE_URL\}|)'([^']+)'/);
  const coverImageMatchTemplate = block.match(/coverImage:\s*`\$\{import\.meta\.env\.BASE_URL\}([^`]+)`/);
  const coverImage = (coverImageMatch && coverImageMatch[1]) || (coverImageMatchTemplate && coverImageMatchTemplate[1]) || '';
  
  if (slug && title) {
    const urlPath = `blog/${slug}/`;
    const imagePath = coverImage ? coverImage : '';
    
    const articleHtml = generateHtml(
      urlPath, 
      `${title} | NextGenWebs Blog`, 
      description, 
      imagePath
    );
    
    const outPath = path.join(distDir, 'blog', slug, 'index.html');
    ensureDirectoryExistence(outPath);
    fs.writeFileSync(outPath, articleHtml);
    console.log(`Generated: ${urlPath}`);
    sitemapUrls.push(urlPath);
  }
}

// 3. Create 404.html for GitHub Pages fallback
console.log('Generating 404.html...');
const notFoundHtml = baseHtml.replace('<title>', '<title>Page Not Found | NextGenWebs</title>\n    <!-- 404 Fallback -->\n    <title>');
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);

// 4. Generate sitemap.xml
console.log('Generating sitemap.xml...');
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>\n    <loc>${siteUrl}${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);

console.log('Meta tag and sitemap generation complete!');
