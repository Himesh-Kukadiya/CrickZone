const express = require('express')
const bodyParser = require('body-parser'); // for request body parsing
const bcrypt = require('bcrypt');
const { Collection, ObjectId } = require("mongodb");
const mongoose = require('mongoose')

const app = express();
app.use(bodyParser.json());
app.use(express.json()); 

//Modules.
const adimnModal = require('../Modales/admin.Modal')
const userModal = require('../Modales/user.Modal');
const bkModal = require('../Modales/boxKeeper.Modal')
const boxModal = require('../Modales/boxDetailse.Modal')
const bookingModal = require('../Modales/boxBooking.Modal')
const applicationModal = require('../Modales/application.Modal');
const adminModal = require('../Modales/admin.Modal');

// login Request
const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const adminData = await adminModal.findOne({ AEmail: email });
        if (!adminData) { // check boxkeeper or not...
            return res.status(404).json({ isLoggedIn: false, message: 'BoxKeeper not found' });
        }
        if (password != adminData.APassword) { // check cradentioal
            return res.status(401).json({ isLoggedIn: false, message: 'Invalid credentials' });
        }
        const admin = {
            _id: adminData._id,
            AName : adminData.AName,
            AMobile : adminData.AMobile,
            AEmail : adminData.AEmail,
            AImageURL : adminData.AImageURL
        }
        // send data with login success...
        res.status(200).json({ isLoggedIn: true, message: 'Login successful', data: admin });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}
const updateProfile = async (req, res) => {
    try {
        const {data} = req.body;
        const filter = { _id: data._id }; 
        const result = await adminModal.findOneAndUpdate(filter, data, { new: false });
        if (result) {
            res.status(200).json(data);
        } else {
            res.status(404).send({ message: "Profile not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Something went wrong" });
    }
};
const remove = async (req, res) => {
    try {
        const _id = req.body;
        const updateAdmin = await adminModal.findByIdAndUpdate(_id, { AImageURL: "default.jpg" }, { new: true })
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
    }
    catch(e) {
        console.log(e)
        res.status(500).send({error: e.message})
    }
}

const counter = async(req, res) => {
    try {
        const totalUser = await userModal.countDocuments();
        const totalBK = await bkModal.countDocuments();
        const totalBoxes = await boxModal.countDocuments();
        const totalBooking = await bookingModal.countDocuments();
        const totals = {"User": totalUser, "BoxKeeper": totalBK, "Boxes": totalBoxes, "Booking":totalBooking}
        res.status(200).json(totals)
    }
    catch(err) {
        console.log(err)
    }
}

const getUsersDetailAdmin = async(req, res) => {
    try {
        const usersDetail = await userModal.find();
        res.status(200).json(usersDetail);
    }
    catch(e) {
        console.log(e);
    }
}

const getBoxKeeperDetails = async(req, res) => {
    try {
        const boxKeepers = await bkModal.find();
        res.status(200).json(boxKeepers)
    }
    catch(e) {
        console.log(e)
    }
}

const getBoxDetails = async(req,res) => {
    try {
        const boxes = await boxModal.find()
                                    .populate('BK_id')
        res.status(200).json(boxes)
    }
    catch(e) {
        console.log(e)
    }
}

const top5Boxes = async (req, res) => {
    try {
        const bookings = await bookingModal.find()
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

        const boxData = {};
        for (const booking of bookings) {
            const boxName = booking.B_id.BName;
            const totalAmount = booking.BBTotalAmount;
            if (!boxData[boxName]) {
                boxData[boxName] = { count: 0, totalAmount: 0 };
            }
            boxData[boxName].count++;
            boxData[boxName].totalAmount += totalAmount;
        }
        
        const sortedBoxData = Object.entries(boxData)
            .sort((a, b) => b[1].totalAmount - a[1].totalAmount)
            .slice(0, 5);

        const top3Boxes = sortedBoxData.reduce((acc, [boxName, data]) => {
            acc[boxName] = data;
            return acc;
        }, {});

        res.status(200).json(top3Boxes);
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
};

const monthlyBookings = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const bookings = await bookingModal.find({
            BBDate: {
                $gte: new Date(currentYear, 0, 1), 
                $lte: new Date(currentYear, 11, 31, 23, 59, 59) // End of current year
            }
        })
        .sort({ BBDate: -1 })
        .exec();
        
        const monthlyData = bookings.reduce((acc, booking) => {
            const monthName = new Date(booking.BBDate).toLocaleString('default', { month: 'short' });
            const monthNumber = new Date(booking.BBDate).getMonth() + 1; // Months are 0-indexed
            if (!acc[monthName]) {
                acc[monthName] = { totalBBTimeLength: 0, totalAmount: 0 };
            }
            acc[monthName].totalBBTimeLength += booking.BBTime.length;
            acc[monthName].totalAmount += booking.BBTotalAmount;
            return acc;
        }, {});
        
        
        const sortedKeys = Object.keys(monthlyData).sort((a, b) => {
            const monthMap = {
                "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
                "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
            };
            return monthMap[a] - monthMap[b];
        });
        
        const sortedMonthlyData = sortedKeys.reduce((acc, key) => {
            acc[key] = monthlyData[key];
            return acc;
        }, {});
        
        res.status(200).send(sortedMonthlyData);
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: 'Internal server error' });
    }
};

const getNoOfApplication = async (req, res) => {
    try {
        const noOfApplication = await applicationModal.countDocuments({ ABStatus: "Applied" });
        res.status(200).json({ noOfApplication });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getApplicationList = async (req, res) => {
    try {
        const applicationList = await applicationModal.find({ })
                                                        .populate('BK_id')
                                                        .exec()
        res.status(200).json(applicationList);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};


const ApplicationHandle = async (req, res) => {
    try {
        const { Id, Status } = req.body;
        const data = await applicationModal.findByIdAndUpdate({ _id: ObjectId.createFromHexString(Id)}, {ABStatus: Status}, { new: false });
        if(!data) {
            return res.status(500).send({message: "Error"})
        }
        res.status(200).json({ message: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};
module.exports = {
    login, updateProfile,
    counter, remove,
    getUsersDetailAdmin, 
    getBoxKeeperDetails,
    getBoxDetails,
    top5Boxes,
    monthlyBookings,
    getNoOfApplication,
    getApplicationList,
    ApplicationHandle
}