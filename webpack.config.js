const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index.js'
	},
	devtool: 'inline-source-map',
	devServer: {
			contentBase: path.resolve(__dirname, './dist'),
			index: 'index.html',
			port: 9000
	},
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, './dist'),
		publicPath: './'
	},
	optimization: {
		moduleIds: 'hashed',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}

	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|svg|gif)$/,
				use: [
					{
						loader: 'file-loader'

					}
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']


			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']

						}
					}
					]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],

			},
			{
				test: /\.hbs$/,
				use: 'handlebars-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Daily Quest',
			template: './src/index.hbs'
		})
	]
};
