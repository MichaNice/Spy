(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _spy = require('./spy.js');

var _spy2 = _interopRequireDefault(_spy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s = (0, _spy2.default)();
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
document.addEventListener('keydown', function (e) {
    console.log(e);
});
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
        pos = firebase.push({ data: data });
    } else {
        pos.set({ data: data });
    }
    preData = data;
}

},{"./spy.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return new Spy().start();
};

var Spy = function Spy() {
  this.isRecording = false;
  this.rAF = undefined;
  this.intelligenceBox = [];
  this.bindListeners();
};

Spy.prototype.start = function () {
  this.isRecording = true;
  this.rAF = window.requestAnimationFrame(this.moment.bind(this));
  return this;
};

Spy.prototype.moment = function (ts) {
  this.isRecording = true;

  this.rAF = window.requestAnimationFrame(this.moment.bind(this));
};

Spy.prototype.bindListeners = function () {
  var _this = this;

  window.addEventListener('mousemove', function (e) {
    if (!_this.isRecording) return;
    _this.intelligenceBox.push(_this.createIntel(e, 'mousemove'));
  }, true);
  window.addEventListener('click', function (e) {
    console.log(e);
    if (!_this.isRecording) return;
    _this.intelligenceBox.push(_this.createIntel(e, 'click'));
  }, true);
  window.addEventListener('scroll', function (e) {
    if (!_this.isRecording) return;
    _this.intelligenceBox.push(_this.createIntel(e, 'scroll'));
  }, true);
  // window.addEventListener('beforeunload', e => {
  //   this.saveToLocalStorage(this.export());
  // });
};

// Spy.prototype.saveToLocalStorage = function(data) {
//   var info = {
//     page: location
//     intelligences: data
//   }
//   localStorage.setItem('spy-data', data);
// };

Spy.prototype.createIntel = function (event, behavior) {
  var intelligence = {
    x: event.pageX || null,
    y: event.pageY || null,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    target: event.target.getAttribute ? event.target.getAttribute('id') : null,
    behavior: behavior,
    ts: Date.now()
  };
  return intelligence;
};

Spy.prototype.export = function () {
  return this.intelligenceBox;
};

Spy.prototype.play = function (cursor, box) {
  var start = box[0].ts;
  box.forEach(function (intelligence) {
    setTimeout(function () {

      if (intelligence.behavior === 'scroll') {
        window.scroll(intelligence.scrollX, intelligence.scrollY);
      } else if (intelligence.behavior === 'mousemove') {
        cursor.style.left = intelligence.x + 'px';
        cursor.style.top = intelligence.y + 'px';
      } else if (intelligence.behavior === 'click') {
        if (intelligence.target) {
          var evObj = document.createEvent('Events');
          evObj.initEvent('click', true, false);
          document.getElementById(intelligence.target).dispatchEvent(evObj);
        }
      }
    }, intelligence.ts - start);
  });
};

},{}]},{},[1])


//# sourceMappingURL=build.js.map
