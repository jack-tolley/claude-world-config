# write-tests

Write unit tests for logic and business rules. Mock all external dependencies.

## Arguments

```
/write-tests [file or directory] [optional: specific function]
```

## Critical Rules

1. **ONLY test logic** - Utility functions, data transformations, business rules
2. **NEVER test UI** - No component rendering, no "renders correctly" tests
3. **MOCK everything external** - Database, APIs, file system, third-party services
4. **CO-LOCATE tests** - Place `foo.test.ts` next to `foo.ts`
5. **Test behavior, not implementation** - Tests should survive refactors

## What to Test (Priority Order)

| Priority | Type | Example |
|----------|------|---------|
| **HIGH** | Business logic | `calculateDiscount()`, `validateOrder()` |
| **HIGH** | Data transformations | `parseCSV()`, `formatResponse()` |
| **HIGH** | Edge cases | Empty arrays, null values, boundaries |
| **HIGH** | Error handling | Invalid input, network failures |
| **MEDIUM** | Conditional flows | if/else branches, switch statements |
| **MEDIUM** | State machines | Reducers, finite automata |
| **LOW** | Pure utilities | `slugify()`, `debounce()` |

## What NOT to Test

| Skip | Example | Why |
|------|---------|-----|
| React component rendering | "renders without crashing" | Use E2E for UI |
| UI appearance | "button has correct class" | Visual regression tools |
| Static config values | "timeout is 5000" | Just testing constants |
| Simple type re-exports | Type alias existence | TypeScript handles this |
| Trivial getters | `getName() { return this.name }` | No logic to test |
| Framework code | Testing React/Express internals | Trust the framework |
| Third-party libraries | Testing lodash functions | Already tested |

## Workflow

### Step 0: Determine Scope

Auto-detect what to test:

```bash
# Staged files
git diff --cached --name-only | grep -E '\.(ts|js|py)$'

# Branch changes
git diff main...HEAD --name-only | grep -E '\.(ts|js|py)$'

# Or use specified path
```

**Output:**
```
Found 3 files to consider:
- src/utils/validation.ts (HIGH: has conditionals)
- src/services/pricing.ts (HIGH: business logic)
- src/types/index.ts (SKIP: type definitions only)
```

──────────

### Step 1: Identify Test Targets

For each file, identify testable functions:

```
src/utils/validation.ts:
  ✓ validateEmail(email) - has regex, edge cases
  ✓ validatePhone(phone, country) - conditional logic
  ✗ EMAIL_REGEX - constant, skip

src/services/pricing.ts:
  ✓ calculateTotal(items, discount) - business logic
  ✓ applyTax(amount, region) - conditional by region
  ✗ PRICING_CONFIG - static config, skip
```

──────────

### Step 2: Create Test File

Place next to source file:

```
src/utils/validation.ts      → src/utils/validation.test.ts
src/services/pricing.ts      → src/services/pricing.test.ts
```

### Test Structure Template

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { functionUnderTest } from "./module";

// Mock external dependencies
vi.mock("@/lib/database", () => ({
  query: vi.fn(),
}));

describe("functionUnderTest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("happy path", () => {
    it("handles standard input correctly", () => {
      const result = functionUnderTest({ valid: "input" });
      expect(result).toEqual({ expected: "output" });
    });
  });

  describe("edge cases", () => {
    it("handles empty input", () => {
      expect(functionUnderTest([])).toEqual([]);
    });

    it("handles null gracefully", () => {
      expect(() => functionUnderTest(null)).toThrow("Input required");
    });
  });

  describe("error cases", () => {
    it("throws on invalid format", () => {
      expect(() => functionUnderTest("bad")).toThrow(ValidationError);
    });
  });
});
```

──────────

### Step 3: Common Mocking Patterns

**Database (Prisma):**
```typescript
import { prisma } from "@/lib/__mocks__/prisma";
vi.mock("@/lib/prisma");

prisma.user.findUnique.mockResolvedValue({ id: 1, name: "Test" });
```

**External APIs:**
```typescript
vi.mock("@/lib/api-client", () => ({
  fetchData: vi.fn().mockResolvedValue({ data: [] }),
}));
```

**Environment variables:**
```typescript
beforeEach(() => {
  vi.stubEnv("API_KEY", "test-key");
});
```

**Date/Time:**
```typescript
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2024-01-01"));
});

afterEach(() => {
  vi.useRealTimers();
});
```

**Server-only modules:**
```typescript
vi.mock("server-only", () => ({}));
```

──────────

### Step 4: Run Tests

```bash
# JavaScript/TypeScript (Vitest)
npm test -- --run path/to/file.test.ts

# JavaScript/TypeScript (Jest)
npm test -- path/to/file.test.ts

# Python
pytest path/to/test_file.py -v

# Go
go test ./path/to/package -v
```

──────────

### Step 5: Summary

After writing tests, provide:

```
Tests written for `src/utils/validation.ts`:

Covered (3 functions, 12 test cases):
- validateEmail: empty string, invalid format, valid email, unicode
- validatePhone: missing country, invalid length, valid formats
- normalizeInput: whitespace, special chars, empty

Skipped (with reasons):
- EMAIL_REGEX: constant, no logic
- PhoneFormat type: type definition

Run: npm test -- --run src/utils/validation.test.ts

Coverage report? (y/n)
```

──────────

## Test Quality Checklist

Before finishing, verify each test:

- [ ] Tests behavior, not implementation details
- [ ] Would catch a real bug if logic changed
- [ ] Doesn't duplicate another test
- [ ] Has clear test name describing scenario
- [ ] Avoids testing framework/library code
- [ ] Mocks are minimal (only external deps)

## Coverage (Optional)

If requested:

```bash
# Vitest
npm test -- --run --coverage path/to/file.test.ts

# Jest
npm test -- --coverage path/to/file.test.ts

# Python
pytest --cov=module path/to/test_file.py
```

Focus on:
- Branch coverage (all if/else paths)
- Edge case coverage (boundaries, nulls)
- Error path coverage (throws, rejects)

## Anti-Patterns to Avoid

| Anti-Pattern | Problem | Instead |
|--------------|---------|---------|
| Testing implementation | Breaks on refactor | Test inputs → outputs |
| Over-mocking | Tests nothing real | Mock only external deps |
| One assertion per test | Verbose, slow | Group related assertions |
| Testing private methods | Coupling to internals | Test through public API |
| Snapshot everything | Brittle, noisy diffs | Snapshot only stable output |
| 100% coverage goal | Diminishing returns | Focus on critical paths |
