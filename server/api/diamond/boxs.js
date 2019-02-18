const express=require('express');
const app=express();
app.get('/boxs',function(req,res){
    const mysqls=require('../../base/mysql');
    var rsp={
        success:true,
        data:[],
        message:'加载成功'
    }
    var sql='SELECT * FROM diamond';
    var sql2='SELECT * FROM diamonditem';
    mysqls.query(sql,function(suc, rows,message){
        let data=null;
        if(suc){
            if(rows.length>0){
                data=rows;
            }else{
                rsp.success=false;
                rsp.message=message;
                res.json(rsp);
                return;
            }
        }
        mysqls.query(sql2,function(suc2, rows2,message2){
            if(suc2){
                if(rows2.length>0){
                    for (let i = 0; i < data.length; i++) {
                        const item = data[i];
                        item.childs=rows2.filter(_item=>item.id===_item.diamondId);
                    }
                    rsp.data=data;
                }else{
                    rsp.success=false;
                    rsp.message=message2;
                }
                res.json(rsp);
                return;
            }
            rsp.success=false;
            rsp.message=message2;
            res.json(rsp);
        })
    })
})
app.post('/verify',function(req,res){
    const mysqls=require('../../base/mysql');
    var rsp={
        success:true,
        data:[],
        message:'验证成功'
    }
    var params=req.body;
    var sql='SELECT * FROM diamonditem where id="'+params.id+'" and password="'+params.password+'"';
    mysqls.query(sql,function(suc, rows,message){
        let data=null;
        if(suc){
            if(rows.length>0){
                rsp.data=data;
            }else{
                rsp.success=false;
                rsp.message='验证失败';
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