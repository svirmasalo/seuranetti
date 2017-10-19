// webpack.config.js
module.exports = {
  entry: './public/js/index.js',
  output: {
    filename: './public/dist/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};