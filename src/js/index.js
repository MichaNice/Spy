import { tick, data } from './spy';
import { play } from './play'
import { mostClicked, mostHover, all } from './analysis'
import { fromFirebase, toFirebase } from './firebase'
var pos
var preData
var spy = {}

// public API
spy.start = tick
spy.upload = function(name, interval = 3000) {
  setInterval(() => toFirebase(data(), name), interval)
}
spy.show = function(name, options) {
  fromFirebase(name).then(records => {
    Object.keys(records)
    .map(idx => records[idx])
    .map(record => record.data)
    .forEach(data => {
      play(data, options)
    })
  })
}
spy.current = function(options) {
  play(data(), options)
}
spy.export = data
spy.download = function(name, callback) {
  return fromFirebase(name).then(callback)
}
spy.analysis = function(name, callback) {
  return fromFirebase(name).then(records => {
    var users = Object.keys(records)
      .map(idx => records[idx])
      .map(record => record.data);

    var data = users.reduce((result, data) => result.concat(data), [])
    var clicked = all('click')(data)
    var clicks = mostClicked(data)
    if (callback && typeof callback === 'function') {
      console.log(callback);
      callback({
        totalUsers: users.length,
        totalClicks: data.length,
        mostClicked: clicks
      })
    }
  })
}
window.spy = spy
