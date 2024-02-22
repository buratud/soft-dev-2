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
            - name: NEXT_PUBLIC_BASE_DOMAIN_WITH_PROTOCOL
              value: {{ printf "https://%s" .Values.global.topLevelUrl | quote }}
            - name: REACT_APP_BASE_DOMAIN_WITH_PROTOCOL
              value: {{ printf "https://%s" .Values.global.topLevelUrl | quote }}
            - name: MAIN_URL
              value: {{ printf "https://%s%s" .Values.global.topLevelUrl (include "global.rootPath" .) | quote }}
            - name: NEXT_PUBLIC_MAIN_URL
              value: {{ printf "https://%s%s" .Values.global.topLevelUrl (include "global.rootPath" .) | quote }}
            - name: REACT_APP_MAIN_URL
              value: {{ printf "https://%s%s" .Values.global.topLevelUrl (include "global.rootPath" .) | quote }}
            - name: BASE_SUPERAPP_WEB_PATH
              value: {{ include "global.rootPath" . | quote }}
            - name: BASE_SUPERAPP_SERVER_PATH
              value: {{ include "superapp-server.rootPath" . | quote }}
            - name: NEXT_PUBLIC_BASE_SUPERAPP_WEB_PATH
              value: {{ include "global.rootPath" . | quote }}
            - name: NEXT_PUBLIC_BASE_SUPERAPP_SERVER_PATH
              value: {{ include "superapp-server.rootPath" . | quote }}
            - name: REACT_APP_BASE_SUPERAPP_WEB_PATH
              value: {{ include "global.rootPath" . | quote }}
            - name: REACT_APP_BASE_SUPERAPP_SERVER_PATH
              value: {{ include "superapp-server.rootPath" . | quote }}
{{- end -}}
