const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const server = require('../server');

describe('Blog API', () => {
    it('should retrieve all blog posts', (done) => {
      request(server)
        .get('/api/blog')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
});
