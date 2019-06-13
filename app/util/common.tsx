// 写cookies
export const setCookie = (name:string, value:string, callback?:any) => {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp.toUTCString() + ';path=/';
    if (callback) callback.callback();
};
// 读cookies
export const getCookie = (name:string) => {
    var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
    else
        return null;
};
//清空cookies
export const clearCookies = () => {
    var exp = new Date();
    exp.setTime(exp.getTime() + (-1 * 60 * 1000));
    document.cookie ='token=;expires=' +';domain=localhost;path=/;expires=' +  exp.toUTCString()  + ';';
};
// //写sessionStorage
// export const setSessionStorage=(name, value)=>{
//     window.sessionStorage.setItem(name,JSON.stringify(value));
// };
// //读sessionStorage
// export const getSessionStorage=(name)=>{
//     const session= window.sessionStorage.getItem(name);
//     return JSON.parse(session);
// };
// //写localStorage
// export const setLocalStorage=(name, value)=>{
//     window.localStorage.setItem(name,JSON.stringify(value));
// };
// //读localStorage
// export const getLocalStorage=(name)=>{
//     const locals= window.localStorage.getItem(name);
//     return JSON.parse(locals);
// };
// //国际化
// export const intl=(key)=>{
//     const language=getLocalStorage('language'),
//         name=language[key];
//     return name;
// };
// //文件大小
// export const fileSize=(value)=>{
//     if(null==value||value==''){
//         return '0 Bytes';
//     }
//     var unitArr = new Array('Bytes','KB','MB','GB','TB','PB','EB','ZB','YB');
//     var index=0;
//     var srcsize = parseFloat(value);
//     index=Math.floor(Math.log(srcsize)/Math.log(1024));
//     var size =srcsize/Math.pow(1024,index);
//     size=size.toFixed(2);
//     return size+unitArr[index];
// };
// //获取url参数
// export const getUrlParam=(name)=>{
//     //构造一个含有目标参数的正则表达式对象
//     const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
//     //匹配目标参数
//     const r = unescape(window.location.search).substr(1).match(reg);
//     if (r != null) {
//         return unescape(r[2]);
//     }
//     return null;
// };