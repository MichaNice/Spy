import { tick, data, play } from './spy.js';

var pos
var preData
tick();
document.querySelector('#play').addEventListener('click', function(e) {
  var d = data()
  play(document.querySelector('#cursor'), d)
})
document.getElementById('test').addEventListener('click', function() {
  console.log('success')
});

