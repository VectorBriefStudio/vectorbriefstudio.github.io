# Vector Brief kit

Copy-paste configs from Vector Brief videos: visual briefs on AI and the systems behind it. Each one is checked against the official docs on the date shown.

**Live page:** https://vectorbriefstudio.github.io/

| # | Brief | Files | Docs |
| - | - | - | - |
| 01 | Use 3 XML tags | [01-xml-tags](01-xml-tags) | [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) |
| 02 | Keep the cache warm for an hour | [02-prompt-caching](02-prompt-caching) | [API](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), [Claude Code](https://code.claude.com/docs/en/prompt-caching) |
| 03 | Parallel agents with worktrees | [03-worktrees](03-worktrees) | [Worktrees](https://code.claude.com/docs/en/worktrees) |
| 04 | What loads before you type | [04-session-context](04-session-context) | [Context window](https://code.claude.com/docs/en/context-window), [Memory](https://code.claude.com/docs/en/memory) |
| 05 | Where "don't ask again" approvals go | [05-dont-ask-again](05-dont-ask-again) | [Permissions](https://code.claude.com/docs/en/permissions), [Settings](https://code.claude.com/docs/en/settings) |
| 06 | CLAUDE.md suggests, a hook enforces | [06-hooks-enforce](06-hooks-enforce) | [Memory](https://code.claude.com/docs/en/memory), [Hooks guide](https://code.claude.com/docs/en/hooks-guide), [Permissions](https://code.claude.com/docs/en/permissions) |
| 07 | Subagents save context, not usage | [07-subagents-cost](07-subagents-cost) | [Subagents](https://code.claude.com/docs/en/sub-agents), [Costs](https://code.claude.com/docs/en/costs) |
| 08 | `/loop` is for this session, not next week | [08-loop-expires](08-loop-expires) | [Scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks), [Desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks) |
| 09 | Keep CLAUDE.md under 200 lines | [09-claude-md-size](09-claude-md-size) | [Memory](https://code.claude.com/docs/en/memory), [Skills](https://code.claude.com/docs/en/skills) |
| 10 | Turn `/fast` on at the start, not mid-way | [10-fast-mode](10-fast-mode) | [Fast mode](https://code.claude.com/docs/en/fast-mode), [Prompt caching](https://code.claude.com/docs/en/prompt-caching), [Pricing](https://platform.claude.com/docs/en/about-claude/pricing) |

Watch: [YouTube](https://www.youtube.com/@VectorBriefStudio) · [Instagram](https://www.instagram.com/vectorbriefstudios/) · [Facebook](https://www.facebook.com/profile.php?id=61596500894799) · Business: vectorlogic.yt@gmail.com

## Adding a brief

1. Put the snippet files in a new `NN-slug/` folder and a 360x640 cover frame in `covers/NN.jpg`.
2. Add an entry to `briefs.json` (the newest brief is shown first).
3. Run `node build.mjs` to regenerate `index.html` from `template.html`, then commit and push. GitHub Pages deploys `main` automatically.

Vector Brief is an independent channel, not affiliated with or endorsed by Anthropic. Claude is a trademark of Anthropic. Configs are free to use under [MIT-0](LICENSE).
