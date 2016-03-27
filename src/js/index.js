import { tick, data } from './spy';
import { play } from './play'
import { mostClicked, mostHover, all } from './analysis'
import { fromFirebase, toFirebase } from './firebase'
var pos
var preData
var spy = {}

spy.start = tick
spy.upload = function(name, interval = 3000) {
  setInterval(() => toFirebase(data(), name), interval)
}
spy.show = function(name) {
  // var d = data()
  // play(document.querySelector('#cursor'), d)
  fromFirebase(name).then(records => {
    Object.keys(records)
    .map(idx => records[idx])
    .map(record => record.data)
    .forEach(data => {
      play(cursor(), data, false)
      console.log(`${mostClicked(data)}, ${mostHover(data)}`)
      console.log(all('click')(data))
    })
  })
}
spy.current = function() {
  play(cursor(), data(), true)
}
function cursor() {
  var cursor = document.createElement('div')
  cursor.classList.add('cursor')
  document.body.appendChild(cursor)
  return cursor
}
window.spy = spy
