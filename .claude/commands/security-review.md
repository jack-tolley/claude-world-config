# security-review

Scan for security vulnerabilities, secrets, and dependency issues.

## Arguments

```
/security-review [path or scope] [optional: focus area]
```

Focus areas: `secrets`, `deps`, `owasp`, `all` (default)

## Critical Rules

1. **NEVER expose secrets** - Redact in output
2. **PRIORITIZE by severity** - Critical/High first
3. **PROVIDE remediation** - Don't just report, suggest fixes
4. **CHECK dependencies** - Known CVEs are easy wins
5. **ASSUME breach** - Think like an attacker

## Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| **CRITICAL** | Exploitable now, data at risk | Fix immediately, block merge |
| **HIGH** | Significant risk, needs fix | Fix before merge |
| **MEDIUM** | Should fix, not urgent | Track, fix soon |
| **LOW** | Best practice, minor | Consider fixing |
| **INFO** | Awareness only | Document |

## Workflow

### Step 0: Determine Scope

```bash
# All files in directory
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.py" | head -100

# Or branch changes
git diff main...HEAD --name-only
```

──────────

### Step 1: Secrets Detection (CRITICAL)

**Scan for hardcoded secrets:**

```bash
# API keys, tokens, passwords
grep -rn --include="*.ts" --include="*.js" --include="*.py" --include="*.env*" \
  -E "(api[_-]?key|apikey|secret|password|token|credential|auth)" . | head -50

# AWS keys
grep -rn -E "AKIA[0-9A-Z]{16}" .

# Private keys
grep -rn "-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----" .

# Connection strings
grep -rn -E "(mysql|postgres|mongodb)://[^:]+:[^@]+@" .
```

**Common patterns to flag:**

| Pattern | Example | Severity |
|---------|---------|----------|
| AWS Access Key | `AKIAIOSFODNN7EXAMPLE` | CRITICAL |
| Private Key | `-----BEGIN RSA PRIVATE KEY-----` | CRITICAL |
| API Key in code | `apiKey: "sk-..."` | CRITICAL |
| Password in code | `password = "hunter2"` | CRITICAL |
| Connection string | `postgres://user:pass@host` | CRITICAL |
| JWT Secret | `JWT_SECRET = "mysecret"` | HIGH |
| Hardcoded token | `Bearer eyJhbG...` | HIGH |

**Output format:**
```
[CRITICAL] Hardcoded API key — src/config.ts:23
  Found: apiKey: "sk-proj-xxxxx..."
  Fix: Move to environment variable, rotate key immediately

[CRITICAL] AWS credentials in code — src/aws/client.ts:5
  Found: accessKeyId: "AKIA..."
  Fix: Use IAM roles or AWS SDK credential provider
```

──────────

### Step 2: Dependency Vulnerabilities (HIGH)

**Check for known CVEs:**

```bash
# Node.js
npm audit --json 2>/dev/null | head -100
# or
yarn audit --json 2>/dev/null | head -100

# Python
pip-audit 2>/dev/null || pip install pip-audit && pip-audit

# Go
go list -m -json all | head -50
govulncheck ./... 2>/dev/null
```

**Output format:**
```
[HIGH] Vulnerable dependency: lodash@4.17.20
  CVE: CVE-2021-23337 (Prototype Pollution)
  Fix: npm update lodash (4.17.21 patched)

[MEDIUM] Outdated dependency: axios@0.21.0
  CVE: CVE-2021-3749 (ReDoS)
  Fix: npm update axios
```

**Flag these patterns:**
- Direct dependencies with critical CVEs
- Dependencies >2 major versions behind
- Deprecated packages still in use
- Packages with known security issues

──────────

### Step 3: OWASP Top 10 Check

Scan for common web vulnerabilities:

#### A01: Broken Access Control
```bash
# Missing auth checks
grep -rn --include="*.ts" --include="*.js" \
  -E "(router\.(get|post|put|delete)|app\.(get|post|put|delete))" . | \
  grep -v "auth\|middleware\|protect"
```

**Look for:**
- Routes without auth middleware
- Direct object references without ownership checks
- Missing role/permission validation

#### A02: Cryptographic Failures
```bash
# Weak crypto
grep -rn --include="*.ts" --include="*.js" --include="*.py" \
  -E "(md5|sha1|DES|RC4|Math\.random)" .
```

**Flag:**
- MD5/SHA1 for passwords (use bcrypt/argon2)
- Math.random for security (use crypto.randomBytes)
- Weak encryption algorithms

#### A03: Injection
```bash
# SQL injection risk
grep -rn --include="*.ts" --include="*.js" \
  -E "(\$\{.*\}.*SELECT|query\(.*\+|execute\(.*\+)" .

# Command injection risk
grep -rn --include="*.ts" --include="*.js" --include="*.py" \
  -E "(exec\(|spawn\(|system\(|eval\()" .
```

