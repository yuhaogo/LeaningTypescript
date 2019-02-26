var HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    mode:'production',
    output: {
        filename: 'app.[name].js'
    },
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
};