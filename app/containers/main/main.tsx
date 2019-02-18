import './main.less';
import 'braft-editor/dist/index.css';
import * as React from 'react';
import actions from './action';
import BraftEditor from 'braft-editor'
import {Layout, Icon,Modal,Input,Alert} from 'antd';


import DiamondBox from '../../component/diamond/diamond';
import Scroll from '../../component/scroll/scroll';
import Detail from './component/detail';
const {Sider,Content,Header}=Layout
const {getDiamondBoxs,diamondVerify}=actions;
interface stateType {
    customDias:[],          //自定义方块合集
    detail:boolean,         //详细页
    modal1Visible:boolean,  //模态框显示隐藏
    diamondPassword:string, //方块密码
    diamondVerify:boolean,  //方块验证通过
    diamondMessage:string   //方块验证信息
}

class Index extends React.Component<any,stateType>{
    private scrollObj:any;
    private diamondData:any;
    constructor(props:any){
        super(props);
        this.state={
            customDias:[],
            detail:false,
            modal1Visible:false,
            diamondPassword:'',
            diamondVerify:true,
            diamondMessage:''
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
            });
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
    onDetail=(e:React.MouseEvent<HTMLDivElement>,item:any)=>{
        e.stopPropagation();
        this.diamondData=item;
        if(item.lock==1){
            this.setState({
                modal1Visible:true
            });
        }else{
            this.setState({
                detail:true
            });
        }
    }
    //密码验证
    setModal1Visible=(action:string)=>{
        switch(action){
            case 'ok':
                const {id}=this.diamondData;
                const {diamondPassword}=this.state;
                diamondVerify({
                    id:id,
                    password:diamondPassword
                }).then(data=>{
                    const {success,message}=data;
                    if(success){
                        this.setState({
                            modal1Visible:false,
                            detail:true
                        })
                    }else{
                        this.setState({
                            diamondVerify:false,
                            diamondMessage:message
                        })
                    }
                })
                break;
            default:
                this.setState({
                    modal1Visible:false
                })
                break;
        }
    }
    //方块密码验证输入框
    changeDiamondPassword=(e:any)=>{
        const {diamondVerify}=this.state;
        const {value}=e.target;
        if(!diamondVerify){
            this.setState({
                diamondVerify:!diamondVerify
            })
        }
        this.setState({
            diamondPassword:value
        })
    }
    //返回方块页
    onBack=()=>{
        this.setState({
            detail:false
        });
    }
    render():JSX.Element{
        const {detail}=this.state;
        const customDias=this.customDiamonds();
        return(
            <div className="main">
                <Layout>
                    {/* <Sider className="main-shade" width="100px"></Sider> */}
                    <Content className="main-content">
                        <div className={'content-body' + (detail?' detail':'')}>
                            <div className="fl">
                                {detail?<Detail onBackClick={this.onBack} {...this.diamondData} />:null}
                            </div>
                            <div className="fl">
                                <div className="diamond-content">
                                    <Scroll ref={(ref:any)=>this.scrollObj=ref}>
                                        {customDias}
                                    </Scroll>
                                </div>
                            </div>
                        </div>
                    </Content>
                    {detail?null:
                    <Sider className={'main-actions'+(detail?' detail':'')} width={detail?'50px':'100px'}>
                        <div className="action-btn" >
                            <Icon type="user"/>
                        </div>
                        <div className="action-holder"></div>
                        <div className="action-btn" >
                            <Icon type="logout"/>
                        </div>
                    </Sider>
                    }
                </Layout>
                <Modal
                title="验证"
                style={{ top: 20 }}
                visible={this.state.modal1Visible}
                onOk={() => this.setModal1Visible('ok')}
                onCancel={() => this.setModal1Visible('cancel')}
                >
                    {this.state.diamondVerify?'':<Alert message={this.state.diamondMessage} style={{marginBottom:10}} type="error" showIcon />}
                    <Input placeholder="password" type="password" value={this.state.diamondPassword} onChange={this.changeDiamondPassword} />
                </Modal>
            </div>
        )
    }
}
export default Index;