export const BaseURL = 'http://47.254.43.233:8080';
export const DEV = process.env.NODE_ENV === 'development';
const DevURL = {
  InitData: 'http://localhost:8080',
  Query: 'http://localhost:8080',
  Arrangement: 'http://localhost:8080',
  RegisterHistory: 'http://localhost:8080',
  PrescriptionCreate: 'http://localhost:8080',
  Find: 'http://localhost:8080',
  Order: 'http://localhost:8080',
};


function getURL(url, moduler) {
  if (DEV) {
    return `${DevURL[moduler]}${url}`;
  }
  return `${BaseURL}${url}`;
}

export const API = {
  InitData: getURL('/initData', 'InitData'),
  Find: key => getURL(`/find?key=${key}`, 'Find'),
  OrderPay: getURL('/updateRegister', 'Order'),
  Query: type => getURL(`/query?query_string=${decodeURIComponent(JSON.stringify({ selector: { docType: { $eq: type } } }))}`, 'Query'),
  RegisterHistory: {
    Create: (arrangementKey, userKey) => getURL(`/createRegister?arrangementKey=${arrangementKey}&userKey=${userKey}`, 'RegisterHistory'),
    Finish: getURL('/updateRegister', 'RegisterHistory'),
  },
  PrescriptionCreate: getURL('/updateRegister', 'PrescriptionCreate'),
  Arrangement: {
    Create: getURL('/arrangement', 'Arrangement'),
  },
};


export const RegisterState = {
  Register: '已挂号',
  Visiting: '已就诊',
  Finished: '已完成',
};

export const OrderState = {
  NotPaid: '未支付',
  Paid: '已支付',
  Finished: '已完成',
};

export default {};
