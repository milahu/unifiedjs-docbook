#! /bin/sh

set -e
set -x

mkdir unifiedjs-docbook/
cd unifiedjs-docbook/
git init
git commit -m init --allow-empty

git remote add util https://github.com/syntax-tree/hast-util-to-mdast
git fetch util main --depth 1 
git merge util/main --allow-unrelated-histories -m "merge https://github.com/syntax-tree/hast-util-to-mdast"
mkdir to-markdown-util
git mv .editorconfig  .github/ .gitignore index.js  lib license  .npmrc package.json .prettierignore readme.md .remarkignore test/ tsconfig.json  to-markdown-util/
git commit -m "move / to to-markdown-util/" 

git remote add h2m https://github.com/rehypejs/rehype-remark
git fetch h2m main --depth 1 
git merge h2m/main  --allow-unrelated-histories -m "merge https://github.com/rehypejs/rehype-remark"
mkdir to-markdown
git mv .editorconfig  .github     index.js  license  package.json     readme.md tsconfig.json .gitignore  lib       .npmrc   .prettierignore  test.js to-markdown/
git commit -m "move / to to-markdown/"

git remote add rehype https://github.com/rehypejs/rehype
git fetch rehype main --depth 1 
git merge rehype/main  --allow-unrelated-histories -m "merge https://github.com/rehypejs/rehype"
mkdir rehype 
git mv changelog.md  .editorconfig  .gitattributes  .gitignore  logo.svg  package.json  .prettierignore  script tsconfig.json .github         license     .npmrc    packages      readme.md        test doc rehype/
git commit -m "move / to rehype/" 

git mv rehype/packages/rehype-parse/ parse/
git commit -m "mv rehype/packages/rehype-parse/ parse/"

r=select
u=https://github.com/syntax-tree/hast-util-select
p=xast-util-select
git remote add $r $u &&
git fetch $r main --depth 1 &&
git merge $r/main --allow-unrelated-histories -m "merge $u" &&
mkdir packages/$p &&
git mv .editorconfig  .github     index.js  license       .npmrc readme.md  test .gitignore  lib        package.json .prettierignore tsconfig.json packages/$p/ &&
git commit -m "mv / to packages/$p/"
