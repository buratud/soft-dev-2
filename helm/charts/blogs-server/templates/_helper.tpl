{{- define "blogs-server.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/api/blogs" $name -}}
{{- end -}}

{{- define "blogs-web.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/blogs" $name -}}
{{- end -}}

{{- define "blogs-server.port"}}
{{- 4002 -}}
{{- end -}}