import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { observer } from 'mobx-react';
import CreateModal from './CreateModal';
import store from './store';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

@observer
export default class extends React.Component {
  componentDidMount() {

  }
  onSelectSlot = (slotInfo) => {
    console.log(slotInfo);
    store.createModalVisible = true;
  };
  render() {
    const { arrangements } = store;
    const events = arrangements.map((item, i) => ({
      id: i,
      title: item.doctorKey,
      allDay: true,
    }));
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
          <CreateModal />
        </div>
      </div>
    );
  }
}
