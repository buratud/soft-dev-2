{{- define "markets-web.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/markets" $name -}}
{{- end -}}