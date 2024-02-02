#!/bin/bash
PUSH_PATTERN='^(refs/heads/)(.+)'
PULL_PATTERN='^(refs/pull/)(.+)(/merge)'
GIT_REF=$(echo $GITHUB_REF | sed -r "s|$PUSH_PATTERN|\2|g")
GIT_REF=$(echo $GIT_REF | sed -r "s|$PULL_PATTERN|\2|g")
GIT_REF=$(echo $GIT_REF | sed -r "s|/|-|g")
echo "GIT_REF=$GIT_REF"

if (GIT_REF == "main")
then
  echo 'BASE_SUPERAPP_WEB_PATH=""'
else
  echo "BASE_SUPERAPP_WEB_PATH=/$GIT_REF"
fi