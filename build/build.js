'use strict';

var isRecording = false;
var frame = undefined;
var box = [];
bindListeners();

function tick() {

  isRecording || bindListeners();
  isRecording = true;
  frame = window.requestAnimationFrame(tick);
}

// TODO: debounce
function bindListeners() {
  window.addEventListener('mousemove', function (e) {
    console.log(e);
    box.push(createIntel(e, 'mousemove'));
  }, true);
  window.addEventListener('click', function (e) {
    box.push(createIntel(e, 'click'));
  }, true);
  window.addEventListener('scroll', function (e) {
    box.push(createIntel(e, 'scroll'));
  }, true);
}

function createIntel(event, behavior) {
  var pkg = {
    x: event.pageX || null,
    y: event.pageY || null,
    offsetX: event.offsetX,
    offsetY: event.offsetY,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    target: event.target.getAttribute ? event.target.getAttribute('id') : null,
    behavior: behavior,
    ts: Date.now()
  };
  return pkg;
}

function data() {
  return box;
}

// TODO: Need a lot of enhancement, like selector and sync layout and setTimeout
function play(cursor, box) {
  var start = box[0].ts;
  box.forEach(function (pkg) {
    setTimeout(function () {
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
  });
}

tick();
document.querySelector('#play').addEventListener('click', function (e) {
  var d = data();
  play(document.querySelector('#cursor'), d);
});
document.getElementById('test').addEventListener('click', function () {
  console.log('success');
});
//# sourceMappingURL=build.js.map
