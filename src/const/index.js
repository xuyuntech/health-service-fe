export const BaseURL = 'https://api.boxlinker.com';
export const DEV = process.env.NODE_ENV === 'development';
const DevURL = {
  Query: 'http://localhost:8080',
  Arrangement: 'http://localhost:8080',
};


function getURL(url, moduler) {
  if (DEV) {
    return `${DevURL[moduler]}${url}`;
  }
  return `${BaseURL}${url}`;
}

export const API = {
  Query: type => getURL(`/query?query_string=${decodeURIComponent(JSON.stringify({ selector: { docType: { $eq: type } } }))}`, 'Query'),
  RegisterHistory: {
    Create: (arrangementKey, userKey) => getURL(`/createRegister?arrangementKey=${arrangementKey}&userKey=${userKey}`, 'RegisterHistory'),
  },
  Arrangement: {
    Create: getURL('/arrangement', 'Arrangement'),
  },
};

export default {};
