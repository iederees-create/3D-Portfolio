$blogDir = 'c:\Users\afrancis\Desktop\qm\3D-Portfolio\src\content\blog'
$articlesTsPath = "$blogDir\articles.ts"
$workPagePath = "c:\Users\afrancis\Desktop\qm\3D-Portfolio\src\pages\WorkPage.tsx"
$projectPagePath = "c:\Users\afrancis\Desktop\qm\3D-Portfolio\src\pages\ProjectPage.tsx"

$fileToProject = @{
    'insightforge-business-analytics-studio.tsx' = 'InsightForge Business Analytics Studio'
    'raversus-clinical-portal.tsx' = 'RAVERSUS Clinical Portal'
    'tiling-contractor-website-template.tsx' = 'Tiling Contractor Website Template'
    'solar-lead-generation-website-template.tsx' = 'Claude Code Solar Lead Generation Template'
    'pest-control-website-template.tsx' = 'Pest Control Website Template'
    'vitality-wellness-website-template.tsx' = 'Vitality Wellness Website Template'
    'painting-contractor-website-design.tsx' = 'Summit Painting CT'
    'amore-nails-ct-website.tsx' = 'Amore Nails CT'
    'pixel-perfect-hair-salon-website.tsx' = 'Pixel Perfect Hair'
    'zen-skin-studio-website-template.tsx' = 'Zen Skin Studio Website Template'
    'plumbing-website-design-cape-town.tsx' = 'Acme Plumbing Claremont'
    'window-cleaning-glazing-website-design.tsx' = 'Window Wizards CT'
    'construction-company-website-design-cape-town.tsx' = 'First Choice Construction'
    'creator-hub-digital-portfolio-template.tsx' = 'Creator Hub Pro Template'
    'signage-business-website-design.tsx' = 'Aura Signs'
    'about-nextgenwebs-web-developer-cape-town.tsx' = $null
}

$workContent = Get-Content $workPagePath -Raw

function Get-RegexGroup {
    param($regex, $text, $group)
    if ($text -match $regex) { return $matches[$group].Trim() }
    return ""
}

$projects = @()
$workRegex = [regex]'(?s)title:\s*''([^'']+)''(?:.*?category:\s*''([^'']+)'')?(?:.*?coverImage:\s*``([^``]+)``)?(?:.*?mediaAlt:\s*''([^'']+)'')?'
$matches = $workRegex.Matches($workContent)
foreach ($m in $matches) {
    $projects += @{
        title = $m.Groups[1].Value
        category = $m.Groups[2].Value
        coverImage = $m.Groups[3].Value
        mediaAlt = $m.Groups[4].Value
    }
}

$files = Get-ChildItem -Path $blogDir -Filter '*.tsx' | Where-Object { $_.Name -ne 'articles.ts' -and $_.Name -ne 'types.ts' -and $_.Name -ne 'why-educational-businesses-need-custom-learning-hubs.tsx' -and $_.Name -ne 'bank-desert-analysis-python-census-google-places.tsx' -and $_.Name -ne 'construction-website-quote-planner.tsx' -and $_.Name -ne 'laser-cutting-website-quote-planner.tsx' }

$imports = @()
$newArticles = @()
$contentMapEntries = @()
$projectMapEntries = @()

foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    $compMatch = Get-RegexGroup 'export\s+default\s+function\s+([A-Za-z0-9_]+)' $content 1
    if ($compMatch) {
        $projName = $fileToProject[$f.Name]
        
        $title = Get-RegexGroup '@title\s+([^\r\n]+)' $content 1
        if (-not $title) { $title = Get-RegexGroup 'Blog Post:\s*([^\r\n]+)' $content 1 }
        if (-not $title) { $title = $projName }
        if (-not $title) { $title = $f.BaseName }
        
        $slug = Get-RegexGroup '@slug\s+([a-zA-Z0-9-]+)' $content 1
        if (-not $slug) { $slug = Get-RegexGroup 'Slug:\s*([a-zA-Z0-9-]+)' $content 1 }
        if (-not $slug) { $slug = $f.BaseName }
        
        $desc = Get-RegexGroup '(?s)@description\s+(.*?)(?=\s+\*\s*@)' $content 1
        if (-not $desc) { $desc = Get-RegexGroup '@description\s+([^\r\n]+)' $content 1 }
        if (-not $desc) { $desc = $title }
        $desc = $desc -replace '\r?\n\s*\*\s*', ' '
        $desc = $desc -replace '\s+', ' '
        $desc = $desc.Trim()
        
        $date = Get-RegexGroup '@date\s+([^\r\n]+)' $content 1
        if (-not $date) { $date = '2026-07-16' }
        
        $wordCount = ($content -split '\s+').Length
        $readingTime = [math]::Max([math]::Ceiling($wordCount / 200), 2)
        
        $coverImg = ''
        $coverAlt = ''
        $cat = 'Case Study'
        
        if ($projName) {
            $p = $projects | Where-Object { $_.title -eq $projName } | Select-Object -First 1
            if ($p) {
                if ($p.coverImage) { $coverImg = "`r`n    coverImage: ``" + $p.coverImage + "``," }
                $coverAlt = if ($p.mediaAlt) { $p.mediaAlt } else { "$projName project preview" }
                $cat = "Case Study / " + $p.category
            }
            $escapedProj = $projName -replace "'", "\'"
            $projectMapEntries += "  '$escapedProj': '$slug',"
        }
        
        $imports += "import $compMatch from './$($f.BaseName)';"
        $contentMapEntries += "  '$slug': $compMatch,"
        
        $escapedTitle = $title -replace "'", "\'"
        $escapedDesc = $desc -replace "'", "\'"
        $escapedAlt = $coverAlt -replace "'", "\'"
        
        if ($coverImg) {
            $coverImg += "`r`n    coverImageAlt: '$escapedAlt',"
        } else {
            $coverImg = "`r`n    // No cover image"
        }
        
        $newArticles += "  {`r`n    slug: '$slug',`r`n    title: '$escapedTitle',`r`n    excerpt: '$escapedDesc',`r`n    datePublished: '$date',`r`n    dateModified: '$date',`r`n    author: 'Iedrees Francis',`r`n    category: '$cat',`r`n    tags: ['Case Study', 'Web Design', 'NextGenWebs'],`r`n    readingTimeMinutes: $readingTime,$coverImg`r`n    relatedSlugs: [],`r`n  },"
    }
}

# Instead of modifying existing, let's just generate the entire file for safety!
$fullArticlesTs = "import type { ArticleContentComponent, ArticleMeta } from './types';`n"
$fullArticlesTs += "import WhyEducationalBusinessesNeedCustomLearningHubsContent from './why-educational-businesses-need-custom-learning-hubs';`n"
$fullArticlesTs += "import BankDesertAnalysisContent from './bank-desert-analysis-python-census-google-places';`n"
$fullArticlesTs += "import ConstructionWebsiteQuotePlannerContent from './construction-website-quote-planner';`n"
$fullArticlesTs += "import LaserCuttingWebsiteQuotePlannerContent from './laser-cutting-website-quote-planner';`n"
$fullArticlesTs += ($imports -join "`r`n") + "`r`n`r`n"
$fullArticlesTs += "export const articles: ArticleMeta[] = [`r`n"
$fullArticlesTs += ($newArticles -join "`r`n") + "`r`n"

