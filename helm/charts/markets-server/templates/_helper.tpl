{{- define "markets-server.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/api/markets" $name -}}
{{- end -}}
