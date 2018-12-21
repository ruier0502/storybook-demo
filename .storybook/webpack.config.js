const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"],
                include: path.resolve(__dirname, "../")
            },
            {
                test: /\.stories\.jsx?$/,
                loaders: [require.resolve('@storybook/addon-storysource/loader')],
                enforce: 'pre',
            }
        ]
    },
    externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'react/addons': true,
    }
};