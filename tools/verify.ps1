# =====================================================================
#  huiskeuring.be - pre-release verification
# =====================================================================
#  Run from anywhere:   pwsh -File tools/verify.ps1
#                       powershell -File tools\verify.ps1
#
#  Checks, in order:
#    1. Every file is valid UTF-8, with no replacement characters and no
#       double-encoded sequences.
#    2. The en / nl / fr blocks in js/i18n.js have identical key sets.
#    3. Every data-i18n* attribute in the HTML resolves to a key.
#    4. Every checklist item has a translated text AND why in nl and fr.
#    5. Every deadline:/info: key resolves to a legal or advisory topic.
#    6. Every byId() call resolves to an element id in its page.
#    7. Every local src=/href= resolves to a file that exists.
#    8. Every url() in the bundled font CSS resolves.
#    9. Every external https URL returns HTTP 200  (skip with -SkipLinks).
#
#  Exits with code 1 if anything fails, so it can gate a deploy.
# =====================================================================

param(
    [switch]$SkipLinks
)

$ErrorActionPreference = 'Continue'
$ProgressPreference = 'SilentlyContinue'

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
Write-Output ("huiskeuring.be verification - " + $root)
Write-Output ''

$failures = 0
function Fail([string]$message) { Write-Output ('  FAIL  ' + $message); $script:failures++ }
function Pass([string]$message) { Write-Output ('  ok    ' + $message) }

# ---------------------------------------------------------------- 1
Write-Output '1. Encoding'
$strict = New-Object System.Text.UTF8Encoding($false, $true)
$encodingOk = $true
Get-ChildItem 'js\*.js', '*.html', 'lookup\*.html', 'lookup\*.js', 'sw.js', 'style.css', 'todo.md', 'FACTCHECK.md', 'FEATURES.md', 'sitemap.xml', 'site.webmanifest' | ForEach-Object {
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    try {
        $text = $strict.GetString($bytes)
        if ($text.IndexOf([char]0xFFFD) -ge 0) { Fail ('replacement character in ' + $_.Name); $script:encodingOk = $false }
        if ([regex]::IsMatch($text, "\u00C3[\u0080-\u00BF]")) { Fail ('double-encoded text in ' + $_.Name); $script:encodingOk = $false }
    } catch {
        Fail ('not valid UTF-8: ' + $_.Name); $script:encodingOk = $false
    }
}
if ($encodingOk) { Pass 'all files are valid UTF-8 with no corruption' }

# ---------------------------------------------------------------- 2
Write-Output ''
Write-Output '2. Translation key parity (js/i18n.js)'
function Get-LangKeys([string]$lang) {
    $lines = Get-Content 'js\i18n.js'
    $inBlock = $false
    $keys = New-Object System.Collections.Generic.List[string]
    foreach ($l in $lines) {
        if (-not $inBlock -and $l -match ("^\s{4}" + $lang + ":\s*\{")) { $inBlock = $true; continue }
        if ($inBlock) {
            if ($l -match "^\s{4}\},?\s*$") { break }
            if ($l -match "^\s{8}'([^']+)':") { $keys.Add($matches[1]) }
        }
    }
    return $keys
}
$en = Get-LangKeys 'en'
$langs = @('nl', 'fr')
$parityOk = $true
foreach ($lang in $langs) {
    $other = Get-LangKeys $lang
    $missing = $en | Where-Object { $other -notcontains $_ }
    $extra = $other | Where-Object { $en -notcontains $_ }
    if ($missing.Count -gt 0) { Fail ($lang + ' is missing ' + $missing.Count + ' keys: ' + ($missing -join ', ')); $script:parityOk = $false }
    if ($extra.Count -gt 0) { Fail ($lang + ' has ' + $extra.Count + ' keys not in en: ' + ($extra -join ', ')); $script:parityOk = $false }
}
if ($parityOk) { Pass ('en/nl/fr all have the same ' + $en.Count + ' keys') }

# ---------------------------------------------------------------- 3
Write-Output ''
Write-Output '3. data-i18n attributes resolve'
$attrMissing = @()
Get-ChildItem '*.html', 'lookup\*.html' | ForEach-Object {
    $raw = [System.IO.File]::ReadAllText($_.FullName)
    foreach ($m in [regex]::Matches($raw, 'data-i18n(?:-ph|-title|-aria)?="([^"]+)"')) {
        if ($en -notcontains $m.Groups[1].Value) { $attrMissing += ($_.Name + ' -> ' + $m.Groups[1].Value) }
    }
}
if ($attrMissing.Count -eq 0) { Pass 'every data-i18n attribute has a translation key' }
else { $attrMissing | ForEach-Object { Fail $_ } }

