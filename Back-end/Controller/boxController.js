const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

app.use(bodyParser.json());
app.use(express.json()); 

const boxDetailse = require('../Modales/boxDetailse.Modal');
const Galary = require('../Modales/galary.Modal');
const boxdetailModal = require('../Modales/boxBooking.Modal');
const boxModal = require('../Modales/boxDetailse.Modal');

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
        res.status(200).json(Box)
    }
    catch(err) {

    }
}

const deleteBox = async (req, res) => {
    try {
        const { _id } = req.body;

        // Check if the document exists
        const box = await boxModal.findById(_id);
        if (!box) {
            return res.status(404).send("Box not found");
        }

        // Delete the document
        const deletedBox = await boxModal.findByIdAndDelete(_id);
        if (deletedBox) {
            return res.status(200).send("Deleted successfully");
        } else {
            return res.status(500).send("Failed to delete");
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
};

const getGalary = async(req, res) => {
    try {
        const {B_id} = req.body;
        const image = await Galary.findOne({B_id})
        const imageUrl = image.Images.map((x)=> {
            return {url : "/src/assets/images/galary/" + x}
        })
        res.status(200).json(imageUrl)
    }
    catch(err) {
        console.log(err)
    }
}

const getBoxDetails = async (req, res) => {
    try {
        const {_id} = req.body;
        if(_id != "") {
            const box = await boxDetailse.findOne({_id})
            return res.status(200).json(box)
        }
        else {
            return res.status(400).send({message: "invalid id"})
        }
    }
    catch(e) {
        console.log(e)
        res.status(500).send({message: e.message})
    }
}

module.exports = { boxList, boxDetail, getGalary, deleteBox, getBoxDetails };
