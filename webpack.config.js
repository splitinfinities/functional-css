var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    'functional': './functional-entry.scss',
    'fonts' : './fonts.scss'
  },
  output: {
    filename: 'css/bundle-[name].js'
  },
  module: {

    rules: [
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: 'url-loader?limit=100000' },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract(
          [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                map: true,
                plugins: [
                  require('autoprefixer')({
                    browsers: [
                      "Explorer >= 10",
                      "last 2 versions"
                    ]
                  }),
                  require("cssnano")({
                    discardComments: {
                      removeAll: true
                    },
                    sourcemap: true
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sourceComments: true,
                outputStyle: "expanded",
                precision: 8
              }
            }
          ]
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'css/[name].css',
      allChunks: true,
    }),
  ],
};
