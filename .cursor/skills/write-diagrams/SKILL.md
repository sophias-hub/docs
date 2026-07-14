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

Put the diagram **directly in the page** with an inline `[mermaid, width=60%]` block (use `width`, not `height`—height percentages do not shrink the SVG reliably).

```asciidoc
[mermaid, width=60%]
....
flowchart TD
  Start((Start)) --> Send["📱 &lt;b&gt;Sender&lt;/b&gt;&lt;br/&gt;sends a notification"]
  Send --> Match{"🔔 &lt;b&gt;Notification Hub&lt;/b&gt;&lt;br/&gt;Are the template and preferences compatible?"}
  Match -->|Yes| Ok["🔔 &lt;b&gt;Notification Hub&lt;/b&gt;&lt;br/&gt;accepts the send"]
  Match -->|No| Block["🔔 &lt;b&gt;Notification Hub&lt;/b&gt;&lt;br/&gt;blocks the send"]
  Ok --> End((End))
  Block --> End
....
```

Use `....` (literal) or `----` (listing) delimiters. Optional short caption above the block. Optional `((Start))` / `((End))` terminals when they clarify the flow (see `explanations/pages/notifications.adoc` and `delivery-records.adoc`).

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
| Sender | 📱 | App that manages templates/preferences, sends, and looks up records |
| Notification Hub | 🔔 | The service |
| Recipient | 👤 | Person being notified |
| Channel | 📡 | email / SMS / push delivery path |

Keep this set small and stable. Name the API-using app **Sender**.

### Decisions

Use a diamond for yes/no checks. Put the question in the node (with agent). Use `|Yes|` / `|No|` on the edges only.

## When to add a diagram

| Add a diagram when… | Prefer prose when… |
|---------------------|--------------------|
| A concept/flow is clearer visually | The page is a thin pointer or one-step how-to |
| Readers need a shared mental model | A short list already covers the same two steps |

Prefer diagrams on **explanation** pages. Follow the chart with short prose or lists that restate the outcomes (pass / fail, status transitions).

## Diagram types

| Mermaid type | Use for |
|--------------|---------|
| `flowchart` TD (default) | Who-does-what flows, consent/preference gates, delivery status transitions |
| `flowchart` LR | Only when a horizontal layout is clearer |
| `sequenceDiagram` | Request/response with few actors (still name who speaks) |
| `stateDiagram-v2` | Pure status machines without agent formatting; otherwise use a flowchart of status steps |

## Progress checklist

```
Diagram Progress:
- [ ] Inline `[mermaid, width=60%]` on the owning page
- [ ] Optional caption above the block
- [ ] Each step: emoji + `&lt;b&gt;Agent&lt;/b&gt;` + `&lt;br/&gt;` + action
- [ ] Arrow text only Yes/No; other actions are step nodes
- [ ] Optional `((Start))` / `((End))` when helpful
- [ ] Statuses / entities / codes in `backticks`
- [ ] Domain terms match AGENTS.md / live explanation pages
- [ ] Preview / docs:build shows the chart
- [ ] Commit/push/PR only if the user asked
```

## Preferred patterns

- Inline `[mermaid, width=60%]` on the owning explanation page
- Compact charts grounded in real product behavior
- Agent-labeled steps with Yes/No decision edges only
- Matching prose under the chart (see notifications + delivery-records)
