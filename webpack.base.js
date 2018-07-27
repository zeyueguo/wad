const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

console.log(path.resolve(process.cwd(), './public/index.html'));
const config = {

  entry: path.resolve(process.cwd(), './src/index.js'),
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'index.[hash:8].js',
    publicPath: '',
  },
  resolve: {
    // 引入模块的时候，可以不用扩展名
    extensions: ['.js', '.less', '.json', '.css'],
    modules: [path.resolve(process.cwd(), 'node_modules')],
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            cacheDirectory: true,
            presets: [
              require.resolve('babel-preset-env'),
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-0'),
              // {
              //   targets: {
              //     browsers: ['ie >= 10'],
              //   },
              //   // debug: true,
              //   include: [
              //     require.resolve('transform-es2015-shorthand-properties'),
              //   ],
              //   useBuiltIns: true,
              // }
            ],
            plugins: [
              require.resolve('babel-plugin-add-module-exports'),
              require.resolve('babel-plugin-react-require'),
              require.resolve('babel-plugin-dva-hmr'),
              require.resolve('babel-plugin-add-module-exports'),
              ['import', { libraryName: 'antd', style: true }],
              require.resolve('babel-plugin-react-require'),
              require.resolve('babel-plugin-syntax-dynamic-import'),
              // 'transform-decorators-legacy',
              // 'transform-class-properties',
              // 'transform-object-rest-spread',
              // 'array-includes',
            ],
          },
        },
        include: path.join(process.cwd(), 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              plugins: [
                autoprefixer,
              ],
            },
          }],
        // include: path.join(process.cwd(), './src'),
        // exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('less-loader'),
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: {
                '@primary-color': '#9E6A28',
                '@layout-body-background': '#fef8ee',
                '@layout-header-background': '#fef8ee',
                '@layout-trigger-background': '#fcdfb3',
                '@layout-sider-background': '#fcdfb3',
                '@menu-dark-submenu-bg': '#fcdfb3',
                '@menu-dark-bg': '#fef8ee',
                '@font-size-base': '13px',
                '@row-active-background': '#FBDCBD',
              },
            },
          },
        ],
        // include: /node_modules/,
      },
      {
        test: /\.(html|htm)/,
        use: require.resolve('html-loader'),
      },
      {
        test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
        use: {
          loader: require.resolve('url-loader'),
          options: {
            limit: 5 * 1024,
            outputPath: '',
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './public', // 静态资源目录源地址
      ignore: ['index.html'],
      to: '', // 目标地址，相对于output的path目录
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), './public/index.html'),
      filename: 'index.html',
      //   hash: true,
    }),
  ],
};


module.exports = config;
