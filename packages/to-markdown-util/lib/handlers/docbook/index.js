/**
 * @typedef {import('../../types.js').Handle} Handle
 * @typedef {import('../../types.js').Element} Element
 * @typedef {import('../../types.js').MdastNode} MdastNode
 * @typedef {import('../../types.js').H} H
 */

import {all} from '../../all.js'
import {filter} from '../../filter.js'

// TODO test
import {toText} from 'hast-util-to-text'

// FIXME none of these "select" are working for xast
// what did i try? in ../../../../xast-util-select:
// html -> xml: node.tagName -> node.name
// html -> xml: node.properties -> node.attributes
// fixup: query.name -> query.tagName
//import {select, selectAll} from 'hast-util-select'
// https://github.com/unifiedjs/unified/issues/206
// > You can use unist-util-select in any unist language.
// but its not working for xast
//import {select} from 'unist-util-select'
//import {select, selectAll} from '../../../../xast-util-select/index.js'
/*
possible solutions
https://www.npmjs.com/package/css-what
https://www.npmjs.com/package/nwsapi

tried
https://www.npmjs.com/package/unist-util-select
https://www.npmjs.com/package/css-selector-generator
*/

//import {wrapChildren} from '../../util/wrap-children.js'

//import assert from "assert";

// debug
let sectionCounter = 0



/**
 * @typedef {(h: H, node: Element) => MdastNode | MdastNode[]} ElementHandle
 * @typedef {Record<string, ElementHandle>} HandleMap
 */



/** @type {HandleMap} */
const docbookHandlers = {}



docbookHandlers['xi:include'] = (h, node) => {
  return h(node, 'html', `<!-- TODO include ${JSON.stringify(node.attributes)} -->`)
}



docbookHandlers['section'] = (h, node) => {

  /*
  return h(node, 'heading', {depth: 1}, [h(node, 'text', "asdf")]) // test ok

  return h(node, 'heading', {depth: 1}, 'asdf') // test fail
  return h(node, 'heading', {depth: 1}, ['text']) // test fail. ok
  return h(node, 'heading', {depth: 1}, h(node, 'text', "asdf")) // test fail. ok
  //return h(node, 'html', [h(node, 'text', "asdf")]) // test fail
  //return h(node, 'html', [h(node, 'html', "asdf")]) // test fail
  */
  /* last call to h: problem nested html?
  children: [
    {
      type: 'html',
      children: [
        {
          type: 'html',
          value: 'asdf',
          position: { start: [Object], end: [Object] }
        }
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 9, column: 11, offset: 395 }
      }
    }
  ]
  */
  //return [h(node, 'html', 'asdf'), h(node, 'html', 'asdf')] // test ok
  /* last call to h:
  children: [
    {
      type: 'html',
      value: 'asdf',
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 9, column: 11, offset: 395 }
      }
    },
    {
      type: 'html',
      value: 'asdf',
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 9, column: 11, offset: 395 }
      }
    }
  ]
  */
  /*
  return [h(node, 'html', 'asdf')] // test ok
  return h(node, 'html', 'asdf') // test ok
  */
  sectionCounter++
  // TODO track depth of section, use depth for heading
  //console.log(`section.depth: ${section.depth}`) // undefined
  //console.dir({ section }, { depth: 20 })
  //throw new Error('TODO')
  //console.dir({ section }, { depth: 5 }); throw new Error('TODO')
  // properties: { 'xml:id': 'function-library-lib.attrsets.attrByPath' },
  //console.dir({ section }, { depth: 20 }); throw new Error('TODO')
  //console.log(`select title section`)
  //console.dir({section}, {depth:5})
  //console.dir({node}, {depth: 5})
  const id = node.attributes && node.attributes['xml:id']
  //const title = select('title', node)
  const title = node.children.find(
    (child) => ('name' in child && child.name == 'title')
  )
  //console.dir({title, sectionCounter}, {depth: 5})
  //assert(title);
  // note: root element is section, but has no title
  /*
  if (sectionCounter > 1) {
    throw new Error('todo')
  }
  */
  if (!title) {
    //return all(h, node)
    // wrap children
    return all(h, node) // noop
    /* fail
    return [
      //h(node, 'heading', {depth: 1}, "asdf 1"), // fail
      h(node, 'heading', {depth: 1}, [h(node, 'text', 'asdf 1')]),
      ...all(h, node),
    ]
    // fail:
    return h(node, 'heading', {depth: 1}, [
      h(node, 'text', 'asdf'),
      ...all(h, node)
    ])
    */
  }
  return [
    //h(node, 'heading', {depth: 1}, "asdf 1"), // fail
    //h(node, 'heading', {depth: 2}, [h(node, 'text', 'asdf 2')]),
    h(node, 'heading', {depth: 2, id}, all(h, title)), // ok
    // TODO remove title childNode
    //...all(h, node),
    ...filter(h, node, (/** @type {Element} */ child) => child.name != 'title'), // ok
  ]
  /*
  // fail:
  return h(node, 'heading', {depth: 2}, [
    h(node, 'text', 'asdf 2'),
    ...all(h, node)
  ])
  // TODO section id
  //console.dir({title}); throw new Error('TODO')
  // remove title
  if (node.children) {
    node.children = node.children.filter(
      (
        child,
      ) => child.name != 'title'
    )
  }
  //const mdHeadId = id ? ` {#${id}}` : ''
  return h(node, 'html', [
    {type: 'text', value: 'asdf'}, // FIXME

    // TODO transform <function>lib.attrset.attrByPath</function>
    //h(section, 'html', `## ${toText(title)}${mdHeadId}\n`),
    //h(section, 'heading', {depth: 3, id}, toText(title)),
    // TODO implement id in heading-handler in hast-util-to-mdast
    // or in markdown-renderer in remark-stringify
    //h(node, 'heading', {depth: 3, id}, all(h, title)),
    h(node, 'heading', {depth: 3, id}, all(h, title.children)),
    //...all(h, node),
  ])
  */
}



