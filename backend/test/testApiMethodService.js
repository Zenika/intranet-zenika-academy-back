const request = require('supertest');
const app = require('../src/app');

module.exports = {
  get: (url, token) => {
    const httpRequest = request(app).get(url);
    httpRequest.set('Origin', 'http://localhost:4000');
    httpRequest.set('Cookie', `token=${token}` )
    return httpRequest;
  },

  post: (url, token, body) => {
    const httpRequest = request(app).post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:4000');
    httpRequest.set('Cookie', `token=${token}` )
    return httpRequest;
  },

  put: (url, token, body) => {
    const httpRequest = request(app).put(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:4000');
    httpRequest.set('Cookie', `token=${token}` )
    return httpRequest;
  },

  delete: (url, token) => {
    const httpRequest = request(app).delete(url);
    httpRequest.set('Origin', 'http://localhost:4000');
    httpRequest.set('Cookie', `token=${token}` )
    return httpRequest;
  },
};
