{{- define "eats-web.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/eats" $name -}}
{{- end -}}