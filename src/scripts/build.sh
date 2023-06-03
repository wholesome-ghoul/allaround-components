#!/bin/bash

# INTENDED TO RUN FROM PROJECT ROOT

OUT=dist/packages/*/src

npx tsc --build --verbose &&
  cp src/*.d.ts $OUT &&
  yarn node-sass src/ -o $OUT --output-style compressed &&
  grep -rlZ '\.scss' ./$OUT | xargs -0 -r sed -i 's/\.scss/\.css/g'
