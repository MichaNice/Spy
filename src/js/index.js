import { start, exportData, play } from './spy.js';

var pos
var preData
start();
document.querySelector('#play').addEventListener('click', function(e) {
  var data = exportData()
  play(document.querySelector('#cursor'), data)
})
document.getElementById('test').addEventListener('click', function() {
  console.log('success')
});

