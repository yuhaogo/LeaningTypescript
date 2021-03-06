import './main.less';
import 'braft-editor/dist/index.css';
import * as React from 'react';
import actions from './action';
import {Layout, Icon,Modal,Input,Alert,Avatar,Menu,Popconfirm} from 'antd';


import DiamondBox from '../../component/diamond/diamond';
import Scroll from '../../component/scroll/scroll';
import Detail from './component/detail';
import Drag from '../../component/drag/drag';
import CountDown from '../../component/countdown/countdown';
import {clearCookies} from '../../util/common';
import {autoLock,resetLockTime} from '../../util/lock';
import AddDiamondForm from './form/addDiamondform';
const {DragItem}=Drag;
const {Sider,Content}=Layout;
const {getDiamondBoxs,diamondVerify,diamondBoxAdd}=actions;
interface stateType {
    customDias:[],          //自定义方块合集
    detail:boolean,         //详细页
    modal1Visible:boolean,  //模态框显示隐藏
    diamondPassword:string, //方块密码
    diamondVerify:boolean,  //方块验证通过
    diamondMessage:string,  //方块验证信息
    editStatus:boolean,     //编辑状态
    addModalVisible:boolean,//新增小方块模块框显示隐藏
    nowDiamondBoxId:string, //当前方块盒子id
    isLock:boolean,         //是否锁定
    nowDiamondItem:any,     //当前小方块数据
    addDiamondBoxName:string//新增盒子名称
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
            diamondMessage:'',
            editStatus:false,
            addModalVisible:false,
            nowDiamondBoxId:'',
            addDiamondBoxName:'',
            isLock:false,
            nowDiamondItem:{}
        };
    }
    async componentDidMount(){
        autoLock((isLock:boolean)=>{
            if(isLock){
                this.setState({
                    isLock:isLock
                });
            }
        });
        await this.getDiamondBox();
    }
    //获取方块集合
    getDiamondBox=async ()=>{
        const res= await getDiamondBoxs();
        const{data}=res;
        this.setState({
            customDias:data
        });
    }
    //获取大模块
    customDiamonds=()=>{
        const {customDias,editStatus}=this.state;
        let dias=[];
        dias=customDias.map((item:any)=>{
            return (
                <DragItem key={item.id} value={item.id}>
                    {editStatus?<div className="diamond-box-tools">
                        <Icon type="plus-square" onClick={(e:any)=>this.addChilds(e,item.id)}/>
                        <Icon type="close-square" />
                    </div>:null}
                    <DiamondBox title={item.name} childs={item.childs} menus={this.getMenus} onDiamondClick={this.onDetail} status={editStatus?1:0}/>
                </DragItem>
            );
        });
        setTimeout(()=>{
            this.scrollObj.resize();
        },1100);
        return dias;
    }
    //切换详细模块
    onDetail=(e:any,item:any)=>{
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
                    });
                }else{
                    this.setState({
                        diamondVerify:false,
                        diamondMessage:message
                    });
                }
            });
            break;
        default:
            this.setState({
                modal1Visible:false
            });
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
            });
        }
        this.setState({
            diamondPassword:value
        });
    }
    //返回方块页
    onBack=()=>{
        this.setState({
            detail:false
        });
        this.getDiamondBox();
    }
    //切换编辑状态
    onTransitionEditStatus=(e:any)=>{
        e.stopPropagation();
        const {editStatus}=this.state;
        this.setState({
            editStatus:!editStatus
        });
    }
    //获取小方块右键菜单
    getMenus=(item:any)=>{
        const menus=(
            <Menu>
                <Menu.Item key="1" onClick={()=>this.onDiamondItemEdit(item)}>编辑</Menu.Item>
                <Menu.Item key="2" onClick={()=>this.onDiamondItemDelete(item)}>删除</Menu.Item>
            </Menu>);
        return menus;
    }
    //新增小方块
    addChilds=(e:React.MouseEvent<HTMLDivElement>,nowBoxId:string)=>{
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            addModalVisible:true,
            nowDiamondItem:{
                nowBoxId:nowBoxId
            }
        });

    }
    //编辑小方块
    onDiamondItemEdit=(nowItem:any)=>{
        this.setState({
            addModalVisible:true,
            nowDiamondItem:nowItem,
        });
    }
    //删除小方块
    onDiamondItemDelete=(nowItem:any)=>{

    }
    //取消新增
    onCancelAdd=()=>{
        this.setState({
            addModalVisible:false
        });
    }
    //锁屏验证
    lockVerify=()=>{
        resetLockTime(true);
        this.setState({
            isLock:false
        });
    }
    //新增方块的盒子
    onAddDiamondBox=()=>{
        const {addDiamondBoxName}=this.state;
        if(!addDiamondBoxName) return false;
        diamondBoxAdd({
            name:addDiamondBoxName
        }).then((data:any)=>{
            const {success}=data;
            if(success){
                this.getDiamondBox();;
            }
        });
    }
    //盒子名称
    inputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}=e.target;
        this.setState({
            addDiamondBoxName:value
        });
    }
    //退出
    onLayout=()=>{
        clearCookies();
        window.location.href='/';
    }
    render():JSX.Element{
        const {
            detail,
            editStatus,
            addModalVisible,
            modal1Visible,
            diamondVerify,
            diamondMessage,
            diamondPassword,
            isLock,
            nowDiamondItem,
            addDiamondBoxName}=this.state;
        const customDias=this.customDiamonds();
        return(
            <div className="main">
                <Layout>
                    <Content className="main-content">
                        <div className={'content-body' + (detail?' detail':'')}>
                            <div className="fl">
                                {detail?<Detail 
                                    onBackClick={this.onBack} 
                                    {...this.diamondData}
                                />:null}
                                <CountDown hour={20} minute={0} second={0} />
                            </div>
                            <div className="fl">
                                <div className="diamond-content">
                                    <Scroll ref={(ref:any)=>this.scrollObj=ref}>
                                        <Drag
                                            move={editStatus}
                                        >
                                            {customDias}
                                        </Drag>
                                    </Scroll>
                                </div>
                            </div>
                        </div>
                    </Content>
                    {detail?null:
                        <Sider className="main-actions" width={100}>
                            <div className="action-btn" >
                                <Icon type="user"/>
                            </div>
                            <div className="action-holder"></div>
                            <div className="action-btn">
                                <Popconfirm placement="leftTop" icon={<Icon type="block" />} title={<Input placeholder="盒子名称" onChange={this.inputChange} value={addDiamondBoxName}/>} onConfirm={this.onAddDiamondBox} okText="Yes" cancelText="No">
                                    <Icon type="plus-circle" />
                                </Popconfirm>
                            </div>
                            <div className={'action-btn'+(editStatus?' active':'')} onClick={this.onTransitionEditStatus} >
                                <Icon type="form"/>
                            </div>
                            <div className="action-btn" onClick={this.onLayout} >
                                <Icon type="logout"/>
                            </div>
                        </Sider>}
                </Layout>
                <Modal
                    title="验证"
                    style={{ top: 20 }}
                    visible={modal1Visible}
                    onOk={() => this.setModal1Visible('ok')}
                    onCancel={() => this.setModal1Visible('cancel')}
                    destroyOnClose={true}
                >
                    {diamondVerify?'':<Alert message={diamondMessage} style={{marginBottom:10}} type="error" showIcon />}
                    <Input placeholder="password" type="password" value={diamondPassword} onChange={this.changeDiamondPassword} />
                </Modal>
                <AddDiamondForm
                    title="新增"
                    visible={addModalVisible}
                    values={nowDiamondItem}
                    onCallBack={()=>{
                        this.setState({
                            addModalVisible:false
                        });
                        this.getDiamondBox();}}
                    onCancel={this.onCancelAdd}
                />
                <Modal
                    title="锁定"
                    visible={isLock}
                    closable={false}
                    cancelButtonProps={{
                        style:{
                            display:'none'
                        }
                    }}
                    onOk={this.lockVerify}
                    destroyOnClose={true}
                >   
                    <div className="lock-avatar"><Avatar style={{ backgroundColor: '#87d068' }} size={80} icon="user" /></div>
                    <Input addonBefore={<Icon type="lock" />} type="password" />
                </Modal>
            </div>
        );
    }
}
export default Index;