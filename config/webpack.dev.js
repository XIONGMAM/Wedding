const os = require("os");
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const threads = os.cpus().length;
module.exports = {
    entry: {
        index: "./src/js/index.js",
    },
    output: {
        path: undefined,
        filename: "static/js/[name].[contenthash:8].js",
        chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
        assetModuleFilename: "static/media/[name].[hash][ext]",
    },
    module: {
        rules: [
            {
                oneOf: [
                    { test: /\.css$/, use: ["style-loader", "css-loader"] },
                    { test: /\.s[ac]ss$/, use: ["style-loader", "css-loader", "sass-loader"] },
                    {
                        test: /\.(png|jpe?g|gif|svg|webp|ico)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10 * 1024,
                            },
                        },
                    },
                    {
                        test: /\.(ttf|woff2?)$/,
                        type: "asset/resource",
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: "thread-loader",
                                options: {
                                    workers: threads,
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true,
                                    cacheCompression: false,
                                    plugins: ["@babel/plugin-transform-runtime"],
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
    plugins: [
        new ESLintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
            threads,
        }),
        new HtmlWebpackPlugin({
            title: "Wedding",
            template: path.resolve(__dirname, "../public/index.html"),
            filename: "index.html",
            chunks: ["index"],
        }),
    ],
    devServer: {
        host: "localhost",
        port: "3000",
        open: true,
        hot: true,
    },
    mode: "development",
    devtool: "cheap-module-source-map",
};
