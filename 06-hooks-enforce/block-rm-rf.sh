#!/bin/bash
COMMAND=$(jq -r '.tool_input.command')
if echo "$COMMAND" | grep -q "rm -rf"; then
  echo "Blocked: rm -rf isn't allowed" >&2
  exit 2
fi
exit 0
