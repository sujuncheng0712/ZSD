/* eslint-disable no-param-reassign,no-plusplus,no-undef,no-underscore-dangle */
import React, { PureComponent } from 'react';
import { Form } from 'antd';
import 'ant-design-pro/dist/ant-design-pro.css';
import {url} from '../../services/api';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const auth = sessionStorage.getItem('auth')
  ? JSON.parse(sessionStorage.getItem('auth'))
  : '';

class goodsOrder extends PureComponent{
  constructor(...args) {
    super(...args);
    this.state = {

    };
  }

  componentDidMount() {
    console.log(auth);
  }

  render() {
    return (
      <PageHeaderLayout title="商品订单">
        <div style={styles.content}>
          12
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

export default goodsOrder;
