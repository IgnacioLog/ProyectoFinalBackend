describe('Auth API', () => {
    it('should authenticate a user', (done) => {
      request.post('/api/auth/login')
        .send({ username: 'testuser', password: 'testpassword' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  
  });
  