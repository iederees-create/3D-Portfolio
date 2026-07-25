$blogDir = 'c:\Users\afrancis\Desktop\qm\3D-Portfolio\src\content\blog'
$articlesTsPath = "$blogDir\articles.ts"
$workPagePath = "c:\Users\afrancis\Desktop\qm\3D-Portfolio\src\pages\WorkPage.tsx"

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

$ignoredFiles = @('articles.ts', 'types.ts', 'why-educational-businesses-need-custom-learning-hubs.tsx', 'bank-desert-analysis-python-census-google-places.tsx', 'construction-website-quote-planner.tsx', 'laser-cutting-website-quote-planner.tsx', 'ai-portfolio-assistant.tsx', 'trading-affiliate-website-template.tsx')

$files = Get-ChildItem -Path $blogDir -Filter '*.tsx' | Where-Object { $ignoredFiles -notcontains $_.Name }

$imports = @()
$newArticles = @()
$contentMapEntries = @()

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

$oldTs = Get-Content $articlesTsPath -Raw

# Insert imports at the very top (after any existing imports)
$lastImportIndex = $oldTs.LastIndexOf("import ")
if ($lastImportIndex -ne -1) {
    $endOfLine = $oldTs.IndexOf("`n", $lastImportIndex)
    if ($endOfLine -ne -1) {
        $oldTs = $oldTs.Insert($endOfLine + 1, ($imports -join "`r`n") + "`r`n")
    }
} else {
    $oldTs = ($imports -join "`r`n") + "`r`n" + $oldTs
}

# Insert new articles
$oldTs = $oldTs -replace 'export const articles: ArticleMeta\[\] = \[', ("export const articles: ArticleMeta[] = [`r`n" + ($newArticles -join "`r`n"))

# Insert into contentMap
$oldTs = $oldTs -replace 'export const articleContentMap: Record<string, ArticleContentComponent> = \{', ("export const articleContentMap: Record<string, ArticleContentComponent> = {`r`n" + ($contentMapEntries -join "`r`n"))

Set-Content -Path $articlesTsPath -Value $oldTs
Write-Output 'Success'
