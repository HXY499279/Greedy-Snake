const { resolve } = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            // 预设：指示babel做怎么样的兼容性处理
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // 使用corejs的方式：按需加载
                                        useBuiltIns: 'usage',
                                        // 指定core-js的版本
                                        corejs: {
                                            version: 3
                                        },
                                        // 要兼容的目标浏览器
                                        targets: {
                                            chrome: '60',
                                            firefox: '60',
                                            ie: '9',
                                            safari: '10',
                                            edge: '17'
                                        }
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        // 指定加载的目录的路径
        contentBase: resolve(__dirname, 'dist'),

        // 启动gzip压缩，让我们代码体积更小，启动更快
        compress: true,

        // 端口号
        port: 8080,

        // 自动打开浏览器
        open: true,

        // 热更新
        // 只在内存中打包
        // 即，打包输出目录中并没有数据
        liveReload: true
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '...'],
    },
}