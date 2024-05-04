const express = require('express') // express js for manager Router
const router = express.Router(); // get Router form express.
const path = require('path');
const multer = require('multer');
const adminModal = require('../Modales/admin.Modal');
const boxkeeperModal = require('../Modales/boxKeeper.Modal');

// Users.
{
const userController = require('../Controller/userController')
        // login 
        router 
            .route('/userlogin')
            .post(userController.login)
        // signup
        router 
            .route('/usersignup')
            .post(userController.signup)
        // send OTP for reset password
        router 
            .route('/sendOTP')
            .post(userController.sendOTP)
        router 
            .route('/changePassword')
            .post(userController.changePassword)
        // hash password
        router
            .route('/hashconverter')
            .post(userController.hashconverter)
}

// Box List
{
const boxController = require("../Controller/boxController")
        // get all list
        router
            .route("/boxList")
            .get(boxController.boxList)
        router
            .route("/boxDetail")
            .post(boxController.boxDetail)
        router
            .route("/getGalary")
            .post(boxController.getGalary)
        router
            .route("/deleteBox")
            .post(boxController.deleteBox)
        router
            .route("/getBoxDetails")
            .post(boxController.getBoxDetails)
}

// Booking List
{
    const bookingController = require('../Controller/bookingController')
        router
            .route('/boxBookingDetails') 
            .post(bookingController.getBookingDetails);

        router
            .route('/bookNow')
            .post(bookingController.bookNow)

        router
            .route('/paymentVarification')
            .post(bookingController.paymentVarification)

        router
            .route('/getKey')
            .get((req,res) => {res.status(200).json({key: "rzp_test_cX0VB9927mioP6"})})
}
// OfferLists
{
const offersController = require('../Controller/offerController');
        router
            .route('/offerList')
            .get(offersController.offersList)
        router
            .route('/offerIdforBK')
            .get(offersController.offerIdforBK)
        router
            .route('/applayOffer')
            .post(offersController.applayOffer)
        router
            .route('/deleteOffer')
            .post(offersController.deleteOffer)
}

// BoxKeeper 
{
const BKController = require('../Controller/boxkeeperController')
        router
            .route("/boxKeeperLogin")
            .post(BKController.login)
        router
            .route("/boxKeeperSignup")
            .post(BKController.signup)
        router
            .route("/editBoxKeeperProfile")
            .post(BKController.updateProfile)
        router
        router
            .route("/removeBKImage")
            .post(BKController.remove)
        router
            .route("/getBKCounter")
            .post(BKController.bkcounter)
        router
            .route("/getBKBookings")
            .post(BKController.bkBookings)
        router
            .route("/getBKBoxDetails")
            .post(BKController.getBoxDetails)
        router
            .route("/getBKUser")
            .post(BKController.getUsersDetail)
        router
            .route("/getBoxPieData")
            .post(BKController.boxPieData)
        router
            .route("/getBoxComparisionRevanue")
            .post(BKController.boxComparisionRevanue)
        router
            .route("/getBKMonthly")
            .post(BKController.monthlyBookings)
        // Applications
        router
            .route("/newApplications")
            .post(BKController.newApplications)
        router
            .route("/getBKApplications")
            .post(BKController.getBKApplications)
        router
            .route("/cancelApplication")
            .post(BKController.cancelApplication)
        router
            .route("/noOfBKApplication")
            .post(BKController.noOfBKApplication)
        router
            .route("/addNewBox")
            .post(BKController.addNewBox)
        router
            .route("/boxPaymentVarification")
            .post(BKController.boxPaymentVarification)
}

// Admin
{
const adminController = require('../Controller/adminController')
const bookingController = require('../Controller/bookingController')

        router 
            .route('/adminLogin')
            .post(adminController.login)
        router 
            .route('/editAdminProfile')
            .post(adminController.updateProfile)
        router 
            .route('/removeImage')
            .post(adminController.remove)

            // app.post('/upload', ,
        router 
            .route('/getCounter')
            .get(adminController.counter)

        router 
            .route('/bookingDetails')
            .get(bookingController.bookingDetailsAdmin)
        
        router 
            .route('/getUserDerail')
            .get(adminController.getUsersDetailAdmin)

        router 
            .route('/getBoxKeeperDerail')
            .get(adminController.getBoxKeeperDetails)

        router 
            .route('/getBoxDetails')
            .get(adminController.getBoxDetails)

        router 
            .route('/top5Boxes')
            .get(adminController.top5Boxes)

        router 
            .route('/monthlyBookings')
            .get(adminController.monthlyBookings)

        router 
            .route('/noOfApplication')
            .get(adminController.getNoOfApplication)

        router
            .route('/getApplicationList')
            .get(adminController.getApplicationList)

        router
            .route('/ApplicationHandle')
            .post(adminController.ApplicationHandle)
}

// Image uploading
{
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Public/Images/users');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Public/Images/Boxes');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });

router.post('/adminProfileImageUpload', upload.single('image'), async (req, res) => {
    // Accessing the _id from the request body
    const _id = req.body.A_id;
    console.log(req.body);
    
    try {
        const updateAdmin = await adminModal.findByIdAndUpdate(_id, { AImageURL: req.file.filename }, { new: true })
        if(updateAdmin) {
            const adminData = await adminModal.findById(_id);
            const admin = {
                _id: adminData._id,
                AName : adminData.AName,
                AMobile : adminData.AMobile,
                AEmail : adminData.AEmail,
                AImageURL : adminData.AImageURL
            }
            return res.status(200).send({adminData: admin});
        }
        res.status(400).send("Image not Uploaded")

    } catch (error) {
        console.error('Error updating admin data:', error);
        res.status(500).send('Error updating admin data');
    }
});

router.post('/bkProfileImageUpload', upload.single('image'), async (req, res) => {
    // Accessing the _id from the request body
    const _id = req.body.BK_id;

    try {
        const updateBK = await boxkeeperModal.findByIdAndUpdate(_id, { BKImageURL: req.file.filename }, { new: true })
        if(updateBK) {
            const bkdata = await boxkeeperModal.findById(_id);
            const bk = {
                _id: bkdata._id,
                BKName : bkdata.BKName,
                BKMobile : bkdata.BKMobile,
                BKEmail : bkdata.BKEmail,
                BKImageURL : bkdata.BKImageURL
            }
            return res.status(200).send({boxKeeperData: bkdata});
        }
        res.status(400).send("Image not Uploaded")

    } catch (error) {
        console.error('Error updating admin data:', error);
        res.status(500).send('Error updating admin data');
    }
});

router.post('/changeBoxImage', upload2.single('image'), async (req, res) => {
    // Accessing the _id from the request body
    const _id = req.body.B_id;
    const boxModal = require('../Modales/boxDetailse.Modal')
    try {
        const updateBox = await boxModal.findByIdAndUpdate(_id, { BImageURL: req.file.filename }, { new: true })
        if(updateBox) {
            return res.status(200).send("Image Uploaded");
        }
        res.status(400).send("Image not Uploaded")

    } catch (error) {
        console.error('Error updating admin data:', error);
        res.status(500).send('Error updating admin data');
    }
});
}
// exprot final router
module.exports = router;

// upload.single("image"),