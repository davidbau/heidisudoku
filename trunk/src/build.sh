#!/usr/bin/env bash

VERSION=`grep version manifest.json | sed 's/^.*\(0\.[0-9]*\)".*$/\1/'`
OUTPUT="sudoku-$VERSION.zip"
rm -f $OUTPUT
zip -r $OUTPUT . -i \*.html \*.gif \*.png \*.json \*.js \*.ttf
echo $OUTPUT
