const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 환경변수 가져오기
dotenv.config({ path: path.resolve(__dirname, '.env') });

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

// 설정
const config = {
  // 시작 엔트리
  entry: './src/index.js',

  // 압축된 파일 위치
  output: {
    path: path.resolve(__dirname, 'build'),

    // 모든 요청에 대해서 루트 경로(/)를 기준으로 파일을 찾도록 수정
    publicPath: '/',
  },
  devServer: {
    // dev server 구동 시 자동으로 chrome browser 오픈
    open: true,

    // dev server의 DOMAIN IP
    host: process.env.REACT_APP_DOMAIN,

    // dev server의 PORt
    port: process.env.REACT_APP_PORT,

    // 브라우저에서 요청한 URL에 대해 해당 URL 경로에 대한 파일이 없을 경우, 설정한 fallback 경로에 있는 파일을 제공하는 옵션
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

    // 환경변수 설정
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

    // React 개발 과정에서, 수정된 모듈만 변경하기 위한 plugin
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        // js, jsx, ts, tsx 의 경우 babel을 이용해 ES6 -> ES5 변환
        test: /\.(js|jsx|ts|tsx)$/i,
        // babel을 적용하지 않을 폴더
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              'react-refresh/babel',
              '@babel/syntax-dynamic-import',
            ],
          },
        },
      },
      {
        // css -> js 변환
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        // scss -> js 변환
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        // image -> js 변환
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[name].[hash][ext]',
        },
      },
    ],
  },

  // alias 설정
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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
