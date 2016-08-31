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
