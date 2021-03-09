const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseOptions = (options) => ({
    // use passed options marge with default configs below
    ...options,

    output: {
        ...options.output,
        path: path.resolve(process.cwd(), `build/${options.name}`),
        publicPath: `/static/${options.name}/`,
    },

    module: {
        rules: [
            {
                test: /\.js$/, // Transform all .js files required somewhere with Babel
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader',
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: `app/${options.name}/index.hbs`,
            publicPath: `/static/${options.name}/`,
        }),
    ].concat(options.plugins),

    optimization: {
        namedModules: true,
    },

    resolve: {
        modules: ['app', 'node_modules'],
        extensions: ['.js', '.jsx', '.react.js'],
        mainFields: ['browser', 'jsnext:main', 'main'],
    },

    target: 'web', // Make web variables accessible to webpack, e.g. window
});

module.exports = baseOptions;
