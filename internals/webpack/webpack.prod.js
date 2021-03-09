const path = require('path');

const baseConfig = require('./webpack.base');

const makeProdConfig = (options) => {
    return baseConfig({
        ...options,

        mode: 'production',

        entry: path.join(process.cwd(), `app/${options.name}/app.js`),

        // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
        output: {
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].chunk.js',
        },
    });
};

const aConfig = () => {
    return makeProdConfig({
        name: 'a',
    });
};

const bConfig = () => {
    return makeProdConfig({
        name: 'b',
    });
};

module.exports = [aConfig, bConfig];
