import * as fetch from 'isomorphic-fetch';
import { Modal, message } from 'antd';
import {resetLockTime} from './lock';
import {getCookie} from './common';

interface result {
    status:number,
    ok:boolean,
    json:()=>void
}
interface resultData{
    status?:number,
    success?:boolean,
    data?:any,
    message?:string
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
//检查错误
function checkOutError(res:any){
    if(!res.success){
        const {status=0,message}=res;
        switch(status){
        case 1006:
            Modal.error({
                title: '错误',
                content: message,
                onOk:()=>{
                    window.location.href='/';
                }
            });
            break;
        default:
            Modal.error({
                title: '错误',
                content:message
            });
            break;
        }
        throw message;
    }else{
        return res;
    }
    
}
export const cFetch=(apiUrl:any,param:any)=>{
    const baseUrl=apiUrl;
    const token=getCookie('token');
    param.headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'sxyhome-access-token':token
    };
    resetLockTime();
    return fetch(baseUrl,param)
        .then(checkOut504)
        .then(checkOut401)
        .then(dataJson)
        .then(checkOutError)
        .catch((err)=>{throw err;});
};
