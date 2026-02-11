# onboard

Deep exploration of a codebase or task. Build understanding before writing code.

## Arguments

```
/onboard [path/to/directory] [optional: specific focus area]
```

If no path provided, use current working directory.

## Critical Rules

1. **EXPLORE FIRST** - Never suggest changes until you understand the system
2. **MAP DEPENDENCIES** - Identify how components connect
3. **FIND PATTERNS** - Document existing conventions before proposing new ones
4. **ASK QUESTIONS** - Surface ambiguities early

## Workflow

### Phase 1: Project Structure (2 min)

**Discover layout:**
```bash
# Get directory tree (exclude noise)
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.go" | head -100
ls -la
cat package.json 2>/dev/null || cat pyproject.toml 2>/dev/null || cat go.mod 2>/dev/null
```

**Output:**
```
Project: <name>
Type: <monorepo/single-app/library>
Stack: <languages, frameworks>
Entry points: <main files>
```

──────────

### Phase 2: Architecture Map (3 min)

**Identify layers:**
```
├── API/Routes      → Where requests enter
├── Business Logic  → Core domain code
├── Data Layer      → Database, external services
├── Shared/Utils    → Common utilities
└── Config          → Environment, settings
```

**For each layer, note:**
- Key files
- Naming conventions
- Import patterns

**Output:**
```
Architecture:
- Routes: src/api/* (REST, uses Express)
- Logic: src/services/* (class-based)
- Data: src/db/* (Prisma ORM)
- Config: src/config.ts (env-based)
```

──────────

### Phase 3: Key Patterns (3 min)

**Discover conventions:**

| Pattern | Look For | Example |
|---------|----------|---------|
| Error handling | try/catch, Result types, error boundaries | `AppError` class |
| Validation | Zod, Joi, manual checks | `schemas/*.ts` |
| State management | Redux, Zustand, Context | `stores/*.ts` |
| Testing | Jest, Vitest, pytest | `*.test.ts` patterns |
| Logging | winston, pino, console | `logger.ts` |

**Output:**
```
Patterns:
- Errors: Custom AppError class, thrown and caught at API boundary
- Validation: Zod schemas co-located with routes
- Tests: Vitest, co-located (foo.test.ts next to foo.ts)
```

──────────

### Phase 4: Dependencies & External Services (2 min)

**Map integrations:**
```bash
# Check for API clients, SDKs
grep -r "fetch\|axios\|got" --include="*.ts" -l | head -10
grep -r "process.env" --include="*.ts" -l | head -10
```

**Output:**
```
External Services:
- Database: PostgreSQL (via Prisma)
- Auth: Auth0 (src/auth/auth0.ts)
- Email: SendGrid (src/services/email.ts)
- Storage: S3 (src/services/storage.ts)

Environment Variables Required:
- DATABASE_URL
- AUTH0_SECRET
- SENDGRID_API_KEY
```

──────────

### Phase 5: Development Workflow (2 min)

**Discover how to run/test:**
```bash
# Check scripts
cat package.json | jq '.scripts' 2>/dev/null
cat Makefile 2>/dev/null | head -30
```

**Output:**
```
Commands:
- Dev: npm run dev (starts on :3000)
- Test: npm test (vitest)
- Build: npm run build
- Lint: npm run lint (eslint + prettier)
```

──────────

### Phase 6: Summary Document

Create a summary for future reference:

```markdown
# Project: <name>

## Quick Start
- `npm install` → `npm run dev`
- Runs on http://localhost:3000

## Architecture
- **API**: src/api/* (Express routes)
- **Services**: src/services/* (business logic)
- **DB**: src/db/* (Prisma)

## Key Patterns
- Error handling: AppError thrown, caught at route level
- Validation: Zod schemas in src/schemas/*
- Tests: Co-located, run with `npm test`

## External Services
- PostgreSQL, Auth0, SendGrid, S3

## Conventions
- File naming: kebab-case
- Exports: Named exports preferred
- Commits: Conventional commits (feat:, fix:, etc.)
```

──────────

## Focus Areas

If a specific focus is provided, prioritize:

| Focus | Explore |
|-------|---------|
| `auth` | Authentication flow, session handling, permissions |
| `api` | Route structure, middleware, request/response patterns |
| `data` | Database schema, migrations, queries |
| `tests` | Test setup, mocking patterns, coverage |
| `deploy` | CI/CD, environment configs, build process |

## Output Format

Always end with:

```
Ready to work on this codebase.

Key things I learned:
1. <most important insight>
2. <second insight>
3. <third insight>

Questions before proceeding:
- <any ambiguities>
```

## Anti-Patterns

- **Don't skim** - Actually read key files
- **Don't assume** - Verify conventions exist before following them
- **Don't overwhelm** - Summarize, don't dump everything
- **Don't skip tests** - Understanding test patterns prevents bad PRs
