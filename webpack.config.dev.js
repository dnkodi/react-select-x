var path = require('path')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
 
module.exports = {
    mode: 'development',
    entry: './demo/index.js',
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "demo")
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.[s]?css$/,
                exclude: [/node_modules/],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            minimize: true,
                            sourceMap: true,
                            localIdentName: "[path][name]__[local]--[hash:base64:5]"
                        }
                    },
                    { loader: "postcss-loader"},
                    { loader: "sass-loader" }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: "styles.css"
        })
    ],
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true
    }
}
