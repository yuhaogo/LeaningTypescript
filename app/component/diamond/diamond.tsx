
require('./diamond.less');
import * as React from 'react';
import {Icon,Dropdown} from 'antd';
//小方块
export class Diamond extends React.Component<any,any>{
    constructor(props:any){
        super(props);  
    }

    render():JSX.Element{
        const {color,type,name,onClick,lock,menus}=this.props;
        const _className=type=='big'?'big':'small';
        const _menus=menus(this.props);
        return(
            <Dropdown
                trigger={['contextMenu']}
                overlay={_menus}
            >
                <div 
                    className={`diamond-main ${_className}`}
                    style={{backgroundColor:color,marginBottom:10}}
                    onClick={(e:React.MouseEvent<HTMLDivElement>)=>onClick(e,this.props)}>
                    {lock==1?<Icon className="diamond-lock" type="lock"/>:''}
                    {name}
                </div>
            </Dropdown>
        );
    }
}

//方块集合
class DiamondBox extends React.PureComponent<any,any>{
    constructor(props:any){
        super(props);
    }
    //获取小方块
    getChilds=()=>{
        const {childs,onDiamondClick,menus}=this.props;
        return childs.map((item:any)=>{
            return <Diamond key={item.id} color={item.color} type={item.type} menus={menus} {...item} onClick={onDiamondClick} />;
        });
    }
    render():JSX.Element{
        const {title,status}=this.props;
        const diamondList:any=this.getChilds();//this.getRandomDiamond();
        const toolsClassName=status==1?'diamond-box-edit':'';
        return(
            <div className={`diamond-box-main ${toolsClassName}`}>
                <h3 className="diamond-box-title">
                    {title}
                </h3>
                <div className="diamond-box-children">
                    {diamondList}
                </div>
            </div>
        );      
    }
}
export default DiamondBox;