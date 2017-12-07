// webpack.config.js
module.exports = {
  entry: './public/js/index.jsx',
  output: {
    filename: './public/dist/bundle.js'
  },
  devtool:'source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      }
    ]
  }
};