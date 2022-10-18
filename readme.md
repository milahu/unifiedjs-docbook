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
* [test/files/attrsets.md](test/files/attrsets.md)
* [test/files/attrsets.xml](test/files/attrsets.xml)

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
