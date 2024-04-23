const offersModal = require('../Modales/offers.Modal')
const BoxDetails = require('../Modales/boxDetailse.Modal')

const offersList = async (req, res) => {
    const offersDetail = await offersModal.find()
                                            .populate("Bid")
                                            .exec();
    res.status(200).send(offersDetail);
};

const offerIdforBK = async (req, res) => {
    try {
        const offers = await offersModal.find();
        const offersId = [];
        for (let i = 0; i < offers.length; i++) {
            offersId.push(offers[i].Bid);
        }
        res.status(200).json(offersId);
    }
    catch(e) {
        console.log(e)
        res.status(500).send({message: e.message})
    }
}

const applayOffer = async (req, res) => {
    try {
        const { Bid, Off } = req.body;
        // Check if an offer with the given Bid already exists
        const existingOffer = await offersModal.findOne({ Bid });
        if (existingOffer) {
            // Update the existing offer
            existingOffer.Off = Off;
            await existingOffer.save();
            return res.status(200).send("Offer updated successfully");
        } else {
            // Create a new offer
            const newOffer = {
                Bid: Bid,
                Off: Off
            };
            const offer = await offersModal.create(newOffer);
            if (offer) {
                return res.status(200).send("Offer applied successfully");
            } else {
                return res.status(400).send("Something went wrong while applying the offer");
            }
        }
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: e.message });
    }
};

const deleteOffer = async (req, res) => {
    try{
        const {Bid} = req.body;
        const offer = await offersModal.findOneAndDelete({Bid: Bid});
        if(!offer) {
            return res.status(400).send({message: "Offer not found"});
        }
        res.status(200).json({message: "Offer deleted successfully"});
    }
    catch(e) {
        console.log(e)
        res.status(500).send({message: e.message})
    }
}

module.exports = {offersList, offerIdforBK,
    applayOffer, deleteOffer
};