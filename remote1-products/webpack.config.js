const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devServer: {
    port: 3001,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'http://localhost:3001/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'shared-ui': path.resolve(__dirname, '../shared-ui/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote1',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsApp': './src/ProductsApp',
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