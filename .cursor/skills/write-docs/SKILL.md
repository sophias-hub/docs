---
name: write-docs
description: >-
  Authors Notification Hub Antora hub pages (tutorials, how-tos, explanations,
  thin reference). Use when writing or rewriting hub guides. Follow AGENTS.md
  for policy; use write-diagrams for Mermaid; use validate-and-fix for checks.
---

# Write Antora hub docs

Author **exhaustive yet concise** guides for a common first-time audience.

**Policy source of truth:** root [`AGENTS.md`](../../../AGENTS.md) — audience, Diátaxis, what belongs here, links/attributes, admonitions, Antora layout, code-change workflow, out of scope.  
**Rule:** [`.cursor/rules/diataxis-antora.mdc`](../../rules/diataxis-antora.mdc)  
**Diagrams:** invoke **`write-diagrams`** for Mermaid conventions.  
**Validate:** invoke **`validate-and-fix`** when checking local quality.

Follow and cross-reference `AGENTS.md`; keep this skill focused on the page workflow.

## Before you write

1. Read the relevant sections of `AGENTS.md` (audience, Diátaxis routing, links, admonitions).
2. Prefer editing an existing page in the correct module (`tutorials`, `how-to`, `explanation`, `reference`, or `ROOT`).
3. If the page needs a concept/flow visual, invoke **`write-diagrams`** (inline `[mermaid]` on the page).

## Progress checklist

```
Document Progress:
- [ ] Classified Diátaxis type + target module/page (per AGENTS.md)
- [ ] Lead: 1–2 full sentences stating the single page focus
- [ ] One document = one functionality/focus; subsections each cover one smaller piece
- [ ] Section titles explanatory and concise (not vague Overview / Why this matters)
- [ ] Scannable: short paragraphs, lists, diagrams — no walls of text
- [ ] Full sentences outside lists; consistent terminology (Sender, Recipient, Notification Hub, statuses/codes in backticks)
- [ ] Content exhaustive for one job, concise in wording
- [ ] Behavior/concept changes also update explanation pages (+ diagrams if needed)
- [ ] Off-hub links use playbook `{url-*}` attributes + trailing ^
- [ ] Reused ROOT partials / examples / tags; admonitions per AGENTS.md
- [ ] Tabs only for parallel variants
- [ ] Tutorials/how-tos: rapi-doc-mini for HTTP; schemas via API reference links
- [ ] Diagrams via write-diagrams inline `[mermaid]` where appropriate
- [ ] Shortest successful path: limitations/requirements prevent failure (no “if it fails…” recovery)
- [ ] Ends with == Related or == Next steps; link titles use `menu:Area[Page title]` (e.g. `menu:How-to[Check delivery status]`)
- [ ] Explanation pages stay conceptual; task steps / observation / use cases live in how-tos (or tutorials)
- [ ] Updated modules/*/nav.adoc (and partials/nav.adoc) if navigation changed; ROOT includes module nav partials
- [ ] Glossary (module `glossary`): defs only in `glossary:partial$attributes.adoc`; include that partial once, then mark terms with `{gt-sender}`, `{gt-template}`, …; link `xref:glossary:index.adoc[menu:Glossary[]]` (playbook `experimental`; escape commas in menu titles as `&#44;`)
- [ ] Error response detail links to `{url-api-docs}` (no hub error catalog pages)
- [ ] npm run validate (and docs:build when practical)
- [ ] Commit/push/PR only if the user asked
```

## Page shape

```asciidoc
= Clear outcome-oriented title
:description: One-sentence page purpose (optional)

Lead: 1–2 full sentences stating the single focus of this page.

== What you need
(for how-tos / tutorials)

== Limitations
(preventive rules for the successful path)

== Task-specific section titles
(each subsection = one smaller piece of functionality)

== Verify success
(for how-tos / tutorials)

== Related
(or == Next steps)
```

- Title `=`; sections `==` / `===` with explanatory, concise titles.
- How-tos: What you need → Limitations (preventive rules) → task sections → verify → Related.
- Document the shortest successful path; state limitations up front instead of “if it fails, then…” recovery steps.
- Explanations stay conceptual; task steps / observation / use cases live in how-tos (or tutorials).
- Error response schemas live on `{url-api-docs}`.

## Common includes

```asciidoc
include::ROOT:partial$mock-service-note.adoc[]
include::ROOT:partial$try-out-key-note.adoc[]
include::ROOT:partial$rapi-doc-mini.adoc[tag=send]
```

Diagrams: inline `[mermaid]` blocks on the page (see **`write-diagrams`**).

## Preferred patterns

- One Diátaxis job per page; point to other surfaces for schemas, SDK manuals, and ops
- Playbook `{url-*}` attributes for off-hub bases
- Ordered lists for step sequences; tabs for parallel variants
- Sparse, high-signal admonitions per `AGENTS.md`
- Mermaid via **`write-diagrams`** conventions
- Commit, push, or open a PR **only** when the user asks
