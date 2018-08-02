var HtmlWebpackPlugin=require('html-webpack-plugin');
var webpack=require('webpack');
module.exports={
    mode:'development',
    entry: {
      app:[
        'webpack-hot-middleware/client?reload=true',
        'react-hot-loader/patch',
        './app/index.tsx'
      ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template:'./app/index.html',
          inject: false
        }),
      ]
}