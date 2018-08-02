const app = require('./app');  
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackCompiled = webpack(webpackConfig);
const path=require('path');
// 配置运行时打包
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
// const webpackDevServer = require('webpack-dev-server');


app.use(webpackDevMiddleware(webpackCompiled, {
    publicPath:'/',
    //noInfo: true,           //所显示和之后的每个像的WebPack束信息消息保存，将被隐藏。错误和警告仍将显示。
    //quiet: true,            //除初始启动信息外，没有任何内容会写入控制台。 这也意味着来自webpack的错误或警告不可见
    //hot: true,              //启动热更新
    //serverSideRender: true,
    //historyApiFallback:true,
    stats: {                  //仅显示您的包中的错误  --通过此选项，您可以精确控制显示的包信息。如果你想要一些捆绑信息，但这不是全部，这可能是一个不错的中间立场。
        colors:true
    }   
}));
app.use(webpackHotMiddleware(webpackCompiled));

app.use("*",function (req, res, next) {
    const filename = path.resolve(webpackCompiled.outputPath, 'index.html');
    webpackCompiled.outputFileSystem.readFile(filename,(err, result)=>{
        if (err) {
            return next(err);
          }
          res.set('content-type','text/html');
          res.send(result);
          res.end();
    });
    // res.sendFile(index);
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var server = app.listen(8002, function() {  
    var port = server.address().port;
    console.log('Open http://localhost:%s', port);
});