#!/usr/bin/env bash

npm version $1 &&
git push

#$1: patch;major;minor