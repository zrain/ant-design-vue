const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
	devtool: 'source-map',

	output: {
		path: path.resolve(__dirname, '../docs'),
		publicPath: './',
		filename: '[name].[chunkhash:8].js',
		chunkFilename: '[id].[chunkhash:8].chunk.js',
	},

	plugins: [

		new webpack.DefinePlugin({
	      	'process.env': {
	        	NODE_ENV: '"production"'
	      	}
		}),

		new webpack.NoEmitOnErrorsPlugin(),

		new webpack.optimize.UglifyJsPlugin(),

		new ExtractTextPlugin({
			filename: '[name].[chunkhash:8].css',
			allChunks: true,
		}),

	],

});
