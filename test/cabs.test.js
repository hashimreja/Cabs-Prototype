const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const test = require('./test')
chai.use(chaiHttp);
//assertion style
chai.should();


describe("CABS Api's ", () => {
    it('it should get Token', async () => {
        const token = await test.getToken();
        describe('POST /api/cabs', () => {
            it('it should insert all the cabs', (done) => {
                chai.request(server)
                    .post("/api/cabs")
                    .set("authorization", "Bearer " + token)
                    .send(
                        [{
                            "ownerName": "Ace",
                            "cabModel": "SUV",
                            "seatAvailability": 2,
                            "userRating": 4,
                            "location": {
                              "type": "Point",
                              "address": "ameerpet",
                              "coordinates": [
                                78.39908023962778,
                                17.488538478756556
                              ]
                            }
                          },{
                            
                            "ownerName": "Chopper",
                            "cabModel": "SUV",
                            "seatAvailability": 4,
                            "userRating": 3,
                            "location": {
                              "type": "Point",
                              "address": "dilsukanagar",
                              "coordinates": [
                                78.52483738892043,
                                17.372165606014455
                              ]
                            }
                          },{
                            
                            "ownerName": "Robin",
                            "cabModel": "SUV",
                            "seatAvailability": 1,
                            "userRating": 2,
                            "location": {
                              "type": "Point",
                              "address": "hitech",
                              "coordinates": [
                                78.37355813910914,
                                17.447139045147075
                              ]
                            }
                          },{
                           
                            "ownerName": "Max",
                            "cabModel": "SUV",
                            "seatAvailability": 3,
                            "userRating": 1,
                            "location": {
                              "type": "Point",
                              "address": "jubilee hills",
                              "coordinates": [
                                78.40419229664083,
                                17.43204505328596
                              ]
                            }
                          },{
                            
                            "ownerName": "Luffy",
                            "cabModel": "SUV",
                            "seatAvailability": 6,
                            "userRating": 5,
                            "location": {
                              "type": "Point",
                              "address": "banjara hills",
                              "coordinates": [
                                78.43602553341098,
                                17.415770194406804
                              ]
                            }
                          },{
                            
                            "ownerName": "Law",
                            "cabModel": "SUV",
                            "seatAvailability": 2,
                            "userRating": 4,
                            "location": {
                              "type": "Point",
                              "address": "secunderabad",
                              "coordinates": [
                                78.49858490250077,
                                17.435761531502
                              ]
                            }
                          },{
                            
                            "ownerName": "Franky",
                            "cabModel": "SUV",
                            "seatAvailability": 2,
                            "userRating": 4,
                            "location": {
                              "type": "Point",
                              "address": "cheeriyal",
                              "coordinates": [
                                78.62227531912613,
                                17.5233100662499
                              ]
                            }
                          },{
                            
                            "ownerName": "kaido",
                            "cabModel": "SUV",
                            "seatAvailability": 2,
                            "userRating": 4,
                            "location": {
                              "type": "Point",
                              "address": "lb nagar",
                              "coordinates": [
                                78.54786001690626,
                                17.341335203159243
                              ]
                            }
                          }]
                    )
                    .end((err, res) => {
                        res.body.should.have.status(201);
                        res.body.should.be.a('Object');
                        res.body.should.have.property('status');
                        res.body.responsePayLoad.should.be.a('array')
                        done();
                    })
            })
        })
        describe('Get /api/cabs', () => {
            it('it should get all the cabs', (done) => {    
                chai.request(server)
                    .get("/api/cabs")
                    .set("authorization", "Bearer " + token)
                    .end((err, res) => {
                        res.body.should.have.status(200);
                        res.body.should.be.a('Object');
                        res.body.should.have.property('status');
                        res.body.responsePayLoad.data.should.be.a('array')
                        done();
                    })
            })
        })
        describe('Get /api/cabs/in-distance', () => {
            it('it should get all the cabs within a distance of 1 km', (done) => {
                chai.request(server)
                    .get("/api/cabs/in-distance?longitude=78.39908023962778&latitude=17.488538478756556&distance=1000")
                    .set("authorization", "Bearer " + token)
                    .end((err, res) => {
                        res.body.should.have.status(200);
                        res.body.should.be.a('Object');
                        res.body.should.have.property('status');
                        res.body.responsePayLoad.should.be.a('array')
                        done();
                    })
            })
        })
        })
})

