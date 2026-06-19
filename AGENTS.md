# Repository Agent Instructions

## Agent-Media skills

The `gitroomhq/agent-media` skills are installed in `.agents/skills` and tracked by `skills-lock.json`. When a task asks for UGC videos, portraits, character sheets, subtitles, lip sync, b-roll talking-head videos, product-in-hands videos, wireframes, or publishing generated videos to social channels, agents should load the matching `SKILL.md` file before acting.

Agent-Media actions require the user's Agent-Media credentials. Do not invent API keys, OAuth channel IDs, generated media URLs, or publish confirmations. If credentials or OAuth authorization are missing, report the blocker and the exact value or human action required.

Use `AGENT_MEDIA_API_KEY` for REST/API access when an MCP tool is not available. Social publishing still requires connected channels and human OAuth authorization before an agent can publish or schedule content.
