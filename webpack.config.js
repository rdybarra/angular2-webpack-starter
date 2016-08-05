var webpack = require("webpack");

module.exports = {
  /*
   * Separate entry points for the main app, and the vendor files
   */
  entry: {
    vendor: './client-app/vendor.ts',
    app: './client-app/main.ts'
  },

  /*
   * Output our built files in the public/js directory.
   */
  output: {
    path: './public/js',
    filename: '[name].js'
  },

  /*
   * Resolves these file types without explicit extensions.
   */
  resolve: {
    extensions: ['', '.ts', '.js']
  },

  /*
   *  Loaders
   */
  module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: ['ts-loader',],
          exclude: [/node_modules/]
        }
      ],
      plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: './public/js/vendor.js'
        }),
      ]
    }
};
