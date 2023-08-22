#!/bin/bash

# INTENDED TO RUN FROM PROJECT ROOT

CWD=$(basename "$(pwd)")
OUT=dist/packages/$CWD/src

COMPILE_SASS=1

if [[ $CWD == "icons" || $CWD == "hooks" ]]; then
  COMPILE_SASS=0
fi

npx tsc --build --verbose

if [[ $COMPILE_SASS == 1 ]]; then
  mkdir -p $OUT

  if [[ $CWD == "common-scss" || $CWD == "navbar"  || $CWD == "sidebar"  || $CWD == "tags" ]]; then
    mv dist/*.* $OUT
    mv $OUT/tsconfig.tsbuildinfo dist/
  fi

  yarn node-sass src/ -o $OUT --output-style compressed &&
  grep -rlZ '\.scss' ./$OUT | xargs -0 -r sed -i 's/\.scss/\.css/g'
fi
