#!/bin/bash

npm run build

rm -r ../Errand-for-me-back/src/main/resources/static

mv build ../Errand-for-me-back/src/main/resources/static
