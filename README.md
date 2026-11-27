# WikiAI Schema Peek

**Entity Engineering & JSON-LD Inspector for Google Chrome** | **1.1.0**

WikiAI Schema Peek is a lightweight browser extension that inspects structured data on the current page. It processes the current top-level rendered DOM locally, only when invoked. No account, AI API, analytics, server, or external dependency is required.

## Install or try WikiAI Schema Peek

**Publicly available since 27 November 2026.** Version 1.1.0 is free for personal and professional use under the [Free Use / Source-Available License 1.0](LICENSE.md).

- [Install from the Chrome Web Store](https://chrome.google.com/webstore/detail/glegjhmdanhbloojggfdphgohgfmmheh) — recommended for regular users; no Developer mode needed.
- [Try the browser-based demo on Hugging Face](https://huggingface.co/spaces/wikiaihu/wikiai-schema-peek) — paste JSON-LD for local inspection without installing the extension. The demo does not fetch websites or inspect the active browser tab.
- [Product Hunt — public product launch](https://www.producthunt.com/products/wikiai-schema-peek?launch=wikiai-schema-peek) · [Csanád Várhelyi — Maker and Hunter](https://www.producthunt.com/@csanad_varhelyi).
- [Official product page](https://www.wikiai.hu/wikiai-schema-peek/) · [English technical article](https://www.wikiai.hu/wikiai-schema-peek-a-practical-json-ld-and-entity-engineering-tool-for-chrome/) · [Privacy policy](https://www.wikiai.hu/wikiai-schema-peek/#privacy-en).
- [Developer-mode ZIP 1.1.0](downloads/WikiAI-Schema-Peek-1.1.0-Chrome.zip) · [SHA-256 checksum](docs/CHROME-ZIP-SHA256.txt).

Public availability on the Chrome Web Store or Product Hunt does not constitute Google, Schema.org or platform endorsement of the inspection results.

## What's new in 1.1.0
- Bundled official Schema.org 30.1 vocabulary snapshot: **939 classes, 1,538 properties, 546 enumeration values**, full superclass hierarchy, and **309 selected domainIncludes/rangeIncludes rule definitions**. Source: `extension/SCHEMA-ATTRIBUTION.txt` (CC BY-SA 3.0 for the adapted vocabulary).
- Vocabulary name checks, common datatype/shape guidance, domain/range warnings with inheritance, enum checks and cross-block `@id` resolution. Unknown or advanced contexts are treated as partial; no remote context is fetched.
- Separate errors (JSON/keyword shapes), warnings (vocabulary, expected types and possible identity conflicts) and notes (e.g. unresolved same-document IDs, multiple names). Each finding has its block, path, observed and expected values.
- The JSON report retains the original data and adds versioned `validation` results. `0` findings is not a universal validity or ranking guarantee.

## What it does
- Counts JSON-LD blocks and distinguishes successfully parsed JSON from syntax/root-structure errors.
- Lists declared `@type` values, typed objects, `@id` declarations/references and repeated declarations, and observed `sameAs` values.
- Shows original JSON-LD source; copies individual blocks; copies or saves a JSON report.
- Shows page URL, document base URL, title, HTML language, canonical, hreflang and robots meta declarations.
- Hungarian interface when Chrome uses Hungarian, otherwise English.

Repeated IDs can be legitimate descriptions of the same entity. `sameAs` links are observed, not verified. The extension handles common explicit Schema.org contexts, simple aliases/prefixes and local identifiers. It does not fully expand JSON-LD contexts or follow links. The bundled snapshot checks all vocabulary names but only 309 of the 1,538 property domain/range definitions; it is not a complete Schema.org validator, search crawler, Google Rich Results Test, indexability test or AI visibility score. It does not inspect iframes, shadow roots or Microdata/RDFa, and reports partial results when processing limits are reached.

## Install locally (developer testing)

> The official source and Chrome ZIP are offered under the [free-use/source-available license 1.0](LICENSE.md), adopted on 26 November 2026. It permits personal and business use but reserves modification and redistribution rights in protected original code; separately licensed material and mandatory legal rights are unaffected. The Chrome ZIP is unchanged from the submitted 1.1.0 package.
1. Download [WikiAI-Schema-Peek-1.1.0-Chrome.zip](downloads/WikiAI-Schema-Peek-1.1.0-Chrome.zip) (SHA-256: see [checksum](docs/CHROME-ZIP-SHA256.txt)), or use the `extension/` directory of an authorized local checkout. Unzip the ZIP to a new folder if necessary.
2. In Chrome open `chrome://extensions/`.
3. Enable Developer mode. Choose **Load unpacked** and select the extracted folder containing `manifest.json`, or the checkout's `extension/` directory (not the ZIP itself).
4. Open a normal HTTP(S) page, click the extension icon in the Extensions menu, and optionally pin it.

Version 1.1.0 was submitted on 26 November 2026 and publicly listed on the Chrome Web Store on 27 November 2026. For regular installation use the [official Chrome Web Store listing](https://chrome.google.com/webstore/detail/glegjhmdanhbloojggfdphgohgfmmheh). The repository ZIP is an alternative for local developer testing; it is not a Store installation or automatic update channel. Official product documentation: https://www.wikiai.hu/wikiai-schema-peek/

## Permissions and privacy
- `activeTab`: temporary access to the active tab when the user invokes the extension.
- `scripting`: reads the requested page's DOM. It does not modify the page.
- No permanent host permissions, background process, analytics, cookies, network fetch, external libraries, or remote code. The optional WikiAI.hu and Schema.org source links open web pages only when clicked.
- The optional export includes inspected page metadata and raw JSON-LD. Inspect it before sharing, particularly on a private or authenticated page. Exporting is a local user action; no data is sent by the extension.

## Source and checks
Source lives in `extension/`; tests in `tests/`. Run `npm test` using Node.js 20+ (no package install needed). For the project owner and separately authorized contributors, run `node tools/build-vocabulary.mjs` to regenerate the shipped compact vocabulary. To expand the domain/range rules for all properties, download and verify the official Schema.org current HTTPS JSON-LD definition from the official releases archive and run `node tools/build-vocabulary.mjs /path/to/schemaorg-current-https.jsonld VERSION`. That alternative build must be tested and relabeled before publication; it is not the bundled 1.1.0 build. `tests/ui-smoke.py` is a two-language browser DOM test with mocked Chrome APIs; actual toolbar activation remains a local test. To submit the extension to the Chrome Web Store, use the separately packaged ZIP whose root contains `manifest.json`. Do not submit this entire source/publishing project.

## Project identity
Project: WikiAI Schema Peek. Professional concept: Várhelyi Csanád. WikiAI.hu hosts the official project documentation. The public software, organization and person are separate entities. Source and support links must point to actual published resources, not placeholders. The public product page includes bilingual documentation and the privacy notice.

- WikiAI.hu: https://www.wikiai.hu/
- Expert: https://www.wikiai.hu/szakertok/varhelyi-csanad/
- Personal professional reference: https://www.varhelyicsanad.hu/
- Software entity identifier: `https://www.wikiai.hu/wikiai-schema-peek/#software`
- Professional concept, initiation and development direction: [Csanád Várhelyi](https://www.wikiai.hu/szakertok/varhelyi-csanad/) · [GitHub personal profile](https://github.com/varhelyicsanad) · [Product Hunt Maker profile](https://www.producthunt.com/@csanad_varhelyi)
- Separate browser demo source: https://github.com/WikiAI-hu/hf-entity-lab-publisher/tree/main/schema-peek-space
- WikiAI.hu organization on Hugging Face: https://huggingface.co/wikiaihu

## License and professional collaboration

The license permits free personal and professional use, including paid client audits, with reserved rights in the protected original code. Independent modifications, rebranding and redistribution of that code require separate permission, subject to mandatory legal rights and applicable platform terms. The bilingual [LICENSE.md](LICENSE.md) was adopted on 26 November 2026 and applies to the official source and Chrome ZIP offered here. This is not an open-source license. The adapted Schema.org vocabulary retains its separate CC BY-SA 3.0 license; see [Schema.org attribution](extension/SCHEMA-ATTRIBUTION.txt).

Professional cooperation, bug reports and feature ideas are welcome. Code contributions require prior written agreement; see [CONTRIBUTING.md](CONTRIBUTING.md).

## Magyar nyelvű összefoglaló

A WikiAI Schema Peek ingyenes, magyar és angol kezelőfelületű Chrome-bővítmény a JSON-LD, a Schema.org szókészlet, a deklarált entitáskapcsolatok és az aktuális oldal metaadatainak helyi vizsgálatához. Nem teljes körű validátor, nem mér keresési helyezést vagy AI-ajánlásokat.

**Hivatalos telepítés:** A bővítmény 2026. november 27. óta elérhető a [Chrome Web Store-ban](https://chrome.google.com/webstore/detail/glegjhmdanhbloojggfdphgohgfmmheh). Válaszd a Hozzáadás a Chrome-hoz lehetőséget; fejlesztői mód nem szükséges. A [Hugging Face online demó](https://huggingface.co/spaces/wikiaihu/wikiai-schema-peek) telepítés nélkül, beillesztett JSON-LD adatokkal használható. A [Product Hunt termékbemutató](https://www.producthunt.com/products/wikiai-schema-peek?launch=wikiai-schema-peek) szintén 2026. november 27-én jelent meg.

**Helyi teszttelepítés:** Töltsd le a [WikiAI Schema Peek 1.1.0 ZIP-csomagot](downloads/WikiAI-Schema-Peek-1.1.0-Chrome.zip), és csomagold ki. Nyisd meg a `chrome://extensions/` oldalt, engedélyezd a Fejlesztői módot, majd a Kicsomagolt bővítmény betöltése gombbal válaszd ki az `extension/` mappát vagy a külön telepítő-ZIP kicsomagolt, `manifest.json` fájlt tartalmazó mappáját. Ez fejlesztői teszttelepítés; automatikus áruházi frissítést nem biztosít.

**Adatvédelem:** A feldolgozás helyi, a riport másolásáról vagy mentéséről a felhasználó dönt. A riport személyes adatokat is tartalmazhat; megosztás előtt ellenőrizd.

- Hivatalos termékoldal: https://www.wikiai.hu/wikiai-schema-peek/
- Adatvédelem: https://www.wikiai.hu/wikiai-schema-peek/#privacy-policy
- Szakmai koncepció: [Várhelyi Csanád](https://www.varhelyicsanad.hu/)

A Chrome Web Store közzététele nem jelent Google- vagy Schema.org-szakmai minősítést. A részletes [angol szakmai leírás](https://www.wikiai.hu/wikiai-schema-peek-a-practical-json-ld-and-entity-engineering-tool-for-chrome/) a WikiAI.hu-n olvasható. A [kétnyelvű licenc](LICENSE.md) 2026. november 26-án elfogadott 1.0 változata az ingyenes magán- és üzleti használatot engedi, az eredeti, oltalom alatt álló kód módosítását és továbbterjesztését fenntartott jogként kezeli. Az alkalmazandó törvényi kivételek, platformjogok és a Schema.org külön licence érintetlenek. A szakmai együttműködésre nyitottak vagyunk; részletek: [CONTRIBUTING.md](CONTRIBUTING.md).
