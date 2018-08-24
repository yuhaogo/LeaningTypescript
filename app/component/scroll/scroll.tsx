
import './scroll.less';
import * as React from 'react';
const {Component}=React;

class Scroll extends Component<any,any>{
    private scrollBox:any;
    private scrollContent:any;
    constructor(props:any){
        super(props);
        this.state={
            sliderHeight:0,
            sliderTop:0
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            const contentHeight=this.scrollBox.clientHeight/this.scrollContent.clientHeight;
            this.setState({
                sliderHeight:contentHeight>1?0:Math.floor(contentHeight*100)
            })
        },0)
    }
    render():JSX.Element{
        const {children}=this.props;
        const {sliderHeight,sliderTop}=this.state;
        return(
            <div className="scroll-box" ref={ref=>this.scrollBox=ref}>
                <div className="scroll-content" ref={ref=>this.scrollContent=ref}>
                    {children}
                </div>
                <div className="scroll-bar">
                    <div className="scroll-slider" style={{height:`${sliderHeight}%`,top:sliderTop}}></div>
                </div>
            </div>
        )
    }
}
export default Scroll;