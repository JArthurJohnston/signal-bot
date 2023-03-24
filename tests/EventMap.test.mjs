import { EventMap } from '../src/core.mjs'

test('initialization', () => {
  const map = new EventMap()

  expect(map.triggers.START).toEqual([])
  expect(map.triggers.END).toEqual([])
})

test('adding triggers', () => {
  const map = new EventMap()
  const trigger = { foo: 'bar' }
  map.add('action', trigger)

  expect(map.triggers.action).toEqual([trigger])
})
