const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    port: 3003,
    historyApiFallback: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote3",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/AuthApp",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: false
        },
        "react-dom": {
          singleton: true,
          eager: false,
          requiredVersion: false
        },
        "react-router-dom": {
          singleton: true,
          eager: false,
          requiredVersion: false
        },
        "formik": {
          singleton: true,
          eager: false,
          requiredVersion: false
        },
        "yup": {
          singleton: true,
          eager: false,
          requiredVersion: false
        },
        "react-toastify": {
          singleton: true,
          eager: false,
          requiredVersion: false
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  output: {
    publicPath: "http://localhost:3003/",
  },
}; 