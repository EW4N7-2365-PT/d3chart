const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: './index.js',
	output: {
		filename: 'dist.js',
		path: path.resolve(__dirname, './'),
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader?cacheDirectory=true',
				}
			}
		]
	}
};