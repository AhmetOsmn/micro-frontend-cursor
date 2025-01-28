const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'http://localhost:3000/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        remote1: 'remote1@http://localhost:3001/remoteEntry.js',
        remote2: 'remote2@http://localhost:3002/remoteEntry.js',
        remote3: 'remote3@http://localhost:3003/remoteEntry.js'
      },
      shared: {
        react: { 
          singleton: true,
          eager: false,
          requiredVersion: false
        },
        'react-dom': { 
          singleton: true,
          eager: false,
          requiredVersion: false
        },
        'react-router-dom': {
          singleton: true,
          eager: false,
          requiredVersion: false
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}; 