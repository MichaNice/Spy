import { tick, data } from './spy.js';
import { play } from './play'
import { mostClicked } from './analysis.js'
var pos
var preData
tick();
document.querySelector('#play').addEventListener('click', function(e) {
  var d = data()
  play(document.querySelector('#cursor'), d)
  console.log(mostClicked(d))
})
document.getElementById('test').addEventListener('click', function() {
  console.log('success')
});

