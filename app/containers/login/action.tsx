import {cFetch} from '../../util/fetch';
import {setCookie} from '../../util/common';
//登陆
const login=(params:any,callback:()=>void)=>{
    return (dispatch:any)=>{
        return cFetch('/api/user/userlogin',{method:'POST',body:JSON.stringify(params)}).then((data:any)=>{
            setCookie('token',data.token);
            return data;
        });
    };
};
export default {
    login:login
};