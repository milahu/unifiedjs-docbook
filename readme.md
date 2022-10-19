# unifiedjs-docbook

convert docbook XML with unifiedjs

## status

working prototype

## install

```
git clone --recurse-submodules https://github.com/milahu/unifiedjs-docbook
cd unifiedjs-docbook
pnpm install
```

## use

```
node test/index.js
```

## bookmarks

* [packages/to-markdown-util/lib/handlers/docbook/index.js](packages/to-markdown-util/lib/handlers/docbook/index.js)
* [packages/to-markdown-util/lib/handlers/](packages/to-markdown-util/lib/handlers/)
* [packages/mdast-util-to-markdown/lib/handle/heading.js](packages/mdast-util-to-markdown/lib/handle/heading.js)
* [test/index.js](test/index.js)
* [test/files/attrsets.md](test/files/attrsets.md) ([github](https://github.com/milahu/unifiedjs-docbook/blob/main/test/files/attrsets.md)) ([gitlab](https://gitlab.com/milahu/unifiedjs-docbook/-/blob/main/test/files/attrsets.md)) ([gitea](https://try.gitea.io/milahu/unifiedjs-docbook/src/branch/main/test/files/attrsets.md)) ([srht](https://git.sr.ht/~milahu/unifiedjs-docbook/tree/main/item/test/files/attrsets.md))
* [test/files/attrsets.xml](test/files/attrsets.xml)

## design goals

* ~~the generated markdown should be pretty and functional on the github blob API~~
  * such "workaround-flavored markdown" is too verbose? example: heading IDs for github blob API ([github](https://github.com/milahu/unifiedjs-docbook/blob/ee9a54d4c6b96171980377f7cd9b4a2371b49fb3/test/files/attrsets.md))
* the converter should be "hackable": just edit some javascript files
* performance is secondary

## based on

| | |
| --- | --- |
| `unifiedjs-docbook-parse` | [rehype-parse](https://github.com/rehypejs/rehype/tree/main/packages/rehype-parse) |
| `unifiedjs-docbook-to-markdown` | [rehype-remark](https://github.com/rehypejs/rehype-remark) |
| `unifiedjs-docbook-to-markdown-util` | [hast-util-to-mdast](https://github.com/syntax-tree/hast-util-to-mdast) |
| `xast-util-select` | [hast-util-select](https://github.com/syntax-tree/hast-util-select) |

## todo

- [ ] split packages into multiple git repos, use git submodules
- [ ] implement all transforms needed for `nixpkgs/doc/**/*.xml`
- [ ] nested `<variablelist>`, for example in `lib.attrsets.filterAttrs`
- [ ] pretty print nix code, for example in `lib.attrsets.filterAttrsRecursive` or `lib.attrsets.mapAttrsRecursive`
- [ ] detect nix function signatures in text, for example `Any -> Any -> Any` or `String -> Any -> { name = String; value = Any }`
- [ ] fix `select` for xml. see [packages/xast-util-select/](packages/xast-util-select/)
- [ ] fix cross file links, example https://github.com/NixOS/nixpkgs/blob/master/doc/builders/trivial-builders.chapter.md
  - actual link https://nixos.org/nix/manual/#adv-attr-allowSubstitutes
  - expected link https://github.com/NixOS/nix/blob/master/doc/manual/src/language/advanced-attributes.md#adv-attr-allowSubstitutes
  - ... or shorten the ID to `advanced-attributes.md#allowSubstitutes`

## related

* https://github.com/NixOS/nixpkgs/issues/105243 Docbook to CommonMark Best Practices
