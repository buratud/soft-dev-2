{{- define "superapp-server.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/api" $name -}}
{{- end -}}