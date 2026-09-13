# Agent-Media Setup

The `gitroomhq/agent-media` skill pack has been installed into this repository with:

```bash
npx skills add gitroomhq/agent-media
```

Installed skills are stored under `.agents/skills` and locked in `skills-lock.json` so future agents can discover the same media workflows.

## Installed capabilities

- Agent-Media UGC Playbook
- Make B-roll Talking Head
- Make Character Sheet
- Make Lip Sync
- Make Portrait
- Make Product In Hands
- Make Simple Selfie
- Make Subtitles
- Make UGC Video
- Make Wireframe
- Publish to Social

## How agents should use it

1. Load the relevant `.agents/skills/<skill>/SKILL.md` file for the requested media task.
2. Prefer the Agent-Media MCP tool listed in that skill when available.
3. If MCP tools are unavailable, use the REST fallback documented in the skill with `AGENT_MEDIA_API_KEY`.
4. Never claim a video was generated, a channel was connected, or a post was published unless Agent-Media returns a real result.

## Required secret

Add this value locally and in deployment/agent secrets when Agent-Media API access is needed:

```bash
AGENT_MEDIA_API_KEY=<agent-media-api-key>
```

Social publishing also requires a human to complete the provider OAuth flow. After OAuth, use the returned channel IDs for publish or schedule operations.
