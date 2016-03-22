var Spy = function() {
  this.isRecording = false;
  this.rAF = undefined;
  this.intelligenceBox = [];
  this.bindListeners();
};

Spy.prototype.start = function() {
  this.isRecording = true;
  this.rAF = window.requestAnimationFrame(this.moment.bind(this));
  return this;
};

Spy.prototype.moment = function(ts) {
  this.isRecording = true;

  this.rAF = window.requestAnimationFrame(this.moment.bind(this));
};

Spy.prototype.bindListeners = function() {
  window.addEventListener('mousemove', e => {
    if (!this.isRecording)
      return;
    this.intelligenceBox.push(this.createIntel(e, 'mousemove'));
  }, true);
  window.addEventListener('click', e => {
    console.log(e);
    if (!this.isRecording)
      return;
    this.intelligenceBox.push(this.createIntel(e, 'click'));
  }, true);
  window.addEventListener('scroll', e => {
    if (!this.isRecording)
      return;
    this.intelligenceBox.push(this.createIntel(e, 'scroll'));
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

Spy.prototype.createIntel = function(event, behavior) {
  var intelligence = {
    x: event.pageX || null,
    y: event.pageY || null,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    target: event.target.getAttribute? event.target.getAttribute('id') : null,
    behavior: behavior,
    ts: Date.now()
  };
  return intelligence;
};

Spy.prototype.export = function() {
  return this.intelligenceBox;
};

Spy.prototype.play = function(cursor, box) {
  let start = box[0].ts;
  box.forEach(intelligence => {
    setTimeout(() => {

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
  })
};

export default function() {
  return new Spy().start();
}
