import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Button, Input, message } from 'antd';
import moment from 'moment';
import Select from '../../components/Select';
import bFetch from '../../bfetch';
// import Button from '../../components/Button';
import { API } from '../../const';
import store from './store';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class ModalForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {
          doctorKey, hospitalKey, visitDate, visitTime,
        } = values;
        const { selectedDate } = store;
        const ts = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), visitTime === 'am' ? 8 : 14, 0, 0).getTime();
        store.submiting = true;
        try {
          await bFetch(API.Arrangement.Create, {
            method: 'POST',
            body: JSON.stringify({
              doctorKey,
              hospitalKey,
              visitUnix: Math.floor(ts / 1000),
            }),
          });
          message.success('创建排班成功');
          this.props.onSuccess();
        } catch (err1) {
          message.error(err1.toString());
        }
        store.submiting = false;
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem {...formItemLayout} label="出诊日期">
          {
            getFieldDecorator('visitDate', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
              initialValue: moment(store.selectedDate).format('YYYY-MM-DD'),
            })(<Input type="text" disabled />)
            }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="出诊时间"
        >
          {
            getFieldDecorator('visitTime', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
            })(<Select
              placeholder="请选择出诊时间"
            >
              <Select.Option value="am">上午</Select.Option>
              <Select.Option value="pm">下午</Select.Option>
            </Select>)
            }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="选择医师"
        >
          {
            getFieldDecorator('doctorKey', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
            })(<Select
              url={API.Query('Doctor')}
              placeholder="请选择医师"
              onSuccess={res => JSON.parse(res.data).map(item => ({
                  label: item.Record.name,
                  value: item.Key,
                }))}
            />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="选择医院"
        >
          {
            getFieldDecorator('hospitalKey', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
            })(<Select
              url={API.Query('Hospital')}
              placeholder="请选择医院"
              onSuccess={res => JSON.parse(res.data).map(item => ({
                  label: item.Record.name,
                  value: item.Key,
                }))}
            />)
          }
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={store.submiting}>
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const MForm = Form.create()(ModalForm);

@observer
export default class extends React.Component {
  handleOk = () => {};
  handleCancel = () => {
    store.createModalVisible = false;
  };
  render() {
    return (
      <Modal
        title="Basic Modal"
        visible={store.createModalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={null}
      >
        <MForm onSuccess={this.props.onSuccess} />
      </Modal>
    );
  }
}
