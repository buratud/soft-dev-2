{{- define "global.rootPath"}}
{{- $name := .Values.global.GITHUB_REF -}}
{{- if eq $name "main" -}}{{- "" -}}{{ else }}{{- printf "/%s" $name -}}{{- end -}}
{{- end -}}

{{- define "global.appendTag"}}
{{- $name := .Values.global.GITHUB_REF -}}
{{- if eq $name "main" -}}{{- "" -}}{{ else }}{{- printf "-%s" $name -}}{{- end -}}
{{- end -}}

{{- define "global.env"}}
            - name: BASE_DOMAIN_WITH_PROTOCOL
              value: {{ printf "https://%s" .Values.global.topLevelUrl | quote }}
{{- end -}}
