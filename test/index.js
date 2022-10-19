const inputFiles = [
  'debug-section-title.xml',
  'attrsets.xml', // https://github.com/NixOS/nixpkgs/blob/7a79469a24a71c26cb61b53590cb09ad6192654f/doc/functions/library/attrsets.xml
  'advanced-attributes.md', // https://github.com/NixOS/nix/raw/master/doc/manual/src/language/advanced-attributes.md
]

const inputFile = inputFiles.slice(-1)[0]

// debug
let titleCounter = 0

const t1 = Date.now()

import fs from 'fs';
import path from 'path';
import process from 'process';

const testScript = process.argv[1]
const testDir = path.relative(process.cwd(), path.dirname(testScript))

import {unified} from 'unified'

// FIXME resolutions in package.json
//import docbookParse from "docbook-parse"
import docbookParse from "../packages/parse/index.js"

import markdownParse from "remark-parse"

import markdownExtensionDirective from 'remark-directive'

// FIXME resolutions in package.json
//import docbookToMarkdown from "docbook-to-markdown"
import docbookToMarkdown from "../packages/to-markdown/index.js"

//import {all} from "../packages/to-markdown-util/index.js"
//import {wrapChildren} from '../packages/to-markdown-util/lib/util/wrap-children.js'

//import { toHtml } from 'hast-util-to-html' // html -> str
//import {toText} from 'hast-util-to-text'

//import markdownStringifyPretty from 'remark-prettier';
import report from 'vfile-reporter';

//import {toMdast, defaultHandlers, all, one} from 'hast-util-to-mdast'

//import {select, selectAll} from 'hast-util-select'
//import {select, selectAll} from '../packages/xast-util-select/index.js'
//import {matches, select, selectAll} from 'hast-util-select'

import markdownStringify from 'remark-stringify' // md -> str
//import markdownStringify from '../packages/remark/packages/remark-stringify/index.js' // md -> str

import markdownExtensionGithub from 'remark-gfm'

import assert from "assert";
//import { Element } from "v96/@types/hast";
//import markdownStringify from './remark/packages/remark-stringify/index.js' // md -> str

/*
import xmlParseBroken from ''
import remarkHtml from 'remark-html DENOIFY: UNKNOWN NODE BUILTIN' // md -> html
import rehypeStringify from 'rehype-stringify DENOIFY: UNKNOWN NODE BUILTIN' // html -> str
import {visit} from 'unist-util-visit'
import {remove} from 'unist-util-remove'
import {h} from 'hastscript'
*/

//import {wrapText} from '' // not exported by hast-util-to-mdast

//import remarkMdx from 'remark-mdx'; // html -> mdx
// const ast = unified().use(remarkParse).use(remarkMdx).parse(src)

// https://github.com/syntax-tree/hast-util-to-mdast/tree/main/lib/util



function date() {
  return new Date().toLocaleString('af')
}



const inputPath = path.join(testDir, 'files', inputFile);

const inputExtension = inputPath.split('.').slice(-1)[0]

const outputExtension = inputExtension == 'md' ? 'out.md' : 'md'

const outputPath = inputPath.split('.').slice(0, -1).join('.') + '.' + outputExtension

const inputText = (
  fs.readFileSync(inputPath, 'utf8')
  // workaround for parsing xml
  // https://github.com/rehypejs/rehype/issues/109
  //.replace(/<!\[CDATA\[(.*?)\]\]>/sg, '$1')
  //.replace(/<!\[CDATA\[(.*?)\]\]>/sg, '<cdata>$1</cdata>')
);

/* TODO parse xml. https://github.com/rehypejs/rehype/issues/109
// https://github.com/syntax-tree/xast-util-from-xml
import {fromXml} from 'xast-util-from-xml'
import {toXml} from 'xast-util-to-xml DENOIFY: UNKNOWN NODE BUILTIN'
import {fromHtml} from 'hast-util-from-html DENOIFY: UNKNOWN NODE BUILTIN'

// https://github.com/syntax-tree/xastscript
// utility to create xast trees
import {x} from 'xastscript DENOIFY: UNKNOWN NODE BUILTIN'
import {u} from 'unist-builder DENOIFY: UNKNOWN NODE BUILTIN' // cdata

const tree = fromXml(await fs.readFile('example.xml'))
console.log(tree)
*/

// default node type is Element
// TODO can also be Text or Comment (or so)
//type Handler = (h: H, e: Element) => any;



const markdownStringifyOptions = {
  bullet: '-',
  //fence: '~',
  fences: true,
  incrementListMarker: false,
};

import {visit} from 'unist-util-visit'


