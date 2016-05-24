module.exports = {
  entry: './src/client.js',
  output: {
    path: 'public/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loaders: ['babel']
      }
    ]
  },
};
