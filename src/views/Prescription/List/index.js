import React from 'react';
import moment from 'moment';
import Table from '../../../components/Table';
import { API } from '../../../const';
import bFetch from '../../../bfetch';

const columns = [{
  title: '编号',
  dataIndex: 'sid',
  key: 'sid',
  // render: text => <Link to={`/crawler/task/${text}`}>{text}</Link>,
}, {
  title: '用户',
  dataIndex: 'userName',
  key: 'userName',
}, {
  title: '主诉',
  dataIndex: 'complained',
  key: 'complained',
}, {
  title: '诊断',
  dataIndex: 'diagnose',
  key: 'diagnose',
}, {
  title: '医师',
  dataIndex: 'doctorName',
  key: 'doctorName',
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
      const { caseKey } = item;
      const res1 = await bFetch(API.Find(caseKey));
      const caseEntity = JSON.parse(res1.data);
      const { complained, diagnose } = caseEntity;
      return {
        ...item,
        complained,
        diagnose,
      };
    }));
    return { results: { data } };
  };
  render() {
    return (
      <div>
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">处方列表</h3>
          </div>
          <div className="panel-body">
            <Table autoLoad filterFunc={this.filterFunc} refreshable rowKey="key" url={API.Query('Prescription')} size="small" columns={columns} />
          </div>
        </div>
      </div>
    );
  }
}
