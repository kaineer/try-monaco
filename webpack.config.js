// webpack.config.js

const {resolve} = require(`path`);
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const predefinedFeatures = require('monaco-editor-webpack-plugin/features');
const predefinedFeatureIds = Object.keys(predefinedFeatures);

module.exports = {
  mode: `production`,
  entry: './src/index.js',
  output: {
    // globalObject: 'self',
    filename: 'bundle.js',
    path: resolve(__dirname, `public/js/`),
    publicPath: '/js/'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript'],
      features: predefinedFeatureIds.map(x => `!${x}`),
    })
  ]
};