**Flag:**
- String concatenation in SQL queries
- User input in shell commands
- eval() with user data

#### A07: XSS (Cross-Site Scripting)
```bash
# Dangerous HTML insertion
grep -rn --include="*.tsx" --include="*.jsx" \
  "dangerouslySetInnerHTML" .

# Unescaped output
grep -rn --include="*.ts" --include="*.js" \
  -E "(innerHTML|outerHTML)\s*=" .
```

**Flag:**
- dangerouslySetInnerHTML with user content
- Direct DOM innerHTML assignment

──────────

### Step 4: Configuration Security

**Check for misconfigurations:**

```bash
# Debug mode in production
grep -rn -E "(DEBUG|NODE_ENV).*=.*(true|development)" .

# Permissive CORS
grep -rn "Access-Control-Allow-Origin.*\*" .

# Exposed error details
grep -rn -E "(stack|trace|debug).*error" --include="*.ts" .
```

**Environment files:**
```bash
# Check for committed .env files
git ls-files | grep -E "\.env"

# Check .gitignore
grep -E "\.env" .gitignore
```

──────────

### Step 5: Summary Report

```
Security Review Summary
═══════════════════════════════════════════════════

CRITICAL: 2 issues (must fix before merge)
HIGH:     3 issues (should fix before merge)
MEDIUM:   5 issues (track and fix)
LOW:      2 issues (consider fixing)

───────────────────────────────────────────────────

CRITICAL Issues:

1. [SECRETS] Hardcoded API key — src/config.ts:23
   Risk: Key exposure leads to account compromise
   Fix: Move to env var, rotate key
   Effort: 5 min

2. [SECRETS] AWS credentials in code — src/aws/client.ts:5
   Risk: Full AWS account access
   Fix: Use IAM roles, delete from code, rotate
   Effort: 15 min

HIGH Issues:

1. [DEPS] lodash@4.17.20 vulnerable — package.json
   CVE: CVE-2021-23337 (Prototype Pollution)
   Fix: npm update lodash
   Effort: 2 min

2. [OWASP-A03] SQL injection risk — src/api/users.ts:45
   Risk: Database compromise
   Fix: Use parameterized query
   Effort: 10 min

3. [OWASP-A01] Unprotected route — src/api/admin.ts:12
   Risk: Unauthorized access
   Fix: Add auth middleware
   Effort: 5 min

───────────────────────────────────────────────────

Quick Wins (< 5 min each):
- [ ] Update lodash
- [ ] Add auth to admin route
- [ ] Move API key to env

Needs Planning:
- [ ] Rotate AWS credentials (coordinate with team)
- [ ] Audit all SQL queries for injection

───────────────────────────────────────────────────

Next steps?
- a) Fix critical issues now
- b) Generate detailed remediation guide
- c) Create tracking issues
- d) Run deeper scan on specific area
```

## Quick Commands

```bash
# All-in-one secret scan
grep -rn --include="*.ts" --include="*.js" --include="*.py" --include="*.env*" \
  -iE "(password|secret|api.?key|token|credential|private.?key)" . 2>/dev/null | \
  grep -v node_modules | grep -v ".git" | head -30

# Dependency check (Node)
npm audit 2>/dev/null || echo "Run: npm install first"

# Find all env files
find . -name "*.env*" -not -path "./node_modules/*" 2>/dev/null
```

## False Positive Handling

Some findings may be intentional:

| Finding | May Be OK If |
|---------|-------------|
| `password` in code | It's a form field name, not a value |
| `secret` in code | It's a variable name reading from env |
| `eval()` | Processing trusted config (still flag) |
| CORS `*` | Public API by design (document why) |

When unsure, **flag it anyway** with a note. Let the developer decide.

## Remediation Patterns

**Secrets:**
```typescript
// Before (CRITICAL)
const apiKey = "sk-proj-abc123";

// After
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error("API_KEY required");
```

**SQL Injection:**
```typescript
// Before (HIGH)
const query = `SELECT * FROM users WHERE id = ${userId}`;

// After
const query = "SELECT * FROM users WHERE id = $1";
const result = await db.query(query, [userId]);
```

**Missing Auth:**
```typescript
// Before (HIGH)
router.get("/admin/users", listUsers);

// After
router.get("/admin/users", requireAuth, requireRole("admin"), listUsers);
```

## Don't Forget

- Check CI/CD configs for exposed secrets
- Review GitHub Actions for secret handling
- Check Docker files for hardcoded values
- Review infrastructure-as-code (Terraform, etc.)
- Check build artifacts aren't committed
