var app = require('xfx')
var h = app.h
var update = app.update

var sendChange = app.sendChange
var sendKey = app.sendKey
var send = app.send
var sendClick = app.sendClick
var bindState = app.bindState
var update = app.update

var typeaheadEngine = require('../typeahead-engine')

module.exports = typeahead
typeahead.render = render

function typeahead (list) {
  var state = {}
  state.value = ''
  state.show = 'none'
  state.list = typeaheadEngine(list)
  state.orig = state.list.concat([])
  state.actions = bindState(actions(), state)
  return state
}

function actions () {
  return {
    event: function (state) {
      state.show = 'block'
    },
    filter: function (state, data) {
      state.list = typeaheadEngine.filter(data.foo, state.list)
      state.value = data.foo
      update()
    },
    move: function (state, data) {
      //console.log(data)
      state.list = typeaheadEngine.move(data, state.list)
      update()
    },
    select: function (state, data) {
      state.value = typeaheadEngine.select(state.list)
      state.show = 'none'
      update()
    },
    reset: function (state) {
      state.value = ''
      state.show = 'none'
      console.log(state.orig)
      state.list = state.orig.concat([])
      update()
    }
  }
}

function render (state) {
  var UP = 38
  var DOWN = 40
  var ENTER = 13
  var liStyle = {
    position: 'relative',
    padding: '.2em .5em',
    cursor: 'pointer',
  }

  function li (c) {
    var value = c.value
    var curStyle = liStyle

    if (c.highlighted) {
      //value = c.value + ' [Highlighted]'
      curStyle = app.xtend(liStyle, {
        background: 'hsl(200, 40%, 80%)',
        color: 'black'
      })
    }
    return h('li', {
      style: curStyle
    }, value)
  }

  return h('div', [
    h('input', { 
      type: 'text', 
      name: 'foo',
      value: state.value,
      'ev-event': [
        send(state.actions.event),
        sendChange(state.actions.filter)
      ],
      'ev-keydown': [
        sendKey(state.actions.move, 'down', { key: DOWN}),
        sendKey(state.actions.move, 'up', { key: UP}),
        sendKey(state.actions.select, 'select', { key: ENTER })
      ]
    }),
    h('button', { 'ev-click': sendClick(state.actions.reset)}, 'reset'),
    h('ul', {
      style: {
        display: state.show,
        'list-style': 'none',
        position: 'absolute',
        left: 0,
        'z-index': 1,
        'min-width': '200px',
        padding: 0,
        'border-radius': '.3em',
        margin: '.2em 0 0',
        background: 'linear-gradient(to bottom right, white, hsla(0,0%,100%,.8))',
        border: '1px solid rgba(0,0,0,.3)',
        'box-shadow': '.05em .2em .6em rgba(0,0,0,.2)',
        'text-shadow': 'none'
      }
    }, state.list.map(li))  
  ])
}