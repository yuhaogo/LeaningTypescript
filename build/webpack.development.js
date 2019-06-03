const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const Webpack=require('webpack');
const webpackConfig=require('./webpack.config');
const webpackMerge=require('webpack-merge');
const {publicPath,port}=require('./projectConfig');
const path=require('path');
module.exports=webpackMerge(webpackConfig,{
    mode:'development',
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here http://localhost:${port}`],
                notes: ['Some additionnal notes to be displayed unpon successful compilation']
            }
        })
    ],
    module: {
        rules: [
            {
                test:/\.(css|less)$/,
                use:['style-loader','css-loader', 'less-loader']
            }
        ]
    }, 
    devServer: {
        contentBase:[path.resolve('./app')],
        hot:true,
        hot:true,
        port:port,
        open:true,
        inline:true,
        noInfo: true ,
        quiet: true ,
        compress: true ,
        clientLogLevel:'none',
        historyApiFallback:true,
        //单个项目时注释
        // historyApiFallback:{
        //     rewrites:[
        //         {
        //             from:new RegExp(`^${publicPath}`),
        //             to:`${publicPath}/index.html`
        //         }
        //     ]
        // },
        overlay: {
            warnings: true ,
            errors: true
        },
        //单个项目时可注释
        //openPage:'test/',
        proxy:{
            '/api/*':{
                target:'http://127.0.0.1:8002',
                changeOrigin:true
            },
            '/index/*':{
                target:'http://127.0.0.1:8003',
                pathRewrite: {'/index/*' : ''}
            }
        }
    }
});