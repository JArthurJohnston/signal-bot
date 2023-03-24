;(async function () {
  const { init, Signal } = await import('./core.mjs')
  const { on, fire } = init()

  function shoutItOut () {
    console.log('shouted!')
  }

  on('START').triggers(shoutItOut).fires('END')

  fire(new Signal('START'))
})()
