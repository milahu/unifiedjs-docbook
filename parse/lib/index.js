// based on
// https://github.com/rehypejs/rehype/pull/112#issuecomment-1281298764

import {fromXml} from 'xast-util-from-xml'

export default function docbookParse() {
  this.Parser = (value) => fromXml(value)
}
