const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(express.json()); 

// RazorPay Spacific Stuff...
const Razorpay = require('razorpay')
const razorpay = new Razorpay({
    key_id: 'rzp_test_cX0VB9927mioP6',
    key_secret: '7Oh9gRs0E4NyRPptXpFE7g03',
});

//Modules.
const userModal = require('../Modales/user.Modal');
const bkModal = require('../Modales/boxKeeper.Modal')
const boxModal = require('../Modales/boxDetailse.Modal')
const bookingModal = require('../Modales/boxBooking.Modal')
const applicationModal = require('../Modales/application.Modal')
const offersModal = require('../Modales/offers.Modal')


const signup = async (req, res) => {
    const {name, mobile, email, password} = req.body; 
    console.log(req.body)
    try{
        const bk = await bkModal.findOne({BKEmail: email})
        // check user already exists or not...
        if(bk) {
            return res.status(400).send({message: "BoxKeeper already exists"})
        }
        // create new BoxKeeper
        const newBoxKeeper = {
            BKName : name,
            BKMobile : mobile,
            BKEmail : email,
            BKPassword : password,
            BKImageURL : "default.jpg"
        }
        const data = await bkModal.create(newBoxKeeper);
        if(data) 
        {
            const newBoxkeeperData = await bkModal.findOne({BKEmail: email, BKName: name, BKPassword: password})
            const newBoxKeeper = {
                _id: newBoxkeeperData._id,
                BKName : newBoxkeeperData.BKName,
                BKMobile : newBoxkeeperData.BKMobile,
                BKEmail : newBoxkeeperData.BKEmail,
                BKImageURL : newBoxkeeperData.BKImageURL
            }
            res.status(200).send({message: "Registration successfull", boxKeeperData: newBoxKeeper})
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).send({message: err.message})
    }
    
}

const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const bk = await bkModal.findOne({ BKEmail: email });
        if (!bk) { // check boxkeeper or not...
            return res.status(404).json({ isLoggedIn: false, message: 'BoxKeeper not found' });
        }
        if (password != bk.BKPassword) { // check cradentioal
            return res.status(401).json({ isLoggedIn: false, message: 'Invalid credentials' });
        }
        const newBoxKeeper = {
            _id: bk._id,
            BKName : bk.BKName,
            BKMobile : bk.BKMobile,
            BKEmail : bk.BKEmail,
            BKImageURL : bk.BKImageURL
        }
        // send data with login success...
        res.status(200).json({ isLoggedIn: true, message: 'Login successful', data: newBoxKeeper });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const {data} = req.body;
        const filter = { _id: data._id }; 
        const result = await bkModal.findOneAndUpdate(filter, data, { new: false });
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
    const _id = req.body._id;
    try {
        const updateBK = await bkModal.findByIdAndUpdate(_id, { BKImageURL: "default.jpg" }, { new: true })
        if(updateBK) {
            const bkdata = await bkModal.findById(_id);
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
}

const bkcounter = async(req, res) => {
    try{
        const {BK_id} = req.body;
        const boxes = await boxModal.find({BK_id})
        const bookings = []
        const offers = [];

        let totalRevenue = 0;
        for (const d of boxes) {
            const bd = await bookingModal.find({ B_id: d._id });
            bookings.push(...bd);
            bd.forEach((bd)=>{
                totalRevenue += bd.BBTotalAmount;
            })
            const of = await offersModal.find({Bid: d._id}) 
            offers.push(...of)
        }

        const totals = {
            "Boxes": boxes.length,
            "Bookings": bookings.length,
            "Revenue": totalRevenue,
            "Offers" : offers.length
        }
        res.status(200).json(totals)
    }
    catch(e) {
        console.log(e);
        res.status(400).send({message: e.message})
    }
}

const bkBookings = async (req, res) => {
    try {
        const {BK_id} = req.body; 
        const boxes = await boxModal.find({BK_id})
        const bookings = []

        for (const d of boxes) {
            const bd = await bookingModal.find({ B_id: d._id })
                                            .populate("U_id")
                                            .populate("B_id")
                                            .exec();
            bookings.push(...bd);
        }
        bookings.sort((a, b) => new Date(b.BBDate) - new Date(a.BBDate));
        res.status(200).send(bookings)
    }
    catch(e) {
        console.log(e);
        res.status(400).send({message: e.message})
    }
}

const getBoxDetails = async(req,res) => {
    try {
        const {BK_id} = req.body;
        const boxes = await boxModal.find({BK_id})
        res.status(200).json(boxes)
    }
    catch(e) {
        console.log(e)
    }
}

const getUsersDetail = async(req, res) => {
    try {
        const {BK_id} = req.body;
        const box = await boxModal.find({BK_id})
        let users = [];
        for (const d of box) {
            const bd = await bookingModal.find({ B_id: d._id })
                                            .populate('U_id')
            // bookings.push(...bd);
            bd.forEach((bd)=>{
                users.push(bd.U_id)
            })
        }

        const uniqueUsers = users.filter((user, index) => users.findIndex(u => u._id === user._id));
        res.status(200).json(uniqueUsers);
    }
    catch(e) {
        console.log(e);
    }
}

const boxPieData = async (req, res) => {
    try {
        const {BK_id} = req.body;
        const boxes = await boxModal.find({BK_id});
        const bookings = [];
        const boxNames = [];
    
        for (const b of boxes) {
            if (!boxNames.includes(b.BName)) {
                boxNames.push(b.BName);
            }
            const booking = await bookingModal.find({B_id: b._id});
            let total = 0;
            for(const book of booking) {
                total += (book.BBTotalAmount)
            }
            bookings.push(total);
        }
        res.send({bookings, boxNames});
    }
    catch(e) {
        console.log(e);
        res.status(200).send({message: e.message})
    }
}

const boxComparisionRevanue = async (req, res) => {
    try {
        const colors = {1: "red", 2: "blue", 3: 'green', 4: 'orange', 5: 'yellow', 6: "purple", 7: 'gray'}
        const {BK_id} = req.body;
        const currentYear = new Date().getFullYear();

        const boxes = await boxModal.find({BK_id});
        const details = [];
        let cnt = 1;
        for (const b of boxes) {
            const bookings = await bookingModal.find({
                B_id: b._id,
                BBDate: {
                    $gte: new Date(currentYear, 0, 1), 
                    $lte: new Date(currentYear, 11, 31, 23, 59, 59) // End of current year
                }
            })
            .sort({ BBDate: 1 }) 
            .exec();
            const monthlyRevenue = Array(12).fill(0); 

            bookings.forEach(booking => {
                const monthNumber = new Date(booking.BBDate).getMonth(); // Get month index (0-indexed)
                monthlyRevenue[monthNumber] += booking.BBTotalAmount; // Accumulate total amount for the month
            });

            const newObj = { 
                label: b.BName, 
                data: monthlyRevenue, 
                backgroundColor:  colors[cnt], 
                borderColor:  colors[cnt], 
                borderWidth: 2,
                fill: colors[cnt],
                tension: 0.4
            };
            cnt++;
            details.push(newObj);
        }
        
        res.send(details);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });
    }
}

