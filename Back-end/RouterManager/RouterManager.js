const express = require('express') // express js for manager Router
const router = express.Router(); // get Router form express.

// Users.
const userController = require('../Controller/userController')
// login 
router 
    .route('/userlogin')
    .post(userController.login)
// signup
router 
    .route('/usersignup')
    .post(userController.signup)
// profile
router 
    .route('/userprofile')
    .post(userController.profile)

// hash password
router
    .route('/hashconverter')
    .post(userController.hashconverter)


// Box List
const boxController = require('../Controller/boxController')
router
    .route('/boxBookingDetails') 
    .post(boxController.getBookingDetails);

router
    .route('/bookNow')
    .post(boxController.bookNow)

router
    .route('/paymentVarification')
    .post(boxController.paymentVarification)

router
    .route('/getKey')
    .get((req,res) => {res.status(200).json({key: "rzp_test_cX0VB9927mioP6"})})
// OfferLists
const offersController = require('../Controller/offerController');
router
    .route('/offerList')
    .get(offersController.offersList)


// exprot final router
module.exports = router;