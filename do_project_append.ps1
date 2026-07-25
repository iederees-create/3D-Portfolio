$projectPagePath = "c:\Users\afrancis\Desktop\qm\3D-Portfolio\src\pages\ProjectPage.tsx"

$projectMapEntries = @(
  "  'InsightForge Business Analytics Studio': 'insightforge-business-analytics-studio',",
  "  'RAVERSUS Clinical Portal': 'raversus-clinical-portal',",
  "  'Tiling Contractor Website Template': 'tiling-contractor-website-template',",
  "  'Claude Code Solar Lead Generation Template': 'solar-lead-generation-website-template',",
  "  'Pest Control Website Template': 'pest-control-website-template',",
  "  'Vitality Wellness Website Template': 'vitality-wellness-website-template',",
  "  'Summit Painting CT': 'painting-contractor-website-design',",
  "  'Amore Nails CT': 'amore-nails-ct-website',",
  "  'Pixel Perfect Hair': 'pixel-perfect-hair-salon-website',",
  "  'Zen Skin Studio Website Template': 'zen-skin-studio-website-template',",
  "  'Acme Plumbing Claremont': 'plumbing-website-design-cape-town',",
  "  'Window Wizards CT': 'window-cleaning-glazing-website-design',",
  "  'First Choice Construction': 'construction-company-website-design-cape-town',",
  "  'Creator Hub Pro Template': 'creator-hub-digital-portfolio-template',",
  "  'Aura Signs': 'signage-business-website-design',"
)

$oldProj = Get-Content $projectPagePath -Raw

$replacement = "const articleByProjectTitle: Record<string, string> = {`r`n" + ($projectMapEntries -join "`r`n") + "`r`n"
$newProj = $oldProj -replace 'const articleByProjectTitle: Record<string, string> = \{', $replacement

Set-Content -Path $projectPagePath -Value $newProj
Write-Output 'Success'
