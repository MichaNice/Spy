var isRecording = false
var frame = undefined
var box = []

// TODO: debounce
function bindListeners(context) {
  context.addEventListener('mousemove', e => box.push(pkg(context, e, 'mousemove')), true)
  context.addEventListener('click', e => box.push(pkg(context, e, 'click')), true)
  context.addEventListener('scroll', e => box.push(pkg(context, e, 'scroll')), true)
}

function pkg(context, event, behavior) {
  return {
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
}

export function data() {
  return box
}

export function tick(context) {
  isRecording || bindListeners(context)
  isRecording = true
  frame = requestAnimationFrame(tick)
}
