#!/bin/bash

# INTENDED TO RUN FROM PROJECT ROOT

CWD=$(basename "$(pwd)")
OUT=dist/packages/$CWD/src

npx tsc --build --verbose &&
  yarn node-sass src/ -o $OUT --output-style compressed &&
  grep -rlZ '\.scss' ./$OUT | xargs -0 -r sed -i 's/\.scss/\.css/g'
