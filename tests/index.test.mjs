import { init, EventMap } from '../src/core.mjs'

const map = new EventMap()
const { on } = init(map)

function getApples () {
  console.log('bobbed for apples')
}

test('on creates trigger', () => {
  const trigger = on('bob').triggers(getApples).fires('foo')

  expect(map.get('bob')).toEqual([trigger])
  expect(trigger.action).toEqual(getApples)
  expect(trigger.eventKey).toEqual('foo')
})
