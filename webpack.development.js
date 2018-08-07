const HtmlWebpackPlugin=require('html-webpack-plugin');
const Webpack=require('webpack');
const webpackConfig=require('./webpack.config');
module.exports=Object.assign(webpackConfig,{
    mode:'development',
    entry:{app:'./app/index.tsx'},
    
    output: {
      filename: 'app.bundle.js'
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template:'./app/index.html'
        }),
      ],
    devServer: {
        publicPath:'/',
        contentBase:'./public',
        hot:true,
        port:8001,
        open:true,
        inline:true,
        noInfo: true ,
        quiet: true ,
        compress: true ,
        clientLogLevel:'none',
        overlay: {
          warnings: true ,
          errors: true
      } ,
    }
})