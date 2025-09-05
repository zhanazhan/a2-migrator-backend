# PowerShell script: setup-nest-structure.ps1

$dirs = @(
  "src",
  "src/config",
  "src/common",
  "src/common/decorators",
  "src/common/filters",
  "src/common/guards",
  "src/common/interceptors",
  "src/common/utils",
  "src/core",
  "src/core/logger",
  "src/core/exceptions",
  "src/modules",
  "src/modules/users/controllers",
  "src/modules/users/services",
  "src/modules/users/dtos",
  "src/modules/users/entities",
  "src/modules/auth/strategies",
  "src/modules/auth/guards",
  "src/modules/auth/dtos",
  "src/database",
  "src/database/seeds",
  "src/database/migrations",
  "src/middleware",
  "src/jobs",
  "src/schedulers",
  "src/tasks",
  "src/interfaces",
  "src/libs",
  "src/libs/mailer"
)

foreach ($dir in $dirs) {
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  New-Item -ItemType File -Force -Path "$dir\.gitkeep" | Out-Null
}

Write-Host "Folders created and .gitkeep added to each."
