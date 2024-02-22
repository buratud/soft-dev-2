{{- define "blogs-web.rootPath"}}
{{- $name := (include "global.rootPath" .) -}}
{{- printf "%s/blogs" $name -}}
{{- end -}}