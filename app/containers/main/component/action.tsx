import {cFetch} from '../../../util/fetch';
//获取方块内容
const getDiamondContents=(param:any)=>{
    return cFetch('/api/diamond/contents',{method:'POST',body:JSON.stringify(param)}).then((data:any)=>{
        return data;
    })
}
const saveDiamondContents=(param:any)=>{
    return cFetch('/api/diamond/savecontents',{method:'POST',body:JSON.stringify(param)}).then((data:any)=>{
        return data;
    })
}
export default {
    getDiamondContents:getDiamondContents,
    saveDiamondContents:saveDiamondContents
}