const path = require('path')
const { globSync } = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const { c } = require(webpack)


const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugin = []
    const entryFiles = globSync('./src/**/index.js')
    console.log(entryFiles);
    entryFiles.map(file => {
        console.log(file);
        const match = file.match(/src\\(.*)\\index.js/)
        const pageName = match && match[1]
        entry[pageName] = `./${file}`;

        if (globSync(`./src/${pageName}/index.html`).length) {
            htmlWebpackPlugin.push(
                new HtmlWebpackPlugin({
                    template: `./src/${pageName}/index.html`,
                    filename: `${pageName}.html`
                })
            )
        } else {
            htmlWebpackPlugin.push(
                new HtmlWebpackPlugin({
                    template: './public/index.html',
                    filename: `${pageName}.html`
                })
            )
        }
    
    })
    return {
        entry,
        htmlWebpackPlugin
    }
}

const {entry, htmlWebpackPlugin} = setMPA()

module.exports = {
    mode: 'development',
    entry,
    devtool: 'inline-source-map',
    module: {
        rules: [
            // {
            //     test: '/.tsx?$/',
            //     use: 'ts-loader',
            //     exclude: '/node_modules/'
            // }
        ]
    },
    plugins: [
        ...htmlWebpackPlugin,
        new CopyWebpackPlugin({
            patterns: [
                { from: "public", to: "public" },
            ],
        })
    ],
    resolve: {
        // extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        // filename: '[name].bundle.[]',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
}