---
name: validate-and-fix
description: >-
  Runs AsciiDoc validation (Vale + Lychee via npm run validate) in the Antora
  docs hub, fixes prose and link failures, and re-runs until clean. Use when
  the user asks to validate, fix Vale/Lychee errors, lint AsciiDoc, or run
  checks before commit or push in this docs repo.
---

# Validate and fix (Antora docs)

Close the CI validation loop locally before commit or push. Use this repo’s
existing `npm run validate` as the single validation entry point.

**Scope:** AsciiDoc under `docs/**/*.adoc` (`scripts/validate.sh`). Requires
`asciidoctor` on PATH for Vale AsciiDoc linting.

## Workflow

Copy and track:

```
Validate Progress:
- [ ] cd to this repo root
- [ ] Run npm run validate
- [ ] Fix failures (if any)
- [ ] Re-run until clean (max 3 fix cycles)
- [ ] Report result; commit/push only if the user asked
```

1. `cd` to the Antora `docs` repo root.
2. Run: `npm run validate`
3. If exit 0 → report clean; say ready to commit/push. **Stop.**
4. If failure → parse output, fix files, go to step 2.
5. After **3** fix cycles still failing → stop and summarize remaining errors.
6. **Never** commit or push unless the user explicitly asked.

## Parse and fix failures

### Vale

Typical line: `path:line:col  error  message  Rule.Name`

- Apply the rule’s suggested wording when present (e.g. contractions, dash spacing).
- Keep meaning; change only what the rule requires.
- Common Microsoft rules:
  - `Microsoft.Dashes` — em dash with **no** spaces: `word—word`
  - `Microsoft.Contractions` — prefer `don't`, `aren't`, `doesn't`, etc.
- Fix every reported location in the cycle when safe; then re-run.
- Preserve AsciiDoc syntax (attributes, includes, macros) while fixing prose.

### Lychee

- Broken URL → correct the link target in the `.adoc` source when the destination is wrong or moved.
- Update `.lychee.toml` **only** for intentionally excluded URLs; keep config consistent with existing excludes. Prefer fixing the link over excluding.

### Missing tools

If validate exits because `vale`, `lychee`, or `asciidoctor` is missing, print the install hint from the script output (typically `brew install vale`, `brew install lychee`, `brew install asciidoctor`), then wait for those tools before treating validation as complete.

## Hard rules

- Prefer Vale’s suggested wording over paraphrasing.
- **Never** silence failures (deleting checks, `--no-verify`, or weakening CI).
- Call `npm run validate` only; keep this skill scoped to the Antora docs hub.
