#!/usr/bin/env bash

rm -rf doc/
yarn doc &&
cd doc &&
git init &&
git add . &&
git commit -m "first commit" &&
git remote add origin git@github.com:richard1230/RUI-website.git &&
git push -u origin master -f &&
cd ..