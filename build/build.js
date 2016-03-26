'use strict';

var isRecording = false;
var frame = undefined;
var box = [];

// TODO: debounce
function bindListeners(context) {
  context.addEventListener('mousemove', function (e) {
    return box.push(pkg(context, e, 'mousemove'));
  }, true);
  context.addEventListener('click', function (e) {
    return box.push(pkg(context, e, 'click'));
  }, true);
  context.addEventListener('scroll', function (e) {
    return box.push(pkg(context, e, 'scroll'));
  }, true);
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
  };
}

function data() {
  return box;
}

function tick(context) {
  isRecording || bindListeners(context);
  isRecording = true;
  frame = requestAnimationFrame(tick);
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

function mostClicked(data) {
  return getMaxKey(allClicked(data));
}
function allClicked(data) {
  return data.filter(function (pkg) {
    return pkg.behavior === 'click';
  }).reduce(function (result, pkg) {
    if (!result[pkg.target]) result[pkg.target] = 0;
    ++result[pkg.target];
    return result;
  }, {});
}
function getMaxKey(obj) {
  var max = 0;
  var maxKey;
  Object.keys(obj).forEach(function (idx) {
    if (max < obj[idx]) {
      max = obj[idx];
      maxKey = idx;
    }
  });
  return maxKey;
}

tick(window);
document.querySelector('#play').addEventListener('click', function (e) {
  var d = data();
  play(document.querySelector('#cursor'), d);
  console.log(mostClicked(d));
});
document.getElementById('test').addEventListener('click', function () {
  console.log('success');
});
//# sourceMappingURL=build.js.map
