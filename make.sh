#!/bin/bash

set -e

node ./google-autocomplete.js

convert \
  -trim \
  -bordercolor white \
  -border 20x20 \
  -background white \
  -splice 0x10 \
  google.png \
  out.png

node toot.js

# open out.png
