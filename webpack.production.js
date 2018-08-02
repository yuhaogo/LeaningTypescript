var HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    mode:'production',
    entry: {
      app:[
        './app/index.tsx'
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template:'./app/index.html',
          inject: false
        }),
      ]
}