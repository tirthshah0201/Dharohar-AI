$ErrorActionPreference = 'Stop'
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
$logPath = 'H:\Project SIH Internal 2026\.freebuff\preview-57b5f967-7508-4c7d-b149-1bd4eae7e507.log'
$logErrPath = 'H:\Project SIH Internal 2026\.freebuff\preview-57b5f967-7508-4c7d-b149-1bd4eae7e507.log.err'

Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev:frontend' -RedirectStandardOutput $logPath -RedirectStandardError $logErrPath -WindowStyle Hidden -PassThru |
    ForEach-Object {
        $_.Id | Out-File 'H:\Project SIH Internal 2026\.freebuff\frontend.pid' -Encoding ascii
        Write-Output $_.Id
    }
