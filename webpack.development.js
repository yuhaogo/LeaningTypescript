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
        proxy:{
          '/api/*':{
            target:'http://127.0.0.1:8002',
            changeOrigin:true
          },
          '/index/*':{
            target:'http://127.0.0.1:8001',
            pathRewrite: {'/index/*' : ''}
          }
      }
    }
})