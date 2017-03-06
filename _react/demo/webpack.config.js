var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');

module.exports = {
  devtool: 'source-map', // or 'inline-source-map'

  entry: [],

  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/dist/'
  },

  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.web.js', '.js', '.json'],
  },

  module: {
    noParse: [/moment.js/],
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            ["external-helpers"],
            ["babel-plugin-transform-runtime", { polyfill: false }],
            ["transform-runtime", { polyfill: false }],
            ["import", [
              { "style": "css", "libraryName": "antd" },
              { "style": "css", "libraryName": "antd-mobile" }
            ]]
          ]
        }
      },
      { test: /\.(jpg|png)$/, loader: "url?limit=8192" }, //把不大于8kb的图片打包处理成Base64
      { test: /\.(svg)$/i, loader: 'svg-sprite', include: [
        require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
        // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 自己私人的 svg 存放目录
      ]},
      // { test: /\.css$/, loader: 'style!css' }, // 把css处理成内联style，动态插入到页面
      // { test: /\.less$/, loader: 'style!css!less' }, // loader 处理顺序：先less 后css 最后style
      // less-loader requires less as peer dependency
      { test: /\.less$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss!less') },
      { test: /\.css$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss') }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({ rootValue: 100, propWhiteList: [] })
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.CommonsChunkPlugin({
      // minChunks: 2,
      name: 'shared',
      filename: 'shared.js'
    }),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
  ]

}
