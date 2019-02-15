import {cFetch} from '../../util/fetch';
//登陆
const getDiamondBoxs=()=>{
    return cFetch('/api/diamond/boxs',{method:'GET'}).then((data:any)=>{
        return data;
    })
}
export default {
    getDiamondBoxs:getDiamondBoxs
}