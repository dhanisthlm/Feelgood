{
'use strict'

/* global describe it */
/* eslint quotes: "off" */


const arrayStringer = instanceStringer.arrayStringer


const expect = chai.expect

describe('array-stringer', () => {

  it('Should output an empty array', () => {
    const array = []
    expect(arrayStringer(array)).to.equal('[]')
  })

  it('Should output elements of arrays', () => {
    let array = [1, 2, 3]
    expect(arrayStringer(array)).to.equal('[1, 2, 3]')

    array = ['A', 'B', 'C']
    expect(arrayStringer(array)).to.equal("['A', 'B', 'C']")

    array = [{ a: 1, b: 2 }, { a: 3, b: 4 }, { c: 5, d: 6 }]
    expect(arrayStringer(array)).to.equal(
      "[{ a: 1, b: 2 }, { a: 3, b: 4 }, { c: 5, d: 6 }]")

    array = [[1, 2], ['A', 'B'], [{ c: 'C', d: 'D' }, { e: 'E' }]]
    expect(arrayStringer(array)).to.equal(
      "[[1, 2], ['A', 'B'], [{ c: 'C', d: 'D' }, { e: 'E' }]]")
  })

  it('Should output elements of arrays having class instances', () => {
    class MyClass {
      constructor (a, b) {
        this.a = a || 1
        this.b = b || 2
      }
    }
    const array = [new MyClass(), new MyClass(3, 4), new MyClass('A', 'B')]
    expect(arrayStringer(array)).to.equal("[" +
      "MyClass { a: 1, b: 2 }, " +
      "MyClass { a: 3, b: 4 }, " +
      "MyClass { a: 'A', b: 'B' }" +
      "]")
  })

})


}
