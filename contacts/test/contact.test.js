process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

//Test Get Contacts API
describe('/GET contacts', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/contacts')
            .end((err, res) => {
                  res.body.should.be.a('object');
              done();
            });
      });
  });

