var ta = require('./typeahead-engine')

var list = ta(['one', 'two', 'three'])

console.log(list)

list = ta.move('down', list)

console.log(list)

list = ta.move('down', list)

console.log(list)

list = ta.move('down', list)

console.log(list)

list = ta.move('up', list)

console.log(list)

list = ta.move('up', list)

console.log(list)

list = ta.move('up', list)

console.log(list)

var value = ta.select(list)

console.log(value)