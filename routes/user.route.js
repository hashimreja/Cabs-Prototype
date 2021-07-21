const router = require('express').Router();
const userController = require('../controllers/user.controller');
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
 *  schemas:
 *    User:
 *      type: object
 *      required: 
 *        - userName
 *        - mobileNumber
 *        - password
 *      properties:
 *        id: 
 *          type: String,
 *          description: the auto generated id of the user
 *        uid:
 *          type: String,
 *          description: random uid of the user
 *        userName:
 *               type: String,
 *               description: name of the user registering
 *        mobileNumber:
 *               type: String,
 *               description: mobile number of the user
 *        password:
 *              type: String
 *              description: password of the user
 *      example:
 *        userName: syed hashim reja
 *        mobileNumber: 9000987739
 *        password: testPassword
 *        
 */

/**
 * @swagger
 * /api/user:
 *    post:
 *      summary: creates new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      responses:
 *        201:
 *          description: User Registered Successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: some server error
 */
router.post('/',createAccountLimiter,userController.userRegister);
/**
 * @swagger
 * /api/user/login:
 *    post:
 *      summary: Logging user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  mobileNumber:
 *                      type: String
 *                      description: mobileNumber of the registered user
 *                  password:
 *                      type: String 
 *                      description: password of the registered user
 *              example:
 *                mobileNumber: 9000987739
 *                password: testPassword
 *      responses:
 *        200:
 *          description: User Logged in Successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: some server error
 */
router.post('/login',createAccountLimiter,userController.userLogin);

module.exports = router;