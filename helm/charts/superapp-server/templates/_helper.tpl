{{- define "superapp-server.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/api" $name -}}
{{- end -}}

{{- define "superapp-server.port"}}
{{- 4000 -}}
{{- end -}}