#!/bin/bash

mkdir -p ./poseidon-app/src/proto
protoc -I=. ./*.proto \
  --js_out=import_style=commonjs:./poseidon-app/src/proto \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./poseidon-app/src/proto
