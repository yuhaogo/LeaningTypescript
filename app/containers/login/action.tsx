import {cFetch} from '../../util/fetch';
//登陆
const login=(params:any,callback:()=>void)=>{
    return (dispatch:any)=>{
        return cFetch('/api/user/userlogin',{method:'POST',body:JSON.stringify(params)}).then((data:any)=>{
            var _data=data;
            if(_data.success){
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload:_data,
                    fallback: callback
                });
            }else if(!_data.success){
                dispatch({
                    type:'LOGIN_ERROR',
                    payload:_data,
                    fallback: callback
                });
            }
            return data;
        })
    }
}
export default {
    login:login
}