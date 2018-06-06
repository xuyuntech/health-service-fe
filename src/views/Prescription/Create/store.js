import { observable } from 'mobx';


class Store {
  @observable modalVisible = false;
  @observable loading = false;
}

export default new Store();
