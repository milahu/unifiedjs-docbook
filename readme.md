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
