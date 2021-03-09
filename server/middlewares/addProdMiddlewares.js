const path = require('path');
const expressStaticGzip = require('express-static-gzip');

const entryPoint = require('./entryPoint');

module.exports = function addProdMiddlewares(app, options) {
    const publicPath = options.publicPath || '/';
    const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

    app.use(
        publicPath,
        expressStaticGzip(outputPath, {
            enableBrotli: true,
            orderPreference: ['br'],
        }),
    );

    app.get('*', (req, res) => {
        res.set('Content-Security-Policy', "frame-ancestors 'self'");

        const filePath = entryPoint(req, outputPath);
        res.sendFile(filePath);
    });
};
