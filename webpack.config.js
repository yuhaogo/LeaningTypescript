const devConfig=require('./webpack.development');
const proConfig=require('./webpack.production');
const path=require('path');
const tsImportPluginFactory=require('ts-import-plugin');
const _config=process.env.NODE_ENV==='development'?devConfig:proConfig;
let config=Object.assign({},{
    output: {
      filename: 'app.bundle.js',
      path: path.join(__dirname,'./server/public'),
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
          test:/\.css$/,
          use:[{
            loader:'style-loader'
          },{
            loader:'css-loader'
          }]
        },
        {
          test:/\.less$/,
          exclude: /node_modules/,
          use:[{
            loader:'style-loader'
          },{
            loader:'css-loader'
          },{
            loader:'less-loader'
          }]
        },
        {
          test:/\.(png|jpg|gif|jpeg|woff|woff2)$/,
          use:['url-loader?limit=8192']
        }
      ]
    }
},_config);

module.exports=config;