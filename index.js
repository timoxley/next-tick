/**
 * next tick implementation.
 */
module.exports = (function(){
  // postMessage behaves badly on IE8
  if (window.ActiveXObject || !window.postMessage) {
    return simpleTick
  }

  // based on setZeroTimeout by David Baron
  // - http://dbaron.org/log/20100309-faster-timeouts
  var timeouts = []
    , name = 'next-tick-zero-timeout'

  window.addEventListener('message', function(e){
    if (e.source == window && e.data == name) {
      if (e.stopPropagation) e.stopPropagation();
      if (timeouts.length) timeouts.shift()();
    }
  }, true);

  return function nextTick(fn){
    timeouts.push(fn);
    window.postMessage(name, '*');
  }
})();

function simpleTick(fn) {
  setTimeout(fn, 0);
}

