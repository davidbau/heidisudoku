#!/usr/bin/env bash

VERSION=`grep version manifest.json | sed 's/^.*\.\([0-9]*\.[0-9]*\)".*$/\1/'`
OUTPUT="sudoku-$VERSION.zip"
sed "s/<p id=version>[^<]*<\\/p>/<p id=version>Version $VERSION<\\/p>/" about.html > about.html.new
mv -f about.html.new about.html
rm -f $OUTPUT
zip -r $OUTPUT . -i \*.html \*.gif \*.png \*.json \*.js \*.ttf \*.css
echo $OUTPUT
