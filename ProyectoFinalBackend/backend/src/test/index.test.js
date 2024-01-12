describe('Index Route', () => {
    it('should return a welcome message', (done) => {
      request.get('/')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.text).to.contain('Welcome');
          done();
        });
    });
  });
  