
require('./diamond.less');
import * as React from 'react';
import {Icon} from 'antd';

//小方块
export class Diamond extends React.Component<any,any>{
    constructor(props:any){
        super(props);  
        this.state={
            marginBtm:5
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                marginBtm:10
            })
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
        )
    }
}

//方块集合
class DiamondBox extends React.PureComponent<any,any>{
    constructor(props:any){
        super(props);
    }
    //获取小方块
    getChilds=()=>{
        const {childs,onDiamondClick}=this.props;
        return childs.map((item:any)=>{
            return <Diamond key={item.id} color={item.color} type={item.type} {...item} onClick={onDiamondClick} />
        })
    }
    render():JSX.Element{
        const {title}=this.props;
        const diamondList:any=this.getChilds();//this.getRandomDiamond();
        return(
            <div className="diamond-box-main">
                <h3 className="diamond-box-title">{title}</h3>
                <div className="diamond-box-children">
                    {diamondList}
                </div>
            </div>
        )      
    }
}
export default DiamondBox;