import Firebase from 'firebase'
var len = 0
var pos
var firebase = new Firebase('https://spy-js.firebaseio.com/name/')
function toFirebase(data, app = 'test') {
  let dir = firebase.child(app)
  if (!data.length || len === data.length)
    return
  if (!pos)
    pos = dir.push({data: data})
  else
    pos.set({data: data})
  len = data.length
}
function fromFirebase(app = 'test') {
  return new Promise((resolve, reject) => {
    firebase.child(app).on('value', snapshot => resolve(snapshot.val()))
  })
}
firebase.remove();
console.log('remove');
export { toFirebase, fromFirebase };
