#!/bin/bash

APP=$1
PORT=$2

docker run -it -p "$PORT:3000" --restart always -v /opt/.data/public:/opt/public --name "$APP" -d "$APP"
