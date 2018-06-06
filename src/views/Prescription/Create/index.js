import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input, Table, message } from 'antd';
import Select from '../../../components/Select';
import { API } from '../../../const';
import bFetch from '../../../bfetch';
import store from './store';

const FormItem = Form.Item;

class QueryForm extends React.Component {
  onChange = async (key) => {
    const res = await bFetch(API.Find(key));
    console.log('res', res);
    const data = JSON.parse(res.data);
    const { price } = data;
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ price });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
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
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="选择药品"
        >
          {getFieldDecorator('key', {
            rules: [{
              required: true, message: 'Please input your E-mail!',
            }],
          })(<Select
            url={API.Query('MedicalItem')}
            onChange={this.onChange}
            onSuccess={res => JSON.parse(res.data).map(item => ({
              key: item.Key, ...item.Record, value: item.Key, label: item.Record.title,
            }))}
          />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="单价"
        >
          {getFieldDecorator('price', {
            rules: [{
              // required: true, message: 'Please input your E-mail!',
            }],
          })(<Input disabled />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="数量"
        >
          {getFieldDecorator('count', {
            rules: [{
              // required: true, message: 'Please input your E-mail!',
            }],
          })(<Input />)}
        </FormItem>
      </Form>
    );
  }
}

const WrapperQueryForm = Form.create()(QueryForm);

@observer
class MedicalTable extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    onChange: () => {},
  };
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '药品名',
        dataIndex: 'title',
        key: 'title',
        // render: (text, record) => <CellName onChange={this.onChange} value={record.key} />,
      },
      {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
      },
    ];
  }
  onChange = async (item) => {
    const res = await bFetch(API.Find(item.key));
    const data = JSON.parse(res.data);
    const { key, price, count } = item;
    const { title } = data;
    this.props.onChange([].concat(this.props.value).concat({
      key, price, count, title,
    }));
  };
  onAdd = () => {
    store.modalVisible = true;
  };
  onCancel = () => { store.modalVisible = false; };
  onCreate = () => {
    this.formRef.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.onChange(values);
        store.modalVisible = false;
      }
    });
  };
  getSpending() {
    const { value } = this.props;
    let spending = 0;
    value.forEach((item) => {
      const { price, count } = item;
      spending += Number(price) * Number(count);
    });
    return Number.prototype.toFixed.call(spending, 2);
  }
  render() {
    const { value } = this.props;
    return (
      <div>
        <Table
          footer={() => (<div>总计: ¥{this.getSpending()}</div>)}
          rowKey="key"
          dataSource={value}
          columns={this.columns}
          pagination={false}
        />
        <Button type="button" size="small" onClick={this.onAdd}>添加</Button>
        <Modal
          onCancel={this.onCancel}
          onOk={this.onCreate}
          title="选择药品"
          visible={store.modalVisible}
        >
          <WrapperQueryForm ref={(ref) => { this.formRef = ref; }} onChange={this.onChange} />
        </Modal>
      </div>
    );
  }
}

@observer
class CreateForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSubmit(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem
          {...formItemLayout}
          label="主诉"
        >
          {getFieldDecorator('complained', {
            rules: [{
              required: true, message: 'Please input your E-mail!',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="诊断"
        >
          {getFieldDecorator('diagnose', {
            rules: [{
              required: true, message: 'Please input your E-mail!',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="病史"
        >
          {getFieldDecorator('history', {
            rules: [{
              required: true, message: 'Please input your E-mail!',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="家族史"
        >
          {getFieldDecorator('familyHistory', {
            rules: [{
              required: true, message: 'Please input your E-mail!',
            }],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="药品列表"
        >
          {getFieldDecorator('items', {
            initialValue: [],
          })(<MedicalTable />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button loading={store.loading} type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrapperCreateForm = Form.create()(CreateForm);

@observer
export default class extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  onSubmit = async (data) => {
    const { registerHistoryKey, userKey } = this.context.router.route.match.params;
    const body = {
      userKey,
      registerHistoryKey,
      state: 'PendingPayment',
      ...data,
      items: data.items.map(item => ({ medicalItemKey: item.key, count: item.count })),
    };
    console.log('body', body);
    store.loading = true;
    try {
      await bFetch(API.PrescriptionCreate, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      message.success('开处方成功');
      this.context.router.history.push('/registerHistory/list');
    } catch (err) {
      message.error(`开处方失败:${err}`);
    }
    store.loading = false;
  };
  render() {
    return (
      <div>
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">开处方</h3>
          </div>
          <div className="panel-body">
            <WrapperCreateForm onSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}
