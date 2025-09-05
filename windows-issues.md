# Collection of Windows Issues and their resolution

## Port In Use

### Kill Process

```
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
```
