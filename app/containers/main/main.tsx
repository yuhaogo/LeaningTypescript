import './main.less';
import * as React from 'react';
import DiamondBox from '../../component/diamond/diamond';
import Scroll from '../../component/scroll/scroll';
import {Layout, Icon} from 'antd';
const {Sider,Content,Header}=Layout

interface stateType {
    layoutType:number
}

class Index extends React.Component<any,stateType>{
    constructor(props:any){
        super(props);
        this.state={
            layoutType:0
        }
    }
    render():JSX.Element{
        return(
            <div className="main">
                <Layout>
                    <Sider className="main-shade" width="100px"></Sider>
                    <Content className="main-content">
                        <Scroll>
                            <DiamondBox title="个人" />
                            <DiamondBox title="工作" />
                            <DiamondBox title="照片" />
                            <DiamondBox title="游戏" />
                        </Scroll>
                    </Content>
                    <Sider className="main-actions" width="100px">
                        <div className="action-btn" >
                            <Icon type="user"/>
                        </div>
                        <div className="action-holder"></div>
                        <div className="action-btn" >
                            <Icon type="logout"/>
                        </div>
                    </Sider>
                </Layout>
            </div>
        )
    }
}
export default Index;