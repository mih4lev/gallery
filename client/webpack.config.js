module.exports = {
    watch: true,
    entry: './scripts/index.js',
    output: {
        filename: 'bundle.min.js',
        path: __dirname + '/docs/scripts'
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|temp)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};