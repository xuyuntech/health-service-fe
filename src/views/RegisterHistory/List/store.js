import { observable } from 'mobx';


class Store {
  @observable users = [];
  @observable doctors = [];
  @observable hospitals = [];
  @observable arrangements = [];
  @observable selectedDate = new Date();
  @observable loading = false;
}

export default new Store();
