const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'static/index_bundle.js',
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']}
        ]
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:5000',
        }
    },
    mode: 'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'public/index.html'
        }),
    ]
}
