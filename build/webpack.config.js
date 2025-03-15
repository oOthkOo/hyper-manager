import { resolve as resolvePath } from 'path'
import webpack from 'webpack'
import { DEBUG, VERBOSE } from './flags'

const SRC = resolvePath(__dirname, '../src')
const DIST = resolvePath(__dirname, '../dist')

export default {

  target: 'node',

  context: SRC,

  entry: [
    './app.js',
  ],

  output: {
    path: DIST,
    libraryTarget: 'commonjs2',
    filename: './main.js',
  },

  optimization: {
    minimize: !DEBUG
 },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          resolvePath(__dirname, '../src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: DEBUG,
            babelrc: false,
            presets: [
              '@babel/preset-react',
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-function-bind',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      }
    ],
  },

  /*externals: {
    'react': 'react',
    'react-dom': 'react-dom',
  },*/

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    alias: {
        'react': resolvePath(__dirname, '../node_modules/react'),
        'react-dom': resolvePath(__dirname, '../node_modules/react-dom')
    }
  },

  cache: DEBUG,
  mode: DEBUG ? 'development' : 'production',

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: DEBUG ? [] : [
    new webpack.optimize.AggressiveMergingPlugin(),
  ],

  devtool: DEBUG ? 'eval-cheap-module-source-map' : false,
}
