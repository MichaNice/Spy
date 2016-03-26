var isRecording = false
var frame = undefined
var box = []
bindListeners()

// TODO: debounce
function bindListeners() {
  window.addEventListener('mousemove', e => box.push(createIntel(window, e, 'mousemove')), true)
  window.addEventListener('click', e => box.push(createIntel(window, e, 'click')), true)
  window.addEventListener('scroll', e => box.push(createIntel(window, e, 'scroll')), true)
}

function createIntel(context, event, behavior) {
  var pkg = {
    x: event.pageX || null,
    y: event.pageY || null,
    offsetX: event.offsetX,
    offsetY: event.offsetY,
    scrollX: context.scrollX,
    scrollY: context.scrollY,
    target: event.target.getAttribute ? event.target.getAttribute('id') : null,
    behavior: behavior,
    ts: Date.now()
  }
  return pkg
}

export function data() {
  return box
}

export function tick() {
  isRecording || bindListeners()
  isRecording = true
  frame = window.requestAnimationFrame(tick)
}
