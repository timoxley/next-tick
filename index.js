if (typeof setImmediate === 'function') {
  module.exports = setImmediate
}
// handle node.js
else if (typeof process !== 'undefined' && process && typeof process.nextTick === 'function') {
  module.exports = function(fn){ return process.nextTick(fn) };
}
// fallback for other environments / postMessage behaves badly on IE8
else if (typeof window === 'undefined' || window.ActiveXObject || !window.postMessage) {
  module.exports = setTimeout;
} else {
  var q = [];

  window.addEventListener('message', function f(e){
    var i = 0;
    while (i < q.length) {
      try { q[i++](); }
      catch (err) {
        q = q.slice(i + 1);
        post();
        throw err;
      }
    }
    q.length = 0;
  }, true);

  module.exports = function(fn){
    if (!q.length) post();
    q.push(fn);
  }

  var post = function() { window.postMessage('tic!', '*'); }
}
