// import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// import { useEffect, useState } from "react";
// import axios from "axios";
const ProfileModal = (props) => {
    // const [userProfile, setUserProfile] = useState({});

    // const sendPrfileRequrest = async () => {
    //     const data = await axios.post("http://127.0.0.1:2020/userprofile", {id: props.userData._id});
    //     if(!userProfile) {
    //         setUserProfile(data)
    //     }
    // }
    // useEffect(() => {
    //     console.log(props.userData )
    //     console.log("hello")
    //     sendPrfileRequrest();
    // })
    // useEffect(() => {
    //     console.log(userProfile)
    // }, [userProfile])
    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-dark">
                            <h5 className="modal-title text-light" id="exampleModalLabel"> Hello, {props.userData.Name} </h5>
                            <button type="button" className="close bg-dark text-light" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 mb-5">
                                        <center>
                                            <img src={"/src/assets/images/users/"+ (props.userData.Image == "" ? "default.png" : props.userData.Image)} alt="bg_3.jpg" style={{width: 200, height: 200, borderRadius: 95, boxShadow: "7px 7px 20px black"}} />
                                        </center>
                                    </div>
                                </div>
                                <div className="row ml-3">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-3">
                                        <h5> Name : </h5>
                                    </div>
                                    <div className="col-sm-7">
                                        <span style={{color: "black"}}>{props.userData.Name}</span>
                                    </div>
                                </div>
                                <div className="row ml-3">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-3">
                                        <h5> Email : </h5>
                                    </div>
                                    <div className="col-sm-7">
                                        <span style={{color: "black"}}>{props.userData.Email}</span>
                                    </div>
                                </div>
                                <div className="row ml-3">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-3">
                                        <h5> Mobile : </h5>
                                    </div>
                                    <div className="col-sm-7">
                                        <span style={{color: "black"}}>{props.userData.Mobile}</span>
                                    </div>
                                </div>
                                <div className="row ml-3">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-3">
                                        <h5> City : </h5>
                                    </div>
                                    <div className="col-sm-7">
                                        <span style={{color: "black"}}>{props.userData.City}</span>
                                    </div>
                                </div>
                                <div className="row ml-3 mb-4">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-3">
                                        <h5> Area : </h5>
                                    </div>
                                    <div className="col-sm-7">
                                        <span style={{color: "black"}}>{props.userData.Area}</span>
                                    </div>
                                </div>
                                <div className="row ml-3">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-7">
                                    <Link type="button"  to="/logout" className="btn btn-outline-danger" style={{width: "100%"}}>Logout</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
ProfileModal.propTypes = {
    userData: PropTypes.object.isRequired,
}
export default ProfileModal