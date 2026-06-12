while($true) {
  Clear-Host
  Write-Host "=== Immaculate Grid Build Progress ===" -ForegroundColor Cyan
  Write-Host ""

  # Progress count
  try {
    $data = Get-Content "build-cache/fullBuild.json" -Raw | ConvertFrom-Json
    $count = $data.Length
    $pct = [math]::Round($count / 5126 * 100)
    Write-Host "Progress: $count / 5126 ($pct%)" -ForegroundColor Green
  } catch {
    Write-Host "Progress: waiting..." -ForegroundColor Yellow
  }
  Write-Host ""

  # Find latest build output
  $taskDir = "$env:TEMP\claude\C--Users-chenqi-Desktop-work-hppaigame-hppaigame-immaculate-grid\c03d4cdf-59ab-4100-b734-2aa9f6dbe74f\tasks"
  $latestOutput = Get-ChildItem "$taskDir\b5d9533um.output" -ErrorAction SilentlyContinue
  if ($latestOutput) {
    Write-Host "Latest fetched players:" -ForegroundColor Cyan
    Get-Content $latestOutput.FullName -Tail 30 | ForEach-Object {
      if ($_ -match "\.\.\. \d+ teams$") {
        Write-Host "  $_" -ForegroundColor Green
      } elseif ($_ -match "\.\.\. skip$") {
        Write-Host "  $_" -ForegroundColor DarkGray
      } elseif ($_ -match "SAVED") {
        Write-Host "  $_" -ForegroundColor Yellow
      }
    }
  }

  Write-Host ""
  Write-Host "Refresh: $(Get-Date -Format HH:mm:ss)  (every 5s)" -ForegroundColor Gray
  Start-Sleep -Seconds 5
}
