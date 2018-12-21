const path = require('path');

module.exports = {
    entry: './stories/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    }
};