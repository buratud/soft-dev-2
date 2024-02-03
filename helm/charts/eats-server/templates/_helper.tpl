{{- define "eats-server.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/api/eats" $name -}}
{{- end -}}
