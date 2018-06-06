import React from 'react';
import Table from '../../components/Table';
import { API } from '../../const';


const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  // render: text => <Link to={`/crawler/task/${text}`}>{text}</Link>,
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: '电话',
  dataIndex: 'phone',
  key: 'phone',
  render: (text, record) => (record.phone1 ? `${record.phone1} - ${record.phone2}` : record.phone2),
}];


export default class extends React.Component {
  render() {
    return (
      <div>
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">医院网点</h3>
          </div>
          <div className="panel-body">
            <Table
              autoLoad
              filterFunc={res => ({
                results: {
                  data: JSON.parse(res.data).map(item => ({ key: item.Key, ...item.Record })),
                },
              })}
              refreshable
              rowKey="key"
              url={API.Query('Hospital')}
              size="small"
              columns={columns}
            />
          </div>
        </div>
      </div>
    );
  }
}
