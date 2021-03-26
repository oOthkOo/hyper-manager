import webpack from 'webpack'
import webpackConfig from './webpack.config'
import { WATCH } from './flags'

const compiler = webpack(webpackConfig)
const done = (error, stats) => {
  if (error) throw error
  console.log(stats.toString(webpackConfig.stats))
}

if (WATCH) {
  compiler.watch({}, done)
}
else {
  compiler.run(done)
}
