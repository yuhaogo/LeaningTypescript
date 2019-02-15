import './main.less';
import * as React from 'react';
import DiamondBox from '../../component/diamond/diamond';
import Scroll from '../../component/scroll/scroll';
import actions from './action';
import {Layout, Icon} from 'antd';
const {Sider,Content,Header}=Layout
const {getDiamondBoxs}=actions;
interface stateType {
    layoutType:number,
    customDias:[],
    detail:boolean
}

class Index extends React.Component<any,stateType>{
    private scrollObj:any;
    constructor(props:any){
        super(props);
        this.state={
            layoutType:0,
            customDias:[],
            detail:false
        }
    }
    componentDidMount(){
        this.getDiamondBox();
    }
    //获取方块集合
    getDiamondBox=()=>{
        getDiamondBoxs().then((res:any)=>{
            const{data}=res;
            this.setState({
                customDias:data
            }) 
            
        });
    }
    //获取大模块
    customDiamonds=()=>{
        const {customDias}=this.state;
        let dias=[];
        dias=customDias.map((item:any)=>{
            return <DiamondBox title={item.name} key={item.id} childs={item.childs} onDiamondClick={this.onDetail} />
        });
        setTimeout(()=>{
            this.scrollObj.resize();
        },1100);
        return dias;
    }
    //切换详细模块
    onDetail=()=>{
        debugger;
        this.setState({
            detail:true
        })
    }
    render():JSX.Element{
        const {detail}=this.state;
        const customDias=this.customDiamonds();
        return(
            <div className="main">
                <Layout>
                    <Sider className="main-shade" width="100px"></Sider>
                    <Content className="main-content">
                        <div className={"content-body" + (detail?' detail':'')}>
                            <div className="fl diamond-detail">
                                <h3>详细页</h3>
                            </div>
                            <div className="fl">
                                <Scroll ref={(ref:any)=>this.scrollObj=ref}>
                                    {customDias}
                                </Scroll>
                            </div>
                        </div>
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