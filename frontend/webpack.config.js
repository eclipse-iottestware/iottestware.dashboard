/********************************************************************************
 * Copyright (c) 2019 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 4
 ********************************************************************************/

module.exports = {
  mode: 'development',
  entry: __dirname + '/src/App.js',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          // presets are collection of plugins
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-class-properties']
        }
      }, {
        test: /\.css$/,
        use: [{
          loader: 'style-loader!css-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/public'    // where the fonts will go
          }
        }]
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.wav$|\.mp3$/,
        loaders: ['file-loader?name=[name].[ext]']
      }, {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/public'    // where the fonts will go
          }
        }]
      }
    ]
  }
}
