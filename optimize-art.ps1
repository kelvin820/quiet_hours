$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
$assetDir=Join-Path $PSScriptRoot 'dist/assets'
$originalDir=Join-Path $PSScriptRoot 'artwork/originals'
New-Item -ItemType Directory -Force -Path $originalDir | Out-Null
$codec=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$parameters=[System.Drawing.Imaging.EncoderParameters]::new(1)
$parameters.Param[0]=[System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality,[long]89)
foreach($file in Get-ChildItem -LiteralPath $originalDir -Filter '*.png'){
  if($file.BaseName -notmatch '^(taipei|paris)-' -or $file.BaseName -eq 'taipei-day') { continue }
  $image=[System.Drawing.Image]::FromFile($file.FullName)
  try { $image.Save((Join-Path $assetDir ($file.BaseName+'.jpg')),$codec,$parameters) } finally { $image.Dispose() }
}
$parameters.Dispose()
Get-ChildItem -LiteralPath $assetDir -Filter '*.jpg' | Measure-Object -Property Length -Sum | Select-Object Count,Sum

