import React from 'react';
import Table from '../../components/Table';
import { API } from '../../const';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  // render: text => <Link to={`/crawler/task/${text}`}>{text}</Link>,
}, {
  title: '性别',
  dataIndex: 'gender',
  key: 'gender',
  render: text => `${text === '0' ? '女' : '男'}`,
}, {
  title: '职称',
  dataIndex: 'title',
  key: 'title',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '电话',
  dataIndex: 'phone',
  key: 'phone',
}];


export default class extends React.Component {
  render() {
    return (
      <div>
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">医师列表</h3>
          </div>
          <div className="panel-body">
            <Table autoLoad filterFunc={res => ({ results: { data: JSON.parse(res.data).map(item => ({ key: item.Key, ...item.Record })) } })} refreshable rowKey="key" url={API.Query('Doctor')} size="small" columns={columns} />
          </div>
        </div>
      </div>
    );
  }
}
