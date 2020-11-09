#!/bin/bash


docker build -t shah06/node_app .

#docker network create app_network

#docker run --name mysql --net app_network -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql:5.7

#docker run --name node_app --net app_network -p 80:8080 --rm -d shah06/node_app

docker-compose up
docker-compose rm -fv

