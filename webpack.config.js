const HtmlWebpackPlugin=require('html-webpack-plugin');
const Path=require('path');
const tsImportPluginFactory=require('ts-import-plugin');
// const _config=process.env.NODE_ENV==='development'?devConfig:proConfig;
let Config={
    mode:'production',
    entry: {
        app:[
            './app/index.tsx'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./app/index.html'
        }),
    ],
    output: {
        filename: 'app.[hash:5].js',
        path: Path.join(__dirname,'./public'),
        publicPath:'/'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
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
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test:/\.(css|less)$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(png|jpg|gif|jpeg|woff|woff2)$/,
                use:['url-loader?limit=8192'],
            }
        ]
    }
};

module.exports=Config;