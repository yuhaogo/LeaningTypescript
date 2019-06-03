const webpackConfig=require('./webpack.config');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const webpackMerge=require('webpack-merge');
module.exports=webpackMerge(webpackConfig,{
    mode:'production',
    plugins: [
        new HtmlWebpackPlugin({
            title:'ETMF',
            template:'./app/index.html'
        }),
        new ExtractTextPlugin('assets/css/[name].css')
    ],
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