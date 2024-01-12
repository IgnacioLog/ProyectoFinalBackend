const supertest = require('supertest');
const chai = require('chai');
const app = require('../src/server');

const expect = chai.expect;
const request = supertest(app);

describe('Products API', () => {
  it('should retrieve all products', (done) => {
    request.get('/api/products')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

});
