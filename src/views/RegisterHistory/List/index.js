import React from 'react';
import { Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import { API, RegisterState } from '../../../const';
import bFetch from '../../../bfetch';
import store from './store';

const { confirm } = Modal;
const getEntity = (key, arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].key === key) {
      return arr[i];
    }
  }
  return {};
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '用户',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => record.user.name,
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => record.user.phone,
    }, {
      title: '医院',
      dataIndex: 'hospitalName',
      key: 'hospitalName',
      render: (text, record) => record.hospital.name,
    }, {
      title: '医师',
      dataIndex: 'doctorName',
      key: 'doctorName',
      render: (text, record) => record.doctor.name,
    }, {
      title: '就诊时间',
      dataIndex: 'visitTime',
      key: 'visitTime',
      render: (text, record) => `${record.arrangement.visitDate} ${record.arrangement.ampm === 'am' ? '上午' : '下午'}`,
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: text => `${RegisterState[text]}`,
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        switch (record.state) {
          case 'Register':
            return (
              <span>
                <a href="javascript:;" onClick={() => { this.finishRegister(record); }}>就诊</a>
              </span>
            );
          case 'Visiting':
            return (
              <span>
                <Link to={`/prescription/create/${record.user.key}/${record.key}`}>开处方</Link>
              </span>
            );
          case 'Finished':
            return '已开处方';
          default:
            return '';
        }
        // if (record.state !== 'Register') {
        //   return (
        //     <span>
        //       <Link to={`/prescription/create/${record.user.key}/${record.key}`}>开处方</Link>
        //     </span>
        //   );
        // }
        // return (
        //   <span>
        //     <a href="javascript:;" onClick={() => { this.finishRegister(record); }}>就诊</a>
        //   </span>
        // );
      },
    }];
  }
  async componentDidMount() {
    try {
      const res3 = await bFetch(API.Query('User'));
      const res0 = await bFetch(API.Query('ArrangementHistory'));
      const res1 = await bFetch(API.Query('Doctor'));
      const res2 = await bFetch(API.Query('Hospital'));
      store.users = JSON.parse(res3.data).map(item => ({ key: item.Key, ...item.Record }));
      store.arrangements = JSON.parse(res0.data).map(item => ({ key: item.Key, ...item.Record }));
      store.doctors = JSON.parse(res1.data).map(item => ({ key: item.Key, ...item.Record }));
      store.hospitals = JSON.parse(res2.data).map(item => ({ key: item.Key, ...item.Record }));
      this.tableRef.reload();
    } catch (err) {
      message.error(`获取数据错误:${err}`);
    }
  }
  finishRegister = (record) => {
    const { userKey, key } = record;
    confirm({
      title: '确认就诊信息',
      content: `确认 ${record.user.name} 就诊吗?`,
      onOk: async () => {
        try {
          await bFetch(API.RegisterHistory.Finish, {
            method: 'POST',
            body: JSON.stringify({
              userKey,
              registerHistoryKey: key,
              state: 'Visiting',
            }),
          });
          message.success('就诊成功');
          this.tableRef.reload();
        } catch (err) {
          message.error(`就诊错误: ${err}`);
        }
      },
      onCancel() {
      },
    });
  };
  render() {
    return (
      <div>
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">挂号记录</h3>
          </div>
          <div className="panel-body">
            <Table
              ref={(ref) => { this.tableRef = ref; }}
              refreshable
              rowKey="key"
              filterFunc={(res) => {
                const arr = JSON.parse(res.data);
                const data = arr.map((item) => {
                  const arrangement = getEntity(item.Record.arrangementKey, store.arrangements);

                  return {
                    key: item.Key,
                    ...item.Record,
                    arrangement,
                    user: getEntity(item.Record.userKey, store.users),
                    doctor: getEntity(arrangement.doctorKey, store.doctors),
                    hospital: getEntity(arrangement.hospitalKey, store.hospitals),
                  };
                });
                return {
                  results: {
                    data,
                  },
                };
              }}
              url={API.Query('RegisterHistory')}
              size="small"
              columns={this.columns}
            />
          </div>
        </div>
      </div>
    );
  }
}