$existingArticles = @"
  {
    slug: 'laser-cutting-website-quote-planner',
    title: 'How to Build a Laser Cutting Website That Gets Better Quote Requests',
    excerpt: 'Why `"how much to laser this?`" enquiries waste time on both sides, and how an interactive Laser Cut & Engraving Quote Planner turns them into structured, production-ready quote briefs.',
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
    author: 'Iedrees Francis',
    category: 'Case Study / Fabrication',
    tags: ['Case Study', 'Laser Cutting', 'Fabrication', 'HTML5', 'JavaScript'],
    readingTimeMinutes: 6,
    coverImage: `${import.meta.env.BASE_URL}projects/precision-laser/cover.webp`,
    coverImageAlt: 'Precision Laser Website Template homepage with the Laser Cut & Engraving Quote Planner',
    relatedSlugs: ['construction-website-quote-planner'],
  },
  {
    slug: 'construction-website-quote-planner',
    title: 'How to Build a Construction Website That Generates Better Quote Requests',
    excerpt: 'Why a brochure-style contractor website loses good leads to vague enquiries, and how an interactive Renovation Scope & Budget Planner turns `"how much to renovate?`" into a structured, site-inspection-ready brief.',
    datePublished: '2026-07-13',
    dateModified: '2026-07-13',
    author: 'Iedrees Francis',
    category: 'Case Study / Construction',
    tags: ['Case Study', 'Construction', 'Lead Generation', 'HTML5', 'JavaScript'],
    readingTimeMinutes: 6,
    coverImage: `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/cover.webp`,
    coverImageAlt: 'Southern Suburbs Builders website template homepage with the Renovation Scope & Budget Planner',
    relatedSlugs: ['bank-desert-analysis-python-census-google-places'],
  },
  {
    slug: 'bank-desert-analysis-python-census-google-places',
    title: 'How to Build a Bank Desert Analysis Project with Python, Pandas, Census Data and Google Places',
    excerpt: 'A practical guide to planning, sourcing data for, and analysing a bank desert / financial-access project in Python — Census ACS, Google Places, Pandas cleaning, mapping, and statistics, without a fabricated conclusion.',
    datePublished: '2026-07-13',
    dateModified: '2026-07-13',
    author: 'Iedrees Francis',
    category: 'Data',
    tags: ['Python', 'Pandas', 'Census API', 'Geospatial', 'Statistics', 'Financial Inclusion'],
    readingTimeMinutes: 12,
    coverImage: `${import.meta.env.BASE_URL}projects/bank-desert-analysis/01-cover.png`,
    coverImageAlt: 'Bank Desert Analysis Student Lab dashboard showing the Financial Access Score, interactive map, and statistics lab used to teach bank desert research',
    relatedSlugs: ['why-educational-businesses-need-custom-learning-hubs'],
  },
  {
    slug: 'why-educational-businesses-need-custom-learning-hubs',
    title: 'Why Educational Businesses Need Custom Learning Hubs: The Fluent Path Story',
    excerpt: 'The modern tutoring business has outgrown generic drag-and-drop website builders. Here is how I built the Fluent Path Tutoring template to solve this exact problem.',
    datePublished: '2026-07-12',
    dateModified: '2026-07-12',
    author: 'Iedrees Francis',
    category: 'Case Study / EdTech',
    tags: ['Case Study', 'EdTech', 'React', 'TypeScript'],
    readingTimeMinutes: 4,
    relatedSlugs: ['bank-desert-analysis-python-census-google-places'],
  },
];`r`n
"@
$fullArticlesTs += $existingArticles

$fullArticlesTs += "export const articleContentMap: Record<string, ArticleContentComponent> = {`r`n"
$fullArticlesTs += "  'laser-cutting-website-quote-planner': LaserCuttingWebsiteQuotePlannerContent,`r`n"
$fullArticlesTs += "  'construction-website-quote-planner': ConstructionWebsiteQuotePlannerContent,`r`n"
$fullArticlesTs += "  'bank-desert-analysis-python-census-google-places': BankDesertAnalysisContent,`r`n"
$fullArticlesTs += "  'why-educational-businesses-need-custom-learning-hubs': WhyEducationalBusinessesNeedCustomLearningHubsContent,`r`n"
$fullArticlesTs += ($contentMapEntries -join "`r`n") + "`r`n};`r`n`r`n"

$fullArticlesTs += "export function getArticleBySlug(slug: string): ArticleMeta | undefined {`r`n  return articles.find((article) => article.slug === slug);`r`n}`r`n`r`nexport function getRelatedArticles(article: ArticleMeta): ArticleMeta[] {`r`n  return article.relatedSlugs`r`n    .map((slug) => getArticleBySlug(slug))`r`n    .filter((found): found is ArticleMeta => Boolean(found));`r`n}`r`n"

Set-Content -Path $articlesTsPath -Value $fullArticlesTs

# Resolve ProjectPage.tsx
$oldProj = Get-Content $projectPagePath -Raw

# Since the file is conflicted, we can just replace the conflicted block.
$oldProj = $oldProj -replace '(?s)<<<<<<< HEAD.*?=======(.*?)>>>>>>> origin/main', '$1'
$newProj = $oldProj -replace 'const articleByProjectTitle: Record<string, string> = \{', ("const articleByProjectTitle: Record<string, string> = {`r`n" + ($projectMapEntries -join "`r`n"))
Set-Content -Path $projectPagePath -Value $newProj

Write-Output 'Success'
