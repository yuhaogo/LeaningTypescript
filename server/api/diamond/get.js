const express=require('express');
const app=express();
app.get('/boxs',function(req,res){
    const mysqls=require('../../base/mysql');
    var rsp={
        success:true,
        data:[],
        message:'加载成功'
    };
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
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    item.childs=rows2.filter(_item=>item.id==_item.diamondId);
                }
                rsp.data=data;
                rsp.success=true;
                rsp.message=message2;
                res.json(rsp);
                return;
            }
            rsp.success=false;
            rsp.message=message2;
            res.json(rsp);
        });
    });
});
module.exports=app;