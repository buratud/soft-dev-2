{{- define "dorms-web.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/dorms" $name -}}
{{- end -}}