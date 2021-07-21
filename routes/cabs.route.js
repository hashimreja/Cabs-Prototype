const router = require('express').Router();
const cabsController = require('../controllers/cabs.controller');
const middleware = require('../middleware/verifyJwt');
const rateLimit = require("express-rate-limit");
const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 10 requests
    message:
    {message :  "Too many hits created from this IP, please try again after an hour"}
});

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *    Cabs:
 *      type: object
 *      required: 
 *        - ownerName
 *        - cabModel
 *        - seatAvailability
 *        - userRating
 *        - location
 *      properties:
 *        id: 
 *          type: String,
 *          description: the auto generated id of the cab
 *        ownerName:
 *               type: String,
 *               description: name of the cab owner
 *        cabModel:
 *               type: String,
 *               description: model of the cab
 *        seatAvailability:
 *              type: Number
 *              description: seat availability of the cab
 *        userRating:
 *              type: Number
 *              description: user rating of the cab
 *        location:
 *              type: object
 *              description: location of the cab
 *      example:
 *        ownerName: saboo
 *        cabModel: suv
 *        seatAvailability: 2
 *        userRating: 5
 *        location: { type: Point,address: ameerpet,coordinates: [78.39908023962778, 17.488538478756556]}
 */

/**
 * @swagger
 * /api/cabs:
 *    post:
 *      security:
 *          - bearerAuth: []
 *      summary: adds new cab
 *      tags: [Cabs]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Cabs'
 *      responses:
 *        201:
 *          description: Cabs Added Successfuly
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Cabs'
 *        500:
 *          description: some server error
 */
router.post('/',middleware.verifyjwt,createAccountLimiter,cabsController.insertCabs);
/**
 * @swagger
 * /api/cabs:
 *    get:
 *      security:
 *          - bearerAuth: []
 *      summary: get all cabs
 *      tags: [Cabs]
 *      responses:
 *        200:
 *          description: Cabs Retrieval Successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Cabs'
 *        500:
 *          description: some server error
 */
router.get('/',middleware.verifyjwt,createAccountLimiter,cabsController.getAllCabs);
/**
 * @swagger
 * /api/cabs/in-distance:
 *    get:
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: latitude
 *            schema:
 *              type: number
 *              required: true
 *              description: Latitude of the current location
 *              default: 17.488538478756556
 *          - in: query
 *            name: longitude
 *            schema:
 *              type: number
 *              required: true
 *              description: longitude of the current location
 *              default: 78.39908023962778
 *          - in: query
 *            name: distance
 *            schema:
 *              type: integer
 *              required: true
 *              description: max distance to  check the availability of the cabs
 *              default: 1000     
 *      summary: get all cabs
 *      tags: [Cabs]
 *      responses:
 *        200:
 *          description: Cabs Retrieval Successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Cabs'
 *        500:
 *          description: some server error
 */
router.get('/in-distance',middleware.verifyjwt,createAccountLimiter,cabsController.getNearestCabsInaLocation);

module.exports = router;