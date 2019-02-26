import * as React from 'react';
import { Form,Input} from 'antd';
const {Item:FormItem}=Form;

class AddDiamondForm extends React.Component<any,any>{
    render():JSX.Element{
        const {getFieldDecorator}=this.props.form;
        return(
            <Form>
                <FormItem
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        );
    }
}

const form=Form.create({name: 'AddDiamondForm'})(AddDiamondForm);
export default form;