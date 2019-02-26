import {cFetch} from '../../util/fetch';
//登陆
const login=(params:any,callback:()=>void)=>{
    return (dispatch:any)=>{
        return cFetch('/api/user/userlogin',{method:'POST',body:JSON.stringify(params)}).then((data:any)=>{
            debugger;
            return data;
        });
    };
};
export default {
    login:login
};