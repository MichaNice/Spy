// TODO: Need a lot of enhancement, like selector and sync layout forcing and setTimeout
var colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#34495e', '#9b59b6']
export function play(data, options) {
  options = Object.assign({
    cursor: defaultCursor(),
    scroll: false
  }, options)
  let [{ts: start}] = data
  let {cursor, scroll} = options
  data
  .filter(pkg => scroll || pkg.behavior !== 'scroll')
  .forEach(pkg => {
    setTimeout(() => {
      if (pkg.behavior === 'scroll') {
        window.scroll(pkg.scrollX, pkg.scrollY)
      } else if (pkg.behavior === 'click') {
        // if (pkg.target) {
        //   let event = document.createEvent('Events')
        //   event.initEvent('click', true, false)
        //   if (document.getElementById(pkg.target))
        //     document.getElementById(pkg.target).dispatchEvent(event)
        // }
      }
      var ref = parseMap(pkg.map)
      // the ref may be a text node
      if (!ref)
        return
      if (!ref.getBoundingClientRect)
        ref = ref.parentNode
      if (!ref.getBoundingClientRect)
        return
      var offset = getOffset(ref)
      // cursor.style.left = offset.left + pkg.offsetX + 'px'
      // cursor.style.top = offset.top + pkg.offsetY + 'px'
      console.log(`translate(${offset.left + pkg.offsetX}px, ${offset.top + pkg.offsetY}px)`);
      cursor.style.transform = `translate(${offset.left + pkg.offsetX}px, ${offset.top + pkg.offsetY}px)`
    }, pkg.ts - start)
  })
}
function getOffset(el) {
  el = el.getBoundingClientRect()
  return {
    left: el.left + window.scrollX,
    top: el.top + window.scrollY
  }
}
function parseMap(map) {
  return map
  .reverse()
  .reduce((result, info) => {
    if (result.childNodes[info])
      return result.childNodes[info]
    return result
  }, document)
}
function defaultCursor() {
  let cursor = document.createElement('div')
  cursor.style.position = 'absolute'
  cursor.style.width = '20px'
  cursor.style.height = '20px'
  cursor.style.background = colors[Math.floor(Math.random() * colors.length)]
  cursor.style['border-radius'] = '50%'
  cursor.style.top = '0px';
  cursor.style.left = '0px';

  cursor.classList.add('spy-cursor')
  document.body.appendChild(cursor)
  return cursor
}
function click() {}
function scroll() {}
function mousemove() {}
