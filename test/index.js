// debug
let titleCounter = 0

const t1 = Date.now()

import fs from 'fs';
import path from 'path';
import process from 'process';

const testScript = process.argv[1]
const testDir = path.dirname(testScript)

import {unified} from 'unified'

import docbookParse from "../packages/parse/index.js"

import docbookToMarkdown from "../packages/to-markdown/index.js"
import {all} from "../packages/to-markdown-util/index.js"
import {wrapChildren} from '../packages/to-markdown-util/lib/util/wrap-children.js'

//import { toHtml } from 'hast-util-to-html' // html -> str
//import {toText} from 'hast-util-to-text'

//import markdownStringifyPretty from 'remark-prettier';
import report from 'vfile-reporter';

//import {toMdast, defaultHandlers, all, one} from 'hast-util-to-mdast'

import {select, selectAll} from 'hast-util-select'
//import {matches, select, selectAll} from 'hast-util-select'

import markdownStringify from 'remark-stringify' // md -> str
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



/*
https://github.com/NixOS/nixpkgs/blob/7a79469a24a71c26cb61b53590cb09ad6192654f/doc/functions/library/attrsets.xml
*/
//const inputPath = 'functions/library/attrsets.xml';
//const inputPath = 'files/attrsets.xml';
const inputPath = path.resolve(testDir, 'files/debug-section-title.xml');

const outputPath = inputPath.split('.').slice(0, -1).join('.') + '.md'

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

const processor = (

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

  // markdown tree -> markdown string
  .use(markdownStringify, {
    bullet: '*',
    //fence: '~',
    fences: true,
    incrementListMarker: false,
  })

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
