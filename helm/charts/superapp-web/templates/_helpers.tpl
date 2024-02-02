{{- define "superapp-web.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- if eq $name "" -}}{{- "/" -}}{{ else }}{{- printf "%s" $name -}}{{- end -}}
{{- end -}}