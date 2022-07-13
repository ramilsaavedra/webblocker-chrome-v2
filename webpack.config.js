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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
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
      patterns: [
        { from: 'public', to: '../' },
        { from: 'src/popup/popup.css' },
      ],
    }),
  ],
});

let optionConfig = Object.assign({}, config, {
  entry: './src/option/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/option'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/option/index.html',
      filename: 'index.html',
    }),
  ],
});

let backgroundConfig = Object.assign({}, config, {
  entry: './src/background/background.ts',
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'dist/background'),
  },
});

// module.exports = [popupConfig, optionConfig, backgroundConfig];
module.exports = [optionConfig];
