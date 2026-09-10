/* SunMetricLab embed loader.
 * Resizes every <iframe> inside a .sunmetriclab-embed container to the
 * height reported by the embedded calculator page (postMessage), so the
 * widget never shows an inner scrollbar. Safe to include more than once.
 */
(function () {
  if (window.__sunmetriclabEmbed) return;
  window.__sunmetriclabEmbed = true;

  var ORIGIN = 'https://sunmetriclab.com';

  function frames() {
    return Array.prototype.slice.call(
      document.querySelectorAll('.sunmetriclab-embed iframe, iframe[src^="' + ORIGIN + '/embed/"]')
    );
  }

  window.addEventListener('message', function (event) {
    if (event.origin !== ORIGIN) return;
    var data = event.data;
    if (!data || data.type !== 'sunmetriclab:height' || typeof data.height !== 'number') return;
    frames().forEach(function (frame) {
      if (frame.contentWindow === event.source) {
        frame.style.height = Math.ceil(data.height) + 'px';
        frame.style.minHeight = '0';
      }
    });
  });

  // Ask already-loaded frames for their height (covers script-after-iframe order).
  function ping() {
    frames().forEach(function (frame) {
      try {
        frame.contentWindow && frame.contentWindow.postMessage({ type: 'sunmetriclab:ping' }, ORIGIN);
      } catch (e) {
        /* cross-origin access to a not-yet-loaded frame; ignore */
      }
    });
  }
  if (document.readyState === 'complete') ping();
  else window.addEventListener('load', ping);
})();
