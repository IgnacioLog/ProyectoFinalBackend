const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const server = require('../server');

describe('Carts API', () => {
    it('should retrieve a user\'s cart', (done) => {
      request(server)
        .get('/api/carts/alguien')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
});
