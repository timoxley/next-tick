if (typeof setImmediate === 'function') {
  module.exports = setImmediate
}
// postMessage behaves badly on IE8
else if (window.ActiveXObject || !window.postMessage) {
  module.exports = setTimeout;
} else {
  var q = [];

  window.addEventListener('message', function(e){
    var i = 0;
    while (i < q.length) q[i++]();
    q.length = 0;
  }, true);

  module.exports = function(fn){
    if (!q.length) window.postMessage('tic!', '*');
    q.push(fn);
  }
}
