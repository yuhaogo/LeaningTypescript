const webpackConfig=require('./webpack.config');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const UglifyJsPlugin= require('uglifyjs-webpack-plugin');
const webpackMerge=require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Config=webpackMerge(webpackConfig,{
    mode:'production',
    plugins: [
        //打包状态插件
        new BundleAnalyzerPlugin({analyzerPort: 10087}),
        //css分离插件
        new ExtractTextPlugin('assets/css/[name].css')
        
    ],
    optimization: {
        //分割js
        splitChunks: {
            cacheGroups:{
                // 比如你要单独把jq之类的官方库文件打包到一起，就可以使用这个缓存组，如想具体到库文件（jq）为例，就可把test写到具体目录下
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    priority: -10,
                    enforce: true
                },
                // 这里定义的是在分离前被引用过两次的文件，将其一同打包到common.js中，最小为30K
                common: {
                    name: 'common',
                    minChunks: 2,
                    minSize: 30000
                }
            },
            chunks:'all',
            minSize: 40000
        },
        minimizer:[
            //压缩js
            new UglifyJsPlugin({
                parallel: true,
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        warnings: false
                    },
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test:/\.(css|less)$/,
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader', 'less-loader']
                })
            }
        ]
    }
});
module.exports=Config;