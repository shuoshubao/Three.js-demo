import os from 'os'
import path from 'path'
import webpack from 'webpack'
import HappyPack from 'happypack'
import PrepackWebpackPlugin from 'prepack-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import UglifyJsParallelPlugin from 'webpack-uglify-parallel'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import {isDev, PATH_ROOT, PATH_SRC, PATH_LIB, PATH_BUILD, PATH_PUBLIC, LIB_NAME, extractLESS, pageNum} from './config'

const {hash: HASH_LIB} = require(path.resolve(PATH_LIB, 'asset'))

const HtmlWebpackPluginMinify = isDev ? {} : {
  useShortDoctype: true,
  removeComments: true,
  collapseWhitespace: true,
  minifyJS: true,
  minifyCSS: true,
  removeScriptTypeAttributes: true,
  removeStyleTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true,
  keepClosingSlash: false
}

const HtmlWebpackPluginConfig = Array.from(Array(pageNum), (v, i) => i + 1)
.map(v => ({
  filename: v,
  title: 'WEB前端开发',
  chunks: [`${v}`]
}))
.map(v => new HtmlWebpackPlugin({
  alwaysWriteToDisk: true,
  filename: path.resolve(PATH_ROOT, `${v.filename}.html`),
  template: path.resolve(PATH_SRC, `template/index.ejs`),
  title: v.title,
  chunks: ['manifest', ...v.chunks],
  minify: HtmlWebpackPluginMinify,
  ENV: isDev ? 'dev' : 'prod',
  PATH_LIB: `${PATH_PUBLIC}${HASH_LIB}`,
}))

const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

const createHappyPlugin = (id, loader, query = {}) => new HappyPack({
  id: id,
  loaders: [
    {
      loader: `${loader}-loader`,
      query
    }
  ],
  threadPool: happyThreadPool,
  verbose: false
})

const plugins = [
  new webpack.BannerPlugin([
    '硕鼠宝',
    'https://shuoshubao.github.io/'
  ].join('\n')),
  new webpack.DefinePlugin({
    ENV: JSON.stringify(isDev ? 'dev' : 'prod')
  }),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.ProvidePlugin({
    THREE: 'three',
    $: 'jquery'
  }),
  extractLESS,
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new CopyWebpackPlugin([{
    from: PATH_LIB,
    to: PATH_BUILD,
    ignore: '*.json'
  }]),
  ...HtmlWebpackPluginConfig,
  new HtmlWebpackHarddiskPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  new webpack.DllReferencePlugin({
    manifest: require(`${PATH_LIB}/${LIB_NAME}.json`)
  }),
  createHappyPlugin('js', 'babel', {
    plugins: [
      'transform-object-assign',
      'transform-object-rest-spread',
      'transform-decorators-legacy',
      ['import', {
        libraryName: 'antd',
        style: true
      }]
    ],
    presets: ['es2015', 'stage-2']
  })
]

if(isDev) {
  const dashboard = new Dashboard()
  plugins.push(...[
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(dashboard.setData)
  ])
}else {
  plugins.push(...[
    new CleanWebpackPlugin(['build'], {
      root: PATH_ROOT,
      verbose: false
    }),
    new webpack.HashedModuleIdsPlugin(),
    new PrepackWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false})
    // new UglifyJsParallelPlugin({workers: os.cpus().length})
  ])
}

export default plugins
