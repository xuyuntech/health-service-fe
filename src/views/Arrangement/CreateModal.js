import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Button } from 'antd';
import Select from '../../components/Select';
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
  onHospitalChange = () => {};
  onDoctorChange = (v) => {};
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem
          {...formItemLayout}
          label="选择医师"
        >
          {
            getFieldDecorator('doctor', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
            })(<Select
              url={API.Query('Doctor')}
              placeholder="请选择医师"
              onChange={this.onDoctorChange}
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
            getFieldDecorator('hospital', {
              rules: [{
                required: true, message: 'Please input your E-mail!',
              }],
            })(<Select
              url={API.Query('Hospital')}
              placeholder="请选择医院"
              onChange={this.onHospitalChange}
              onSuccess={res => JSON.parse(res.data).map(item => ({
                  label: item.Record.name,
                  value: item.Key,
                }))}
            />)
          }
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" >
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
      >
        <MForm />
      </Modal>
    );
  }
}
