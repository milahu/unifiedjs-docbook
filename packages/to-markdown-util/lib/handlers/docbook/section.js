/**
 * @typedef {import('../../types.js').Handle} Handle
 * @typedef {import('../../types.js').Element} Element
 * @typedef {import('../../types.js').MdastNode} MdastNode
 */

import {all} from '../../all.js'
import {select, selectAll} from 'hast-util-select'
import assert from "assert";

// debug
let titleCounter = 0

/**
 * @type {Handle}
 * @param {Element} node
 */
export function section(h, node) {
  // TODO track depth of section, use depth for heading
  //console.log(`section.depth: ${section.depth}`) // undefined
  //console.dir({ section }, { depth: 20 })
  //throw new Error('TODO')
  //console.dir({ section }, { depth: 5 }); throw new Error('TODO')
  // properties: { 'xml:id': 'function-library-lib.attrsets.attrByPath' },
  //console.dir({ section }, { depth: 20 }); throw new Error('TODO')
  //console.log(`select title section`)
  //console.dir({section}, {depth:5})
  const title = select('title', node)
  assert(title);
  console.dir({title}, {depth: 5})
  if (titleCounter > 2) {
    throw new Error('todo')
  }
  titleCounter++
  /** @type {string | undefined} */
  const id = node.properties && node.properties['xml:id']
  // TODO section id
  //console.dir({title}); throw new Error('TODO')
  // remove title
  if (node.children) {
    node.children = node.children.filter((node) => node.name != 'title')
  }
  //const mdHeadId = id ? ` {#${id}}` : ''
  return h(node, 'html', [

    // TODO transform <function>lib.attrset.attrByPath</function>
    //h(section, 'html', `## ${toText(title)}${mdHeadId}\n`),
    //h(section, 'heading', {depth: 3, id}, toText(title)),
    // TODO implement id in heading-handler in hast-util-to-mdast
    // or in markdown-renderer in remark-stringify
    h(node, 'heading', {depth: 3, id}, all(h, title)),
    all(h, node),
  ])
}
