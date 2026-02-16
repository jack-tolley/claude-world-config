# Claude Skills

Reusable Claude Code skills, commands, and workflows for debugging, research, testing, and session management.

## What's This?

This is a collection of battle-tested [Claude Code](https://code.claude.com/) skills and commands that make AI-assisted development more powerful and repeatable. Instead of ad-hoc prompts, these provide structured workflows for common tasks.

## Quick Start

### Installation

Clone this repo into your project's `.claude/` directory or your global `~/.claude/` directory:

```bash
# For a single project
cd your-project
git clone https://github.com/jack-tolley/claude-skills .claude

# For global availability across all projects
git clone https://github.com/jack-tolley/claude-skills ~/.claude
```

Alternatively, symlink it:

```bash
# Clone once, symlink everywhere
git clone https://github.com/jack-tolley/claude-skills ~/claude-skills
ln -s ~/claude-skills ~/.claude
```

### Using a Skill

Skills are invoked automatically by Claude Code when needed, or you can explicitly request them:

```
/onboard          # Explore a codebase before making changes
/interview        # Gather requirements through structured questions
/debug            # Runtime debugging with automated log collection
/closedown        # End-of-session context preservation
```

## What's Included

### Commands

Located in `commands/` — these are slash commands you can invoke in Claude Code:

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/onboard [path] [focus]` | Deep codebase exploration | Before making changes to unfamiliar code |
| `/interview` | Requirements gathering interview | Transforming vague ideas into complete specs |
| `/write-tests [file]` | Unit test generation | Adding tests for business logic |
| `/polish` | Remove AI slop, fix lint errors | After code generation, before commit |
| `/security-review [path]` | Scan for secrets, CVEs, OWASP issues | Before deployment or PR review |

### Skills

Located in `skills/` — these are domain knowledge modules that Claude uses automatically:

#### Debug Skill (`skills/debug/`)

Evidence-based debugging workflow with automated log collection. No more guessing — get runtime data.

**Triggers:**
- Bug requires user interaction to reproduce
- Values are unexpected at runtime
- Race conditions or timing issues

**Workflow:**
1. Start log collection server
2. Generate hypotheses
3. Instrument code with logging
4. User reproduces bug
5. Analyze logs
6. Fix with evidence
7. Verify fix
8. Clean up instrumentation

#### Research Skill (`skills/research/`)

Strategic research workflow for executive decision-making across domains (funding, HR, finance, sales, compliance, strategy).

**Example:**
```
/research compensation benchmarks hr
/research grant opportunities govt-funding
```

**Workflow:**
1. Define SMART research question
2. Identify credible sources
3. Gather evidence systematically
4. Apply analysis framework (SWOT, PESTLE, etc.)
5. Synthesize cross-domain impacts
6. Create board-ready summary

#### Closedown Skill (`skills/closedown/`)

End-of-session workflow for context preservation and handoff.

**Triggers:**
- "I'm done for today"
- "Let's wrap up"
- Before context window compression

**Workflow:**
1. Summarize accomplishments and decisions
2. Preserve context (update CLAUDE.md, session notes)
3. Prepare handoff (next actions, blockers, open questions)
4. Cleanup (commit/stash code, archive logs)
5. Setup next session (create pickup context file)

#### Markdown to PDF Skill (`skills/md2pdf/`)

Convert markdown files to well-formatted PDFs with GitHub-style formatting.

**Features:**
- GitHub-style code blocks and formatting
- Supports headings, lists, tables, bold/italic
- A4 page size with professional margins
- No system dependencies (pure Python)

#### Retrospective Skill (`skills/retrospective/`)

Structured team and individual reflection facilitator using proven retrospective formats.

**Triggers:**
- "Let's do a retro"
- End of sprint/project/milestone
- "How can we improve?"

**Formats:**
- Start/Stop/Continue (default)
- 4Ls (Liked, Learned, Lacked, Longed For)
- Sailboat, Mad/Sad/Glad, Timeline, Roses/Thorns/Buds

**Workflow:**
1. Choose format and setup context
2. Facilitate structured questions
3. Capture responses and themes
4. Generate action items
5. Document takeaways
6. Track follow-up

#### Policies & Procedures Skill (`skills/policies-procedures/`)

Full lifecycle policy and procedure management with GitHub/Notion sync.

**Triggers:**
- "We need a policy for..."
- "Reformat these procedures"
- "Are our policies in sync?"

**Workflow:**
1. Research legal/compliance requirements
2. Draft using standard template
3. Review for quality and compliance
4. Publish to GitHub
5. Cross-post to Notion
6. Audit for drift detection

#### Workflow Optimization Skill (`skills/optimise-work/`)

Identifies time-wasting tasks and recommends high-ROI automation opportunities.

**Triggers:**
- "This takes too much time"
- "I keep doing this over and over"
- "There must be a better way"

**Workflow:**
1. Map current state (time audit)
2. Analyze pain points
3. Research solutions (automation, tools, process changes)
4. Prioritize by ROI
5. Implement or prototype
6. Measure and iterate

#### Dev Academy Sales Skill (`skills/dev-academy-sales/`)

**Note:** Business-specific skill — not included in this public repo (gitignored).

Multi-agent sales workflow for Dev Academy lead management and response drafting with HubSpot CRM integration, lead routing, and objection handling.

### Scripts

Located in `scripts/` — helper scripts used by skills:

- `get-pr-review-comments.sh` — Fetch PR review comments via GitHub CLI
- `simple_md_to_pdf.py` — Markdown to PDF converter (used by md2pdf skill)

## How Claude Code Discovers These

Claude Code automatically loads commands and skills from:

1. **Project-level:** `.claude/` in your project root
2. **User-level:** `~/.claude/` in your home directory
3. **Managed policy:** `/Library/Application Support/ClaudeCode/CLAUDE.md` (org-wide)

Commands are invoked with `/command-name`. Skills are triggered automatically when Claude detects the pattern.

## Customizing

### Adding Your Own Commands

1. Create `commands/your-command.md`
2. Add YAML frontmatter (optional):
   ```yaml
   ---
   argument-hint: [description]
   model: opus  # optional: use specific model
   ---
   ```
3. Document the workflow with clear steps
4. Use consistent formatting (see existing commands)

### Adding Your Own Skills

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

1. **Tiered automation** — Auto-fix low-risk, ask for high-risk
2. **Evidence-based** — Never guess, collect data first
3. **User approval gates** — Confirm destructive operations
4. **Batch processing** — Group files to manage context
5. **Structured output** — Use clickable links, todo tracking

## Resources

- [Claude Code Documentation](https://code.claude.com/docs)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

## Contributing

Contributions are welcome! If you've built a useful skill or command:

1. Fork this repo
2. Add your skill/command following the structure above
3. Ensure it's generic (no hardcoded paths, credentials, or business-specific logic)
4. Submit a PR with a clear description

## License

MIT License — see [LICENSE](LICENSE) file for details.

---

**Built by [Jack Tolley](https://github.com/jack-tolley)** — General Manager at Dev Academy, using Claude Code daily for agentic business operations
