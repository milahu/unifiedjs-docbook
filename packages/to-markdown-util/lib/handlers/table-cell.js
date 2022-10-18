/**
 * @typedef {import('../types.js').Handle} Handle
 * @typedef {import('../types.js').Element} Element
 * @typedef {import('../types.js').MdastNode} MdastNode
 */

import {all} from '../all.js'

/**
 * @type {Handle}
 * @param {Element} node
 */
export function tableCell(h, node) {
  const wrap = h.wrapText

  h.wrapText = false

  const result = h(node, 'tableCell', all(h, node))

  if (node.attributes && (node.attributes.rowSpan || node.attributes.colSpan)) {
    const data = result.data || (result.data = {})
    if (node.attributes.rowSpan) data.rowSpan = node.attributes.rowSpan
    if (node.attributes.colSpan) data.colSpan = node.attributes.colSpan
  }

  h.wrapText = wrap

  return result
}
