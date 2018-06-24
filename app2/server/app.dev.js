const express = require('express');
const path = require('path');

// const renderPage = require('./routes.Server.js').renderPage;

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config.dev.js');
const middleware = require('webpack-dev-middleware');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = middleware(
  compiler,
  {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  });

function getAssetManifest() {
  const content = webpackDevMiddleware.fileSystem.readFileSync(__dirname + '/../build/asset-manifest.json');
  return JSON.parse(content);
}

const app = express();

let assetManifest = null;

app.use(express.static(path.resolve(__dirname, '../build')));

app.use(webpackDevMiddleware);
app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

// app.use('/api/count', (req, res) => {
//   res.json({count: 100});
// });

app.get('*', (req, res) => {
  const assetManifest = getAssetManifest();
  return res.render('index', {
    title: 'Sample React App',
    PUBLIC_URL: '/',
    assetMan_fest: assetManifest
  });
})

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

module.exports = app;
