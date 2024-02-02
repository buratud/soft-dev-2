#!/bin/bash
PUSH_PATTERN='^(refs/heads/)(.+)'
PULL_PATTERN='^(refs/pull/)(.+)(/merge)'
$GIT_SHA=$(echo $GITHUB_SHA | sed -r "s|$PUSH_PATTERN|\2|g")
$GIT_SHA=$(echo $GIT_SHA | sed -r "s|$PULL_PATTERN|\2|g")
$GIT_SHA=$(echo $GIT_SHA | sed -r "s|/|-|g")
echo "GIT_SHA=$GIT_SHA"
export GIT_SHA=$GIT_SHA