import spy from './spy.js'

var s = spy();
var pos;
var preData;
var firebase = new Firebase("https://blog-new.firebaseio.com/");
// document.querySelector('#play').addEventListener('click', function(e) {
//     var data = s.export();
//     s.play(document.querySelector('#cursor'), data);
// });
// document.getElementById('test').addEventListener('click', function() {
//     console.log('success');
// })

// set when to save
document.addEventListener('keydown', function(e) {
    console.log(e);
})
window.setInterval(saveToFirebase, 3000);

function saveToFirebase() {
    console.log(s.export());
    var data = s.export();
    if (preData && preData.length === data.length) {
        return;
    }
    if (!data.length) {
        return;
    }
    if (!pos) {
        pos = firebase.push({data: data});
    } else {
        pos.set({data: data});
    }
    preData = data;
}
