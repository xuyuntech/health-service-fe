import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { message } from 'antd';
import Loadable from 'react-loadable';
import LoadingComp from './components/Loadable';
import Layout from './components/Layout';
// import bFetch from './bfetch';
// import { API } from './const';
import './App.css';
// import store from './store';


const load = asyncImport => Loadable({
  loader: asyncImport,
  loading: LoadingComp,
});

export const HomeView = load(() => import('./views/Home'));
export const HospitalView = load(() => import('./views/Hospital'));
export const DoctorView = load(() => import('./views/Doctor'));
export const UserView = load(() => import('./views/User'));
export const CaseView = load(() => import('./views/Case'));
export const OrderView = load(() => import('./views/Order'));
export const PaymentHistoryView = load(() => import('./views/PaymentHistory'));
export const PrescriptionCreateView = load(() => import('./views/Prescription/Create'));
export const PrescriptionListView = load(() => import('./views/Prescription/List'));
export const ArrangementView = load(() => import('./views/Arrangement'));
export const RegisterHistoryListView = load(() => import('./views/RegisterHistory/List'));

@observer
class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <div>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/hospitals" component={HospitalView} />
            <Route exact path="/doctors" component={DoctorView} />
            <Route exact path="/users" component={UserView} />
            <Route exact path="/cases" component={CaseView} />
            <Route exact path="/order/orders" component={OrderView} />
            <Route exact path="/order/paymentHistory" component={PaymentHistoryView} />
            <Route exact path="/prescription/create/:userKey/:registerHistoryKey" component={PrescriptionCreateView} />
            <Route exact path="/prescription/list" component={PrescriptionListView} />
            <Route exact path="/arrangement" component={ArrangementView} />
            <Route exact path="/registerHistory/list" component={RegisterHistoryListView} />
          </div>
        </Layout>
      </Router>

    );
  }
}

export default App;
