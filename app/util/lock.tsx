
//锁定时长
const defaultTime:number=30;
//倒计剩余时间
let Minute:number=defaultTime;
//当前锁定状态
let isLock:boolean=false;
//开始倒计时
export const autoLock=(callback?:(lock:boolean)=>void)=>{
    setInterval(()=>{
        Minute--;
        if(!Minute&&!isLock){
            Minute=999999999;
            isLock=true;
        }
        console.log('lock');
        callback(isLock);
    },60000);
};
//重置倒计时
export const resetLockTime=(isreset?:boolean)=>{
    if(!isLock||isreset) {
        isLock=false;
        Minute=defaultTime;
    }
};
