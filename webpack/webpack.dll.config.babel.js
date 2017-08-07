import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import AssetsWebpackPlugin from 'assets-webpack-plugin'
import {PATH_ROOT, PATH_LIB, LIB_NAME} from './config'

const LIBRARY_NAME = '__[name]_[hash]'

export default {
  entry: {
    [LIB_NAME]: [
      'three'
    ]
  },
  output: {
    path: PATH_LIB,
    filename: '[name].[hash].js',
    library: LIBRARY_NAME
  },
  plugins: [
    new CleanWebpackPlugin([PATH_LIB], {
      root: PATH_ROOT,
      verbose: false
    }),
    new AssetsWebpackPlugin({
      path: PATH_LIB,
      filename: 'asset.json',
      processOutput: rs => JSON.stringify({hash: rs[LIB_NAME].js}, null, 4)
    }),
    new webpack.DllPlugin({
      path: path.resolve(PATH_LIB, `${LIB_NAME}.json`),
      name: LIBRARY_NAME
    }),
    new webpack.optimize.UglifyJsPlugin({comments: false})
  ]
}
