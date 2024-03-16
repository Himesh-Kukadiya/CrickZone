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

// hash password
router
    .route('/hashconverter')
    .post(userController.hashconverter)


// Box List
const boxController = require('../Controller/boxController')
router
    .route('/imagelist')
    .get(boxController.imageList)

// OfferLists
const offersController = require('../Controller/offerController');
router
    .route('/offerList')
    .get(offersController.offersList)

// exprot final router
module.exports = router;