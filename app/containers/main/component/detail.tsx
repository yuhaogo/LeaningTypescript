import './detail.less';
import * as React from 'react';
import {Icon,Input,Button} from 'antd';
import BraftEditor from 'braft-editor';
import action from './action';
const {getDiamondContents,saveDiamondContents}=action;
interface stateType{
    isEdit:boolean,  //是否编辑状态
    contents:string,
    contentsTitle:string,
    editorState:any
}
class Detail extends React.Component<any,stateType>{
    constructor(props:any){
        super(props);
        this.state={
            isEdit:false,
            contentsTitle:'',
            contents:'',
            editorState: BraftEditor.createEditorState('<p></p>')
        }
    }
    componentDidMount(){
        this.getContents();
    }
    //获取内容
    getContents=()=>{
        const {contentId}=this.props;
        if(contentId){
            getDiamondContents({
                id:contentId
            }).then(res=>{
                const {data,success,message}=res;
                this.setState({
                    contentsTitle:data.title,
                    contents:data.contents,
                    editorState: BraftEditor.createEditorState(data.contents)
                })
            })
        }
    }
    //开启编辑
    onEdit=(e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        const {isEdit}=this.state;
        this.setState({
            isEdit:!isEdit
        })
    }
    //返回上级
    onBack=()=>{
        const {onBackClick}=this.props;
        this.setState({
            isEdit:false
        })
        onBackClick();
    }
    //保存编辑内容
    onSaveEditContents=()=>{
        const {contentId}=this.props;
        const {contents,contentsTitle}=this.state;
        saveDiamondContents({
            id:contentId,
            title:contentsTitle,
            contents:contents
        })
    }
    //获取富文本编辑器内容
    handleChange = (editorState:any) => {
        this.setState({
            editorState:editorState,
            contents: editorState.toHTML()
        })
    }
    inputChange=(e:any)=>{
        const {value}=e.target;
        this.setState({
            contentsTitle:value
        })
    }
    render():JSX.Element{
        const {isEdit}=this.state;
        const {name}=this.props;
        return(<div className="diamond-detail">
                    <div className="top-bar">
                        <p>{name}</p>
                        <Icon type="edit" onClick={this.onEdit} className={isEdit?'active':''}/>
                        <Icon type="right" onClick={this.onBack} />
                    </div>
                    <div className="detail-content">
                        {isEdit?
                            <>
                            <div className="content-title">
                                <h3><Icon type="flag" />副标题</h3>
                                <Input placeholder="副标题不超过255字符" value={this.state.contentsTitle} maxLength={255} style={{width:'70%'}} onChange={this.inputChange}/>
                            </div>
                            <div className="editor-body">
                                <h3><Icon type="profile" />内容</h3>
                                <BraftEditor value={this.state.editorState} onChange={this.handleChange} style={{border:'1px solid rgba(0, 0, 0, 0.2)'}}/>
                            </div>
                            <div className="detail-btns">
                                <Button type="primary" onClick={this.onSaveEditContents}>保存</Button>
                            </div>
                            </>:
                            <div className="detail-html">
                                <h3>{this.state.contentsTitle}</h3>
                                <div dangerouslySetInnerHTML={{__html:this.state.contents}}></div>
                            </div>
                        }
                    </div>
                </div>)
    }
}
export default Detail;