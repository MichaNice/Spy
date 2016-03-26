// TODO: Need a lot of enhancement, like selector and sync layout and setTimeout
export function play(cursor, box) {
  let start = box[0].ts;
  box.forEach(pkg => {
    setTimeout(() => {
      if (pkg.behavior === 'scroll') {
        window.scroll(pkg.scrollX, pkg.scrollY);
      } else if (pkg.behavior === 'mousemove') {
        if (pkg.target && document.getElementById(pkg.target)) {
          cursor.style.left = document.getElementById(pkg.target).pageX + pkg.offsetX;
          cursor.style.top = document.getElementById(pkg.target).pageY + pkg.offsetY;
        } else {
          cursor.style.left = pkg.x + 'px';
          cursor.style.top = pkg.y + 'px';
        }
        cursor.style.left = pkg.x + 'px';
        cursor.style.top = pkg.y + 'px';
      } else if (pkg.behavior === 'click') {
        if (pkg.target) {
          var evObj = document.createEvent('Events');
          evObj.initEvent('click', true, false);
          document.getElementById(pkg.target).dispatchEvent(evObj);
        }
      }
    }, pkg.ts - start);
  })
}
