export interface UserInfo{
    UserId:string,  //用户名
    zhName:string   //昵称
}
const initState:UserInfo={
    UserId:'',
    zhName:''
};
export default (state:UserInfo=initState,actions:any):UserInfo=>{
    switch(actions.type){
    case 'LOGIN_SUCCESS':
        const {Username,zhName}=actions.payload;
        var newState={
            UserName:Username,
            zhName:zhName
        };
        return Object.assign({},state,newState);
    case 'LOGIN_ERROR':
        const {message}=actions.payload;
        return Object.assign({},{
            success:false,
            message:message
        },state);
    default :
        return state;
    }
};