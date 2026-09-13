# Paperclip Workflow — La Monarca Internacional AI Newsroom

## Overview
This file documents how Kupuri Media's La Monarca Internacional editorial AI integrates with the Paperclip agent harness.

## Agent harness
- **Platform**: Paperclip
- **Master agent**: `editor-in-chief` (see `pi-orchestrator.md`)
- **Config**: `agents.config.json`
- **Daily workflow**: `workflows/daily-positive-edition.json`

## Paperclip-specific configuration

### Memory
Each agent maintains persistent memory of:
- Stories it has previously drafted (to avoid repetition)
- Community sources it has established relationships with
- Affiliate partnerships and their editorial constraints
- Style corrections from Copy Chief (to improve over time)

### Communication
Agents communicate via structured JSON messages:
```json
{
  "from": "musica-editor",
  "to": "editor-in-chief",
  "type": "draft-ready",
  "story_id": "2026-06-22-musica-01",
  "status": "editing",
  "word_count": 450,
  "language": "es",
  "community_voice_included": true,
  "affiliate_opportunity": null
}
```

### Escalation triggers
| Condition | Action |
|-----------|--------|
| Story contains negative topic | Block + alert Editor-in-Chief |
| Fact check fails >2 claims | Return to section editor |
| Translation quality score <0.8 | Flag to Translation Editor for manual review |
| Affiliate conflict detected | Pause publication, alert Editor-in-Chief |
| Story has no community voice | Return to section editor with specific note |

### Tool use (per agent)
- **Section editors**: web search (positive news sources), Supabase draft insert, image search
- **Fact Checker**: web search, Wikipedia API, source citation
- **Translation Editor**: DeepL API (secondary), internal glossary
- **Visual Editor**: Unsplash API, Pexels API, community photo submissions
- **Social Agent**: Postiz API, platform analytics
- **Analytics Agent**: Supabase queries, Google Analytics, newsletter platform API

## Postiz integration
Social Distribution Agent uses Postiz to:
1. Queue posts for Instagram, Facebook, X, Bluesky, Threads
2. Select optimal posting times based on audience data
3. Adapt story excerpts to each platform's character limits
4. Track engagement metrics and feed back to Analytics Agent

## Print production pipeline
The Print Issue Producer agent prepares quarterly print dossiers:
1. Selects 8-12 approved stories from the past quarter
2. Sequences content by category flow and visual rhythm
3. Briefs the human design team with layout notes
4. Coordinates print deadlines for September 2026 (Puerto Vallarta issue)

## Status definitions
| Status | Description |
|--------|-------------|
| `idea` | Story concept logged, not yet assigned |
| `assigned` | Section editor has the story |
| `drafting` | Section editor is writing |
| `editing` | Copy Chief reviewing |
| `fact_check` | Fact Checker verifying claims |
| `translation` | Translation Editor producing EN version |
| `visual_ready` | Visual Editor has selected images |
| `approved` | Editor-in-Chief approved, ready to publish |
| `published` | Live on lamonarcainternacional.com |
| `archived` | Removed from active feed, preserved in database |
