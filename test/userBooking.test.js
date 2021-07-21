const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const cabsModel = require('../models/cabs.model');
const test = require('./test')
chai.use(chaiHttp);
//assertion style
chai.should();


describe("User Booking Api's ", () => {
    it('it should get Token', async () => {
        const token = await test.getToken();
        describe('POST /api/booking', () => {
            it('it should book a cab', async () => {
                const id = await cabsModel.findOne();
                chai.request(server)
                    .post("/api/booking")
                    .set('Content-Type', 'application/json')
                    .set("authorization", "Bearer " + token)
                    .send({
                        "fromLocation": [17.47865740468555, 78.43127308486228],
                        "toLocation": [17.346404269893455, 78.54700423792046],
                        "cab": id._id
                    })
                    .end((err, res) => {
                        res.body.should.have.status(201);
                        res.body.should.be.a('Object');
                        res.body.should.have.property('status');
                        res.body.responsePayLoad.should.be.a('object')
                    })

            })

        })
        describe('Get /api/booking', () => {
            it('it should get all the bookings of user', () => {
               setTimeout(() => {
                chai.request(server)
                .get("/api/booking")
                .set('Content-Type', 'application/json')
                .set("authorization", "Bearer " + token)
                .end((err, res) => {
                    res.body.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.should.have.property('status');
                    res.body.responsePayLoad.data.should.be.a('array')
                }) 
               }, 2000);
            })
        })
    })
})