const monthlyBookings = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const {BK_id} = req.body;


        const box = await boxModal.find({BK_id});
        const bookings = [];
        for(const b of box) {
            const booking = await bookingModal.find({
                B_id: b._id,
                BBDate: {
                    $gte: new Date(currentYear, 0, 1), 
                    $lte: new Date(currentYear, 11, 31, 23, 59, 59) // End of current year
                }
            })
            .sort({ BBDate: -1 })
            .exec();

            bookings.push(...booking)
        }

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

const newApplications = async (req, res) => {
    try {
        const { data } = req.body;
        const result = await applicationModal.create(data);
        if (result) {
            res.status(200).send({ message: "Application sent successfully" });
        } else {
            res.status(400).send({ message: "Failed to create application" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const getBKApplications = async (req, res) => {
    try {
        const {BK_id} = req.body;
        const applicationList = await applicationModal.find({BK_id });
        res.status(200).json(applicationList);
    }
    catch(e) {
        console.log(e)
        res.status(500).send({message: e.message})
    }
};

const cancelApplication = async (req, res) => {
    try {
        const {Id} = req.body;
        const response = await applicationModal.findByIdAndDelete({_id: Id});
        if(response) {
            return res.status(200).send({message: "Application Cancel Successfull"})
        }
        res.status(400).send({message: "Somthing wants wrong"})
    }
    catch(e) {
        console.log(e)
        res.status(500).send({message: e.message})
    }
}

const noOfBKApplication = async (req, res) => {
    try {
        const {BK_id} = req.body;
        const noOfApplication = await applicationModal.countDocuments({BK_id , ABStatus: "Accepted" });
        res.status(200).json({ noOfApplication });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

const addNewBox = async (req, res) => {

    try {
        const {Id} = req.body;
        const options = {
            amount: 500 * 100,
            currency: 'INR',
            receipt: 'order_receipt_' + Math.floor(Date.now() / 1000),
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json({ order })
    }
    catch(e) {
        console.log(e)
    }
}

const boxPaymentVarification = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const {Id} = req.query;

        const text = razorpay_order_id + "|" + razorpay_payment_id;
        var expectedSignature = crypto.createHmac('sha256', "7Oh9gRs0E4NyRPptXpFE7g03")
            .update(text)
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;
        if (isAuthentic) {
            const applicationData = await applicationModal.findById({_id: Id})
            
            const newBox = {
                BK_id: applicationData.BK_id,
                BName: applicationData.ABName,
                BCity: applicationData.ABCity,
                BArea: applicationData.ABArea,
                BAddress: applicationData.ABAddress,
                BDescription: applicationData.ABDescription,
                BPrice: applicationData.ABPrice,
                BImageURL: applicationData.ABImageURL,
                BSize: applicationData.ABSize,
            }

            const result = await boxModal.create(newBox);
            if(result) {
                const del = await applicationModal.findByIdAndDelete({_id: Id})
                if(del) {
                    res.redirect(`http://localhost:5174/applications`)
                }
                else {
                    res.status(500).send({message: 'somthing wants worng'})
                }
            }
            else {
                res.status(500).send({message: 'somthing wants worng'})
            }
            // res.status(200).send(applicationData)
        }
        else {
            res.status(400).json({ success: false, message: "Signature verification failed" });
        }
    }
    catch(e) {
        console.log(e.message)
    }
}

module.exports = {login, signup, 
    updateProfile, remove,
    bkcounter, 
    bkBookings, 
    getBoxDetails, 
    getUsersDetail, 
    boxPieData, 
    boxComparisionRevanue,
    monthlyBookings,
    newApplications,
    getBKApplications,
    cancelApplication,
    noOfBKApplication,
    addNewBox,
    boxPaymentVarification
}