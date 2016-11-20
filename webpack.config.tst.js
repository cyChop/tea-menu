var webpackConfig = require('./webpack.config'),
    merge = require('webpack-merge'),
    path = require('path');

var cfg = webpackConfig('en');

module.exports = merge.smart(cfg, {
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|test|dev)/,
                loaders: ['istanbul-instrumenter-loader?esModules=true'],
            }
        ]
    },

    externals: {}
});
