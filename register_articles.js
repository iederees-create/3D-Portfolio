const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'src/content/blog');
const articlesTsPath = path.join(blogDir, 'articles.ts');
const workPagePath = path.join(__dirname, 'src/pages/WorkPage.tsx');
const projectPagePath = path.join(__dirname, 'src/pages/ProjectPage.tsx');

// Parse WorkPage.tsx to get project mappings
const workPageContent = fs.readFileSync(workPagePath, 'utf8');
const projectRegex = /title:\s*'([^']+)',\s*category:\s*'([^']+)',[\s\S]*?(?:coverImage:\s*`([^`]+)`,)?[\s\S]*?(?:mediaAlt:\s*'([^']+)',)?/g;
const projects = [];
let match;
while ((match = projectRegex.exec(workPageContent)) !== null) {
  projects.push({
    title: match[1],
    category: match[2],
    coverImage: match[3],
    mediaAlt: match[4]
  });
}

// Map filenames to project titles for the new files
const fileToProject = {
  'insightforge-business-analytics-studio.tsx': 'InsightForge Business Analytics Studio',
  'raversus-clinical-portal.tsx': 'RAVERSUS Clinical Portal',
  'tiling-contractor-website-template.tsx': 'Tiling Contractor Website Template',
  'solar-lead-generation-website-template.tsx': 'Claude Code Solar Lead Generation Template',
  'pest-control-website-template.tsx': 'Pest Control Website Template',
  'vitality-wellness-website-template.tsx': 'Vitality Wellness Website Template',
  'painting-contractor-website-design.tsx': 'Summit Painting CT',
  'amore-nails-ct-website.tsx': 'Amore Nails CT',
  'pixel-perfect-hair-salon-website.tsx': 'Pixel Perfect Hair',
  'zen-skin-studio-website-template.tsx': 'Zen Skin Studio Website Template',
  'plumbing-website-design-cape-town.tsx': 'Acme Plumbing Claremont',
  'window-cleaning-glazing-website-design.tsx': 'Window Wizards CT',
  'construction-company-website-design-cape-town.tsx': 'First Choice Construction',
  'creator-hub-digital-portfolio-template.tsx': 'Creator Hub Pro Template',
  'signage-business-website-design.tsx': 'Aura Signs',
  'about-nextgenwebs-web-developer-cape-town.tsx': null // No project mapping
};

// Read existing articles.ts
let articlesTsContent = fs.readFileSync(articlesTsPath, 'utf8');

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.tsx') && !['articles.ts', 'types.ts', 'why-educational-businesses-need-custom-learning-hubs.tsx', 'bank-desert-analysis-python-census-google-places.tsx', 'construction-website-quote-planner.tsx', 'laser-cutting-website-quote-planner.tsx'].includes(f));

const newArticles = [];
const imports = [];
const contentMapEntries = [];
const projectMapEntries = [];

for (const file of files) {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  let titleMatch = content.match(/@title\s+(.+)/);
  const slugMatch = content.match(/@slug\s+(.+)/) || content.match(/@slug\s+([a-zA-Z0-9-]+)/);
  let descMatch = content.match(/@description\s+([\s\S]+?)(?=\s+\* @)/);
  if (!descMatch) {
    descMatch = content.match(/@description\s+(.+)/);
  }
  const dateMatch = content.match(/@date\s+(.+)/);
  
  const componentMatch = content.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/);
  
  if (componentMatch) {
    const title = titleMatch ? titleMatch[1].trim() : (fileToProject[file] || file.replace('.tsx', ''));
    let slug = slugMatch ? slugMatch[1].trim() : file.replace('.tsx', '');
    slug = slug.split(/\s+/)[0]; // Just in case it captures extra stuff
    let excerpt = descMatch ? descMatch[1].replace(/\n\s*\*\s*/g, ' ').trim() : title;
    // ensure excerpt is just one paragraph, remove extra spaces
    excerpt = excerpt.replace(/\s+/g, ' ');
    const date = dateMatch ? dateMatch[1].trim() : '2026-07-16';
    const componentName = componentMatch[1];
    
    // count words
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.max(Math.ceil(wordCount / 200), 2);
    
    // project info
    const projectName = fileToProject[file];
    const project = projects.find(p => p.title === projectName);
    
    let coverImage = '';
    let coverImageAlt = '';
    let category = 'Case Study';
    
    if (project) {
      if (project.coverImage) {
        coverImage = project.coverImage.replace('${import.meta.env.BASE_URL}', '${import.meta.env.BASE_URL}');
      }
      coverImageAlt = project.mediaAlt || `${projectName} project preview`;
      category = `Case Study / ${project.category}`;
    }
    
    imports.push(`import ${componentName} from './${file.replace('.tsx', '')}';`);
    contentMapEntries.push(`  '${slug}': ${componentName},`);
    if (projectName) {
      projectMapEntries.push(`  '${projectName.replace(/'/g, "\\'")}': '${slug}',`);
    }
    
    const articleMeta = `  {
    slug: '${slug}',
    title: '${title.replace(/'/g, "\\'")}',
    excerpt: '${excerpt.replace(/'/g, "\\'")}',
    datePublished: '${date}',
    dateModified: '${date}',
    author: 'Iedrees Francis',
    category: '${category}',
    tags: ['Case Study', 'Web Design', 'NextGenWebs'],
    readingTimeMinutes: ${readingTime},
${coverImage ? `    coverImage: \`${coverImage}\`,\n    coverImageAlt: '${coverImageAlt.replace(/'/g, "\\'")}',` : `    // No cover image`}
    relatedSlugs: [],
  },`;
    
    newArticles.push(articleMeta);
  }
}

// Update articles.ts
const articlesArrayInsertRegex = /export const articles: ArticleMeta\[\] = \[/;
const contentMapInsertRegex = /export const articleContentMap: Record<string, ArticleContentComponent> = \{/;

let updatedArticlesTs = articlesTsContent;

updatedArticlesTs = imports.join('\n') + '\n' + updatedArticlesTs;

updatedArticlesTs = updatedArticlesTs.replace(
  articlesArrayInsertRegex,
  `export const articles: ArticleMeta[] = [\n${newArticles.join('\n')}`
);

updatedArticlesTs = updatedArticlesTs.replace(
  contentMapInsertRegex,
  `export const articleContentMap: Record<string, ArticleContentComponent> = {\n${contentMapEntries.join('\n')}`
);

fs.writeFileSync(articlesTsPath, updatedArticlesTs);
console.log('Updated articles.ts');

// Update ProjectPage.tsx
let projectPageContent = fs.readFileSync(projectPagePath, 'utf8');
const articleMapInsertRegex = /const articleByProjectTitle: Record<string, string> = \{/;

let updatedProjectPage = projectPageContent.replace(
  articleMapInsertRegex,
  `const articleByProjectTitle: Record<string, string> = {\n${projectMapEntries.join('\n')}`
);

fs.writeFileSync(projectPagePath, updatedProjectPage);
console.log('Updated ProjectPage.tsx');
