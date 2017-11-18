import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackExternalsPlugin from 'html-webpack-externals-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

module.exports = {
  entry: {
    index: ['./src/index.js', './src/styles/app.css']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: './src',
    watchContentBase: true,
    publicPath: '/'
   },
   plugins: [
     new ExtractTextPlugin({ // define where to save the file
      filename: 'dist/styles.bundle.css',
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new HtmlWebpackPlugin({
      title: 'quick',
      template: './src/index.html'
    }),
     new HtmlWebpackExternalsPlugin({
       externals: [{
         module: 'jquery',
         entry: 'dist/jquery.min.js',
         global: 'jQuery'
       }]
     })
   ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: { presets: ['env'] }
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(['css-loader'])
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader'
    }]
  }
};
