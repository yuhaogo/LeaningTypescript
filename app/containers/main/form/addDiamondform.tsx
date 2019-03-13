import * as React from 'react';
import { Form,Input,Select,Checkbox} from 'antd';
const {Item:FormItem}=Form;
const {Option}=Select;

class AddDiamondForm extends React.Component<any,any>{
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
        const {component}=this.props;
        component(this);
        return(
            <Form {...formItemLayout}>
                <FormItem
                    label="名称"
                >
                    {getFieldDecorator('name', {
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
                        rules: [{
                            type: 'boolean', message: '验证不通过',
                        }],
                    })(
                        <Checkbox defaultChecked={false} />
                    )}
                </FormItem>
            </Form>
        );
    }
}

const form=Form.create({name: 'AddDiamondForm'})(AddDiamondForm);
export default form;