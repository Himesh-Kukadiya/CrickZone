import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const OffersModal = (props) => {
    const [off, setOff] = useState(0);
    const applayOffer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2020/applayOffer", { Bid: props.boxData._id, Off: off });
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <div className="modal fade" id="OffersModal" tabIndex="-1" role="dialog" aria-labelledby="OffersModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <form >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="OffersModalLabel">Applay Offer on {props.boxData.BName} </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <strong>Off(%) :</strong>
                                        </div>
                                        <div className="col-md-8">
                                            <input className='form-control' type="number" value={off} name="Off"
                                                placeholder='how may percent off?' style={{ border: "2px solid black", color: "black" }}
                                                onChange={(e) => setOff(e.target.value)} min={0} max={100} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type='submit' onClick={applayOffer}  value={"Applay Offer"} className="btn btn-primary" data-dismiss="modal" aria-label="Close" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

OffersModal.propTypes = {
    boxData: PropTypes.object,
}
export default OffersModal