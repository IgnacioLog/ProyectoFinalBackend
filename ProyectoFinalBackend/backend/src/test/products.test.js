const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const server = require('../server');

describe('Products API', () => {
  it('should retrieve all products', (done) => {
    request(server)
      .get('/api/products')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
