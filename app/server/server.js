import Express from 'express'
import http from 'http'
const webpack = require('webpack')
const webpackConfig = require('../../webpack/common.config')
const compiler = webpack(webpackConfig)
const app = new Express()
const server = new http.Server(app)
const proxy = require('http-proxy').createProxyServer({})
const fs = require('fs')
const path = require('path')

const fullPage = fs.readFileSync(path.join(__dirname, '../../dist/index.html'))

// Port for web-dev-server and server app (bundle.js, bundle.css, dist, static)
const port = 3000

app.use(require('morgan')('short'))

if (process.env.NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }))
}

proxy.on('error', (err, req) => {
  console.error(err, req.url)
})

app.get('*', (req, res) => {
  res.end(fullPage)
})

server.listen(port, () => {
  const host = server.address().address

  console.log('Server is listening on http://%s:%s', host, port)
})
