import { observable } from 'mobx';


class Store {
  @observable arrangements = [];
  @observable createModalVisible = false;
  @observable selectedDate = '';
  @observable submiting = false;
  doctors = [];
  hospitals = [];
  getDoctor(key) {
    for (let i = 0; i < this.doctors.length; i += 1) {
      if (this.doctors[i].Key === key) {
        return this.doctors[i].Record;
      }
    }
    return null;
  }
  getHospital(key) {
    for (let i = 0; i < this.hospitals.length; i += 1) {
      if (this.hospitals[i].Key === key) {
        return this.hospitals[i].Record;
      }
    }
    return null;
  }
}

export default new Store();
