const express=require('express');
const app=express();
const get=require('./get');
const post=require('./post');
app.use(get);
app.use(post);
module.exports=app;