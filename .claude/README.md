# Claude Code Configuration

Custom commands, skills, and workflows for Claude Code.

## Directory Structure

```
.claude/
├── README.md              # This file
├── settings.local.json    # Personal permissions (gitignored)
├── commands/              # Slash commands (/command-name)
│   ├── interview.md       # Requirements gathering interview
│   ├── onboard.md         # Deep codebase exploration
│   ├── write-tests.md     # Unit test generation
│   ├── polish.md          # AI slop removal, lint fixes
│   └── security-review.md # Vulnerability scanning
├── skills/                # Domain knowledge modules
│   ├── debug/
│   │   ├── SKILL.md       # Evidence-based debugging workflow
│   │   ├── package.json
│   │   └── scripts/
│   │       ├── debug_server.js   # Log collection server
│   │       └── debug_cleanup.js  # Remove debug instrumentation
│   ├── research/
│   │   └── SKILL.md       # Executive research workflow
│   └── closedown/
│       └── SKILL.md       # Session closedown & handoff
└── scripts/               # Helper scripts
    └── get-pr-review-comments.sh
```

## Commands

### `/onboard [path] [focus]`
Deep exploration of a codebase before making changes. Maps architecture, discovers patterns, identifies conventions.

**Example:**
```
/onboard ./my-project auth
```

### `/write-tests [file] [function]`
Generate unit tests for business logic. Mocks external dependencies, co-locates tests, follows existing patterns.

**Example:**
```
/write-tests src/utils/validation.ts
```

### `/polish`
Remove AI slop (unnecessary comments, type bypasses) and fix lint errors. Autonomous, no confirmation needed.

**Example:**
```
/polish
```

### `/security-review [path] [focus]`
Scan for security vulnerabilities: hardcoded secrets, dependency CVEs, OWASP Top 10 issues.

**Focus areas:** `secrets`, `deps`, `owasp`, `all` (default)

**Example:**
```
/security-review ./src secrets
```

## Skills

### Debug Skill
Evidence-based debugging with automated log collection. Use when you need runtime evidence instead of guessing.

**Triggers:**
- Bug requires user interaction to reproduce
- Values are unexpected at runtime
- Race conditions or timing issues

**Workflow:**
1. Start log server
2. Generate hypotheses
3. Instrument code
4. User reproduces bug
5. Analyze logs
6. Fix with evidence
7. Verify fix
8. Clean up instrumentation

### Research Skill
Strategic research workflow for executive leaders managing multiple domains.

**Domains:** `funding` | `govt-funding` | `hr` | `finance` | `board` | `sales` | `marketing` | `compliance` | `strategy` | `operations`

**Example:**
```
/research compensation benchmarks hr
/research grant opportunities govt-funding
```

**Workflow:**
1. Define research question (SMART criteria)
2. Identify credible sources
3. Gather evidence systematically
4. Apply analysis framework (SWOT, PESTLE, etc.)
5. Synthesize cross-domain impacts
6. Create board-ready summary

### Closedown Skill
End-of-session workflow for context preservation and handoff.

**Triggers:**
- "I'm done for today"
- "Let's wrap up"
- End of significant work block
- Before context window compression

**Example:**
```
/closedown
/closedown team
/closedown [person name]
```

**Workflow:**
1. Summarize accomplishments and decisions
2. Preserve context (update CLAUDE.md, session notes)
3. Prepare handoff (next actions, blockers, open questions)
4. Cleanup (commit/stash code, archive logs)
5. Setup next session (create pickup context file)

## Adding New Commands

1. Create `commands/your-command.md`
2. Add YAML frontmatter (optional):
   ```yaml
   ---
   argument-hint: [description]
   model: opus  # optional: use specific model
   ---
   ```
3. Document workflow with clear steps
4. Use consistent formatting (see existing commands)

## Adding New Skills

1. Create `skills/skill-name/SKILL.md`
2. Add YAML frontmatter:
   ```yaml
   ---
   name: skill-name
   description: When and how to use this skill
   ---
   ```
3. Add any supporting scripts in `skills/skill-name/scripts/`
4. Document phases, critical rules, and checklist

## Best Practices

Based on analysis of production projects:

1. **Tiered automation** - Auto-fix low-risk, ask for high-risk
2. **Evidence-based** - Never guess, collect data first
3. **User approval gates** - Confirm destructive operations
4. **Batch processing** - Group files to manage context
5. **Structured output** - Use clickable links, todo tracking

## Resources

- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Common Workflows](https://code.claude.com/docs/en/common-workflows)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
