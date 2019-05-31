import * as fetch from 'isomorphic-fetch';
import { Modal } from 'antd';
import {resetLockTime} from './lock';

interface result {
    status:number,
    ok:boolean,
    json:()=>void
}
// var api_host="http://127.0.0.1:8002";`
function checkOut504(res:result) {
    if(res.status===504){
        Modal.error({
            title: '服务器未响应',
            content: '服务器超时，请联系管理员！'
        });
        return res;
    }
    return res;
}
function checkOut401(res:result) {
    if(res.status===401){
        Modal.error({
            title: '登陆验证过期',
            content: '您的登陆验证已过期，请重新登陆'
        });
        return res;
    }
    return res;
}
function dataJson(res:result) {
    if(res.ok){
        return res.json();
    }else{
        return res;
    }
}
export const cFetch=(apiUrl:any,param:any)=>{
    const baseUrl=apiUrl;
    param.headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    resetLockTime();
    // param.credentials= 'include';
    console.log(param);
    //param.mode='no-cors';
    return fetch(baseUrl,param)
        .then(checkOut504)
        .then(checkOut401)
        .then(dataJson);
};
