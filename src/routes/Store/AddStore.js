/* eslint-disable no-param-reassign,no-plusplus,no-undef,no-underscore-dangle */
import React, { PureComponent } from 'react';
import { message, Form, Input, Cascader, Button } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import {url} from '../../services/api';
import Ares from '../../models/area';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const auth = sessionStorage.getItem('auth')
  ? JSON.parse(sessionStorage.getItem('auth'))
  : '';

// 布局
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 8 } },
};

class goodsOrder extends PureComponent{
  constructor(...args) {
    super(...args);
    this.state = {
      area: [],
    };
  }

  componentDidMount() {
    console.log(auth);
  }

  render() {
    const { getFieldDecorator, validateFieldsAndScroll } = this.props.form;

    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        values.type = 1;
        values.area = values.area.join('/');
        if (!error) {
          fetch(`${url}/merchant`,{
            method:'POST',
            body:JSON.stringify(values)
          }).then(res=>{
            if(res.ok){
              res.json().then(info=>{
                if(info.status){
                  message.success('添加成功');
                  setTimeout(()=>{
                    window.location.reload();
                  },1000);
                }else{
                  message.error('手机号已存在');
                }
              });
            }else{
              message.error('添加失败');
            }
          });
        }
      });
    };

    return (
      <PageHeaderLayout title="添加商家">
        <div style={styles.content}>
          <Form>
            <Form.Item label='店名' {...formItemLayout}>
              {getFieldDecorator('shop_name',{
                rules: [
                  { required: true, message: '店名必须输入' },
                ],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label='手机号' {...formItemLayout}>
              {getFieldDecorator('username',{
                rules: [
                  { required: true, message: '联系人手机号必须输入' },
                  { pattern: /^1\d{10}$/, message: '手机号格式错误！' },
                ],
              })(
                <Input maxLength={11} />
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
                initialValue:12345678
              })(
                <Input disabled />
              )}
            </Form.Item>
          </Form>
          <div style={{display:'flex', justifyContent:'flex-end'}}>
            <Button htmlType='button' type='primary' onClick={validate} >
              提交资料
            </Button>
          </div>
        </div>
      </PageHeaderLayout>
    );
  }


}

const styles = {
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: 15,
  },

};

export default (Form.create())(goodsOrder);
