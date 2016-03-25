
var isRecording = false
var rAF = undefined
var intelligenceBox = []
bindListeners()

function start() {
  isRecording = true
  rAF = window.requestAnimationFrame(moment.bind(this))
}

function moment(ts) {
  isRecording = true

  rAF = window.requestAnimationFrame(moment.bind(this))
}

function bindListeners() {
  window.addEventListener('mousemove', e => {
    if (!isRecording)
      return
    intelligenceBox.push(createIntel(e, 'mousemove'))
  }, true)
  window.addEventListener('click', e => {
    console.log(e)
    if (!isRecording)
      return
    intelligenceBox.push(createIntel(e, 'click'))
  }, true)
  window.addEventListener('scroll', e => {
    if (!isRecording)
      return
    intelligenceBox.push(createIntel(e, 'scroll'))
  }, true)
  // window.addEventListener('beforeunload', e => {
  //   saveToLocalStorage(export());
  // });
}

// Spy.prototype.saveToLocalStorage = function(data) {
//   var info = {
//     page: location
//     intelligences: data
//   }
//   localStorage.setItem('spy-data', data);
// };

function createIntel(event, behavior) {
  var intelligence = {
    x: event.pageX || null,
    y: event.pageY || null,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    target: event.target.getAttribute ? event.target.getAttribute('id') : null,
    behavior: behavior,
    ts: Date.now()
  }
  return intelligence
}

function exportData() {
  return intelligenceBox
}

function play(cursor, box) {
  let start = box[0].ts
  box.forEach(intelligence => {
    setTimeout(() => {

      if (intelligence.behavior === 'scroll') {
        window.scroll(intelligence.scrollX, intelligence.scrollY)
      } else if (intelligence.behavior === 'mousemove') {
        cursor.style.left = intelligence.x + 'px'
        cursor.style.top = intelligence.y + 'px'
      } else if (intelligence.behavior === 'click') {
        if (intelligence.target) {
          var evObj = document.createEvent('Events')
          evObj.initEvent('click', true, false)
          document.getElementById(intelligence.target).dispatchEvent(evObj)
        }
      }
    }, intelligence.ts - start)
  });
}

export { start, exportData, play }
