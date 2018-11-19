"use strict";
// Listen to fetch events
self.addEventListener('fetch', function (event) {
  // Check if the image is a jpeg
  if (/(\.jpe?g|\.png)\?iswebp$/.test(event.request.url)) {
    // Inspect the accept header for WebP support
    var supportsWebp = false;
    if (event.request.headers.has('accept')) {
      supportsWebp = event.request.headers.get('accept').includes('webp');
    }
    // If we support WebP
    if (supportsWebp) {
      // Clone the request
      var req = event.request.clone();
      // Build the return URL
      var returnUrl = req.url.substr(0, req.url.lastIndexOf("?")) + ".webp";
      // var returnUrl = req.url + '.webp'
      event.respondWith(
        fetch(returnUrl, {
          mode: 'no-cors'
        }).then(function(response) {
          if(response) {
            return response
          }
          return fetch(event.request.url)
        })
      );
    }
  }
});