# ---------------------------------------------------------------- 4
Write-Output ''
Write-Output '4. Checklist translation coverage'
$items = New-Object System.Collections.Generic.List[string]
$cat = ''; $i = 0
Get-Content 'js\checklist.js' | ForEach-Object {
    if ($_ -match "^\s{8}category: '([a-z]+)'") { $script:cat = $matches[1]; $script:i = 0 }
    elseif ($_ -match "^\s{16}text: '") { $items.Add($script:cat + '-' + $script:i); $script:i++ }
}
foreach ($lang in $langs) {
    $raw = [System.IO.File]::ReadAllText('js\checklist.' + $lang + '.js')
    $have = @{}
    foreach ($m in [regex]::Matches($raw, "'([a-z]+-\d+)':\s*\{(.*?)\n    \}", 'Singleline')) {
        $body = $m.Groups[2].Value
        $have[$m.Groups[1].Value] = ($body -match 'text:') -and ($body -match 'why:')
    }
    $missing = $items | Where-Object { -not $have.ContainsKey($_) }
    $partial = $items | Where-Object { $have.ContainsKey($_) -and -not $have[$_] }
    if ($missing.Count -gt 0) { Fail ($lang + ': ' + $missing.Count + ' items with no translation (' + (($missing | Select-Object -First 5) -join ', ') + ' ...)') }
    if ($partial.Count -gt 0) { Fail ($lang + ': ' + $partial.Count + ' items missing a why (' + (($partial | Select-Object -First 5) -join ', ') + ' ...)') }
    if ($missing.Count -eq 0 -and $partial.Count -eq 0) { Pass ($lang + ': all ' + $items.Count + ' items have text + why') }
}

# ---------------------------------------------------------------- 5
Write-Output ''
Write-Output '5. Legal / advisory topic keys resolve'
$legal = [System.IO.File]::ReadAllText('js\legal.js')
$topics = @{}
foreach ($m in [regex]::Matches($legal, "(?m)^\s{4}'?([a-z]+)'?:\s*\{")) { $topics[$m.Groups[1].Value] = $true }
$topicMissing = @()
# strip block comments first - the file header documents the shape with a placeholder key
$checklistSrc = [regex]::Replace([System.IO.File]::ReadAllText('js\checklist.js'), '/\*.*?\*/', '', 'Singleline')
foreach ($m in [regex]::Matches($checklistSrc, "(?:deadline|info):\s*'([^']+)'")) {
    if (-not $topics.ContainsKey($m.Groups[1].Value)) { $topicMissing += $m.Groups[1].Value }
}
if ($topicMissing.Count -eq 0) { Pass 'every deadline/info key has a matching topic' }
else { Fail ('unknown topic keys: ' + (($topicMissing | Sort-Object -Unique) -join ', ')) }

# ---------------------------------------------------------------- 6
Write-Output ''
Write-Output '6. Element ids referenced from JS'
# deedDate and drawdownDate are created at runtime inside the reminders modal.
$runtimeIds = @('deedDate', 'drawdownDate')
$pairs = @(
    @('index.html', 'js\app.js'),
    @('report.html', 'js\report.js'),
    @('compare.html', 'js\compare.js'),
    @('lookup\index.html', 'lookup\lookup.js')
)
$idMissing = @()
foreach ($pair in $pairs) {
    $html = [System.IO.File]::ReadAllText($pair[0])
    foreach ($m in [regex]::Matches([System.IO.File]::ReadAllText($pair[1]), "byId\('([^']+)'\)")) {
        $id = $m.Groups[1].Value
        if ($runtimeIds -contains $id) { continue }
        if ($html -notmatch ('id="' + [regex]::Escape($id) + '"')) { $idMissing += ($pair[0] + ' -> #' + $id) }
    }
}
if ($idMissing.Count -eq 0) { Pass 'every byId() call resolves' }
else { $idMissing | Sort-Object -Unique | ForEach-Object { Fail $_ } }

# ---------------------------------------------------------------- 7
Write-Output ''
Write-Output '7. Local asset references'
$assetMissing = @()
Get-ChildItem '*.html', 'lookup\*.html' | ForEach-Object {
    $name = $_.FullName.Substring((Get-Location).Path.Length + 1)
    $dir = $_.DirectoryName
    foreach ($m in [regex]::Matches([System.IO.File]::ReadAllText($_.FullName), '(?:src|href)="(?!https?:|mailto:|#)([^"]+)"')) {
        $rel = $m.Groups[1].Value -replace '\?.*$', ''
        if (-not $rel) { continue }
        # root-absolute paths resolve from the site root, everything else from the file's own folder
        $target = if ($rel -match '^/') { Join-Path (Get-Location).Path $rel.TrimStart('/') } else { Join-Path $dir ($rel -replace '^\./', '') }
        if (-not (Test-Path $target)) { $assetMissing += ($name + ' -> ' + $rel) }
    }
}
if ($assetMissing.Count -eq 0) { Pass 'every local asset resolves' }
else { $assetMissing | ForEach-Object { Fail $_ } }

