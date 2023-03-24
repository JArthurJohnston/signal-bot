const NOOP = () => {}

export function EventMap () {
  this.triggers = { START: [], END: [] }
  this.add = (eventKey, trigger) => {
    if (this.triggers[eventKey]) {
      this.triggers[eventKey].push(trigger)
    } else {
      this.triggers[eventKey] = [trigger]
    }
  }
  this.get = (key) => {
    return this.triggers[key]
  }
}

export function Signal (key, payload = null) {
  this.key = key
  this.payload = payload
}

export function Trigger (action = NOOP, eventKey = '') {
  this.action = action
  this.eventKey = eventKey

  this.triggers = (fn) => {
    this.action = fn
    return this
  }
  this.fires = (eventKey) => {
    this.eventKey = eventKey
    return this
  }
  this.call = (event) => {
    const val = this.action(event.payload)
    return val // wrap val in an event
  }
}

export function init (eMap = new EventMap()) {
  function on (...events) {
    const trigger = new Trigger()
    events.forEach((eachEvent) => {
      eMap.add(eachEvent, trigger)
    })
    return trigger
  }

  function fire (signal) {
    console.log('firing', signal, eMap)
    eMap.get(signal.key).forEach((eachTrigger) => {
      setTimeout(() => {
        const value = eachTrigger.call(signal.payload)
        if (eachTrigger.eventKey) {
          fire(new Signal(eachTrigger.eventKey, value))
        }
      }, 0)
    })
  }

  return { on, fire }
}
