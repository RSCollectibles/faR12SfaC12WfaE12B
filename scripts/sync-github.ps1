param(
    [string]$CommitMessage = "chore: sync updates"
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
Set-Location ..

if (-not (Test-Path ".git")) {
    throw "Kein Git-Repository gefunden. Bitte zuerst git init ausführen."
}

$status = git status --porcelain
if (-not $status) {
    Write-Output "Keine Änderungen zum Pushen."
    exit 0
}

git add -A

$coAuthor = "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
git commit -m $CommitMessage -m $coAuthor

$currentBranch = (git branch --show-current).Trim()
if (-not $currentBranch) {
    $currentBranch = "main"
    git branch -M $currentBranch
}

$originUrl = (git remote get-url origin 2>$null)
if (-not $originUrl) {
    git remote add origin "https://github.com/RSCollectibles/faR12SfaC12WfaE12B.git"
}

git push -u origin $currentBranch
Write-Output "Sync erfolgreich: Commit erstellt und nach GitHub gepusht."
