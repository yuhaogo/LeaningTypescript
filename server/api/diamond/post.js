const express=require('express');
const app=express();
//方块密码验证
app.post('/verify',function(req,res){
    const mysqls=require('../../base/mysql');
    var rsp={
        success:true,
        data:[],
        message:'验证成功'
    };
    var params=req.body;
    var sql='SELECT * FROM diamonditem where id="'+params.id+'" and password="'+params.password+'"';
    mysqls.query(sql,function(suc, rows,message){
        if(suc){
            if(rows.length>0){
                rsp.data=rows;
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
    });
});
//获取方块内容
app.post('/contents',function(req,res){
    const mysqls=require('../../base/mysql');
    var rsp={
        success:true,
        data:[],
        message:'加载成功'
    };
    var params=req.body;
    var sql='SELECT * FROM diamondcontents where id="'+params.id+'"';
    mysqls.query(sql,function(suc, rows,message){
        if(suc){
            if(rows.length>0){
                rsp.data=rows[0];
            }else{
                rsp.success=false;
                rsp.message='加载失败';
            }
            res.json(rsp);
            return;
        }
        rsp.success=false;
        rsp.message=message;
        res.json(rsp);
    });
});
//保存方块内容
app.post('/savecontents',function(req,res){
    const mysqls=require('../../base/mysql');
    var rsp={
        success:true,
        data:[],
        message:'保存成功'
    };
    var params=req.body;
    var sql='update diamondcontents set title="'+ params.title+'",contents="'+params.contents +'" where id="'+params.id+'"';
    mysqls.query(sql,function(suc, rows,message){
        if(suc){
            res.json(rsp);
            return;
        }
        rsp.success=false;
        rsp.message=message;
        res.json(rsp);
    });
});
//保存方块名称
app.post('/savediamondname',function(req,res){
    const mysqls=require('../../base/mysql');
    var rsp={
        success:true,
        data:[],
        message:'保存成功'
    };
    var params=req.body;
    var sql='update diamonditem set name="'+ params.name+'" where id="'+params.id+'"';
    mysqls.query(sql,function(suc, rows,message){
        if(suc){
            res.json(rsp);
            return;
        }
        rsp.success=false;
        rsp.message=message;
        res.json(rsp);
    });
});
//新增方块内容
app.post('/adddiamond',function(req,res){
    const mysqls=require('../../base/mysql');
    var rsp={
        success:true,
        data:[],
        message:'新增成功'
    };
    var params=req.body;
    var sql='insert into diamonditem(diamonditem.diamondId,diamonditem.name,diamonditem.type,diamonditem.lock,diamonditem.password) values ("'+params.id+'","'+ params.name+'","'+params.type+'",'+params.lock+',"'+params.password+'")';
    mysqls.query(sql,function(suc, rows,message){
        if(suc){
            res.json(rsp);
            return;
        }
        rsp.success=false;
        rsp.message=message;
        res.json(rsp);
    });
});
module.exports=app;