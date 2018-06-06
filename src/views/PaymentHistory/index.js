import React from 'react';
import moment from 'moment';
import Table from '../../components/Table';
import { API } from '../../const';
import bFetch from '../../bfetch';

const columns = [{
  title: '编号',
  dataIndex: 'number',
  key: 'number',
  // render: text => <Link to={`/crawler/task/${text}`}>{text}</Link>,
}, {
  title: '用户',
  dataIndex: 'userName',
  key: 'userName',
}, {
  title: '医院',
  dataIndex: 'hospitalName',
  key: 'hospitalName',
}, {
  title: '金额',
  dataIndex: 'spending',
  key: 'spending',
}, {
  title: '创建时间',
  dataIndex: 'created',
  key: 'created',
  render: text => (text ? moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : ''),
}];

export default class extends React.Component {
  filterFunc = async (res) => {
    const list = JSON.parse(res.data).map(item => ({ key: item.Key, ...item.Record }));
    const data = await Promise.all(list.map(async (item) => {
      const { registerHistoryKey } = item;
      const res1 = await bFetch(API.Find(registerHistoryKey));
      const registerHistory = JSON.parse(res1.data);
      const { arrangementKey } = registerHistory;
      const res2 = await bFetch(API.Find(arrangementKey));
      const arrangement = JSON.parse(res2.data);
      const { hospitalKey } = arrangement;
      const res3 = await bFetch(API.Find(hospitalKey));
      const hospital = JSON.parse(res3.data);
      return {
        ...item,
        hospitalName: hospital.name,
        hospitalKey: hospital.key,
      };
    }));
    return {
      results: {
        data,
      },
    };
  };
  render() {
    return (
      <div>
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">支付记录</h3>
          </div>
          <div className="panel-body">
            <Table
              autoLoad
              filterFunc={this.filterFunc}
              refreshable
              rowKey="key"
              url={API.Query('PaymentHistory')}
              size="small"
              columns={columns}
            />
          </div>
        </div>
      </div>
    );
  }
}
