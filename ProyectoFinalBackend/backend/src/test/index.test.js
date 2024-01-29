const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const server = require('../server');

describe('Index Route', () => {
    it('should return a welcome message', (done) => {
      request(server)
        .get('/')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.text).to.contain('Welcome');
          done();
        });
    });
});
