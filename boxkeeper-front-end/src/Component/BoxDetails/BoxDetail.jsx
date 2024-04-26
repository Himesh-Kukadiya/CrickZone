import '../../assets/css/MainSection.css'
import BoxDetailTable from './BoxDetailTable'
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'
import BoxImageModal from './BoxImageModal';
import OffersModal from './OffersModal';
import axios from 'axios';
const BoxDetail = (props) => {
    const [B_id, setB_id] = useState("");
    const [BImageURL, setBImageURL] = useState("");
    const [boxData, setBoxData] = useState({});
    const [status, setStatus]  = useState([]);

    useEffect(() => {
        axios.post("http://localhost:2020/getBoxDetails", { _id: B_id })
            .then(response => {
                const data = response.data;
                setBoxData(data)
            })
            .catch(error => {
                console.log(error.response.data.message);
            });
    }, [B_id]);
    return (
        <>
            <main className="main-container">
                <div className="main-title" >
                    <p className="font-weight-bold"><strong>Box List</strong></p>
                </div>
                <BoxDetailTable BK_id={props.BK_id} setBImageURL={setBImageURL} setB_id={setB_id} />
            </main>
            <BoxImageModal B_id={B_id} BImageURL={BImageURL}  />
            <OffersModal boxData={boxData} status={status} setStatus={setStatus} />
        </>
    )
}

BoxDetail.propTypes = {
    BK_id: PropTypes.string
};
export default BoxDetail