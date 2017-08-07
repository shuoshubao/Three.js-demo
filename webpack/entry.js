import {isDev, PATH_ROOT, PATH_BUILD, PATH_PUBLIC, FILENAME, pageNum} from './config'

export default {
  entry: {
    ...Array.from(Array(pageNum), (v, i) => i + 1).reduce((prev, cur) => {
      prev[cur] = `./src/asset/${cur}`
      return prev
    }, {})
  },
  output: {
    path: PATH_BUILD,
    publicPath: PATH_PUBLIC,
    filename: FILENAME
  }
}
