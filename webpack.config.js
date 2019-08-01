var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new webpack.DefinePlugin({
        'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
      })
],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:8016/api'
        })
    }
}