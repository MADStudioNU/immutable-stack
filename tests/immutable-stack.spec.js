var ImmutableStack = require('src')

describe('ImmutableStack', function () {

  it('can be initialized with a regular array', function () {
    var a = [ 1, 2, 3 ]
      , messages = ImmutableStack(a)

    expect(messages.stack()).toEqual(a)
  })

  it('does not shallow copy its initialization array', function () {
    var a = [ 1, 2, 3 ]
      , messages = ImmutableStack(a)

    var newMessages = messages.push(4)

    expect(a.length).toBe(3)
    expect(a).toEqual([ 1, 2, 3 ])
  })

  it('has immutable copy', function () {
    var messages = ImmutableStack()
    var mStack   = messages.stack()

    expect(mStack).not.toBe(messages.stack())
    expect(mStack).toEqual(messages.stack())

    var replies = ImmutableStack(mStack)
    var rStack  = replies.stack()

    expect(rStack).not.toBe(mStack)
    expect(rStack).toEqual(mStack)
  })

  it('has immutable push', function () {
    var messages = ImmutableStack()
      , stack    = messages.stack()

    var newMessages = messages.push('test', 'hello')
      , newStack    = newMessages.stack()

    expect(newStack.length).toBe(2)
    expect(newStack).toContain('test', 'hello')

    expect(stack.length).toBe(0)
  })

  it('has immutable pop', function () {
    var messages = ImmutableStack()
      , mStack   = messages.stack()

    var newMessages = messages.push('a', 'b', 'c')
      , nStack      = newMessages.stack()

    newMessages.pop()

    expect(newMessages.stack()).toEqual(nStack)

    expect(messages.stack()).toEqual(newMessages.pop().pop().pop().stack())
  })
})
