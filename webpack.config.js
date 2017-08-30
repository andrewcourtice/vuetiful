var path = require("path");
var webpack = require("webpack");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var config = {
    entry: "./build/app.js",
    output: {
        path: path.resolve(__dirname, "./dist/app"),
        publicPath: "/dist/",
        filename: "app.bundle.js",
        library: "vuetiful",
        libraryTarget: "var"
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader",
            options: {
                loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this nessessary.
                    "css": ExtractTextPlugin.extract({
                        use: "css-loader!postcss-loader",
                        fallback: "vue-style-loader"
                    }),
                    "scss": ExtractTextPlugin.extract({
						use: "css-loader!postcss-loader!sass-loader",
                        fallback: "vue-style-loader"
                    }),
                    "sass": ExtractTextPlugin.extract({
						use: "css-loader!postcss-loader!sass-loader?indentedSyntax",
                        fallback: "vue-style-loader"
                    })
                }
                // other vue-loader options go here
            }
        }, {
            test: /\.css$/,
            loaders: ExtractTextPlugin.extract({
				use: "css-loader!postcss-loader",
                fallback: "style-loader"
            })
        }, {
            test: /\.scss$/,
            loaders: ExtractTextPlugin.extract({
				use: "css-loader!sass-loader",
                fallback: "style-loader"
            }),
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: "file-loader",
            options: {
                name: "[name].[ext]?[hash]"
            }
        }]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.common.js"
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        compress: true
    },
    devtool: "#eval-source-map",
    watch: true,
    plugins: [
        new ExtractTextPlugin("app.style.css"),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFileName: "bundle.report.html",
            openAnalyzer: false
        })
    ]
};

if (process.env.NODE_ENV === "production") {
    config.devtool = "#source-map";
    
    // http://vue-loader.vuejs.org/en/workflow/production.html
    config.watch = false;

    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            debug: false,
            minimize: true
        })
    ]);
}

if (process.env.SCOPE === "components") {
    config.entry = "./build/components.js";
    config.output.path = path.resolve(__dirname, "./dist/components");
    config.output.filename = "components.bundle.js";
    config.externals = {
        "Vue": "vue",
        //use "commonjs date-fns" instead of dateFns to fix https://github.com/andrewcourtice/vuetiful/issues/30, see https://github.com/webpack/webpack/issues/4238
        "date-fns": "commonjs date-fns"
    };
}

module.exports = config;