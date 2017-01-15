//Copyright (c) 2016 TimTheSinner All Rights Reserved.
'use strict';
/**
 * Copyright (c) 2016 TimTheSinner All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * @author TimTheSinner
 */
import PostBuildPlugin from './post-build-plugin';

var webpack = require('webpack');
var devserver = require('webpack-dev-server');
var dashboard = require('webpack-dashboard');
var dashboardPlugin = require('webpack-dashboard/plugin');
var bundleTracker = require('webpack-bundle-tracker');
var htmlWebpackPlugin = require('html-webpack-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var path = require('path');
var fs = require('fs');
var handlebars = require('handlebars');

handlebars.registerHelper('custom_title', function(title) {
  return title || 'React VirtualDOM';
});
handlebars.registerHelper('custom_path', function(path) {
  return path || '';
});

const template = handlebars.compile(fs.readFileSync('example/index.handlebars', 'utf-8'));
var config = {
  context: __dirname,
  entry: {
    main: [ './example/index.jsx' ],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router',
      'react-syntax-highlighter',
      'd3',
    ],
  },
  output: {},
  module: {
    loaders: [
      {
        test: /\.js|\.jsx|\.es6$/,
        loaders: [ 'babel' ],
        exclue: /(node_modules|bower_components)/,
      },
    ],
  },
  resolveLoader: { alias: { 'source-loader': path.join(__dirname, './source-loader') } },
  resolve: { root: [ path.resolve('./src') ], extensions: [ '', '.js', '.jsx' ] },
};

if (process.argv.indexOf('-prod') !== -1) {
  console.log('Building static pages for production');
  const production = {
    entry: './example/index.jsx',
    output: { path: path.resolve('./__build__/'), filename: 'bundle.js', libraryTarget: 'umd' },
    module: { loaders: [ { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' } ] },
    resolve: { extensions: [ '', '.js', '.jsx' ] },
  };

  config = { ...config, ...production };

  config.plugins = [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: true,
      comments: false,
      compress: { dead_code: true },
    }),
    new StaticSiteGeneratorPlugin(
      config.output.filename,
      [ '/', '/static-bar-chart.html', '/dynamic-bar-chart.html', '404.html' ],
      {
        title: 'React + D3 with VirtualDOM',
        production: true,
        root_path: 'react-vdom',
        template: template,
      },
    ),
    new PostBuildPlugin(),
  ];
} else {
  var port = 1337;
  console.log('Starting HotLoad Dev-Server on ' + port);

  var dash = new dashboard();
  config.devtool = 'source-map';
  config.entry.main.unshift('webpack/hot/only-dev-server');
  config.entry.main.unshift('webpack-dev-server/client?http://127.0.0.1:' + port);
  config.output.path = path.resolve('./dist/');
  config.output.publicPath = 'http://127.0.0.1:' + port + '/';
  config.output.filename = '[name].[hash].js';
  config.output.chunkFilename = '[name].[hash].js';

  if (!fs.existsSync(config.output.path)) {
    fs.mkdirSync(config.output.path);
  }
  var index = path.join(config.output.path, 'index.html');
  fs.writeFileSync(index, template());

  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new dashboardPlugin(dash.setData),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: [ 'main' ],
      warnings: false,
    }),
    new bundleTracker({ filename: '../dist/webpack-stats.json' }),
    new htmlWebpackPlugin({ template: index }),
  ];

  new devserver(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: './',
    quiet: true,
  }).listen(port, '127.0.0.1', function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('Listening for clients at 127.0.0.1:' + port, result);
    }
  });
}

export default config;
