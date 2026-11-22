Before you blame the model, check what's already in context:

1. Run /context for a live breakdown by category, including which CLAUDE.md and memory files loaded.
2. Keep each CLAUDE.md under 200 lines.
3. Move reference material into skills. Only descriptions load at start; full content loads when used.
4. Auto memory loads the first 200 lines or 25 KB of MEMORY.md, whichever comes first. Keep it an index.
5. For skills you only run yourself, set disable-model-invocation: true so the description stays out of context.
