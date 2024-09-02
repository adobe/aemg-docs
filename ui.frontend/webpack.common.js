/*
Copyright 2022 Adobe Systems Incorporated
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
'use strict';

const path                    = require('path');
const webpack                 = require('webpack');
const TSConfigPathsPlugin     = require('tsconfig-paths-webpack-plugin');
const TSLintPlugin            = require('tslint-webpack-plugin');
const CopyWebpackPlugin       = require('copy-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

module.exports = {
    resolve: {
        extensions: ['.js', '.ts'],
        plugins: [new TSConfigPathsPlugin({
            configFile: './tsconfig.json'
        })]
    },
    entry: {
        site: SOURCE_ROOT + '/main.ts'
    },
    output: {
        filename: (chunkData) => {
            return chunkData.chunk.name === 'dependencies' ? 'clientlib-dependencies/[name].js' : 'clientlib-site/[name].js';
        },
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'webpack-import-glob-loader',
                        options: {
                            url: false
                        }
                    }
                ]
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: process.env.NODE_ENV === 'production' ? '../resources/fonts/' : './resources/fonts/'
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'clientlib-[name]/[name].css'
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, SOURCE_ROOT + '/resources'), to: './clientlib-site/' }
        ])
    ],
    stats: {
        assetsSort: 'chunks',
        builtAt: true,
        children: false,
        chunkGroups: true,
        chunkOrigins: true,
        colors: false,
        errors: true,
        errorDetails: true,
        env: true,
        modules: false,
        performance: true,
        providedExports: false,
        source: false,
        warnings: true
    }
};
