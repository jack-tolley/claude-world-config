# Claude World Configuration

A personal set of Claude Code skills, shared for anyone getting started with Claude Code.

## Contents

- **`.claude/skills/`** - Reusable skills:
  - `interview` — turn a vague idea into a clear spec by asking structured questions before you build
  - `onboard` — deep exploration of an unfamiliar project before making changes
  - `closedown` — end-of-session handoff notes so context carries into the next session
  - `permissions` — manage Claude Code's tool-permission rules conversationally
  - `retrospective` — structured team/individual reflection
  - `research` — evidence-based research workflow for decisions across a business
  - `policies-procedures` — draft, format, and publish organisational policies
  - `ux-feedback` — structured UX review of a webpage, with screenshots
  - `md2pdf` — convert markdown to PDF
- **`.claude/scripts/`** - Utility scripts
- **`.claude/README.md`** - Documentation

Note: slash commands (`.claude/commands/`) have been dropped from this repo — skills now cover the same ground and are the current recommended pattern.

## Usage

Copy the `.claude/skills` directory (or individual skill folders) into your project root to use these configurations.

Note: `settings.local.json` is gitignored as it contains project-specific permissions.
