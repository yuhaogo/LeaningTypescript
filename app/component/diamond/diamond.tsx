
require('./diamond.less');
import * as React from 'react';

export class Diamond extends React.Component<any,any>{
    constructor(props:any){
        super(props);
    }

    render():JSX.Element{
        const {color,type:classType}=this.props;
        const _className=classType=='big'?'big':'small';
        return(
            <div className={`diamond-main ${_className}`} style={{backgroundColor:color}}></div>
        )
    }
}

class DiamondBox extends React.PureComponent<any,any>{
    private Colors:Array<string>=['#d0b122','#e0521d','#8632b3','#7ae3bf'];
    constructor(props:any){
        super(props);
    }
    //测试
    getRandomDiamond=()=>{
        let _num:number=6+Math.floor(Math.random()*10);
        _num=_num<3?3:_num;
        console.log(_num);
        let diamondList=[];
        for (let i = 0; i < _num; i++) {
            const rdm:number=Math.floor(Math.random()*4);
            const sizeRdm=Math.floor(Math.random()*10)>4?'big':'small'
            diamondList.push(<Diamond key={i} color={this.Colors[rdm]} type={sizeRdm} />);
        }
        return diamondList;
    }
    render():JSX.Element{
        const {title}=this.props;
        console.log("DiamondBox",'');
        const diamondList=this.getRandomDiamond();
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