# polish

Remove AI slop and lint errors from changed files. Autonomous, no confirmation needed.

## Critical Rules

1. **ONLY remove slop** - No refactoring, no "improvements"
2. **ONLY fix lint/type errors** - Not style preferences
3. **NEVER change logic** - If unsure, skip it
4. **NEVER touch unrelated code** - Stay focused on changed files
5. **Batch process** - Don't read all files at once

## What is Slop?

AI-generated code patterns that add noise without value:

| Remove (Slop) | Keep (Intentional) |
|---------------|-------------------|
| Comments explaining WHAT code does | Comments explaining WHY |
| `as any` to bypass type errors | Legitimate type assertions with reason |
| Defensive try/catch around safe code | Error handling at boundaries |
| Unused imports/variables | Variables used later |
| Console.log debugging | Intentional logging |
| Overly verbose variable names | Descriptive but reasonable names |
| Redundant null checks | Necessary null handling |
| Empty catch blocks | Catch blocks with error handling |

## Slop Examples

**Remove:**
```typescript
// Get the user from the database
const user = await db.getUser(id);

// Check if user exists
if (user) {
  // Return the user data
  return user;
}
```

**Keep:**
```typescript
// Fallback to guest user for backwards compatibility with v1 API
const user = await db.getUser(id) ?? guestUser;
return user;
```

**Remove:**
```typescript
const result = someValue as any;
```

**Keep:**
```typescript
// External API returns untyped JSON, validated by Zod below
const result = response.data as unknown;
const validated = schema.parse(result);
```

## Workflow

### Step 0: Determine Scope

Get changed files:

```bash
# Branch changes vs main
git diff main...HEAD --name-only | grep -E '\.(ts|tsx|js|jsx)$'

# Or staged files
git diff --cached --name-only | grep -E '\.(ts|tsx|js|jsx)$'
```

**Output:**
```
Found 8 files changed:
- src/auth/* (3 files)
- src/api/* (2 files)
- src/utils/* (3 files)
```

──────────

### Step 1: Group Files by Area

```
Batch 1: src/auth/login.ts, src/auth/session.ts, src/auth/middleware.ts
Batch 2: src/api/users.ts, src/api/products.ts
Batch 3: src/utils/format.ts, src/utils/validate.ts, src/utils/helpers.ts
```

Create TODO list with batches.

──────────

### Step 2: Process Each Batch

**For each batch:**

1. Read the **diff only** (not full files):
   ```bash
   git diff main...HEAD -- src/auth/
   ```

2. Identify slop patterns in changed lines

3. Apply fixes silently (no confirmation needed)

4. Mark batch complete

**After each batch:**
```
Batch 1 done: Removed 3 WHAT comments, 1 console.log, 2 unused imports
```

──────────

### Step 3: Final Lint Check

Run linter on changed files only:

```bash
# ESLint
npx eslint --fix src/auth/ src/api/ src/utils/

# TypeScript
npx tsc --noEmit

# Or project-specific
npm run lint -- --fix
```

Fix any remaining lint errors.

──────────

### Step 4: Summary

```
Polish complete:

Removed:
- 8 WHAT comments
- 3 console.log statements
- 5 unused imports
- 2 empty catch blocks

Fixed:
- 4 lint errors (no-unused-vars)
- 1 type error (implicit any)

Files modified: 6
```

## Detection Patterns

### Comments to Remove

```typescript
// REMOVE: Explains what
// Get user by ID
const user = getUser(id);

// REMOVE: Obvious from code
// Increment counter
counter++;

// REMOVE: Section dividers with no info
// ==================
// Helper Functions
// ==================

// KEEP: Explains why
// Cache for 5 min to reduce DB load during traffic spikes
const CACHE_TTL = 300;

// KEEP: Non-obvious behavior
// Must await here - concurrent writes cause race condition
await mutex.acquire();
```

### Type Bypasses to Remove

```typescript
// REMOVE: Lazy type bypass
const data = response as any;

// REMOVE: Hiding type errors
// @ts-ignore
const result = badlyTypedFunction();

// KEEP: Intentional with explanation
// External library types are incorrect, opened issue #123
// @ts-expect-error - WidgetConfig.timeout exists but not in types
config.timeout = 5000;
```

### Defensive Code to Remove

```typescript
// REMOVE: Unnecessary null check (TypeScript guarantees non-null)
function greet(name: string) {
  if (name === null || name === undefined) {
    return "Hello";
  }
  return `Hello ${name}`;
}

// REMOVE: Try/catch around safe code
try {
  const sum = a + b;
} catch (e) {
  console.error(e);
}

// KEEP: Boundary validation
function processUserInput(input: unknown) {
  if (typeof input !== 'string') {
    throw new ValidationError('String required');
  }
  return input.trim();
}
```

## What NOT to Touch

| Leave Alone | Reason |
|-------------|--------|
| Logic changes | Not polish, could break things |
| Refactoring | Out of scope |
| Adding features | Not polish |
| Performance optimizations | Needs review |
| Style preferences | Subjective |
| Code in unchanged files | Stay focused |

## Lint Fix Commands

```bash
# JavaScript/TypeScript
npx eslint --fix .
npx prettier --write .

# Python
black .
isort .
ruff --fix .

# Go
go fmt ./...
golangci-lint run --fix
```

## Anti-Patterns

- **Don't add comments** - Only remove bad ones
- **Don't restructure code** - Only clean surface issues
- **Don't change variable names** - Unless unused
- **Don't add types** - Only remove bad casts
- **Don't expand scope** - Only touched files
