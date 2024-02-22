#!/bin/bash
PUSH_PATTERN='^(refs/heads/)(.+)'
PULL_PATTERN='^(refs/pull/)(.+)(/merge)'
GIT_REF=$(echo $GITHUB_REF | sed -r "s|$PUSH_PATTERN|\2|g")
GIT_REF=$(echo $GIT_REF | sed -r "s|$PULL_PATTERN|\2|g")
GIT_REF=$(echo $GIT_REF | sed -r "s|/|-|g")
echo "GIT_REF=$GIT_REF"

BASE_PATH=$([ "$GIT_REF" == "main" ] && echo "" || echo "/$GIT_REF")

echo 'BASE_DOMAIN_WITH_PROTOCOL=https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com'

echo "BASE_SUPERAPP_WEB_PATH=$BASE_PATH"
echo "BASE_SUPERAPP_SERVER_PATH=$BASE_PATH/api"

echo "BASE_EATS_WEB_PATH=$BASE_PATH/eats"
echo "BASE_EATS_SERVER_PATH=$BASE_PATH/api/eats"

echo "BASE_DORM_WEB_PATH=$BASE_PATH/dorms"
echo "BASE_DORM_SERVER_PATH=$BASE_PATH/api/dorms"

echo "BASE_BLOG_WEB_PATH=$BASE_PATH/blogs"
echo "BASE_BLOG_SERVER_PATH=$BASE_PATH/api/blogs"

echo "BASE_MARKET_WEB_PATH=$BASE_PATH/markets"
echo "BASE_MARKET_SERVER_PATH=$BASE_PATH/api/markets"

echo "MAIN_URL=https://linux-vm-southeastasia-2.southeastasia.cloudapp.azure.com$BASE_PATH"