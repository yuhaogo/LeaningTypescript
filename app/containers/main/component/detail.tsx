import './detail.less';
import * as React from 'react';
import {Icon,Input,Button,Spin} from 'antd';
import BraftEditor from 'braft-editor';
import * as ReactMarkdown from 'react-markdown';
import action from './action';
const {getDiamondContents,saveDiamondContents,saveDaimondTitle}=action;
interface stateType{
    isEdit:boolean,             //是否编辑状态
    contents:string,            //内容
    contentsTitle:string,       //内容标题
    editorState:any,            //富文本初始内容
    spinning:boolean,           //保存中
    isEditTitle:boolean,        //是否编辑方块标题
    diamondTitle:string         //方块标题
}
class Detail extends React.Component<any,stateType>{
    constructor(props:any){
        super(props);
        this.state={
            isEdit:false,
            contentsTitle:'',
            contents:'',
            editorState: BraftEditor.createEditorState('<p></p>'),
            spinning:false,
            isEditTitle:false,
            diamondTitle:''
        };
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
                const {data}=res;
                this.setState({
                    contentsTitle:data.title,
                    contents:data.contents,
                    editorState: BraftEditor.createEditorState(data.contents)
                });
            });
        }
    }
    //开启编辑
    onEdit=(e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        const {isEdit}=this.state;
        this.setState({
            isEdit:!isEdit
        });
    }
    //返回上级
    onBack=()=>{
        const {onBackClick}=this.props;
        this.setState({
            isEdit:false
        });
        onBackClick();
    }
    //保存编辑内容
    onSaveEditContents=()=>{
        this.setState({
            spinning:true
        });
        const {contentId}=this.props;
        const {contents,contentsTitle}=this.state;
        saveDiamondContents({
            id:contentId,
            title:contentsTitle,
            contents:contents
        }).then(res=>{
            const {success}=res;
            if(success){
                this.setState({
                    isEdit:false
                });
            }
            this.setState({
                spinning:false
            });
        });
    }
    //获取富文本编辑器内容
    handleChange = (editorState:any) => {
        this.setState({
            editorState:editorState,
            contents: editorState.toHTML()
        });
    }
    //内容标题输入
    inputChange=(e:any)=>{
        const {value}=e.target;
        this.setState({
            contentsTitle:value
        });
    }
    //打开设置方块标题
    setDiamondTitle=()=>{
        this.setState({
            isEditTitle:true
        });
    }
    //保存方块标题
    saveDiamondTitle=(e:any)=>{
        const {value}=e.target;
        const {id}=this.props;
        this.setState({
            isEditTitle:false,
            diamondTitle:value
        });
        saveDaimondTitle({
            id:id,
            name:value
        });
    }
    render():JSX.Element{
        const {isEdit,spinning,contentsTitle,editorState,contents,isEditTitle,diamondTitle}=this.state;
        const {name,type}=this.props;
        let _diamondTitle=diamondTitle?diamondTitle:name;
        return(<div className="diamond-detail">
            <div className="top-bar">
                <div className="diamond-title">
                    {!isEditTitle?
                        <p onClick={this.setDiamondTitle}>{_diamondTitle}</p>:
                        <>
                            <Input defaultValue={_diamondTitle} onBlur={this.saveDiamondTitle}/>
                        </>
                    }
                </div>
                <Icon type="edit" onClick={this.onEdit} className={isEdit?'active':''}/>
                <Icon type="right" onClick={this.onBack} />
            </div>
            <div className="detail-content">
                <Spin
                    spinning={spinning}
                    tip="保存中...">
                    {isEdit?
                        
                        <>
                            <div className="content-title">
                                <h3><Icon type="flag" />副标题</h3>
                                <Input placeholder="副标题不超过255字符" value={contentsTitle} maxLength={255} style={{width:'70%'}} onChange={this.inputChange}/>
                            </div>
                            <div className="editor-body">
                                <h3><Icon type="profile" />内容</h3>
                                {type==1?
                                    <BraftEditor value={editorState} onChange={this.handleChange} style={{border:'1px solid rgba(0, 0, 0, 0.2)'}}/>:
                                    <ReactMarkdown />}
                            </div>
                            <div className="detail-btns">
                                <Button type="primary" onClick={this.onSaveEditContents}>保存</Button>
                            </div>
                        </>:
                        <div className="detail-html">
                            <h3>{contentsTitle}</h3>
                            <div dangerouslySetInnerHTML={{__html:contents}}></div>
                        </div>
                    }
                </Spin>
            </div>
        </div>);
    }
}
export default Detail;