import axois from 'axios';

const createInstance = () => {
  return axois.create({
    baseURL: `${process.env.VUE_APP_REST_SERVER}`
  });
};

export default {
  post: (path, body = {}, headers = {}) => {
    return createInstance(headers).request({
      url: path,
      method: 'POST',
      data: body
    });
  },
  get: (path, headers = {}) => {
    return createInstance(headers).request({
      url: path,
      method: 'GET'
    });
  },
  get: (path, data = {},headers = {}) => {
    return createInstance(headers).request({
      url: path,
      method: 'GET'
    });
  }
};
