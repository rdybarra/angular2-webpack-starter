var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
  /*
   * Separate entry points for the main app, and the vendor files
   */
  entry: {
    vendor: './src/vendor.ts',
    app: './src/main.ts'
  },

  /*
   * Output our built files into the public/js directory.
   */
  output: {
    path: '../public/js',
    filename: '[name].js'
  },

  /*
   * Resolves these file types without explicit extensions.
   */
  resolve: {
    extensions: ['', '.ts', '.js', '.scss']
  },

  /*
   *  Loaders
   */
  module: {
      loaders: [
        /*
         * Load Typescript. Angular2-template-loader is used to that the `styleUrls` and
         * `templateUrl` links in the component decorators don't need to be `require()`'d.
         */
        {
          test: /\.ts$/,
          loaders: ['ts', 'angular2-template-loader'],
          exclude: [/node_modules/]
        },

        /*
         * Load scss files that are found in the `styleUrls` array in component decorators.
         */
        {
          test: /\.scss$/,
          loaders: ['raw-loader', 'sass-loader'],
          include: [/src\/app/]
        },

        /*
         * Load template files are found in the `templateUrl` property in component decorators.
         */
        {
          test: /\.html$/, loader: 'raw-loader'
        }
      ],

      plugins: [
        /*
         * Take all chunks that are common between the output files and keep that common chunk
         * only in the vendor.js file.
         */
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          filename: '../public/js/vendor.js'
        }),
      ]
    }
};