# ---------------------------------------------------------------- 8
Write-Output ''
Write-Output '8. Bundled font references'
$fontMissing = @()
Get-ChildItem 'assets\vendor\*.css' | ForEach-Object {
    $dir = $_.Directory.FullName
    foreach ($m in [regex]::Matches([System.IO.File]::ReadAllText($_.FullName), 'url\(([^\)]+)\)')) {
        $v = $m.Groups[1].Value.Trim([char]39, [char]34)
        if (-not (Test-Path (Join-Path $dir $v))) { $fontMissing += $v }
    }
}
if ($fontMissing.Count -eq 0) { Pass 'every bundled font file resolves' }
else { $fontMissing | Sort-Object -Unique | ForEach-Object { Fail ('font not found: ' + $_) } }

# ---------------------------------------------------------------- 9
Write-Output ''
if ($SkipLinks) {
    Write-Output '9. External links - SKIPPED (-SkipLinks)'
} else {
    Write-Output '9. External links (this takes a minute)'
    $urls = New-Object System.Collections.Generic.HashSet[string]
    Get-ChildItem 'js\*.js', '*.html', 'lookup\*.html', 'lookup\*.js' | ForEach-Object {
        foreach ($m in [regex]::Matches([System.IO.File]::ReadAllText($_.FullName), 'https://[^\s"''\)<>]+')) {
            $u = $m.Value.TrimEnd('.', ',', ';')
            if ($u -notmatch 'schema\.org|huiskeuring\.be|w3\.org|sitemaps\.org') { [void]$urls.Add($u) }
        }
    }
    $bad = 0
    foreach ($u in ($urls | Sort-Object)) {
        # Retry before failing: a transient DNS or network blip must not fail a
        # release check. Only a link that fails three times in a row is dead.
        $code = $null
        $lastErr = 'ERR'
        for ($attempt = 1; $attempt -le 3; $attempt++) {
            try {
                $r = Invoke-WebRequest -Uri $u -Method Get -MaximumRedirection 5 -TimeoutSec 25 -UseBasicParsing -ErrorAction Stop
                $code = [int]$r.StatusCode
                if ($code -eq 200) { break }
                $lastErr = [string]$code
            } catch {
                $code = $null
                $lastErr = 'ERR'
                if ($_.Exception.Response) { $lastErr = [string][int]$_.Exception.Response.StatusCode }
            }
            if ($attempt -lt 3) { Start-Sleep -Seconds 3 }
        }
        if ($code -ne 200) { Fail ($lastErr + '  ' + $u + '  (3 attempts)'); $bad++ }
    }
    if ($bad -eq 0) { Pass ('all ' + $urls.Count + ' external links return HTTP 200') }
}

# ----------------------------------------------------------------
# 10. Untranslated text in the HTML.
# Key parity (check 2) cannot see text that has no data-i18n attribute at all.
# That is exactly how "Made with ... by" stayed English on all three pages.
Write-Output ''
Write-Output '10. Untranslated text in HTML'
# Brand names and the deliberately trilingual <noscript> are not translatable.
$allowed = @('huiskeuring.be', 'Compyra', 'labidi.eu')
$hardcoded = @()
Get-ChildItem '*.html', 'lookup\*.html' | ForEach-Object {
    $name = $_.Name
    $raw = [System.IO.File]::ReadAllText($_.FullName)
    if ($raw -notmatch '(?s)<body') { return }
    $body = ($raw -split '(?s)<body', 2)[1]
    # drop the remainder of the <body ...> tag itself, else its attributes read as text
    $body = $body.Substring($body.IndexOf('>') + 1)
    $body = [regex]::Replace($body, '(?s)<script.*?</script>', ' ')
    $body = [regex]::Replace($body, '(?s)<style.*?</style>', ' ')
    $body = [regex]::Replace($body, '(?s)<noscript.*?</noscript>', ' ')
    $body = [regex]::Replace($body, '(?s)<!--.*?-->', ' ')
    # drop elements whose text is replaced at runtime
    $body = [regex]::Replace($body, '(?s)<([a-z0-9]+)[^>]*\sdata-i18n="[^"]*"[^>]*>.*?</\1>', ' ')
    $text = [regex]::Replace($body, '<[^>]+>', "`n")
    foreach ($line in ($text -split "`n")) {
        $s = ($line -replace '&copy;', '' -replace '&amp;', '').Trim()
        if ($s.Length -gt 2 -and $s -match '[A-Za-z]{3}' -and $allowed -notcontains $s) {
            $hardcoded += ($name + ': ' + $s.Substring(0, [Math]::Min(70, $s.Length)))
        }
    }
}
if ($hardcoded.Count -eq 0) { Pass 'no untranslated visible text in the HTML' }
else { $hardcoded | ForEach-Object { Fail $_ } }

