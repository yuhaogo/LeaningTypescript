import * as React from 'react';
import { Form,Input,Select,Checkbox,Modal} from 'antd';
const {Item:FormItem}=Form;
const {Option}=Select;

import actions from '../action';
const {diamondAdd}=actions;
class AddDiamondForm extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state={
            isPassword:false
        };
    }
    //是否加密
    changeLock=(e:any)=>{
        const {checked}=e.target;
        this.setState({
            isPassword:checked
        });
    }
    //新增小方块保存
    onAddSave=()=>{
        const {validateFields}=this.props.form;
        const {onCallBack,values:defaultValues}=this.props;
        let values:Object&{lock?:number,id?:string};
        validateFields((err:any,value:any)=>{
            if(err) return;
            values=value;
            values.lock=values.lock?1:0;
            values.id=defaultValues.nowBoxId;
            diamondAdd(values).then((data: any)=>{
                const {success}=data;
                if(success){
                    onCallBack();
                }
            });
        });
    }
    render():JSX.Element{
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const {getFieldDecorator}=this.props.form;
        let {values,visible,title,onCancel}=this.props;
        const {isPassword}=this.state;
        return(
            <Modal 
                title={title}
                visible={visible}
                onOk={this.onAddSave}
                destroyOnClose={true}
                onCancel={onCancel}
            >
                <Form {...formItemLayout}>
                    <FormItem
                        label="名称"
                    >
                        {getFieldDecorator('name', {
                            initialValue:values.name,
                            rules: [{
                                type: 'string', message: '方块名称',
                            }, {
                                required: true, message: '请输入方块名称',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="类型"
                    >
                        {getFieldDecorator('type', {
                            initialValue:values.type,
                            rules: [{
                                type: 'string', message: '方块类型',
                            }, {
                                required: true, message: '请选择方块类型',
                            }],
                        })(
                            <Select>
                                <Option value="1">文本</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="是否加密"
                    >
                        {getFieldDecorator('lock', {
                            initialValue:values.type?true:false,
                            rules: [{
                                type: 'boolean', message: '验证不通过',
                            }],
                        })(
                            <Checkbox defaultChecked={false} onChange={this.changeLock}/>
                        )}
                    </FormItem>
                    {isPassword?<FormItem
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            initialValue:values.password,
                            rules: [{
                                type: 'string', message: '验证不通过',
                            },{
                                required: true, message: '请选择输入密码'
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>:null}
                </Form>
            </Modal>
        );
    }
}

const form=Form.create({name: 'AddDiamondForm'})(AddDiamondForm);
export default form;