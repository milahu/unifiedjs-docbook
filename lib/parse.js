/**
 * @typedef {import('./types.js').Selector} Selector
 * @typedef {import('./types.js').Selectors} Selectors
 * @typedef {import('./types.js').RuleSet} RuleSet
 * @typedef {import('./types.js').Rule} Rule
 * @typedef {import('./types.js').RulePseudo} RulePseudo
 * @typedef {import('./types.js').RulePseudoNth} RulePseudoNth
 */

import {CssSelectorParser} from 'css-selector-parser'
import fauxEsmNthCheck from 'nth-check'
import {zwitch} from 'zwitch'

/** @type {import('nth-check').default} */
// @ts-ignore
var nthCheck = fauxEsmNthCheck.default

var nth = new Set([
  'nth-child',
  'nth-last-child',
  'nth-of-type',
  'nth-last-of-type'
])

var parser = new CssSelectorParser()

var compile = zwitch('type', {handlers: {selectors, ruleSet, rule}})

parser.registerAttrEqualityMods('~', '|', '^', '$', '*')
parser.registerSelectorPseudos('any', 'matches', 'not', 'has')
parser.registerNestingOperators('>', '+', '~')

/**
 * @param {string} selector
 * @returns {Selector}
 */
export function parse(selector) {
  if (typeof selector !== 'string') {
    throw new TypeError('Expected `string` as selector, not `' + selector + '`')
  }

  // @ts-ignore types are wrong.
  return compile(parser.parse(selector))
}

/**
 * @param {Selectors} query
 * @returns {Selectors}
 */
function selectors(query) {
  var index = -1

  while (++index < query.selectors.length) {
    compile(query.selectors[index])
  }

  return query
}

/**
 * @param {RuleSet} query
 * @returns {Rule}
 */
function ruleSet(query) {
  return rule(query.rule)
}

/**
 * @param {Rule} query
 * @returns {Rule}
 */
function rule(query) {
  var pseudos = query.pseudos || []
  var index = -1
  /** @type {RulePseudo|RulePseudoNth} */
  var pseudo

  while (++index < pseudos.length) {
    pseudo = pseudos[index]

    if (nth.has(pseudo.name)) {
      // @ts-ignore Patch a non-primitive type.
      pseudo.value = nthCheck(pseudo.value)
      // @ts-ignore Patch a non-primitive type.
      pseudo.valueType = 'function'
    }
  }

  compile(query.rule)

  return query
}
