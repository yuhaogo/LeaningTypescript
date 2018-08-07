const express=require('express');
const app=express();

app.post('/',function(req,res){
    const mysqls=require('../../base/mysql');
    var rsp={
        success:true,
        data:[],
        message:'登录成功'
    }
    var params=req.body;
    var sql='SELECT * FROM user where user_name="'+params.user+'" and pass_word="'+params.pwd+'"';
    mysqls.query(sql,function(err, rows,message){
        if(err){
            if(rows.length>0){
                rsp.data=rows[0];
            }else{
                rsp.success=false;
                rsp.message='账号密码错误';
            }
            res.json(rsp);
            return;
        }
        rsp.success=false;
        rsp.message=message;
        res.json(rsp);
    })
})

module.exports=app;