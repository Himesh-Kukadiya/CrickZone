import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";

const NewApplication = (props) => {
    const navigate = useNavigate();
    const [data, setData] = useState({ BK_id: props.BK_id, ABStatus: "Applied", ABImageURL :"default.jpg", });
    const [heigth, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [length, setLength] = useState(0);
    const [error, setError] = useState({});
    const [message, setMessage] = useState();
    const [status, setStatus] = useState(false);

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    const applyNew = (e) => {
        e.preventDefault();

        let isError = false;
        const newError = {};

        if (!data.ABName || data.ABName.trim() === "") {
            newError.ABName = "*";
            isError = true;
        }
        if (!data.ABCity || data.ABCity.trim() === "") {
            newError.ABCity = "*";
            isError = true;
        }
        if (!data.ABArea || data.ABArea.trim() === "") {
            newError.ABArea = "*";
            isError = true;
        }
        if (!data.ABAddress || data.ABAddress.trim() === "") {
            newError.ABAddress = "*";
            isError = true;
        }
        if (!data.ABDescription || data.ABDescription.trim() === "") {
            newError.ABDescription = "*";
            isError = true;
        }
        if (!data.ABPrice  || data.ABPrice.trim() === "") {
            newError.ABPrice = "*";
            isError = true;
        }
        setError(newError);

        if (!(isError)) {
            const size = [heigth, width, length];
            setData({
                ...data,
                ABSize: size
            })
            // console.log(size)
            setStatus(true);
        }
    };

    useEffect(() => {
        if (status) {
            axios.post("http://localhost:2020/newApplications", { data })
                .then((Response) => {
                    setMessage(Response.data.message)
                    setError({})
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 500);
                })
                .catch((e) => {
                    setMessage(null)
                    setError({ message: e.response.data.message })
                })
        }
    }, [status])
    // useEffect(() => {
    //     
    // }, [status])

    const ErrorMessage = {
        color: "red",
        fontSize: 30
    }

    return (
        <div className="charts-card" style={{ background: "rgba(20, 20, 250, 0.1)", display: "inline-block" }}>
            <p className="chart-title"> </p>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"><strong>Box Name : </strong></div>
                    <div className="col-md-7 mb-2" >
                        <input type='text' onChange={handleInput} name="ABName"
                            placeholder="Box Name" className="form-control"
                            style={{ background: "transparent", color: "black", border: "2px solid black" }}
                        />
                    </div>
                    <div className="col-md-1">
                        <strong style={ErrorMessage}> {error.ABName} </strong>
                    </div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>City :</strong> </div>
                    <div className="col-md-7 mb-2" >
                        <input type='text' onChange={handleInput} name="ABCity"
                            placeholder="Box City" className="form-control"
                            style={{ background: "transparent", color: "black", border: "2px solid black" }}
                        />
                    </div>
                    <div className="col-md-1">
                        <strong style={ErrorMessage}> {error.ABCity} </strong>
                    </div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Area :</strong> </div>
                    <div className="col-md-7 mb-2" >
                        <input type='text' onChange={handleInput} name="ABArea"
                            placeholder="Box Area" className="form-control"
                            style={{ background: "transparent", color: "black", border: "2px solid black", }}
                        />
                    </div>
                    <div className="col-md-1">
                        <strong style={ErrorMessage}> {error.ABArea} </strong>
                    </div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Price :</strong> </div>
                    <div className="col-md-7 mb-2" >
                        <input type='number' onChange={handleInput} name="ABPrice"
                            placeholder="Box Price" className="form-control"
                            style={{ background: "transparent", color: "black", border: "2px solid black", }}
                        />
                    </div>
                    <div className="col-md-1">
                        <strong style={ErrorMessage}> {error.ABPrice} </strong>
                    </div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Address :</strong> </div>
                    <div className="col-md-7 mb-2" >
                        <input type='text' onChange={handleInput} name="ABAddress"
                            placeholder="Box Address " className="form-control"
                            style={{ background: "transparent", color: "black", border: "2px solid black", }}
                        />
                    </div>
                    <div className="col-md-1">
                        <strong style={ErrorMessage}> {error.ABAddress} </strong>
                    </div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Description :</strong> </div>
                    <div className="col-md-7 mb-2" >
                        <input type='text' onChange={handleInput} name="ABDescription"
                            placeholder="Box Description" className="form-control"
                            style={{ background: "transparent",  border: "2px solid black", color: "black" }}
                        />
                    </div>
                    <div className="col-md-1">
                        <strong style={ErrorMessage}> {error.ABDescription} </strong>
                    </div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Size :</strong></div>
                    <div className="col-md-7 mb-2" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ marginLeft: 20, }}>
                            <span style={{ fontSize: 20, fontWeight: "bold" }}>H</span> <input type='number' name="H"
                                placeholder="Heigth" className="form-control"
                                onChange={(e) => setHeight(e.target.value)}
                                style={{ background: "transparent", border: "2px solid black", maxWidth: 150, display: "inline-block", color: "black" }}
                            />
                        </div>
                        <div style={{ marginLeft: 20, }}>
                            <span style={{ fontSize: 20, fontWeight: "bold" }}>W</span> <input type='number' name="H"
                                placeholder="Width" className="form-control"
                                onChange={(e) => setWidth(e.target.value)}
                                style={{ background: "transparent", border: "2px solid black", maxWidth: 150, display: "inline-block", color: "black" }}
                            />
                        </div>
                        <div style={{ marginLeft: 20, }}>
                            <span style={{ fontSize: 20, fontWeight: "bold" }}>L</span> <input type='number' name="H"
                                placeholder="Length" className="form-control"
                                onChange={(e) => setLength(e.target.value)}
                                style={{ background: "transparent", border: "2px solid black", maxWidth: 150, display: "inline-block", color: "black" }}
                            />
                        </div>
                    </div>
                    <div className="col-md-1"><strong style={ErrorMessage}> {error.ABAddress} </strong></div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 mb-2" > <button onClick={applyNew} className="btn btn-primary form-control" > A P P L Y </button> </div>
                </div>
                {message !== null && (
                    <div className="row">
                        <div className="col-12 text-success text-center">
                            <strong>{message}</strong>
                        </div>
                    </div>
                )}
                {error.message !== null && (
                    <div className="row">
                        <div className="col-12 text-danger text-center">
                            <strong>{error.message}</strong>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

NewApplication.propTypes = {
    BK_id: PropTypes.string
}
export default NewApplication