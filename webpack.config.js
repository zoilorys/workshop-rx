const { join, resolve } = require('path');

const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { NODE_ENV, ANALYZE } = process.env;

const environment = NODE_ENV || 'development';
const isDev = environment === 'development';

module.exports = {
  mode: environment,
  devtool: isDev ? 'source-maps' : undefined,

  entry: join(__dirname, 'src', 'index.tsx'),
  output: {
    path: join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  resolve: {

    alias: {
      components: resolve(__dirname, 'src/components'),
      models: resolve(__dirname, 'src/models'),
      hooks: resolve(__dirname, 'src/hooks'),
      containers: resolve(__dirname, 'src/containers'),
      "data-streams": resolve(__dirname, 'src/data-streams')
    },
    extensions: ['.ts', '.tsx', '.js', '.scss', '.sass'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: 'ts-loader',
      },
      {
        test: /\.module\.s([ac])ss$/,
        exclude: [/node_modules/],
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { sourceMap: isDev, modules: true, importLoaders: 1 },
          },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.s([ac])ss$/,
        exclude: [/node_modules/, /\.module.(s([ac])ss)$/],
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new Dotenv(),
    ...(ANALYZE ? [new BundleAnalyzerPlugin()] : []),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
    },
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
};
