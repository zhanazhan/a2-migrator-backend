# setup-line-endings.ps1

Write-Host "🛠 Configuring Git and project for consistent LF line endings..."

# Step 1: Set Git core.autocrlf
Write-Host "🔧 Setting Git core.autocrlf to 'true' (for Windows)..."
git config --global core.autocrlf true

# Step 2: Create .editorconfig
$editorConfigPath = ".editorconfig"
if (-Not (Test-Path $editorConfigPath)) {
    Write-Host "📄 Creating .editorconfig..."
    @"
root = true

[*]
end_of_line = lf
charset = utf-8
insert_final_newline = true
"@ | Set-Content -Encoding UTF8 -NoNewline $editorConfigPath
} else {
    Write-Host "✅ .editorconfig already exists. Skipping creation."
}

# Step 3: Create .gitattributes
$gitattributesPath = ".gitattributes"
if (-Not (Test-Path $gitattributesPath)) {
    Write-Host "📄 Creating .gitattributes..."
    "* text=auto eol=lf" | Set-Content -Encoding UTF8 -NoNewline $gitattributesPath
} else {
    Write-Host "✅ .gitattributes already exists. Skipping creation."
}

# Step 4: Normalize all line endings via Git
Write-Host "🔄 Renormalizing files..."
git add --renormalize .
git commit -m "chore: normalize line endings via setup script" --allow-empty

Write-Host "`n✅ All done! Your project should now have consistent LF line endings."
