import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { message } from 'antd';
import { observer } from 'mobx-react';
import { API } from '../../const';
import bFetch from '../../bfetch';
import CreateModal from './CreateModal';
import store from './store';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

@observer
export default class extends React.Component {
  async componentDidMount() {
    try {
      const res1 = await bFetch(API.Query('Doctor'));
      store.doctors = JSON.parse(res1.data);
      const res2 = await bFetch(API.Query('Hospital'));
      store.hospitals = JSON.parse(res2.data);
      await this.refresh();
    } catch (err) {
      message.error(`获取医师医院数据失败:${err}`);
    }
  }
  onSelectSlot = (slotInfo) => {
    const { start } = slotInfo;
    store.selectedDate = start;
    store.createModalVisible = true;
  };
  refresh = async () => {
    try {
      const res = await bFetch(API.Query('ArrangementHistory'));
      const data = JSON.parse(res.data);
      console.log('data', data);
      store.arrangements = data.map(item => ({
        key: item.Key,
        ...item.Record,
      }));
    } catch (err) {
      message.error(`获取排班记录失败: ${err}`);
    }
  };
  render() {
    const { arrangements } = store;
    const events = arrangements.map((item, i) => {
      const t = new Date(item.visitUnix * 1000);
      const year = t.getFullYear();
      const month = t.getMonth();
      const date = t.getDate();
      const am = t.getHours() < 12 ? '上午' : '下午';
      const doctorName = store.getDoctor(item.doctorKey).name;
      const hospitalName = store.getHospital(item.hospitalKey).name;
      return {
        id: i,
        title: `${doctorName}:${am}:${hospitalName}`,
        allDay: true,
        start: new Date(year, month, date),
        end: new Date(year, month, date + 1),
      };
    });
    return (
      <div>
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">排班管理</h3>
          </div>
          <div className="panel-body" style={{ height: '100vh', minHeight: '500px', maxHeight: '600px' }}>
            <BigCalendar
              events={events}
              views={allViews}
              step={60}
              showMultiDayTimes
              defaultDate={new Date()}
              selectable
              onSelectSlot={this.onSelectSlot}
            />
          </div>
          <CreateModal onSuccess={() => { store.createModalVisible = false; this.refresh(); }} />
        </div>
      </div>
    );
  }
}
