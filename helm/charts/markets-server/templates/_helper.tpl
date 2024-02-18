{{- define "markets-server.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/api/markets" $name -}}
{{- end -}}

{{- define "markets-web.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/markets" $name -}}
{{- end -}}

{{- define "markets-server.port"}}
{{- 4001 -}}
{{- end -}}