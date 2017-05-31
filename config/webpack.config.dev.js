const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {

	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js',
	},

	devServer: {
		host: '0.0.0.0',
		port: 9002,
		historyApiFallback: true
	},
	
})