# ----------------------------------------------------------------
# 11. Parity of the long-form content structures.
# These are arrays/objects, not flat keys, so check 2 does not cover them.
Write-Output ''
Write-Output '11. Long-form content parity (guide, FAQ, help, legal, links)'
$i18nRaw = [System.IO.File]::ReadAllText('js\i18n.js')
# $langs holds only the languages compared against English, so spell out all three here.
$allLangs = @('en', 'nl', 'fr')
foreach ($v in @('BUYING_GUIDE', 'FAQ_CONTENT')) {
    $m = [regex]::Match($i18nRaw, ('(?s)const ' + $v + '\s*=\s*\{(.*?)\n\};'))
    $counts = @{}
    foreach ($lang in $allLangs) {
        $lm = [regex]::Match($m.Groups[1].Value, ('(?s)\n    ' + $lang + ':\s*\[(.*?)\n    \]'))
        $counts[$lang] = ([regex]::Matches($lm.Groups[1].Value, '(?m)^\s{8}\{')).Count
    }
    if ($counts['en'] -eq $counts['nl'] -and $counts['en'] -eq $counts['fr'] -and $counts['en'] -gt 0) {
        Pass ($v + ': ' + $counts['en'] + ' entries in each language')
    } else {
        Fail ($v + ' mismatch: en=' + $counts['en'] + ' nl=' + $counts['nl'] + ' fr=' + $counts['fr'])
    }
}
# HELP_CONTENT is an object of objects. Scope the search to that block first -
# otherwise "en: {" matches the TRANSLATIONS block far earlier in the file.
$helpStart = $i18nRaw.IndexOf('const HELP_CONTENT')
$helpBlock = ''
if ($helpStart -ge 0) {
    $tail = $i18nRaw.Substring($helpStart)
    $endIdx = $tail.IndexOf("`n};")
    if ($endIdx -lt 0) { $endIdx = $tail.Length }
    $helpBlock = $tail.Substring(0, $endIdx)
}
$helpCounts = @{}
$marks = @()
foreach ($lang in $allLangs) {
    $i = $helpBlock.IndexOf("`n    $lang`: {")
    if ($i -ge 0) { $marks += [pscustomobject]@{ Lang = $lang; Index = $i } }
}
$marks = $marks | Sort-Object Index
for ($k = 0; $k -lt $marks.Count; $k++) {
    $from = $marks[$k].Index
    $to = if ($k + 1 -lt $marks.Count) { $marks[$k + 1].Index } else { $helpBlock.Length }
    $helpCounts[$marks[$k].Lang] = ([regex]::Matches($helpBlock.Substring($from, $to - $from), 'icon:')).Count
}
foreach ($lang in $allLangs) { if (-not $helpCounts.ContainsKey($lang)) { $helpCounts[$lang] = 0 } }
if ($helpCounts['en'] -eq $helpCounts['nl'] -and $helpCounts['en'] -eq $helpCounts['fr'] -and $helpCounts['en'] -gt 0) {
    Pass ('HELP_CONTENT: ' + $helpCounts['en'] + ' sections in each language')
} else {
    Fail ('HELP_CONTENT mismatch: en=' + $helpCounts['en'] + ' nl=' + $helpCounts['nl'] + ' fr=' + $helpCounts['fr'])
}
foreach ($f in @('js\legal.js', 'js\links.js')) {
    $src = [System.IO.File]::ReadAllText($f)
    $en = ([regex]::Matches($src, "(?<![\w-])en:\s*'")).Count
    $nl = ([regex]::Matches($src, "(?<![\w-])nl:\s*'")).Count
    $fr = ([regex]::Matches($src, "(?<![\w-])fr:\s*'")).Count
    if ($en -eq $nl -and $en -eq $fr) { Pass ($f + ': ' + $en + ' translated strings per language') }
    else { Fail ($f + ' mismatch: en=' + $en + ' nl=' + $nl + ' fr=' + $fr) }
}

# ----------------------------------------------------------------
Write-Output ''
if ($failures -eq 0) {
    Write-Output 'RESULT: everything passed.'
    exit 0
} else {
    Write-Output ('RESULT: ' + $failures + ' problem(s) found.')
    exit 1
}
