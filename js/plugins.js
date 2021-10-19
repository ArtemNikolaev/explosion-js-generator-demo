// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

window.framesHistory = [];

function countFrames() {
  if (!window.countFrames) return;

  const timestamp = Date.now();
  window.framesHistory.push(timestamp);

  while(
    window.framesHistory.length &&
    timestamp - window.framesHistory[0] > 1000
    ) {
    window.framesHistory.shift();
  }

  document
    .querySelector('.show-frames span')
    .textContent = window.framesHistory.length;

  requestAnimationFrame(countFrames);
}

// count frames checkbox
document
  .querySelector('#count-frames')
  .addEventListener(
    'click',
    event => {
      window.countFrames = event.target.checked;
    },
  );

// frames counter on/off
document
  .querySelector('#count-frames')
  .addEventListener(
    'click',
    event => {
      const el = document.querySelector('.show-frames');

      event.target.checked ?
        el.classList.remove('hide') :
        el.classList.add('hide');

      requestAnimationFrame(countFrames);
    },
  );

// Place any jQuery/helper plugins in here.
