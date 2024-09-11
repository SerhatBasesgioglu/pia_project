#!/bin/bash

kubectl apply -f confluence/db/pv.yaml
kubectl apply -f confluence/db/pvc.yaml
kubectl apply -f confluence/db/deployment.yaml
kubectl apply -f confluence/db/service.yaml

kubectl apply -f jira/db/pv.yaml
kubectl apply -f jira/db/pvc.yaml
kubectl apply -f jira/db/deployment.yaml
kubectl apply -f jira/db/service.yaml

kubectl apply -f camunda/app/pv.yaml
kubectl apply -f camunda/app/pvc.yaml
kubectl apply -f camunda/app/deployment.yaml
kubectl apply -f camunda/app/service.yaml

kubectl apply -f jenkins/app/pv.yaml
kubectl apply -f jenkins/app/pvc.yaml
kubectl apply -f jenkins/app/deployment.yaml
kubectl apply -f jenkins/app/service.yaml

kubectl apply -f confluence/app/pv.yaml
kubectl apply -f confluence/app/pvc.yaml
kubectl apply -f confluence/app/deployment.yaml
kubectl apply -f confluence/app/service.yaml

kubectl apply -f jira/app/pv.yaml
kubectl apply -f jira/app/pvc.yaml
kubectl apply -f jira/app/deployment.yaml
kubectl apply -f jira/app/service.yaml