const express = require('express')
const bodyParser = require('body-parser'); // for request body parsing
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(express.json()); 

//Modules.
const userModal = require('../Modales/user.Modal')

// login Request
const login = async(req, res) => {
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

        // Assuming the login is successful, and you're not using tokens for this example
        res.status(200).json({ isLoggedIn: true, message: 'Login successful', data: {"Id": user._id, "Name": user.UName, "City": user.UCity, "Area": user.UArea, "Email": user.UEmail} });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}

const hashconverter = async (req, res) => {
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    res.send(hashPassword);
}
module.exports = {login, logout, signup, hashconverter}