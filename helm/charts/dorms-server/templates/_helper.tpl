{{- define "dorms-server.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/api/dorms" $name -}}
{{- end -}}

{{- define "dorms-web.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/dorms" $name -}}
{{- end -}}
