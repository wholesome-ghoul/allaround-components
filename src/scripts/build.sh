#!/bin/bash

# INTENDED TO RUN FROM PROJECT ROOT

npx tsc --build --verbose &&
  yarn node-sass src/ -o dist/ --output-style compressed &&
  grep -rlZ '\.scss' ./dist | xargs -0 -r sed -i 's/\.scss/\.css/g'
