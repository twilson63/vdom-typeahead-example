var app = require('xfx')
var h = app.h

module.exports = main
main.render = render

var typeahead = require('./typeahead')

function main () {
  var state = {}
  state.typeahead = typeahead(['foo', 'bar', 'baz'])
  return state
}

function render (state) {
  return h('div', [
    h('h1', 'Typeahead Example'),
    typeahead.render(state.typeahead)
  ])
}