import * as React from 'react';
import './countdown.less';
class CountDown extends React.Component<any,any>{
    render():JSX.Element{
        return(
            <div className="time-box">
                <div className="time-number">
                    <div className="time-items">
                        <div className="time1"></div>
                        <div className="time2"></div>
                        <div className="time3"></div>
                        <div className="time4"></div>
                        <div className="time5"></div>
                        <div className="time6"></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CountDown;