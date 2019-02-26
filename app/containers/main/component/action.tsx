import {cFetch} from '../../../util/fetch';
//获取方块内容
const getDiamondContents=(param:any)=>{
    return cFetch('/api/diamond/contents',{method:'POST',body:JSON.stringify(param)}).then((data:any)=>{
        return data;
    });
};
//保存方块内容
const saveDiamondContents=(param:any)=>{
    return cFetch('/api/diamond/savecontents',{method:'POST',body:JSON.stringify(param)}).then((data:any)=>{
        return data;
    });
};
//保存方块标题
const saveDaimondTitle=(param:any)=>{
    return cFetch('/api/diamond/savediamondname',{method:'POST',body:JSON.stringify(param)}).then((data:any)=>{
        return data;
    });
};
export default {
    getDiamondContents:getDiamondContents,
    saveDiamondContents:saveDiamondContents,
    saveDaimondTitle:saveDaimondTitle
};