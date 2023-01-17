const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { PassThrough } = require('stream');

module.exports = {
  entry: './client/index.js',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  }, 
  plugins: [new HtmlWebpackPlugin({template: './client/index.html'}), new MiniCssExtractPlugin()],
  devServer: {
    static: {
        // publicPath: '/dist',
        directory: path.resolve(__dirname, 'dist')
        // directory: path.join(__dirname, './client/index.html')
    },
    compress: true,
    // host: 'localhost',
    port: 8080,
    // headers: { 'Access-Control-Allow-Origin': '*' },

    proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        },
    },
    hot: true,
    open: true,
    historyApiFallback: true,
},
    
mode: process.env.NODE_ENV,

module: {
    rules: [
        {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    // presets: ['@babel/preset-env', '@babel/preset-react']
                    presets: ['@babel/env', '@babel/react']
                }
            }
        },
        {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
  ]
},
  resolve: {
    extensions: ['.js', '.jsx']
  }
}