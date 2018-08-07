var mysql=require('mysql');
var TEST_DATABASE = 'sxyhome';  
// var TEST_TABLE = 'user'; 
  
//创建连接  
var client = mysql.createConnection({  
    host:'127.0.0.1',
    user: 'root',  
    password: '3355232',
    port:'3306',
    database:TEST_DATABASE
}); 
client.connect(function(err){
    //console.log("链接"+err);
    if(err){
        console.log(err);
    }
    console.log("mysql connect success");
});
function querySql(sql,callback){
    client.query("use " + TEST_DATABASE);
    client.query(sql,function(err,rows,field){
        if(err){
            console.log(err.sqlMessage);
            callback(false,[],err.sqlMessage);
            //client.end();
            return;
        }
        callback(true,rows);
        //client.end();
        return;
    })
}
function deleteSql(sql,callback){
    
}
function insertSql(sql,callback){
    
}
function updataSql(sql,callback){
    
}
var sqlmy={
    query:querySql,
    delete:deleteSql,
    insert:insertSql,
    updata:updataSql
}
module.exports=sqlmy;