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
var webpack = require('webpack');
var devserver = require('webpack-dev-server');
var dashboard = require('webpack-dashboard');
var dashboardPlugin = require('webpack-dashboard/plugin');
var bundleTracker = require('webpack-bundle-tracker');
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var dash = new dashboard();

var config = {
  context: __dirname,
  devtool: 'source-map',
  entry: {
    main: [
      'webpack-dev-server/client?http://127.0.0.1:1337',
      'webpack/hot/only-dev-server',
      './index'
    ],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router',
      'react-syntax-highlighter',
      'd3'
    ]
  }, output: {
    path: path.resolve('../dist/'),
    publicPath: 'http://127.0.0.1:1337/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  }, plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new dashboardPlugin(dash.setData),
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', chunks: ['main'], wrnings: false}),
    new bundleTracker({filename: '../dist/webpack-stats.json'}),
    new htmlWebpackPlugin({
      title: 'React VirtualDOM',
      template: 'index.html'
    })
  ], module: {
    /*preLoaders: [{
      test: /\.js|\.jsx|\.es6$/,
      loaders: ['eslint'],
      exclue: /node_modules/
    }],*/
    loaders: [{
      test: /\.js|\.jsx|\.es6$/,
      loaders: ['babel'],
      exclue: /(node_modules|bower_components)/
    }]
  }, resolve: {
    root: [path.resolve('../src')],
    extensions: ['', '.js', '.jsx']
  }
};

new devserver(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  contentBase: './',
  quiet: true
}).listen(1337, '127.0.0.1', function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening for clients at 127.0.0.1:1337', result);
  }
})
