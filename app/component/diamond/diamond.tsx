
require('./diamond.less');
import * as React from 'react';
import {Icon, Modal} from 'antd';

import AddDiamondForm from './form/addDiamondform';
//小方块
export class Diamond extends React.Component<any,any>{
    constructor(props:any){
        super(props);  
        this.state={
            marginBtm:5
        };
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                marginBtm:10
            });
        },1000);
    }
    render():JSX.Element{
        const {color,type,name,onClick,lock}=this.props;
        const {marginBtm}=this.state;
        const _className=type=='big'?'big':'small';
        return(
            <div 
                className={`diamond-main ${_className}`}
                style={{backgroundColor:color,marginBottom:marginBtm}}
                onClick={(e:React.MouseEvent<HTMLDivElement>)=>onClick(e,this.props)}>{lock==1?<Icon className="diamond-lock" type="lock"/>:''}{name}</div>
        );
    }
}

//方块集合
class DiamondBox extends React.PureComponent<any,any>{
    constructor(props:any){
        super(props);
        this.state={
            addModalVisible:false
        };
    }
    //获取小方块
    getChilds=()=>{
        const {childs,onDiamondClick}=this.props;
        return childs.map((item:any)=>{
            return <Diamond key={item.id} color={item.color} type={item.type} {...item} onClick={onDiamondClick} />;
        });
    }
    //新增小方块
    addChilds=()=>{
        const {addModalVisible}=this.state;
        this.setState({
            addModalVisible:!addModalVisible
        });

    }
    render():JSX.Element{
        const {addModalVisible}=this.state;
        const {title,status}=this.props;
        const diamondList:any=this.getChilds();//this.getRandomDiamond();
        const toolsClassName=status==1?'diamond-box-edit':'';
        return(
            <div className={`diamond-box-main ${toolsClassName}`}>
                <h3 className="diamond-box-title">
                    {title}
                    <div className="diamond-box-tools">
                        <Icon type="plus-square" onClick={this.addChilds}/>
                        <Icon type="close-square" />
                    </div>
                </h3>
                <div className="diamond-box-children">
                    {diamondList}
                </div>
                <Modal
                    title="新增"
                    style={{ top: 20 }}
                    visible={addModalVisible}
                >
                    <AddDiamondForm />
                </Modal>
            </div>
        );      
    }
}
export default DiamondBox;