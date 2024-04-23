const express = require('express')
const bodyParser = require('body-parser'); // for request body parsing
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

//Modules.
const userModal = require('../Modales/user.Modal');
const { options } = require('../RouterManager/RouterManager');

// signup request
const signup = async (req, res) => {
    const { name, city, area, mobile, email, password } = req.body; // body data

    try {
        const userExists = await userModal.findOne({ UEmail: email });
        if (userExists) {
            return res.status(400).json({ isSignedIn: false, message: 'User already exists' });
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            UName: name,
            UCity: city,
            UArea: area,
            UMobile: mobile,
            UEmail: email,
            UPassword: hashPassword,
            UImageURL: "default"
        };

        const data = await userModal.create(newUser);
        const userData = {
            "_id": user._id,
            "Name": user.UName,
            "City": user.UCity,
            "Area": user.UArea,
            "Mobile": user.UMobile,
            "Email": user.UEmail,
            "Image": user.UImageURL
        }
        res.status(200).json({ isSignedIn: true, message: 'User created successfully', userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ isSignedIn: false, message: 'Signup failed', error: error.message });
    }
}

// login Request
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModal.findOne({ UEmail: email });
        if (!user) {
            return res.status(404).json({ isLoggedIn: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.UPassword);
        if (!isMatch) {
            return res.status(401).json({ isLoggedIn: false, message: 'Invalid credentials' });
        }

        const userData = {
            "_id": user._id,
            "Name": user.UName,
            "City": user.UCity,
            "Area": user.UArea,
            "Mobile": user.UMobile,
            "Email": user.UEmail,
            "Image": user.UImageURL
        }
        res.status(200).json({ isLoggedIn: true, message: 'Login successful', userData });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}

// forget password
const sendOTP = async (req, res) => {
    const { email } = req.body;
    const OTP = generateOTP(6)
    const user = await userModal.findOne({UEmail:email})
    if(user) {
        const sub = "Change Your Password";
        const message = "Hello, " + user.UName + " you forget your password. Your OPT is - " + OTP + " to recover your password. We are trying to recover your password.";
        const from = "crickzone075@gmail.com"
        sendMail(sub, message, "himeshkukadiya075@gamil.com", from);
        return res.status(200).json({ email: email, OTP: OTP })
    }
    return res.status(500).send({message: "Can Not Find any User"})
}
const hashconverter = async (req, res) => {
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    res.send(hashPassword);
}

function generateOTP(len) {
    var OTP = ""
    for (let i = 1; i <= len; i++) {
        OTP += Math.floor(Math.random() * 10).toString();
    }
    return OTP;
}

function sendMail(subject, msg, email, from) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'publictransportsetup@gmail.com',
            pass: 'jbbjqsrplkcgniyz',
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    //Setup email data
    const mailOptions = {
        from: from,
        to: email,
        subject: subject,
        text: msg,
        html: '',
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error:', error);
        }
        console.log('Message sent:', info.messageId);
    });
}
module.exports = { login, signup, sendOTP, hashconverter }