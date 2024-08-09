const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/scrollspy.js',
  output: {
    filename: 'scrollspy.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ScrollSpy',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'scrollspy.min.css'
    })
  ],
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin()
    ]
  }
};
