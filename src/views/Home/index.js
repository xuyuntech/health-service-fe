import React from 'react';
import Button from '../../components/Button';
import { API } from '../../const';

export default class extends React.Component {
  render() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <h3 className="panel-title">Dashboard</h3>
        </div>
        <div className="panel-body">
          <Button type="primary" url={API.InitData}>初始化数据</Button>
        </div>
      </div>
    );
  }
}