// https://unifiedjs.com/explore/package/remark-directive/
// This plugin is an example to let users write HTML with directives.
// It’s informative but rather useless.
// See below for others examples.
/** @type {import('unified').Plugin<[], import('mdast').Root>} */
//function myRemarkPlugin()
function markdownExtensionTodo() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        // TODO shorter? CSS selector?
        node.type === 'list' &&
        node.children[0].type === 'listItem' &&
        node.children[0].children[0].type == 'paragraph' &&
        node.children[0].children[0].children[0].type == 'text' &&
        node.children[0].children[0].children[0].value == '[' &&
        node.children[0].children[0].children[1].type == 'inlineCode' &&
        node.children[0].children[0].children[2].type == 'text' &&
        node.children[0].children[0].children[2].value.startsWith(']{#') &&
        node.children[0].children[0].children[2].value.endsWith('}') &&
        node.children[0].children[0].children[3].type == 'break' &&
        true
      ) {
        const newNodes = [
          /* test
          {type: 'text', value: 'hello'},
          {type: 'text', value: 'asdf'},
          {type: 'heading', children: [{type: 'text', value: 'head'}]},
          {type: 'text', value: 'hello'},
          */
        ]
        // loop list items
        for (let i = 0; i < node.children.length; i++) {
          const item = node.children[i]
          const title = item.children[0].children[1].value
          const id = item.children[0].children[2].value.slice(3, -1)

          //const data = node.data || (node.data = {})
          //const attributes = node.attributes || {}

          //console.dir({ node, title, id, data, attributes })
          //throw new Error("todo")

          item.children[0].children.shift()
          item.children[0].children.shift()
          item.children[0].children.shift()
          item.children[0].children.shift()

          /* FIXME handle multiple titles -> seek util type == "break"
          [`outputHash`]{#adv-attr-outputHash}; [`outputHashAlgo`]{#adv-attr-outputHashAlgo}; [`outputHashMode`]{#adv-attr-outputHashMode}\
          */

          /* FIXME not working. heading and paragraph are joined in the same line
          item.children[0].children.unshift({
            type: 'heading',
            depth: 2, // TODO get depth from context
            children: [{type: 'text', value: title}],
            id,
          })
          item.type = 'root'
          */

          newNodes.push({
            type: 'heading',
            depth: 2, // TODO get depth from context
            children: [{type: 'text', value: title}],
            id,
          })
          newNodes.push(...item.children)
        }

        /* FIXME not working. heading and paragraph are joined in the same line
        node.type = 'root'
        */

        const newNode = {
          // generic markdown container to "spread" all children into parent node
          //type: 'div', // Error: Cannot handle unknown node `div`
          //type: '', // Error: Cannot handle unknown node ``
          //type: 'paragraph', // wrong
          //type: 'html', // no output
          //type: 'markdown', // Error: Cannot handle unknown node `markdown`
          type: 'root', // yes! mdast-util-to-markdown/lib/handle/root.js
          children: newNodes,
        }

        // TODO replace node. this will only add props, not remove props
        Object.assign(node, newNode)

        /*
        console.dir(node.children[0]) // first paragraph
        throw new Error('todo')

        // example

        const data = node.data || (node.data = {})
        const hast = h(node.name, node.attributes)

        data.hName = hast.tagName
        data.hProperties = hast.properties
        */
      }
    })
  }
}



const processor = (

inputExtension == 'xml' ? ( // docbook -> markdown

unified()

  // html string -> html tree
  .use(docbookParse, {
    //fragment: true,
    emitParseErrors: true,
    xmlMode: true,
  //} as RehypeParseOptions)
  })

  // docbook tree -> markdown tree
  .use(docbookToMarkdown)

  // extensions for markdownStringify ...
  // https://github.com/syntax-tree/mdast-util-to-markdown#list-of-extensions

  // github-flavored markdown: markdown tables, ...
  .use(markdownExtensionGithub)

/* TODO headings: add extension for markdownStringify

### [heading](#custom-heading-id)<a id="custom-heading-id"/>

[link to custom-heading-id](#custom-heading-id)

*/



  // these extensions are useful for converting markdown to html ...

  // custom #id annotations for headings
  // input: ### My Great Heading {#custom-id}
  // output: <h3 id="custom-id">My Great Heading</h3>
  // https://github.com/imcuttle/remark-heading-id

  // https://github.com/kevin940726/remark-code-import
  // populate code blocks from files

  // https://github.com/freesewing/freesewing/tree/develop/packages/remark-jargon
  // supports jargon syntax with a centrally managed file of jargon terms/definition

  // https://github.com/remarkjs/remark-lint
  // markdown code style linter. potentially useful for detecting syntax errors in imported files



  // markdown tree -> markdown string
  .use(markdownStringify, markdownStringifyOptions)

  // markdown tree -> pretty markdown string
  // remark-prettier registers a unified compiler.
  // This means this plugin is used for formatting the document.
  // Usually this is done by remark-stringify
  // ugly string -> pretty string
  // Format HTML in Markdown
  // https://github.com/prettier/prettier/issues/8480
  // -> open issue!
  /*
  .use(markdownStringifyPretty, {
    options: {
      //asdf
    },
  })
  */

) :

inputExtension == 'md' ? ( // markdown -> markdown

unified()

  .use(markdownParse)

  .use(markdownExtensionDirective)

  // github-flavored markdown: markdown tables, ...
  .use(markdownExtensionGithub)

  .use(markdownExtensionTodo)

  // markdown tree -> markdown string
  .use(markdownStringify, markdownStringifyOptions)

) :

null

);



(
processor
  .process(inputText, function(error, result) {
    //console.error(report(err || output))
    if (error) {
      console.error(report(error))
    }
    /*
    console.log(
      String(result) //.slice(0, 2000)
    )
    */

    const t2 = Date.now()
    const dt = (t2 - t1) / 1000;

    // write output to file
    console.log(`${date()} docbook2md.js: done after ${dt.toFixed(3)} sec. writing ${outputPath}`)
    fs.writeFileSync(outputPath, String(result), 'utf8')

  })
)
