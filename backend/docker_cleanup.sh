#!/bin/bash

# Stop All containers
docker stop $(docker ps -a -q)

# Destroy All Container
docker rm $(docker ps -a -q)

# Destroy all images
docker rmi $(docker ps -a -q)
