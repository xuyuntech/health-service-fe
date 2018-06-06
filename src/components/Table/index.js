import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'antd';
import Button from '../Button';
import bFetch from '../../bfetch';

const NOOP = () => {};

class Comp extends React.Component {
  static displayName = 'Table';
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    url: PropTypes.string.isRequired,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    params: PropTypes.object, //eslint-disable-line
    onLoad: PropTypes.func,
    fetchOptions: PropTypes.object, //eslint-disable-line
    tools: PropTypes.arrayOf(PropTypes.element),
    refreshable: PropTypes.bool,
    filterFunc: PropTypes.func,
    pagination: PropTypes.bool,
    autoLoad: PropTypes.bool,
  };
  static defaultProps = {
    params: {},
    onLoad: NOOP,
    fetchOptions: {},
    tools: [],
    refreshable: false,
    pagination: false,
    autoLoad: false,
    filterFunc: res => res,
  };
  state = {
    loading: false,
    data: null,
    pagination: {},
  };
  componentDidMount() {
    const { autoLoad } = this.props;
    if (autoLoad) {
      this.fetch();
    }
  }
  getTools() {
    const { tools, refreshable } = this.props;
    const { loading } = this.props; //eslint-disable-line
    const tTools = [].concat(tools);
    if (!tools.length && !refreshable) {
      return null;
    }
    if (refreshable) {
      tTools.push(<Button loading={loading} onClick={this.reload}><Icon type="reload" /></Button>);
    }

    return (
      <p>
        {
          // React.cloneElement 可以复制一个组件，以便修改属性
          // eslint-disable-next-line
          tTools.map((item, key) => React.cloneElement(item, { key })) 
        }
      </p>
    );
  }
  reload = (opt) => {
    this.fetch(opt);
  }
  fetch = async ({ current, pageSize, params } = {}) => {
    this.setState({
      loading: true,
    });
    const { url, filterFunc } = this.props;
    try {
      const res = await bFetch(url, {
        params: {
          currentPage: current,
          pageCount: pageSize,
          ...this.props.params,
          ...params,
        },
        ...this.props.fetchOptions,
      });
      const resF = await filterFunc(res);
      const { data, pagination } = resF.results || {};
      const state = {
        loading: false,
        data,
      };
      if (this.props.pagination) {
        state.pagination = {
          current: pagination.currentPage,
          total: pagination.totalCount,
        };
      }
      this.setState(state);
      this.props.onLoad(null, resF);
    } catch (e) {
      this.setState({
        loading: false,
      });
      this.props.onLoad(e, null);
    }
  }
  handleTableChange = (pagination) => {
    this.fetch(pagination);
  };

  render() {
    const { columns, rowKey } = this.props;
    const { loading, data } = this.state;
    let { pagination } = this.props;
    if (pagination) {
      pagination = this.state.pagination; //eslint-disable-line
    }
    console.log('table data', data);
    return (
      <div>
        {this.getTools()}
        <Table
          {...this.props}
          rowKey={rowKey}
          loading={loading}
          bordered
          dataSource={data}
          columns={columns}
          pagination={pagination}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default Comp;
