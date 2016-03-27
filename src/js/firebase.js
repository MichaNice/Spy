import Firebase from 'firebase'
var len = 0
var pos
var firebase = new Firebase('https://blog-new.firebaseio.com/')
function toFirebase(data, app = 'test') {
  var dir = firebase.child(app)
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
export { toFirebase, fromFirebase };
