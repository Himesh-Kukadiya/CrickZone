const express = require('express');
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.json());
app.use(express.json()); 

const boxBookingModal = require('../Modales/boxBooking.Modal');

const getBookingDetails = async (req, res) => {
    try {
        const { date, U_id, B_id } = req.body;
        const BBDate = new Date(date); 

        // find my bookings
        const myBooking = [];
        const bookingDetailsofMy = await boxBookingModal.find({U_id, B_id, BBDate})
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
        const bookingDetailsofOther = await boxBookingModal.find({B_id, BBDate})
                                                    // .populate("U_id")
                                                    // .populate("B_id")
                                                    // .exec();
            bookingDetailsofOther.forEach((box) => {
            box.BBTime.forEach((time) => {
                othersBooking.push(time)
            })
        })

        // console.log("My bookings : " + myBooking)
        // console.log("Booking Details:", bookingDetails);
    
        res.status(200).json({"MyBooking" : myBooking, "OthersBooking" : othersBooking});
    } catch (error) {
        console.error("Error fetching booking details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getBookingDetails };
