---
description: How to validate and maintain i18n translations
---

# i18n Translation Validation

## Source of Truth

English (`src/i18n/en.json`) is the **single source of truth** for all translation keys. Every other locale file must contain exactly the same set of keys.

## Validation Steps

### 1. Audit for Missing and Extra Keys

// turbo
Run the audit script to compare all locale files against English:

```bash
node -e "
const fs = require('fs');
const path = require('path');
const dir = 'src/i18n';
const en = Object.keys(JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf-8')));
fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'en.json').sort().forEach(file => {
  const lang = file.replace('.json', '');
  const keys = Object.keys(JSON.parse(fs.readFileSync(path.join(dir, file), 'utf-8')));
  const missing = en.filter(k => !keys.includes(k));
  const extra = keys.filter(k => !en.includes(k));
  if (missing.length || extra.length) {
    console.log(lang + ': MISSING=' + missing.length + ' EXTRA=' + extra.length);
    missing.forEach(k => console.log('  - ' + k));
    extra.forEach(k => console.log('  + ' + k));
  } else { console.log('✅ ' + lang + ' (' + keys.length + ' keys)'); }
});
"
```

**Expected output**: Every language shows ✅ with the same key count as English.

### 2. When Adding New Keys

1. **Always add keys to `en.json` first** — this is the source of truth.
2. **Add the same keys to ALL other locale files** with proper translations.
3. **Run the audit** (step 1) to confirm zero missing/extra keys.
4. **Key ordering**: Keys should follow the same order as `en.json` for consistency.

### 3. When Removing Keys

1. Remove from `en.json` first.
2. Remove from **all** other locale files.
3. Run the audit to confirm.

## Key Conventions

- Keys use **dot notation** for namespacing: `section.subsection.name`
- Keys containing `{placeholder}` (e.g., `{privacyLink}`) must keep the exact same placeholder name in all translations.
- The `contact.privacy` key uses `{privacyLink}` — the link text comes from `contact.privacyLink`.

## Locale Files

All locale JSON files live in `src/i18n/`. Active languages are registered in `src/i18n/ui.ts` in the `languages` object.

| Code | Language | File |
|------|----------|------|
| en | English | en.json |
| de | Deutsch | de.json |
| fr | Français | fr.json |
| it | Italiano | it.json |
| es | Español | es.json |
| pt | Português | pt.json |
| hu | Magyar | hu.json |
| ja | 日本語 | ja.json |
| ko | 한국어 | ko.json |
| zh | 中文 | zh.json |
| ru | Русский | ru.json |
| uk | Українська | uk.json |
| pl | Polski | pl.json |
| ar | العربية | ar.json |
| tr | Türkçe | tr.json |

## Common Pitfalls

- **Forgetting locales**: When adding keys, it's easy to update only a few files. Always update ALL 15.
- **Stale keys**: After refactoring (e.g., splitting `contact.name` into `contact.firstName` + `contact.lastName`), remove the old key from all files.
- **Key order drift**: Reorder locale keys to match `en.json` ordering when they drift.
- **zsh glob issue**: When using git commands with `[lang]` paths, wrap in single quotes: `git add 'src/pages/[lang]/index.astro'`
