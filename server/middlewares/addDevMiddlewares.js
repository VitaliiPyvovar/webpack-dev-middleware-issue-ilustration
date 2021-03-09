const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const entryPoint = require('./entryPoint');

module.exports = function addDevMiddlewares(app, webpackConfig) {
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevMiddleware(compiler, {
        // todo remove all options after webpack-dev-middleware version update
        publicPath: '/static/',
        stats: 'errors-only',
        noInfo: true,
        silent: true,
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    // todo use middleware.context.outputFileSystem after webpack-dev-middleware version update
    // const fs = middleware.context.outputFileSystem;
    const fs = middleware.fileSystem;

    app.get('*', (req, res) => {
        const filePath = entryPoint(req, compiler.outputPath);

        fs.readFile(filePath, (err, file) => {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send(file.toString());
            }
        });
    });
};
