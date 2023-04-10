const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// 환경변수 가져오기
dotenv.config({ path: path.resolve(__dirname, '.env') });

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

// 설정
const config = {
  // 시작 엔트리 경로
  entry: './src/index.js',

  // 압축된 파일 위치
  output: {
    // 출력 파일 이름 설정
    filename: '[name].[contenthash].js',

    // 출력 경로
    path: path.resolve(__dirname, 'dist'),

    // 모든 요청에 대해서 루트 경로(/)를 기준으로 파일을 찾도록 수정
    publicPath: '/',

    // 이전 빌드 결과물 삭제
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    // dev server 구동 시 자동으로 chrome browser 오픈
    open: true,

    // 외부 IP 접속 허용
    allowedHosts: 'all',

    // dev server의 DOMAIN IP
    host: process.env.REACT_APP_DOMAIN,

    // dev server의 PORt
    port: process.env.REACT_APP_PORT,

    // 브라우저에서 요청한 URL에 대해 해당 URL 경로에 대한 파일이 없을 경우, 설정한 fallback 경로에 있는 파일을 제공하는 옵션
    historyApiFallback: true,

    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      title: 'Caching',
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
        REACT_APP_MAP_API_STYLE: JSON.stringify(
          process.env.REACT_APP_MAP_API_STYLE,
        ),
        REACT_APP_AWS_ACCESS_KEY: JSON.stringify(
          process.env.REACT_APP_AWS_ACCESS_KEY,
        ),
        REACT_APP_AWS_SECRET_ACCESS_KEY: JSON.stringify(
          process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        ),
        REACT_APP_AWS_REGION: JSON.stringify(process.env.REACT_APP_AWS_REGION),
        REACT_APP_AWS_S3_BUCKET: JSON.stringify(
          process.env.REACT_APP_AWS_S3_BUCKET,
        ),
      },
    }),

    // React 개발 과정에서, 수정된 모듈만 변경하기 위한 plugin
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        // js, jsx, ts, tsx 의 경우 babel을 이용해 ES6 -> ES5 변환
        test: /\.(js|jsx|ts|tsx)$/i,
        // babel을 적용하지 않을 폴더
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // css, scss -> js 변환
        test: /\.(scss|css)$/,
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
      '@jsons': path.resolve(__dirname, 'src/jsons'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  devtool: 'source-map',
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
