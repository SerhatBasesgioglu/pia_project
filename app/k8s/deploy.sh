#!/bin/bash

kubectl apply -f backend/redis/app/deployment.yaml
kubectl apply -f backend/redis/app/service.yaml

kubectl apply -f backend/rabbitmq/app/deployment.yaml
kubectl apply -f backend/rabbitmq/app/service.yaml
