import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const BoxDetailTable = (props) => {
    const [data, setData] = useState([])
    const [offersId, setOffersId] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2020/offerIdforBK")
        .then((Response) => {
            setOffersId(Response.data)
        })
        .catch((e) => {
            console.error(e)
        })
    }, [props.status]) 
    useEffect(()=>{
        console.log(offersId)
    }, [offersId])
    useEffect(() => {
        axios.post("http://localhost:2020/getBKBoxDetails", {BK_id: props.BK_id})
            .then(response => {
                const data = response.data;
                setData(data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <div className="table-data">
                <div className="bookings">
                    <div className="head">
                        <h3 style={{ display: "inline-block" }}>Box Details</h3>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="tbl" style={{maxHeight: 500,}}>
                        <table className="table table-bordered text-center table-striped">
                            <thead>
                                <tr>
                                    <th className="bg-dark text-light">#</th>
                                    <th className="bg-dark text-light">Box Name</th>
                                    <th className="bg-dark text-light">Price</th>
                                    <th className="bg-dark text-light">Size</th>
                                    <th className="bg-dark text-light">City</th>
                                    <th className="bg-dark text-light">Area</th>
                                    <th className="bg-dark text-light">Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((box) => (
                                    <tr key={box._id}>
                                        <td><img 
                                        src={`http://localhost:2020/Images/Boxes/${box.BImageURL}`} 
                                        style={{height: 70, width: 70, borderRadius: 100, cursor: "pointer",
                                            boxShadow: "2px 2px 10px black", border: "1px solid gray"}} 
                                            onClick={()=> {
                                                props.setB_id(box._id)
                                                props.setBImageURL(box.BImageURL)
                                            }}
                                        alt={box.BImageURL} data-toggle="modal" data-target="#BoxImage"
                                        /></td>
                                        <td>{box.BName}</td>
                                        <td>{box.BPrice}</td>
                                        <td>
                                            H-{box.BSize[0]}, <br /> 
                                            W-{box.BSize[1]}, <br />
                                            L-{box.BSize[2]}, 
                                        </td>
                                        <td>{box.BCity}</td>
                                        <td>{box.BArea}</td>
                                        <td style={{display: "flex", justifyContent: "space-evenly"}}>
                                            <button className="btn btn-success" style={{padding: 0, paddingTop: 2, paddingLeft: 3, paddingRight: 3}}>
                                                <span className="material-icons-outlined text-blue">edit </span>
                                            </button> 
                                            <button className="btn btn-danger" style={{padding: 0, paddingTop: 2, paddingLeft: 3, paddingRight: 3}}
                                                onClick={() => {
                                                    console.log(box._id)
                                                    axios.post("http://localhost:2020/deleteBox", {_id: box._id})
                                                    .then((response) => {
                                                        console.log(response.data)
                                                    })
                                                    .catch(e=> console.error(e.response.data))
                                                }}
                                            >
                                                <span className="material-icons-outlined text-blue">delete </span>
                                            </button>
                                            <button className={offersId.includes(box._id) ? "btn btn-primary" : "btn btn-secondary"} 
                                            data-toggle="modal" data-target="#OffersModal" 
                                            style={{padding: 0, paddingTop: 2, paddingLeft: 3, paddingRight: 3}}
                                            onClick={()=> {
                                                props.setB_id(box._id)
                                                props.setStatus("trye")
                                            }}>
                                                <span className="material-icons-outlined text-blue">event_available</span>
                                            </button>

                                            {offersId.includes(box._id) ? 
                                            <button className="btn btn-danger" type="button"
                                            style={{padding: 0, paddingTop: 2, paddingLeft: 3, paddingRight: 3}}
                                            onClick={() => {
                                                console.log(box._id)
                                                axios
                                                .post("http://localhost:2020/deleteOffer", {Bid: box._id})
                                                .catch((e) => {
                                                    console.log(e.response.data.message)
                                                })
                                            }}
                                            >
                                                <span className="material-icons-outlined text-blue">cancel </span>
                                            </button> : ""}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </>
    )
}

BoxDetailTable.propTypes = {
    BK_id: PropTypes.string,
    setBImageURL: PropTypes.func,
    setB_id: PropTypes.func,
    status: PropTypes.string,
    setStatus: PropTypes.func
};

export default BoxDetailTable