# reactland-webpack-template
## package.json
```json
{
  "name": "wp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "webpack --watch",
    "start": "webpack-dashboard webpack-dev-server -d --hot --config webpack.config.js --watch",
    "dev": "webpack",
    "prod": "NODE_ENV=production webpack --progress"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.3.1",
    "autoprefixer": "^9.4.7",
    "babel-core": "^6.26.3",
    "babel-loader": "^8.0.5",
    "babel-preset-env": "^1.7.0",
    "css-hot-loader": "^1.4.3",
    "css-loader": "^2.1.0",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "html-webpack-plugin": "^3.2.0",
    "node-sass": "^4.11.0",
    "optimize-css-assets-webpack-plugin": "^5.0.1",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "uglifyjs-webpack-plugin": "^2.1.1",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1",
    "webpack-dashboard": "^2.1.0",
    "webpack-dev-server": "^3.1.14"
  }
}

```
## webpack.config.js
```javascript
const webpack = require("webpack")
const path = require("path")
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin")
const DashboardPlugin = require("webpack-dashboard/plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "./bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader', 'postcss-loader'],
            }))
        }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin("styles.css"),
        new DashboardPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: path.resolve(__dirname, "./public"),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true
    },
    devtool: "eval-source-map"
}

module.exports = config
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new UglifyJSPlugin(),
        new OptimizeCSSAssets()
    );
}
```
