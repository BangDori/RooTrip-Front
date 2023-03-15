const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devServer: {
    open: true,
    host: process.env.REACT_APP_DOMAIN,
    port: process.env.REACT_APP_PORT,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_DOMAIN: JSON.stringify(process.env.REACT_APP_DOMAIN),
        REACT_APP_PORT: JSON.stringify(process.env.REACT_APP_PORT),
        REACT_APP_MAIN_SERVER: JSON.stringify(
          process.env.REACT_APP_MAIN_SERVER,
        ),
        REACT_APP_SUB_SERVER: JSON.stringify(process.env.REACT_APP_SUB_SERVER),
        REACT_APP_KAKAO_AUTH_URL: JSON.stringify(
          process.env.REACT_APP_KAKAO_AUTH_URL,
        ),
        REACT_APP_NAVER_AUTH_URL: JSON.stringify(
          process.env.REACT_APP_NAVER_AUTH_URL,
        ),
        REACT_APP_GOOGLE_AUTH_URL: JSON.stringify(
          process.env.REACT_APP_GOOGLE_AUTH_URL,
        ),
        REACT_APP_MAP_API_TOKEN: JSON.stringify(
          process.env.REACT_APP_MAP_API_TOKEN,
        ),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[name].[hash][ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
