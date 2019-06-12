/* eslint-disable no-param-reassign,no-plusplus,no-undef,no-underscore-dangle */
import { message, Form, Input, Cascader, Button } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import {url} from '../../services/api';
import Ares from '../../models/area';
import React, { Component } from 'react';


// 布局
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 15 } },
};

@Form.create()
export default class BecomeAgent extends Component{
  constructor(...args) {
    super(...args);
    this.state = {
      area: [],
    };
  }

  componentDidMount() {

  }

  //效验密码
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('与上述密码不一致!');
    } else {
      callback();
    }
  };
  //效验密码
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confPwd'], { force: true });
    }
    callback();
  };
  //效验密码
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator, validateFieldsAndScroll } = this.props.form;

    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        values.type = 2;
        values.area = values.area.join('/');
        console.log(values);
        if (!error) {
          fetch(`${url}/merchant`,{
            method:'POST',
            body:JSON.stringify(values)
          }).then(res=>{
            if(res.ok){
              res.json().then(info=>{
                console.log(info);
                if(info.status){
                  message.success('注册成功');
                  setTimeout(()=>{
                    window.location.reload();
                  },1000);
                }else{
                  switch (info.code) {
                    case 30002: message.error('邀请码错误'); break;
                    case 30001: message.error('该号码代理商已存在'); break;
                    case 40000: message.error('该号码不是用户，请先注册成为用户'); break;
                    case 40001: message.error('该号码已绑定代理商，请先解绑代理商'); break;
                    default: message.error('未知错误');
                  }
                }
              });
            }else{
              message.error('注册失败');
            }
          });
        }
      });
    };

    return (
        <div style={{width:'40%',margin:'0 auto'}}>
          <h2 style={{textAlign:'center',color:'#FF8800'}}>成为代理</h2>
          <Form>
            <Form.Item label='代理名' {...formItemLayout}>
              {getFieldDecorator('agent_name',{
                rules: [
                  { required: true, message: '代理名必须输入' },
                ],
              })(
                <Input placeholder={'请输入代理名'} />
              )}
            </Form.Item>

            <Form.Item label='手机号' {...formItemLayout}>
              {getFieldDecorator('username',{
                rules: [
                  { required: true, message: '联系人手机号必须输入' },
                  { pattern: /^1\d{10}$/, message: '手机号格式错误！' },
                ],
              })(
                <Input maxLength={11} placeholder={'与用户注册电话一致'} />
              )}
            </Form.Item>

            <Form.Item label='所在地区' {...formItemLayout}>
              {getFieldDecorator('area',{
                rules: [
                  { required: true, message: '所在地区必须输入' },
                ],
              })(
                <Cascader
                  options={Ares}
                  changeOnSelect
                  placeholder="请选择"
                  onChange={value => this.setState({ area: value })}
                />
              )}
            </Form.Item>

            <Form.Item label='详细地址' {...formItemLayout}>
              {getFieldDecorator('address',{
                rules: [
                  { required: true, message: '详细地址必须输入' },
                ],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label='初始密码' {...formItemLayout}>
              {getFieldDecorator('password',{
                rules: [
                  { required: true, message: '初始密码必须输入' },
                  { validator: this.validateToNextPassword, },
                ],
              })(
                <Input type='password' />
              )}
            </Form.Item>

            <Form.Item label='确认密码' {...formItemLayout}>
              {getFieldDecorator('confPwd',{
                rules: [
                  { required: true, message: '确认密码必须输入' },
                  { validator: this.compareToFirstPassword, },
                ],
              })(
                <Input type='password' onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>

            <Form.Item label='邀请码' {...formItemLayout}>
              {getFieldDecorator('invite_code',{
                rules: [
                  { required: true, message: '邀请码必须输入' },
                ],
              })(
                <Input />
              )}
            </Form.Item>

          </Form>
          <div style={{display:'flex', justifyContent:'flex-end', marginRight:'16.5%'}}>
            <Button htmlType='button' type='primary' onClick={validate} >
              提交资料
            </Button>
          </div>
        </div>
    );
  }
}
