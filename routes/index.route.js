const router = require('express').Router();

/*Routes*/
const userRoutes = require('./user.route');
const cabsRoutes = require('./cabs.route');
const userBookingRoutes = require('./userBookings.route');
/*API's*/
router.use('/user',userRoutes);
router.use('/cabs',cabsRoutes);
router.use('/booking',userBookingRoutes);

module.exports = router;