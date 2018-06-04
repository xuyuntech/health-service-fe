import { observable } from 'mobx';


class Store {
  @observable arrangements = [];
  @observable createModalVisible = false;
}

export default new Store();
