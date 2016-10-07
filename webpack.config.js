var path = require('path');

module.exports = {

    entry: [
        './src/main.js'
    ],
    "devtool": "sourcemaps",
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            //   exclude: /(node_modules|bower_components)/,
            loader: 'babel?presets[]=es2015'

        }]
    },

    resolve: {
    }

};