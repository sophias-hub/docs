---
name: write-diagrams
description: >-
  Creates and updates Mermaid diagrams for the Notification Hub Antora hub
  inline in pages with [mermaid] blocks. Use when adding architecture/flow/
  lifecycle diagrams or when write-docs needs a concept diagram on a page.
---

# Write Mermaid diagrams (Antora hub)

Create **Mermaid** diagrams inline on the page that needs them.

**Policy:** [`AGENTS.md`](../../../AGENTS.md)  
**Rendering:** AsciiDoc IDE preview (built-in Mermaid) + Antora via `@sntke/antora-mermaid-extension`.

## Syntax (required)

Put the diagram **directly in the page** with an inline `[mermaid]` block.

```asciidoc
Caption sentence in plain language.

[mermaid]
....
flowchart TD
  Send["📱 &lt;b&gt;Sender&lt;/b&gt;&lt;br/&gt;sends a notification"] --> Match{"🔔 &lt;b&gt;Notification Hub&lt;/b&gt;&lt;br/&gt;template channel allowed?"}
  Match -->|Yes| Ok["🔔 &lt;b&gt;Notification Hub&lt;/b&gt;&lt;br/&gt;accepts send and creates `recordId`"]
  Match -->|No| Block["🔔 &lt;b&gt;Notification Hub&lt;/b&gt;&lt;br/&gt;blocks the send"]
....
```

Use `....` (literal) or `----` (listing) delimiters. Prefer one short caption above the block.

## Label rules (required)

Every step node must show **who does what**.

| Rule | Do |
|------|----|
| Who + what | Put the agent and action in the **node** |
| Arrow text | Label edges with **Yes** / **No** on decision edges only |
| Extra actions | Add another **step node** for each additional action |
| Agent emphasis | Bold with HTML entities: `&lt;b&gt;Agent&lt;/b&gt;` (raw `<b>` breaks Mermaid — the browser parses tags before Mermaid runs) |
| Line break | Use `&lt;br/&gt;` after the agent line (not raw `<br/>`) |
| Agent emoji | Use a distinct emoji per agent (reuse it for that agent) |
| Code / entities | Wrap statuses, ids, entities, and error codes in `` `backticks` `` |

### Node shape

```text
EMOJI <b>Agent</b>
action with optional `code`
```

In Mermaid (quoted label — escape the HTML):

```mermaid
Hub["🔔 &lt;b&gt;Notification Hub&lt;/b&gt;&lt;br/&gt;sets status to `queued`"]
```

### Suggested agent emojis

| Agent | Emoji | Who |
|-------|-------|-----|
| Sender | 📱 | App that authenticates, manages templates/preferences, sends, looks up records, and receives webhooks |
| Notification Hub | 🔔 | The service |
| Recipient | 👤 | Person being notified |
| Channel | 📡 | email / SMS / push delivery path |

Keep this set small and stable. Name the API-using app **Sender**; the same **Sender** receives webhooks.

### Decisions

Use a diamond (or rhombus) for yes/no checks. Put the question in the node (with agent). Use `|Yes|` / `|No|` on the edges only.

## When to add a diagram

| Add a diagram when… | Prefer prose when… |
|---------------------|--------------------|
| A concept/flow is clearer visually | The page is a thin pointer or one-step how-to |
| Readers need a shared mental model | A short list already covers the same two steps |

## Diagram types

| Mermaid type | Use for |
|--------------|---------|
| `flowchart` LR/TD | Who-does-what flows and consent gates (default) |
| `sequenceDiagram` | Request/response with few actors (still name who speaks) |
| `stateDiagram-v2` | Pure status machines without agent formatting; otherwise use a flowchart of status steps |

## Progress checklist

```
Diagram Progress:
- [ ] Inline [mermaid] block on the owning page
- [ ] Caption above the block
- [ ] Each step: emoji + `&lt;b&gt;Agent&lt;/b&gt;` + `&lt;br/&gt;` + action
- [ ] Arrow text only Yes/No; other actions are step nodes
- [ ] Statuses / entities / codes in `backticks`
- [ ] Domain terms match AGENTS.md
- [ ] Preview / docs:build shows the chart
- [ ] Commit/push/PR only if the user asked
```

## Preferred patterns

- Inline `[mermaid]` on the owning page
- Compact charts grounded in real product behavior and domain terms from `AGENTS.md`
- Agent-labeled steps with Yes/No decision edges only
