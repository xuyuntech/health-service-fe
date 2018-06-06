import React from 'react';
import { message, Modal } from 'antd';
import moment from 'moment';
import Table from '../../components/Table';
import { API, OrderState } from '../../const';
import bFetch from '../../bfetch';

const { confirm } = Modal;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '订单编号',
      dataIndex: 'number',
      key: 'number',
      // render: text => <Link to={`/crawler/task/${text}`}>{text}</Link>,
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: text => OrderState[text],
    // }, {
    //   title: '明细',
    //   dataIndex: 'detail',
    //   key: 'detail',
    //   render: async (text, record) => {
    //     const items = JSON.parse(record.items);
    //     const data = await Promise.all(items.map(async (item) => {
    //       const { medicalItemKey, count } = item;
    //       const res = await bFetch(API.Find(medicalItemKey));
    //       const medicalItem = JSON.parse(res.data);
    //       const { title, price } = medicalItem;
    //       return {
    //         title,
    //         count,
    //         price,
    //       };
    //     }));
    //     return data.map(item => <div>药品：{item.title}, 数量: {item.count}, 价格: {item.price}</div>);
    //   },
    }, {
      title: '金额',
      dataIndex: 'spending',
      key: 'spending',
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      render: text => moment(new Date(Number(text) * 1000)).format('YYYY-MM-DD HH:mm:ss'),
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => (record.state === 'NotPaid' ? (
        <span>
          <a
            href="javascript:void(0)"
            onClick={() => {
              confirm({
                title: '确认支付吗?',
                onOk: async () => {
                  await this.pay(record);
                },
              });
            }}
          >支付
          </a>
        </span>
      ) : '已支付'),
    }];
  }
  pay = async (data) => {
    const { key, prescriptionKey } = data;
    const res = await bFetch(API.Find(prescriptionKey));
    const prescription = JSON.parse(res.data);
    const { registerHistoryKey, userKey } = prescription;
    await bFetch(API.OrderPay, {
      method: 'POST',
      body: JSON.stringify({
        userKey,
        registerHistoryKey,
        orderKey: key,
        state: 'Paid',
      }),
    });
    message.success('订单支付成功');
    this.tableRef.reload();
  };
  render() {
    return (
      <div>
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">订单列表</h3>
          </div>
          <div className="panel-body">
            <Table
              ref={(ref) => { this.tableRef = ref; }}
              autoLoad
              filterFunc={res => ({
                results: {
                  data: JSON.parse(res.data).map(item => ({ key: item.Key, ...item.Record })),
                },
              })}
              refreshable
              rowKey="key"
              url={API.Query('Order')}
              size="small"
              columns={this.columns}
            />
          </div>
        </div>
      </div>
    );
  }
}
