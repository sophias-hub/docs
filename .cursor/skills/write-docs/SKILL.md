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

1. Read the relevant sections of `AGENTS.md` (audience, Diátaxis routing, page shapes, links, admonitions).
2. Prefer editing an existing page in the correct module (`tutorials`, `how-to`, `explanations`, `reference`, `glossary`, or `ROOT`).
3. If the page needs a concept/flow visual, invoke **`write-diagrams`** (inline `[mermaid, width=60%]` on the page).

## Progress checklist

```
Document Progress:
- [ ] Classified Diátaxis type + target module/page (per AGENTS.md)
- [ ] Lead: 1–2 full sentences stating the single page focus
- [ ] One document = one functionality/focus; subsections each cover one smaller piece
- [ ] Section titles explanatory and concise (not vague Why this matters)
- [ ] Scannable: short paragraphs, lists, tables, diagrams — no walls of text
- [ ] Full sentences outside lists; consistent terminology (Sender, Recipient, Notification Hub; statuses/codes in backticks)
- [ ] Glossary: include attributes once; mark terms with `{gt-*}` (how-tos/tutorials from the lead; explanations: plain text only in the subject’s definition sentence); casing per AGENTS.md
- [ ] Content exhaustive for one job, concise in wording
- [ ] Behavior/concept changes also update explanation pages (+ diagrams if needed)
- [ ] Off-hub links use playbook `{url-*}` attributes + trailing ^
- [ ] In-page anchors use `[[id]]` + `xref:#id[label]` (never `<<…>>`)
- [ ] Reused ROOT partials / rapi-doc tags; admonitions per AGENTS.md
- [ ] Tabs only for parallel variants
- [ ] Tutorials/how-tos: rapi-doc-mini for HTTP; schemas via API reference links
- [ ] Diagrams via write-diagrams `[mermaid, width=60%]` where appropriate
- [ ] Shortest successful path: limitations/requirements prevent failure (no “if it fails…” recovery)
- [ ] Ends with == Related or == Next step; `menu:Area[Page title]` only on bare Related-style links (no surrounding prose); How-to area label is `How-to Guides`
- [ ] Explanation pages stay conceptual; task steps live in how-tos (or tutorials)
- [ ] Updated module `partials/nav.adoc` if navigation changed; ROOT includes those partials
- [ ] No auth/error-catalog pages in this hub (point to `{url-api-docs}`)
- [ ] npm run validate (and docs:build when practical)
- [ ] Commit/push/PR only if the user asked
```

## Page shapes

### How-to (sample: `how-to/pages/templates/*.adoc`)

```asciidoc
= Clear task title
:description: One-sentence page purpose

include::glossary:partial$attributes.adoc[]

Use this how-to guide to …

== Prerequisites

include::ROOT:partial$try-out-key-prereq.adoc[]
* You have …

== Limitations
(only rules that block success)

== One section per operation or field

. Open the _Endpoint label_ endpoint below.
. Fill …
+
include::ROOT:partial$rapi-doc-mini.adoc[tag=…]
+
. Click *Try* and *Execute*.
. See the endpoint response …

== Related
(optional; `menu:How-to Guides[…]` / `menu:Explanations[…]`)
```

### Tutorial step (sample: `tutorials/pages/first-notification/create-template.adoc`)

```asciidoc
= Clear learning title
:description: …

include::glossary:partial$attributes.adoc[]

In this tutorial, you will …

== Prerequisites

include::ROOT:partial$try-out-key-prereq.adoc[]

== Do the work

(numbered RapiDoc steps; keep values for later steps)

== Next step

Proceed to the xref:tutorials:…[Next tutorial title] tutorial …
```

### Explanation (sample: `explanations/pages/notifications.adoc`, `channels.adoc`)

```asciidoc
= Concept title
:description: …

include::glossary:partial$attributes.adoc[]

Lead: plain text for this page’s subject in its definition sentence; `{gt-*}` for other terms.

include::ROOT:partial$mock-service-note.adoc[]
(optional)

== Section for one idea

[mermaid, width=60%]
....
(flowchart — see write-diagrams)
....

Prose / lists that explain the chart.

[[anchor-id]]
== Named subsection
(when another page or this page links here)

== Related

* xref:…[menu:Explanations[…]]
* xref:…[menu:How-to Guides[…]]
```

How-to Related root label is always `How-to Guides`.

## Hard rules

- Title `=`; sections `==` / `===` with explanatory, concise titles.
- How-tos: follow AGENTS.md **How-to page shape**. No separate Verify success section.
- **Blank line (double Enter)** between paragraphs / separate sentences. A single newline soft-wraps in AsciiDoc.
- Document the shortest successful path; state limitations up front instead of recovery steps.
- Explanations stay conceptual; task steps live in how-tos (or tutorials).
- Error response schemas and authentication live on `{url-api-docs}`.
- Prefer `{gt-*}` particles after including glossary attributes—do not hand-roll `<abbr>` markup on pages.

## Common includes

```asciidoc
include::glossary:partial$attributes.adoc[]
include::ROOT:partial$mock-service-note.adoc[]
include::ROOT:partial$try-out-key-prereq.adoc[]
include::ROOT:partial$rapi-doc-mini.adoc[tag=send]
```

Diagrams: inline `[mermaid, width=60%]` blocks on the page (see **`write-diagrams`**).

## Preferred patterns

- One Diátaxis job per page; point to other surfaces for schemas, SDK manuals, and ops
- Playbook `{url-*}` attributes for off-hub bases
- Ordered lists for step sequences; tabs for parallel variants
- Sparse, high-signal admonitions per `AGENTS.md`
- Mermaid via **`write-diagrams`** conventions
- Commit, push, or open a PR **only** when the user asks
