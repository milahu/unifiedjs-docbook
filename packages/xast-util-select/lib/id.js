/**
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').Element} Element
 */

/**
 * @param {Rule} query
 * @param {Element} element
 * @returns {boolean}
 */
export function id(query, element) {
  return Boolean(element.attributes && element.attributes.id === query.id)
}
