import React from 'react';
import { NavLink } from 'react-router-dom';

export default class extends React.Component {
  render() {
    return (
      <nav id="mainnav-container">
        <div id="mainnav" >
          <div id="mainnav-menu-wrap">
            <div className="nano">
              <div className="nano-content" >
                <ul id="mainnav-menu" className="list-group">
                  <li className="list-header">Navigation</li>
                  <li>
                    <NavLink exact to="/" activeClassName="active">
                      <i className="demo-pli-home" />
                      <span className="menu-title">Dashboard</span>
                    </NavLink>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i className="demo-pli-home" />
                      <span className="menu-title">挂号管理</span>
                      <i className="arrow" />
                    </a>
                    <ul className="collapse">
                      <li>
                        <NavLink to="/arrangement" activeClassName="active">
                          <i className="demo-pli-home" />
                          <span className="menu-title">排班管理</span>
                        </NavLink>
                      </li>
                      {/* <li>
                        <NavLink to="/inventorySync" activeClassName="active">
                          <i className="demo-pli-home" />
                          <span className="menu-title">排班规则</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/inventorySync" activeClassName="active">
                          <i className="demo-pli-home" />
                          <span className="menu-title">排班记录</span>
                        </NavLink>
                      </li> */}
                      <li>
                        <NavLink to="/registerHistory/list" activeClassName="active">
                          <i className="demo-pli-home" />
                          <span className="menu-title">挂号记录</span>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i className="demo-pli-home" />
                      <span className="menu-title">订单管理</span>
                      <i className="arrow" />
                    </a>
                    <ul className="collapse">
                      <li>
                        <NavLink to="/order/orders" activeClassName="active">
                          <i className="demo-pli-home" />
                          <span className="menu-title">订单列表</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/order/paymentHistory" activeClassName="active">
                          <i className="demo-pli-home" />
                          <span className="menu-title">支付记录</span>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i className="demo-pli-home" />
                      <span className="menu-title">处方管理</span>
                      <i className="arrow" />
                    </a>
                    <ul className="collapse">
                      <li>
                        <NavLink to="/prescription/list" activeClassName="active">
                          <i className="demo-pli-home" />
                          <span className="menu-title">处方列表</span>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <NavLink exact to="/hospitals" activeClassName="active">
                      <i className="demo-pli-home" />
                      <span className="menu-title">医院网点</span>
                      {/* <i className="arrow" /> */}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/doctors" activeClassName="active">
                      <i className="demo-pli-home" />
                      <span className="menu-title">医师管理</span>
                    </NavLink>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i className="demo-pli-home" />
                      <span className="menu-title">用户</span>
                      <i className="arrow" />
                    </a>
                    <ul className="collapse">
                      <li>
                        <NavLink to="/users" activeClassName="active">
                          <i className="demo-pli-home" />
                          <span className="menu-title">用户管理</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/cases" activeClassName="active">
                          <i className="demo-pli-home" />
                          <span className="menu-title">病例管理</span>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
