
import './scroll.less';
import * as React from 'react';
import { truncateSync } from 'fs';
const {Component}=React;

class Scroll extends Component<any,any>{
    private scrollBox:any;
    private scrollContent:any;
    private mouseY:number;
    private scrollMain:any;
    constructor(props:any){
        super(props);
        this.state={
            sliderHeight:0,
            sliderTop:0,
            step:0,
            isTouch:false
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            const step=this.scrollBox.clientHeight/this.scrollContent.clientHeight;
            this.setState({
                sliderHeight:step>1?0:Math.floor(step*100),
                step:step
            })
        },0)
    }
    handleScroll=(e:any)=>{
        const {step}=this.state;
        const scrollTop=e.target.scrollTop;
        this.setState({
            sliderTop:scrollTop*step
        })

    }
    handleMouseDown=(e:any)=>{
       this.mouseY=e.pageY;
       console.log(this.mouseY);
       this.setState({
           isTouch:true
       })
    }
    handleMouseMove=(e:any)=>{
        if(this.state.isTouch){
            const moveY=this.mouseY-e.pageY;
            const scrollTop=this.state.sliderTop-moveY;
            this.mouseY=e.pageY;
            console.log(scrollTop);
            debugger;
            this.scrollMain.scrollTop=scrollTop*(1/this.state.step);
        }
    }
    handleMouseUp=()=>{
        this.setState({
            isTouch:false
        })
    }
    render():JSX.Element{
        const {children}=this.props;
        const {sliderHeight,sliderTop}=this.state;
        const shadeClassName=this.state.isTouch?'move':'';
        return(
            <div className="scroll-box" ref={ref=>this.scrollBox=ref} onScroll={this.handleScroll}>
                <div className="scroll-main" ref={ref=>this.scrollMain=ref}>
                    <div className="scroll-content" ref={ref=>this.scrollContent=ref}>
                        {children}
                    </div>
                    <div className="scroll-bar" onMouseDown={this.handleMouseDown}>
                        <div className="scroll-slider" style={{height:`${sliderHeight}%`,top:sliderTop}}></div>
                    </div>
                </div>
                <div className={`scroll-shade ${shadeClassName}`} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
            </div>
        )
    }
}
export default Scroll;