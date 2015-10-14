var Classy = require('classy-js')

function immutableStackUpdate (stack, method, args) {
  args = args || []

  var newStack = stack.slice()

  newStack[method].apply(newStack, args)

  return ImmutableStack(newStack)
}

var ImmutableStackUpdater = Classy(1, function (self, stack) {
  self.push = function () {
    return immutableStackUpdate(stack, 'push', [].slice.call(arguments))
  }

  self.pop = function () {
    return immutableStackUpdate(stack, 'pop')
  }

  self.stack = function () {
    return stack.slice()
  }
})

ImmutableStack = function (stack) {
  stack = (stack instanceof Array && stack.length) ? stack : [ ]

  return ImmutableStackUpdater(stack)
}

module.exports = ImmutableStack
