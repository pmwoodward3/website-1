export const renderFullPage = (html, devPort, domain, initialState = null, head) => {
  // Add bundle.css for server side rendering and start:prod
  const bundleCSS = initialState !== null || process.env.NODE_ENV === 'production'
  ? `<link rel="stylesheet" type="text/css" href="http://${domain}:${devPort}/dist/bundle.css"></style>`
  : ''

  return `
  <!doctype html>
  <meta charset="utf-8">
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content=${head || ''} />
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="mobile-web-app-capable" content="yes">
        ${head ? head.title.toString() : ''}
        ${head ? head.meta.toString() : ''}
        ${bundleCSS}
        ${head ? head.title.toString() : ''}
      </head>
      <body>
        <img
          src="https://www.mangaupdates.com/image/i164349.jpg"
          referrer-policy="no-referrer"
          style="display: none;"
          />
        <div id="root">${html || ''}</div>

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState || {})};
        </script>

        <script src="http://${domain}:${devPort}/dist/vendor.js"></script>
        <script src="http://${domain}:${devPort}/dist/main.js"></script>
      </body>
    </html>
    `
  }
