import './drag.less';
import * as React from 'react';

interface BasicStates{
    //鼠标X轴偏移量
    moveX:number,
    //鼠标Y轴偏移量
    moveY:number,
    //是否拖拽状态
    isDrag:boolean,
    //当前拖拽对象索引
    dragIndex:number,
    //当前数据
    dragData:Array<string>
}
interface BasicProps extends React.HTMLAttributes<HTMLDivElement>{
    move?:boolean,
    value?:string,
    targetDragBarClassName?:string
}

const generator=(props:BasicProps)=>{
    return (Component:any)=>{
        return class Adapter extends React.Component<BasicProps,BasicStates>{
            static DragItem:any;
            render(){
                return(
                    <Component {...this.props} />
                );
            }
        };
    };
};
class BasicComponent extends React.Component<BasicProps,BasicStates>{
    private touch:boolean;
    private mousePosition:{
        mouseX:number,
        mouseY:number
    }={
        mouseX:0,
        mouseY:0
    };
    private dragChilds:any;
    private childPosition:Array<Object&{
        x:number,
        y:number,
        width:number,
        height:number,
        relative:string
    }>=[];
    private initData:Array<string>=[];
    constructor(props:any){
        super(props);
        this.state={
            moveX:0,
            moveY:0,
            isDrag:false,
            dragIndex:0,
            dragData:[]
        };
    }
    //组件更新
    componentDidUpdate(){
        const {childNodes}=this.dragChilds;
        const {dragIndex}=this.state;
        this.childPosition=[];
        const dragChild=childNodes[dragIndex];
        let dragPosition:any=null;
        if(dragChild){
            dragPosition={
                x:dragChild.offsetLeft,
                y:dragChild.offsetTop
            };
        }
        childNodes.forEach((item:any)=>{
            const {offsetTop,offsetLeft,clientWidth,clientHeight}=item;
            this.childPosition.push({
                x:offsetLeft,
                y:offsetTop,
                width:clientWidth,
                height:clientHeight,
                relative:dragPosition?offsetTop<dragPosition.y?'top':'bottom':''
            });
        });
    }

    //渲染子集
    renderChilds=(childs:any)=>{
        const {dragData}=this.state;
        let _childs:any=[];
        for (let j = 0; j < dragData.length; j++) {
            childs.forEach((item:any)=>{
                const _item = dragData[j];
                if(item.props.value===_item){
                    _childs.push(item);
                }
            });
        }
        return _childs;
    }

    //拖拽模式
    moving=(childs:any)=>{
        let holderChild:any=null;
        const {move}=this.props;
        const {dragData}=this.state;
        let _childs=dragData.length>0?this.renderChilds(childs):childs;
        this.initData=[];
        let newChilds=_childs.map((Item:any,index:number)=>{
            let _nextFix=move?'move':'box';
            const {dragIndex,isDrag}=this.state;
            if(isDrag&&dragIndex===index){
                _nextFix+=' drag-item-moving';
                holderChild=React.cloneElement(Item);
            }
            this.initData.push(Item.props.value);
            const _props=move?{
                onMouseDown:(e:React.MouseEvent<HTMLDivElement>)=>this.onMouseDown(e,index),
            }:{};
            return(
                <div 
                    key={index} 
                    className={`drag-item-${_nextFix}`}
                >
                    <div className="drag-area">
                        <div className="drag-bar" {..._props}></div>
                    </div>
                    {Item}
                </div>);
        });
        return {
            childs:newChilds,
            holder:holderChild
        };
    }
    //鼠标按下
    onMouseDown=(e:React.MouseEvent<HTMLDivElement>,index:number)=>{
        e.stopPropagation();
        const {clientX,clientY}=e;
        this.touch=true;
        this.mousePosition={
            mouseX:clientX,
            mouseY:clientY
        };
        this.setState({
            isDrag:true,
            dragIndex:index,
            moveX:0,
            moveY:0
        });
    }
    //鼠标移动
    onMouseMove=(e:React.MouseEvent<HTMLDivElement>)=>{
        const {clientX,clientY}=e;
        const {mouseX,mouseY}=this.mousePosition;
        const {dragIndex}=this.state;
        if(this.touch){
            const targetIndex=this.getTargetIndex(clientX,clientY);
            if((targetIndex||targetIndex==0)&&targetIndex!==dragIndex){
                this.transitionPosition(dragIndex,targetIndex);
            }
            //计算偏移量
            this.setState({
                moveX:mouseX-clientX,
                moveY:mouseY-clientY
            });
        }

    }
    //鼠标抬起
    onMouseUp=()=>{
        this.touch=false;
        this.setState({
            isDrag:false
        });
    }
    //获取替换目标的索引
    getTargetIndex=(x:number,y:number)=>{
        const {childPosition}=this;
        let targetIndex:number=null;
        const {dragIndex}=this.state;
        const dragChild=childPosition[dragIndex];

        for (let i = 0; i < childPosition.length; i++) {
            const child = childPosition[i];
            const {x:childX,y:childY,width,height,relative}=child;
            if(childX+width>x&&x>childX){
                switch(relative){
                case 'top':
                    if(y>childY&&y<childY+dragChild.height) return i;
                    break;
                case 'bottom':
                    if(y>height-dragChild.height&&y<childY+height) return i;
                    break;
                default:
                    if(childY+height>y&&y>childY) return i;
                    break;
                }
            }
        }
        return targetIndex;
    }
    //替换方块位置
    transitionPosition=(index:number,target:number)=>{
        let {initData}=this;
        let value=initData[index],
            targetValue=initData[target];
        initData.splice(index,1,targetValue);
        initData.splice(target,1,value);
        this.setState({
            dragIndex:target,
            dragData:initData
        });
    }
    //拖拽事件
    onDrag=()=>{

    }
    render(){
        const {isDrag,moveX,moveY}=this.state;
        const {mouseX,mouseY}=this.mousePosition;
        const {children}=this.props;
        const {childs,holder}=this.moving(children);
        return(
            <div className="drag-body">
                <div className="drag-childs" ref={ref=>this.dragChilds=ref}>
                    {childs}
                </div>
                <div className="drag-item-cover"
                    onMouseMove={this.onMouseMove}
                    onMouseUp={this.onMouseUp}
                    style={{display:isDrag?'block':'none'}} >
                    <div className="drag-item-holder" style={{left:mouseX-moveX,top:mouseY-moveY}}>{holder}</div>
                </div>
            </div>
        );
    }
}
class Basic extends React.Component<BasicProps,BasicStates>{
    constructor(props:BasicProps){
        super(props);
    }
    render(){
        const {children,move}=this.props;
        const statuClass=move?'drag-item-move':'';
        return(
            <div className={`drag-item${statuClass}`}>
                {children}
            </div>
        );
    }
}
const Drag:React.ComponentClass<BasicProps>&{
    DragItem:React.ComponentClass<BasicProps>
}=generator({})(BasicComponent);
Drag.DragItem=Basic;

export default Drag;