var Emitter = function () {
  var listeners = {}

  this.on = function (event, fn) {
    if (!listeners[event]) {
      listeners[event] = []
    }

    listeners[event].push(fn)
  }

  this.emit = function (event) {
    var eventListeners = listeners[event]

    if (!eventListeners) return

    var i = 0
    while (i < eventListeners.length) {
      eventListeners[i].apply(null, Array.prototype.slice.call(arguments, 1))
      i++
    }
  }
}

var MockSocket = Emitter // eslint-disable-line no-unused-vars

var MockRunner = function () { // eslint-disable-line no-unused-vars
  Emitter.call(this)

  this.config = {}

  this.begin = function (fn) {
    this.on('begin', fn)
  }

  this.done = function (fn) {
    this.on('done', fn)
  }

  this.testStart = function (fn) {
    this.on('testStart', fn)
  }

  this.testDone = function (fn) {
    this.on('testDone', fn)
  }

  this.log = function (fn) {
    this.on('log', fn)
  }

  this.load = function () {
    // NOOP
  }

  this.start = function () {
    // NOOP
  }

  this.dump = {
    parse: function (input) {
      return JSON.stringify(input)
    }
  }
}
