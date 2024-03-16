const offersModal = require('../Modales/offers.Modal')
const BoxDetails = require('../Modales/boxDetailse.Modal')

const offersList = async (req, res) => {
    const offersDetail = await offersModal.find()
                                            .populate("Bid")
                                            .exec();
    console.log(offersDetail)
    res.status(200).send(offersDetail);
};

module.exports = {offersList};