module.exports = {
    devtool: 'eval',
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  };
