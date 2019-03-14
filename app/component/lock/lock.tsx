import * as React from 'react';
import {Modal} from 'antd';
interface stateType{
    isLock:boolean //是否锁定
}
interface propsType{

}
class Lock extends React.Component<stateType,propsType>{
    render():JSX.Element{
        return(
            <div className="lock">
                <Modal>

                </Modal>
            </div>
        );
    }
}