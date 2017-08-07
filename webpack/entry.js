import {isDev, PATH_ROOT, PATH_BUILD, PATH_PUBLIC, FILENAME} from './config'

export default {
  entry: {
    1: './src/asset/1'
  },
  output: {
    path: PATH_BUILD,
    publicPath: PATH_PUBLIC,
    filename: FILENAME
  }
}
