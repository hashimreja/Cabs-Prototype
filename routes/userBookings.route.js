const router = require('express').Router();
const userBookingsController = require('../controllers/userBookings.controller');
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
 *    userBookings:
 *      type: object
 *      required: 
 *        - uid
 *        - cabModel
 *        - fromLocation
 *        - toLocation
 *        - cab
 *      properties:
 *        uid: 
 *          type: String,
 *          description: the auto generated uid of the user
 *        cabModel:
 *               type: String,
 *               description: model of the cab
 *        fromLocation:
 *               type: array,
 *               description: from location of the user
 *        toLocation:
 *              type: array
 *              description: seat availability of the cab
 *        cab:
 *              type: string
 *              description: reference of the cab
 *      example:
 *        uid : 2f59b213-b7ec-4de6-9a40-7cb33a59b9df
 *        cabModel: suv
 *        fromLocation: [17.47865740468555, 78.43127308486228]
 *        toLocation:  [17.346404269893455, 78.54700423792046]
 *        cab: 60f6c4a33bca7f2decfd5749
 */

/**
 * @swagger
 * /api/booking:
 *    post:
 *      security:
 *          - bearerAuth: []
 *      summary: adds new cab
 *      tags: [Bookings]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userBookings'
 *      responses:
 *        201:
 *          description: Cab Booked Successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userBookings'
 *        500:
 *          description: some server error
 */
router.post('/',middleware.verifyjwt,createAccountLimiter,userBookingsController.bookCab);
/**
 * @swagger
 * /api/booking:
 *    get:
 *      security:
 *          - bearerAuth: []     
 *      summary: get all cab bookings by reference to user
 *      tags: [Bookings]
 *      responses:
 *        200:
 *          description: Bookings Retrieved Successfuly
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/userBookings'
 *        500:
 *          description: some server error
 */
router.get('/',middleware.verifyjwt,createAccountLimiter,userBookingsController.getAllBookingsByUser);

module.exports = router;