const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = require('./webpack.base');

const makeDevConfig = (options) => {
    return baseConfig({
        ...options,

        mode: 'development',

        // Add hot reloading in development
        entry: [
            'eventsource-polyfill', // Necessary for hot reloading with IE
            `webpack-hot-middleware/client?name=${options.name}&reload=true&overlay=false`,
            path.join(process.cwd(), `app/${options.name}/app.js`),
        ],

        output: {
            // Don't use hashes in dev mode for better performance
            filename: '[name].js',
            chunkFilename: '[name].chunk.js',
        },

        // Add development plugins
        plugins: [
            new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(process.cwd(), 'app/some.local.js'),
                        to: path.join(process.cwd(), 'build/some.js'),
                    },
                ],
            }),
        ],
    });
};

const aConfig = makeDevConfig({
    name: 'a',
});

const bConfig = makeDevConfig({
    name: 'b',
});

module.exports = [aConfig, bConfig];
