require('./login.less');
import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import * as PropTypes from 'prop-types';
import {Button,Input,Icon,Alert} from 'antd';
import actions from './action';
import {withRouter} from 'react-router-dom';

//state 定义
interface LoginInfo {
    userName:string,
    password:string,
    pwdType:string,
    iconLoading:boolean,
    success:boolean,
    message:string,
    init:number
}

//ts connect 修饰器用法
@(connect((state:any)=>{
    return{
        UserInfo:state.login
    }
},dispatch=>bindActionCreators(actions,dispatch)) as any)
class Login extends React.Component<any,LoginInfo> {

    constructor(props:any){
        super(props);
        this.state={
            userName:"",
            password:"",
            pwdType:"password",
            iconLoading:false,
            success:false,
            message:"",
            init:0
        }
    }
    //文本框输入
    handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        const _strObj:any=e.target;
        if(_strObj.id==='userName'){
            this.setState({
                userName:_strObj.value
            })
        }else{
            this.setState({
                password:_strObj.value
            })
        }
    }
    //登录
    handleClick=(e:React.MouseEvent<HTMLButtonElement>|React.KeyboardEvent):void=>{
        e.stopPropagation();
        this.setState({
            iconLoading:true
        })
        const {login,history} =this.props;
        let body={
            user:this.state.userName,
            pwd:this.state.password
        }
        if(!body.user||!body.pwd){
            this.setState({
                success:false,
                iconLoading:false,
                message:'账号、密码不能为空',
                init:1
            })
            return;
        }
        login(body).then((data:any)=>{
            debugger;
            let {success,message}=data;
            this.setState({
                success:success,
                message:message,
                iconLoading:false,
                init:1
            })
            if(success){
                setTimeout(function(){
                    history.push('/index');
                },300)
            }
        });
        
    }
    //显示密码
    handleShowPwd=()=>{
        let tp=this.state.pwdType;
        tp=tp ==='password'?'text':'password';
        this.setState({
            pwdType:tp
        })
    }
    //回车登录
    handleKeyDown=(e:React.KeyboardEvent)=>{
        e.stopPropagation();
        if(e.keyCode==13){
            this.handleClick(e);
        }
    }
    render():JSX.Element {
        return (
        <div className="login-body" onKeyDown={this.handleKeyDown}>
            <div className="login-main-bg"  ></div>
            <div className="login-main">
                <ul>
                    <li>
                    <h3>
                        欢迎来到~
                        <p>Sxyhome!</p>
                    </h3>
                    </li>
                    <li>
                        <div className="logo-coffee" >
                            <Icon type="coffee"></Icon>
                        </div>
                    </li>
                    <li>
                        <div style={{height:30}}>
                            {this.state.message?<Alert message={this.state.message} type={this.state.success?"success":"error"} showIcon />:""}
                        </div>
                    </li>
                    <li>
                        <Input placeholder="Enter your userName" id="userName" value={this.state.userName} onChange={this.handleChange} prefix={<Icon type="user" />} />
                    </li>
                    <li>
                        <Input placeholder="Enter your password" id="password" value={this.state.password} onChange={this.handleChange} type={this.state.pwdType} prefix={<Icon type="lock" />} suffix={<Icon type="eye" onClick={this.handleShowPwd} style={{cursor:'pointer'}} title="显示密码" />} />
                    </li>
                        <li>
                            <Button type="primary" icon="poweroff" onClick={this.handleClick} loading={this.state.iconLoading} >登录</Button>
                        <div>
                            <a className="right">忘记密码?</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        );
    }
}

export default withRouter(Login);