const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let config = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

let popupConfig = Object.assign({}, config, {
  entry: './src/popup/popup.ts',
  output: {
    filename: 'popup.js',
    path: path.resolve(__dirname, 'dist/popup'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup/popup.html',
      filename: 'popup.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '../' }],
    }),
  ],
});

let optionConfig = Object.assign({}, config, {
  entry: './src/option.ts',
  output: {
    filename: 'option.js',
    path: path.resolve(__dirname, 'dist/option'),
  },
});

let backgroundConfig = Object.assign({}, config, {
  entry: './src/background/background.ts',
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'dist/background'),
  },
});

let publicConfig = Object.assign({}, config, {
  plugins: [
    new CopyPlugin({
      patterns: [{ context: './public', from: './public' }],
    }),
  ],
});

// module.exports = [popupConfig, optionConfig, backgroundConfig];
module.exports = [popupConfig, backgroundConfig];
