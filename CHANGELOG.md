# Changelog

## Distribution update — 2026-11-27 (version 1.1.0 unchanged)

- Public [Chrome Web Store listing](https://chrome.google.com/webstore/detail/glegjhmdanhbloojggfdphgohgfmmheh) and [Product Hunt launch](https://www.producthunt.com/products/wikiai-schema-peek?launch=wikiai-schema-peek) are available.
- The separate [Hugging Face online demo](https://huggingface.co/spaces/wikiaihu/wikiai-schema-peek) and [English technical documentation](https://www.wikiai.hu/wikiai-schema-peek-a-practical-json-ld-and-entity-engineering-tool-for-chrome/) are linked.
- Documentation-only update; no changes to the extension, permissions, bundled vocabulary, version, ZIP or license.

## 1.1.0 — 2026-11-26
- Added Schema.org 30.1 vocabulary lookup: 939 classes, 1538 properties, 546 enumeration values; 309 selected domain/range rule definitions with class inheritance.
- Added separate errors, warnings, notes, JSON paths, expected/observed values and severity filter in Hungarian and English.
- Added cross-block local ID resolution, contextual namespace handling, enum/literal guidance, Person/Organization ID overlap and sameAs review hints.
- Report format v2, includes validation data and coverage. Kept activeTab/scripting permissions and no remote code or data transmission.
- 28/28 Node tests passed; HU/EN Chromium in-memory UI smoke tests passed with mocked Chrome APIs. The project owner has since demonstrated local Chrome installation. Store review was pending at the initial release.
- Adopted the bilingual free-use/source-available license 1.0 and prior-approval collaboration policy on 26 November 2026. Documentation-only change; the extension and Chrome ZIP remain unchanged.

## 1.0.0 — initial pre-publication build
- Manifest V3 browser action, English/Hungarian popup.
- Local DOM JSON-LD extraction and structural inspection, @type, @id and sameAs summaries.
- Canonical, hreflang, robots meta declarations.
- Raw JSON view and user-initiated clipboard/file exports.
- Input and display limits, explicit partial results and restricted-page message.
