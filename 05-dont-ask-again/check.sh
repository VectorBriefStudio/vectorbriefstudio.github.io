# the allow rules you approved
cat .claude/settings.local.json

# prints the ignore rule that covers the file (no output = not ignored)
git check-ignore -v .claude/settings.local.json
