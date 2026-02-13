# hebrew-slugify

[![npm version](https://img.shields.io/npm/v/hebrew-slugify.svg)](https://www.npmjs.com/package/hebrew-slugify)
[![CI](https://github.com/ofershap/hebrew-slugify/actions/workflows/ci.yml/badge.svg)](https://github.com/ofershap/hebrew-slugify/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://github.com/ofershap/hebrew-slugify)

> Slugify Hebrew text for URLs — transliteration + slug generation. Zero dependencies.
>
> הפיכת טקסט עברי ל-slug עבור כתובות URL — תעתיק + יצירת slug. ללא תלויות.

![Demo](assets/demo.gif)

## Install

```bash
npm install hebrew-slugify
```

## Usage

```ts
import { hebrewSlugify } from "hebrew-slugify";

hebrewSlugify("שלום עולם");
// → "shlvm-avlm"

hebrewSlugify("פוסט 42 בבלוג");
// → "pvst-42-bblvg"

hebrewSlugify("שלום Hello World");
// → "shlvm-hello-world"

// Handles niqqud (vowel marks)
hebrewSlugify("שָׁלוֹם");
// → "shlvm"
```

## Options

```ts
hebrewSlugify("שלום עולם", { separator: "_" });
// → "shlvm_avlm"

hebrewSlugify("Hello World", { lowercase: false });
// → "Hello-World"

// Keep Hebrew characters (no transliteration)
hebrewSlugify("שלום עולם", { transliterate: false });
// → "שלום-עולם"
```

| Option          | Type      | Default | Description                   |
| --------------- | --------- | ------- | ----------------------------- |
| `separator`     | `string`  | `"-"`   | Character between words       |
| `lowercase`     | `boolean` | `true`  | Convert to lowercase          |
| `transliterate` | `boolean` | `true`  | Transliterate Hebrew to Latin |

## Transliteration Table

| Letter | Transliteration | Letter | Transliteration |
| ------ | --------------- | ------ | --------------- |
| א      | a               | מ ם    | m               |
| ב      | b               | נ ן    | n               |
| ג      | g               | ס      | s               |
| ד      | d               | ע      | a               |
| ה      | h               | פ ף    | p               |
| ו      | v               | צ ץ    | ts              |
| ז      | z               | ק      | k               |
| ח      | ch              | ר      | r               |
| ט      | t               | ש      | sh              |
| י      | y               | ת      | t               |
| כ ך    | k               | ל      | l               |

## Features

- Transliterates Hebrew letters to Latin characters
- Strips niqqud (vowel marks) automatically
- Handles mixed Hebrew + English + numbers
- Strips accented Latin characters (café → cafe)
- Collapses consecutive separators
- Zero dependencies
- Full TypeScript support
- ESM + CommonJS

## API

### `hebrewSlugify(text: string, options?: SlugifyOptions): string`

Converts a string (Hebrew, English, or mixed) into a URL-safe slug.

## License

[MIT](LICENSE) &copy; [Ofer Shapira](https://github.com/ofershap)

---

### Other projects by [@ofershap](https://github.com/ofershap)

- [`ts-nano-event`](https://github.com/ofershap/ts-nano-event) — Typed event emitter in ~200 bytes
- [`use-stepper`](https://github.com/ofershap/use-stepper) — React hook for multi-step forms and wizards
- [`env-guard`](https://github.com/ofershap/env-guard) — Validate .env files against a schema
- [`ai-commit-msg`](https://github.com/ofershap/ai-commit-msg) — GitHub Action for AI commit messages
- [`awesome-hebrew-dev`](https://github.com/ofershap/awesome-hebrew-dev) — Curated list of Hebrew developer resources
