const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [ '@babel/env' ],
                      plugins: [ 'transform-class-properties' ]
                    }
                }
            },
            {
              test: /\.hbs$/,
              use: [
                  'handlebars-loader'
              ]
            }
        ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Daily Quest',
        meta: {
            viewport: 'width=device-width, initial-scale=1.0, height=device-height, initial-scale=1, user-scalable, maximum-scale=2.0, minimum-scale=1.0'
        },
        template: 'src/index.hbs'
      })

    ]
}
