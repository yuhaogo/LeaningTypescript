const webpackConfig=require('./webpack.config');
const Webpack=require('webpack');
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const webpackMerge=require('webpack-merge');
const Config=webpackMerge(webpackConfig,{
    mode:'development',
    plugins: [
        new ExtractTextPlugin('assets/css/[name].css'),
        new Webpack.DefinePlugin({
            'platformUrl':'"./login.aspx"'
        })
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
module.exports=Config;