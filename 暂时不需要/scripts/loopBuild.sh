#!/bin/bash
while true; do
  node scripts/fullBuild.js
  EXIT_CODE=$?
  if [ $EXIT_CODE -eq 0 ]; then
    echo "Build completed successfully!"
    break
  fi
  echo "Build crashed (exit $EXIT_CODE), restarting in 2s..."
  sleep 2
done
