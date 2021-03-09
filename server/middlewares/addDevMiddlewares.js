const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const entryPoint = require('./entryPoint');

module.exports = function addDevMiddlewares(app, webpackConfig) {
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevMiddleware(compiler, {
        stats: 'errors-only',
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    const fs = middleware.context.outputFileSystem;
    // const fs = middleware.fileSystem;

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
