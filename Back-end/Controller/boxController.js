const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

app.use(bodyParser.json());
app.use(express.json()); 

const boxDetailse = require('../Modales/boxDetailse.Modal');
const Galary = require('../Modales/galary.Modal')
const boxList = async (req, res) => {
    try {
        const boxDetails = await boxDetailse.find();
        if(boxDetails) {
            return res.status(200).json({boxDetails})
        }
    }
    catch(err) {
        console.log(err)
    }
}

const boxDetail = async (req, res) => {
    try{
        const {B_id} = req.body;
        const Box = await boxDetailse.findOne({_id: B_id})
        // console.log(data)
        res.status(200).json(Box)
    }
    catch(err) {

    }
}

const getGalary = async(req, res) => {
    try {
        const {B_id} = req.body;
        const image = await Galary.findOne({B_id})
        const imageUrl = image.Images.map((x)=> {
            return {url : "/src/assets/images/galary/" + x}
        })
        res.status(200).json(imageUrl)
        // res.send("hello")
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = { boxList, boxDetail, getGalary };
