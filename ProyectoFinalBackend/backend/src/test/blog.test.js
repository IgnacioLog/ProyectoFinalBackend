describe('Blog API', () => {
    it('should retrieve all blog posts', (done) => {
      request.get('/api/blog')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  

  });
  