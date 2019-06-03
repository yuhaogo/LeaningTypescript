const HtmlWebpackPlugin=require('html-webpack-plugin');
const Webpack=require('webpack');
const path=require('path');
const tsImportPluginFactory=require('ts-import-plugin');
const {buildPath,publicPath}=require('./projectConfig');
let Config={
    entry: {
        app:[
            // '@babel/polyfill',
            './app/index.tsx'
        ]
    },
    output: {
        filename: 'assets/js/[name].[hash:5].js',
        path: path.resolve(buildPath),
        publicPath:publicPath+'/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'ETMF',
            template:path.resolve('./app/index.html'),
            filename:'index.html'
        }),
        new Webpack.DefinePlugin({
            'IS_DEV':process.env.build==='dev',
            'IS_LOCAL':process.env.build==='local',
            'IS_PROD':process.env.build==='prod',
            'IS_TEST':process.env.build==='test'

        }),
    ],
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        alias:{
            utils:path.resolve(__dirname,'../app/util')
        }
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.tsx|.ts$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader:'ts-loader',
                options:{
                    transpileOnly: true,
                    getCustomTransformers:()=>({
                        before:[
                            tsImportPluginFactory({
                                libraryDirectory: 'es',
                                libraryName: 'antd',
                                style: 'css',
                            })
                        ]
                    }),
                    compilerOptions: {
                        module: 'es6'
                    }
                }
            },
            {
                test: /\.js|.jsx$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test:/\.(png|jpg|gif|jpeg|woff|woff2|svg)$/,
                loader:'url-loader',
                options:{
                    limit:8192,
                    name:'assets/image/[name].[ext]'
                }
            }
        ]
    }
};

module.exports=Config;