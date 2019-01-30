const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const pkg = require('./package.json');

const libraryName= pkg.name;
 
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        library: libraryName,
        libraryTarget: 'umd',
        publicPath: '/dist/',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
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
    resolve: { 
        alias: { 
            'react': path.resolve(__dirname, './node_modules/react') ,
            'react-dom': path.resolve(__dirname, './node_modules/react-dom')
        } 
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    }
}
