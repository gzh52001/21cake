
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry:'./src/index.js',
    output:{
        path: path.join(__dirname, 'dist'),
        //每次生成不一样的hash值作为名称，防止缓存
        filename: "[name].[hash:5].bundle.js"
    },

    devServer: {
        contentBase: path.join(__dirname, 'public/index.html'),
        host: 'localhost',
        hot: true,
        open: true,
        port: 3000
    },
    module: {
        rules: [
            {
                //配置JSX编译
                test: /\.jsx?$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }]
                        ]
                    }
                }]
            },
            {
                test:/\.css$/,
                // exclude: path.join(__dirname, 'node_modules'),
                use: ['style-loader', 'css-loader']
            },
            {
                test:/\.scss$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test:/\.png|jpg|gif$/,
                use:['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html')
        })
    ],

    resolve: {
        extensions: [".js", ".jsx", ".json", ".jpg", ".png"],
        alias: {
            "@": path.join(__dirname,"src"),
            "#": path.join(__dirname,"public")
        }
    }
}