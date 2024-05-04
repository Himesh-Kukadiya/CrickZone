const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

// RazorPay Spacific Stuff...
const Razorpay = require('razorpay')
const razorpay = new Razorpay({
    key_id: 'rzp_test_cX0VB9927mioP6',
    key_secret: '7Oh9gRs0E4NyRPptXpFE7g03',
});


app.use(bodyParser.json());
app.use(express.json());

const boxBookingModal = require('../Modales/boxBooking.Modal');
const boxDetailse = require('../Modales/boxDetailse.Modal')
const offersModal = require('../Modales/offers.Modal');
const paymentModal = require('../Modales/payment.Modal');
const userModal = require('../Modales/user.Modal');
const boxkeeperModal = require('../Modales/boxKeeper.Modal');

const getBookingDetails = async (req, res) => {
    try {
        const { date, U_id, B_id } = req.body;
        const BBDate = new Date(date);

        // find my bookings
        const myBooking = [];
        const bookingDetailsofMy = await boxBookingModal.find({ U_id, B_id, BBDate })
        // .populate("U_id")
        // .populate("B_id")
        // .exec();
        bookingDetailsofMy.forEach((box) => {
            box.BBTime.forEach((time) => {
                myBooking.push(time)
            })
        })

        // find others booking.
        const othersBooking = [];
        const bookingDetailsofOther = await boxBookingModal.find({ B_id, BBDate })
        // .populate("U_id")
        // .populate("B_id")
        // .exec();
        bookingDetailsofOther.forEach((box) => {
            box.BBTime.forEach((time) => {
                othersBooking.push(time)
            })
        })

        // find box details
        const box = await boxDetailse.findById(B_id);
        const Bid = B_id;
        const offer = await offersModal.findOne({ Bid });

        let boxData;
        if (offer) {
            boxData = {
                "BName": box.BName,
                "BPrice": box.BPrice,
                "BCity": box.BCity,
                "Off": offer.Off
            }
        }
        else {
            boxData = {
                "BName": box.BName,
                "BPrice": box.BPrice,
                "BCity": box.BCity,
                "Off": 0
            }
        }

        res.status(200).json({ "MyBooking": myBooking, "OthersBooking": othersBooking, "boxData": boxData });
    } catch (error) {
        // console.error("Error fetching booking details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const bookNow = async (req, res) => {
    const { U_id, B_id, BookDate, BBDate, BBTime, BBTotalAmount } = req.body;
    try {
        const options = {
            amount: BBTotalAmount * 100,
            currency: 'INR',
            receipt: 'order_receipt_' + Math.floor(Date.now() / 1000),
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ order })
    }
    catch (error) {
        console.log(error)
    }
}

const paymentVarification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const { U_id, B_id, BookDate, BBDate, BBTime, BBTotalAmount } = JSON.parse(req.query.bookingData);

    const text = razorpay_order_id + "|" + razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256', "7Oh9gRs0E4NyRPptXpFE7g03")
        .update(text)
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {        
        // Perform Cross Transaction 
        const newBooking = { U_id, B_id, BookDate, BBDate, BBTime, BBTotalAmount }
        const boxbooking = await boxBookingModal.create(newBooking);

        const newBookindDetails = await boxBookingModal.findOne(newBooking)
        const BB_id = newBookindDetails._id;

        const userData = await userModal.findById({_id: U_id});
        const box = await boxDetailse.findById(B_id).populate('BK_id');
        const userController = require('../Controller/userController');
        
        {
            // users
            const sub = "CrickZone Box Bookings"
            const msg = `Hello, ${userData.UName} you have booked ${box.BName} on ${BBDate}.your Booking Number is ${BB_id}.  box price is ${box.BPrice} and you pay total ${BBTotalAmount}. your booking hours is [${BBTime.toString()}]. address of this box is ${box.BAddress}.`;
            userController.sendMail(sub, msg, userData.UEmail, "crickzone075@gmail.com");
        }

        {
            // box Keepers
            const sub = "CrickZone Box Booked"
            const msg = `Hello, ${box.BK_id.BKName} you got booking from ${userData.UName} of your box ${box.BName} on ${BBDate}.Booking Number is ${BB_id}. box price is ${box.BPrice} and ${userData.UName} pay total ${BBTotalAmount}. booking hours is [${BBTime.toString()}].`;
            userController.sendMail(sub, msg, "himeshkukadiya075@gmail.com", "crickzone075@gmail.com");
        }

        const paymentDetails = { BB_id, razorpay_payment_id, razorpay_order_id, razorpay_signature }
        const newPayment = await paymentModal.create(paymentDetails);

        // redirect To Front-end
        res.redirect(`http://localhost:5173/booking?bid=${B_id}`)
    } else {
        res.status(400).json({ success: false, message: "Signature verification failed" });
    }
}

const bookingDetailsAdmin = async (req, res) => {
    const bookings = await boxBookingModal.find()
                                            .populate({
                                                path: 'B_id',
                                                populate: {
                                                    path: 'BK_id',
                                                    model: 'BooxKeepers'
                                                }
                                            })
                                            .populate('U_id')
                                            .sort({ BBDate: -1 })
                                            .exec();
    res.status(200).json(bookings)
}

module.exports = { 
    getBookingDetails, 
    bookNow, 
    paymentVarification,
    bookingDetailsAdmin
};
