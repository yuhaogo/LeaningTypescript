import {cFetch} from '../../util/fetch';
//登陆
const getDiamondBoxs=()=>{
    return cFetch('/api/diamond/boxs',{method:'GET'}).then((data:any)=>{
        return data;
    });
};
//方块验证
const diamondVerify=(param:any)=>{
    return cFetch('/api/diamond/verify',{method:'POST',body:JSON.stringify(param)}).then((data:any)=>{
        return data;
    });
};
//新增方块
const diamondAdd=(param:any)=>{
    return cFetch('/api/diamond/adddiamond',{method:'POST',body:JSON.stringify(param)}).then((data:any)=>{
        return data;
    });
};
//新增方块盒子
const diamondBoxAdd=(param:any)=>{
    return cFetch('/api/diamond/addboxdiamond',{method:'POST',body:JSON.stringify(param)}).then((data:any)=>{
        return data;
    });
};
export default {
    getDiamondBoxs:getDiamondBoxs,
    diamondVerify:diamondVerify,
    diamondAdd:diamondAdd,
    diamondBoxAdd:diamondBoxAdd
};