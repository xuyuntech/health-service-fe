import React from 'react';
import moment from 'moment';
import Table from '../../components/Table';
import { API } from '../../const';

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
  title: '医院',
  dataIndex: 'hospitalName',
  key: 'hospitalName',
}, {
  title: '创建时间',
  dataIndex: 'created',
  key: 'created',
  render: text => (text ? moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : ''),
}];


export default class extends React.Component {
  render() {
    return (
      <div>
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">病例列表</h3>
          </div>
          <div className="panel-body">
            <Table autoLoad filterFunc={res => ({ results: { data: JSON.parse(res.data).map(item => ({ key: item.Key, ...item.Record })) } })} refreshable rowKey="key" url={API.Query('Case')} size="small" columns={columns} />
          </div>
        </div>
      </div>
    );
  }
}
