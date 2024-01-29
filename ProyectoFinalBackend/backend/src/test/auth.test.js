const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const server = require('../server');

describe('Auth API', () => {
    it('should authenticate a user', (done) => {
      request(server)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'testpassword' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
});
