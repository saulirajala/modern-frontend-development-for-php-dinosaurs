const path = require("path");
const webpack = require("webpack");

module.exports = {
    // Entry point
    entry: ["./main.js", "./wtf-this.js"],

    // Are we working in development or in production
    // mode: "production",
    mode: "development",

    /**
     * Loaders: How the different types of modules within a project will be treated?
     *
     * - Transform all .js through  babel-loader.
     * - exlude code in `node_modules` -folders
     * - Use the env preset in babel-loader, ie. transform from ES6=> ES5.
     */
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
        ]
    },

    /**
     * Where to output code?
     * https://webpack.js.org/configuration/output/
     *
     * - path: absolute path
     * - publicPath: URL of your output.path from the view of the HTML page
     * - filename
     *
     * path will resolve to something like `/srv/www/example/public_html/dist`
     * publicPath will resolve to something like `https://example.com/dist`
     */
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },

    plugins: []
};