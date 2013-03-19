
// postMessage behaves badly on IE8
if (window.ActiveXObject || !window.postMessage) {
  module.exports = setTimeout;
} else {
  var queue = [];

  window.addEventListener('message', function(e){
    if (e.source == window && e.data == '_tic!') {
      var q = queue;
      var i = 0;
      var len = q.length;
      queue = [];
      while (i < len) q[i++]();
    }
  }, true);

  module.exports = function(fn){
    if (!queue.length) window.postMessage('_tic!', '*');
    queue.push(fn);
  }
}
