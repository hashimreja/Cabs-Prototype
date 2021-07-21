const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
chai.use(chaiHttp);
//assertion style
chai.should();

describe("User  Api's ", () => {
    describe('POST /api/user', () => {
        it('it should add user to the database', (done) => {
            chai.request(server)
                .post("/api/user")
                .send({
                    "userName" : "hashim",
                    "mobileNumber" : "9000987738",
                    "password" : "123456789"
                })
                .end((err, res) => {
                    res.body.should.have.status(201);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('status');
                    res.body.responsePayLoad.should.be.a('object')
                    done();
                })
        })
    })
    describe('POST /api/login', () => {
        it('it should get User Token', (done) => {
            chai.request(server)
                .post('/api/user/login')
                .send({
                    "mobileNumber": "9000987738",
                    "password": "123456789"
                })  
                .end((err, res) => {
                    res.body.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('status');
                    res.body.responsePayLoad.should.be.a('string')
                    done();
                })
        })
    })
})

