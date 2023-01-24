const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
}