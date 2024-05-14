const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: "development",
	entry: "/src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: 'assets/[name][ext]'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					"css-loader",
					"sass-loader"
				]
			},
			{
			test: /\.html$/,
			use: ["html-loader"]
			},
			{
				test: /\.(png|jpg|)$/,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: "./src/index.html"}),
		new MiniCssExtractPlugin({filename: "[name].css"})
	]
}