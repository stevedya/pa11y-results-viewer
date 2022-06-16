const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './js/app.js',
    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, 'js'),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    resolve: {
        // Add `.js` and `.jsx` as a resolvable extension.
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                // tells webpack how to handle js and jsx files
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ]
    },
};