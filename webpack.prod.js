/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: '[name].bundle.[contentHash].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development'
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				minify: {
					removeAttributeQuotes: true,
					collapseWhitespace: true,
					removeComments: true
				}
			})
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contentHash].css',
			ignoreOrder: false
		})
	]
})
