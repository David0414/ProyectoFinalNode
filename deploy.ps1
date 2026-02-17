param(
  [string]$Message = "Update frontend build",
  [switch]$CommitFrontend,
  [switch]$SkipMainRepo
)

$ErrorActionPreference = "Stop"

function Ensure-CleanCommit {
  param(
    [string]$RepoPath,
    [string]$CommitMessage
  )

  $status = git -C $RepoPath status --porcelain
  if (-not $status) {
    Write-Host "No changes to commit in $RepoPath"
    return $false
  }

  git -C $RepoPath add -A
  git -C $RepoPath commit -m $CommitMessage
  git -C $RepoPath push
  return $true
}

Write-Host "1) Build frontend..."
Push-Location "frontend"
npm run build
Pop-Location

Write-Host "2) Sync frontend/build -> backend/build..."
if (Test-Path "backend/build") {
  Remove-Item "backend/build" -Recurse -Force
}
Copy-Item "frontend/build" "backend/build" -Recurse

if ($CommitFrontend) {
  Write-Host "3) Commit/push frontend repo (submodule)..."
  $frontendCommitted = Ensure-CleanCommit -RepoPath "frontend" -CommitMessage $Message
  if ($frontendCommitted) {
    Write-Host "Frontend repo updated."
  }
}

if (-not $SkipMainRepo) {
  Write-Host "4) Commit/push main repo (backend/build + submodule pointer if changed)..."
  $mainCommitted = Ensure-CleanCommit -RepoPath "." -CommitMessage $Message
  if ($mainCommitted) {
    Write-Host "Main repo updated. Railway should redeploy automatically."
  }
}

Write-Host "Done."
