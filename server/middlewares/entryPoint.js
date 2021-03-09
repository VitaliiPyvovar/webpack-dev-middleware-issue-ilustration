const path = require('path');

/**
 * Returns path to specific index.html entry point
 * based on host and output path.
 */
function entryPoint({ headers: { host }, originalUrl }, outputPath) {
    const filePath = host.split('.')[0].startsWith('b') ? '/b/index.html' : '/a/index.html';

    console.log(originalUrl);

    return path.join(outputPath, filePath);
}

module.exports = entryPoint;
