$ErrorActionPreference = 'Stop'; # stop on all errors

$toolsDir   = "$(Split-Path -parent $MyInvocation.MyCommand.Definition)"
$fileLocation = Join-Path $toolsDir 'Believers Sword Setup 0.4.14.exe'

$packageArgs = @{
  packageName   = $env:ChocolateyPackageName
  unzipLocation = $toolsDir
  fileType      = 'exe' #only one of these: exe, msi, msu
  file         = $fileLocation

  softwareName  = 'believers-sword-app*' #part or all of the Display Name as you see it in Programs and Features. It should be enough to be unique

  checksum      = ''
  checksumType  = 'sha256' #default is md5, can also be sha1, sha256 or sha512
  checksum64    = ''
  checksumType64= 'sha256' #default is checksumType

  # MSI
  silentArgs    = "/qn /norestart /l*v `"$($env:TEMP)\$($packageName).$($env:chocolateyPackageVersion).MsiInstall.log`"" # ALLUSERS=1 DISABLEDESKTOPSHORTCUT=1 ADDDESKTOPICON=0 ADDSTARTMENU=0
  validExitCodes= @(0, 3010, 1641)
}

Install-ChocolateyPackage @packageArgs