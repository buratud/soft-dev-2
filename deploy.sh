#!/bin/bash

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

mkdir $HOME/.kube
echo $KUBE_CONFIG > $HOME/.kube/config

sed -i "s|softdev2southeastasia.azurecr.io/superapp-web|softdev2southeastasia.azurecr.io/superapp-web:$GITHUB_SHA|g" k8s/superapp/web.yaml

kubectl apply -f k8s/superapp/web-configmap.yaml
kubectl apply -f k8s/superapp/web.yaml
kubectl apply -f k8s/superapp/web-service.yaml
kubectl apply -f k8s/ingress.yaml
