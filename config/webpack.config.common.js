const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: './examples/main.js',
		vendors: ['vue', 'vue-router']
	},
	resolve: {
	  	extensions: ['.js', '.es6', '.css', '.less', '.png', '.jpg', '.jpeg'],
	  	alias: {
  	      	'vue': 'vue/dist/vue.js'
  	    },
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
						options: {
							loaders: {
								css: 'vue-style-loader!css-loader',
								less: 'vue-style-loader!css-loader!less-loader'
							},
						}
					}
				]
			},
			{
			    test: /\.js[x]?$/,
			    exclude: /(node_modules|bower_components)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			          presets: ['env'],
			        }
			    },
			},
			{
				test: /\.css$/,
				use: [
				  	'style-loader',
				  	'css-loader',
				  	{
				  		loader: 'postcss-loader',
				  		options: {
				  			config: {
				  				path: './postcss.config.js'
				  			}
				  		}
				  	}
				]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
		  	names: ['vendors', 'manifest'],
		}),
		new HtmlwebpackPlugin({
			filename: 'index.html',
			template: './examples/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
			},
			inject: 'body',
		})
	]
}