// noop is default
/*
docbookHandlers['title'] = (h, node) => {
  return all(h, node) // noop
}
*/



docbookHandlers['function'] = (h, node) => {
  //return all(h, node)
  //return h(node, 'inlineCode', all(h, node)) // fail
  false && console.dir({
    f: 'function',
    node,
  }, {depth: 5});
  //throw new Error('todo')
  //return h(node, 'inlineCode', node.value) // fail
  // TODO toText
  //return h(node, 'inlineCode', node.children[0].value)
  // @ts-ignore
  return h(node, 'inlineCode', toText(node))
}



docbookHandlers['subtitle'] = (h, node) => {
  // https://github.com/syntax-tree/hast-util-to-mdast/blob/main/lib/handlers/code.js
  return [
    /* too verbose
    // also, there can be description paragraphs
    // after the signature
    h(
      node,
      'html',
      '### Signature'
    ),
    */
    h(
      node,
      'code',
      // signatures are in haskell format
      //{lang: 'haskell'},
      {lang: 'hs', meta: 'nix'},
      //trimTrailingLines(wrapText(h, toText(node)))
      // @ts-ignore
      toText(node)
    ),
  ]
}



docbookHandlers['para'] = (h, node) => (
  h(node, 'paragraph', all(h, node))
)



// originally, this creates a definition list
// alternatives:
// table: most compact
// list
// headings: most vertical space, part of TOC



docbookHandlers['variablelist_as_table'] = (h, node) => (
  h(node, 'table', [
    // empty table header
    h(node, 'tableRow', [
      h(node, 'tableCell', ''),
      h(node, 'tableCell', ''),
    ]),
    ...node.children.map(node => {
      // varlistentry
      const [c1, c2] = node.children
      return (
        h(node, 'tableRow', [
          h(node, 'tableCell', all(h, c1)),
          h(node, 'tableCell', all(h, c2)),
        ])
      )
    })
  ])

  /*
  h(node, 'table', all(h, node))
  h(node, 'tableRow', all(h, node))
  h(node, 'tableCell', all(h, node))
  */
)



// definition list in html for github markdown
/* this is ugly ... better: docbook -> html -> md
// docbook -> html == packages/to-html

<dl>

<dt>

attrPath

</dt>

<dd>

A list of strings representing the path through the nested attribute set set.

</dd>

</dl>

*/
docbookHandlers['variablelist_to_ugly_dl'] = (h, node) => (
  [
    h(node, 'html', '<dl>'),
    ...node.children.reduce((acc, node) => {
      // varlistentry
      const [c1, c2] = node.children
      acc.push(h(node, 'html', '<dt>'))
      acc.push(...all(h, c1))
      acc.push(h(node, 'html', '</dt>'))
      acc.push(h(node, 'html', '<dd>'))
      acc.push(...all(h, c2))
      acc.push(h(node, 'html', '</dd>'))
      return acc
    }, []),
    h(node, 'html', '</dl>'),
  ]
)



// build html manually ... painful
// any markdown must be surrounded with empty lines
docbookHandlers['variablelist_to_pretty_dl'] = (h, node) => {
  const result = []
  let i = -1

  i++
  result[i] = []
  result[i].push('<dl>')
  result[i].push('<dt>')
  result[i].push('</dt>')
  result[i].push('</dl>')
  result[i] = h(node, 'html', result[i])

  return result
}



// simple: markdown headings + paragraphs
docbookHandlers['variablelist'] = (h, node) => [
  // TODO wording
  //h(node, 'heading', {depth: 3}, 'Arguments'),
  h(node, 'heading', {depth: 3}, [h(node, 'text', 'Parameters')]),
  ...node.children.reduce((acc, node) => {
    // varlistentry
    const varname = node.children[0].children[0]
    const paras = node.children[1].children
    //console.dir({varname}, {depth: 5})
    //acc.push(h(node, 'heading', {depth: 4}, ...all(h, c1))) // fail
    //acc.push(h(node, 'heading', {depth: 4}, toText(varname))) // fail
    // TODO depth from context
    acc.push(h(node, 'heading', {depth: 4}, all(h, varname)))
    //acc.push(h(node, 'paragraph', ...all(h, paras))) // fail
    acc.push(...paras.map(para => h(node, 'paragraph', all(h, para))))
    return acc
  }, [])
]



//docbookHandlers['varname'] = (h, node) => h(node, 'inlineCode', toText(h, node)) // fail
docbookHandlers['varname'] = (h, node) => h(node, 'inlineCode', node.children[0].value) // ok. TODO better



docbookHandlers['example'] = (h, node) => {
  const id = node.attributes && node.attributes['xml:id']
  // TODO select
  const title = node.children.find(
    (child) => ('name' in child && child.name == 'title')
  )
  /** @type {string} */
  // @ts-ignore
  const programlisting = node.children.find(
    (child) => ('name' in child && child.name == 'programlisting')
  // @ts-ignore
  ).children[0].value.trim()
  if (programlisting.includes('\n=> ')) {
    const [input, output] = programlisting.split('\n=> ')
    return [
      h(node, 'heading', {depth: 3}, [
        {type: 'text', value: 'Example: '},
        ...all(h, title),
      ]),
      h(node, 'code', {lang: 'nix'}, input),
      h(node, 'code', output),
    ]
  }
  return [
    h(node, 'heading', {depth: 3}, [
      {type: 'text', value: 'Example: '},
      ...all(h, title),
    ]),
    h(node, 'code', {lang: 'nix'}, programlisting),
  ]
}



export default docbookHandlers
