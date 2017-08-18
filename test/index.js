const beautify = require('..')
const path = require('path')
const sugarml = require('sugarml')
const {readFileSync} = require('fs')
const reshape = require('reshape')
const test = require('ava')
const fixtures = path.join(__dirname, 'fixtures')

test('line eating test (with surrounding tags)', (t) => {
  return compare(t, 'linestrip-surrounding-tags')
})

test('line eating test (with only lines)', (t) => {
  return compare(t, 'linestrip-lines-only')
})

function compare (t, name, opts) {
  const src = readFileSync(path.join(fixtures, `${name}.sgr`), 'utf8')
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8')

  return reshape({ parser: sugarml, plugins: beautify(opts) })
    .process(src)
    .then((res) => res.output())
    .tap((out) => t.is(expected, out))
}
