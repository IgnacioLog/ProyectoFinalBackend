describe('Carts API', () => {
    it('should retrieve a user\'s cart', (done) => {
      request.get('/api/carts/userId')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  
  });
  