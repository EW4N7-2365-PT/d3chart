const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
	entry: './index.js',
	output: {
		filename: 'dist.js',
		path: path.resolve(__dirname, './'),
	},
	plugins: [
		new UglifyJSPlugin()
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
