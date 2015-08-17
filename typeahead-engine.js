module.exports = typeahead
typeahead.filter = filter
typeahead.move = move
typeahead.select = select

function typeahead (data) {
  var list = data.map(function (i) {
    return { value: i, highlighted: false }
  })
  return list
}

// use criteria to reduce list of values
// reset highlight to first item
function filter (criteria, list) {
  var exp = new RegExp(criteria)
  return list.filter(function (item) {
    return exp.test(item.value) 
  })
}

// up or down move highlight up or down the list
function move (direction, list) {
  var currentIndex = -1
  list.forEach(function (item, index) {
    if (item.highlighted) {
      currentIndex = index
      item.highlighted = false
    }
  })
  console.log(currentIndex)
  if (direction === 'up' && currentIndex > 0) { currentIndex -= 1 }
  if (direction === 'down' && currentIndex < (list.length - 1)) { currentIndex += 1 }
  list[currentIndex].highlighted = true
  return list   
}

// press enter return selected value
function select (list) {
  return list.filter(function (i) {
    return i.highlighted === true
  })[0].value 
}