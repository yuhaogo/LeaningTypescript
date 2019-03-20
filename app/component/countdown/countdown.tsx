import * as React from 'react';
import './countdown.less';
class CountDown extends React.Component<any,any>{
    private secondCount=0;
    constructor(props:any){
        super(props);
        this.state={
            second2:false,
            second1:'',
            minute1:'',
            minute2:'',
            hour1:'',
            hour2:''
        };
    }
    componentDidMount(){
        this.start();
    }
    start=()=>{
        let {secondCount}=this;
        const countdown = setInterval(()=>{
            if(!secondCount){
                clearInterval(countdown);
            }
            const _hour1=Math.floor(secondCount/36000%3);
            const _hour2=Math.floor(secondCount/3600%10);
            const _minute1=Math.floor(secondCount/600%6);
            const _minute2=Math.floor(secondCount/60%10);
            const _second1=Math.floor(secondCount/10%6);
            this.setState({
                secondStart:true,
                second1:`rotate-6 rotate-6-${_second1}`,
                minute1:`rotate-6 rotate-6-${_minute1}`,
                minute2:`rotate-10 rotate-10-${_minute2}`,
                hour1:`rotate-3 rotate-3-${_hour1}`,
                hour2:`rotate-10 rotate-10-${_hour2}`
            });
            secondCount--;
        },1000);
    }
    init=()=>{
        const {hour,minute,second}=this.props;
        this.secondCount=hour*3600+minute*60+second;
    }
    render():JSX.Element{
        this.init();
        const {second1,minute1,minute2,hour1,hour2,secondStart}=this.state;
        return(
            <div className="time-box">
                <div className="time-number hour-1">
                    <div className={`time-items ${hour1}`}>
                        <div className="time0"><span>0</span></div>
                        <div className="time1"><span>1</span></div>
                        <div className="time2"><span>2</span></div>
                    </div>
                </div>
                <div className="time-number hour-2">
                    <div className={`time-items ${hour2}`}>
                        <div className="time0"><span>0</span></div>
                        <div className="time1"><span>1</span></div>
                        <div className="time2"><span>2</span></div>
                        <div className="time3"><span>3</span></div>
                        <div className="time4"><span>4</span></div>
                        <div className="time5"><span>5</span></div>
                        <div className="time6"><span>6</span></div>
                        <div className="time7"><span>7</span></div>
                        <div className="time8"><span>8</span></div>
                        <div className="time9"><span>9</span></div>
                    </div>
                </div>
                <div className="time-colon"><span>:</span></div>
                <div className="time-number minute-1">
                    <div className={`time-items ${minute1}`}>
                        <div className="time0"><span>0</span></div>
                        <div className="time1"><span>1</span></div>
                        <div className="time2"><span>2</span></div>
                        <div className="time3"><span>3</span></div>
                        <div className="time4"><span>4</span></div>
                        <div className="time5"><span>5</span></div>
                    </div>
                </div>
                <div className="time-number minute-2">
                    <div className={`time-items ${minute2}`}>
                        <div className="time0"><span>0</span></div>
                        <div className="time1"><span>1</span></div>
                        <div className="time2"><span>2</span></div>
                        <div className="time3"><span>3</span></div>
                        <div className="time4"><span>4</span></div>
                        <div className="time5"><span>5</span></div>
                        <div className="time6"><span>6</span></div>
                        <div className="time7"><span>7</span></div>
                        <div className="time8"><span>8</span></div>
                        <div className="time9"><span>9</span></div>
                    </div>
                </div>
                <div className="time-colon"><span>:</span></div>
                <div className="time-number second-1">
                    <div className={`time-items ${second1}`}>
                        <div className="time0"><span>0</span></div>
                        <div className="time1"><span>1</span></div>
                        <div className="time2"><span>2</span></div>
                        <div className="time3"><span>3</span></div>
                        <div className="time4"><span>4</span></div>
                        <div className="time5"><span>5</span></div>
                    </div>
                </div>
                <div className="time-number second-2">
                    <div className={`time-items ${secondStart?'rotate-10 start':''}`}>
                        <div className="time0"><span>0</span></div>
                        <div className="time1"><span>1</span></div>
                        <div className="time2"><span>2</span></div>
                        <div className="time3"><span>3</span></div>
                        <div className="time4"><span>4</span></div>
                        <div className="time5"><span>5</span></div>
                        <div className="time6"><span>6</span></div>
                        <div className="time7"><span>7</span></div>
                        <div className="time8"><span>8</span></div>
                        <div className="time9"><span>9</span></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CountDown;