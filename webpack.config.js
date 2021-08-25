const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {

    entry: {
        index: './app/index.js',
        about: './app/about.js'
    },

    output: {
        filename: '[name].[contenthash]js',
        path: path.resolve(__dirname, 'build')
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/, // for image
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: 'build/images',
                        outputPath: 'images',
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: 'build/fonts',
                        outputPath: 'fonts',
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.svg$/,
                use: 'svg-inline-loader'
            }
        ]
    },

    plugins: [
        new webpack.ProgressPlugin(),

        new htmlWebpackPlugin({
            filename: 'index-page.html',
            title: 'main page title',
            heading: 'main heading',
            message: 'main message for webpack',
            template: './app/index.html'
        }),
        new htmlWebpackPlugin({
            filename: 'about-page.html',
            title: 'about page title',
            heading: 'about heading',
            template: './app/about.html'
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].js'
        }),
        new CleanWebpackPlugin()
    ],

    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            chunks: 'all'
        }
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        index: 'main-page.html',
        port: 9000
    },

    mode: 'production'

}
