// import React from 'react'
import PropsType from "prop-types"
import { useNavigate } from 'react-router-dom';
const ProfileModal = (props) => {
    const nav = useNavigate();
    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-light bg-dark">
                            <h5 className="modal-title text-light bg-dark" id="exampleModalLabel"> Hello, {props.userData.Name.toUpperCase()}</h5>
                            <button type="button" className="close text-light bg-dark" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container ml-3">
                                <div className="row">
                                    <div className="col-12 my-2">
                                        <center>
                                            <img src="/src/assets/images/users/default.jpg" style={{width: 170, height: 170, borderRadius: 100, boxShadow: '7px 7px 20px black'}} alt="demo" />
                                        </center>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-3">
                                        <h5>Name :</h5>
                                    </div>
                                    <div className="col-sm-7">
                                        <h6 className="text-dark text-dark mt-2">{props.userData.Name}</h6>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-3">
                                        <h5>Email :</h5>
                                    </div>
                                    <div className="col-sm-7">
                                        <h6 className="text-dark text-dark mt-2">{props.userData.Email}</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-3">
                                        <h5>Mobile :</h5>
                                    </div>
                                    <div className="col-sm-7">
                                        <h6 className="text-dark text-dark mt-2">{props.userData.Mobile}</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-3">
                                        <h5>City :</h5>
                                    </div>
                                    <div className="col-sm-7">
                                        <h6 className="text-dark text-dark mt-2">{props.userData.City}</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-3">
                                        <h5>Area :</h5>
                                    </div>
                                    <div className="col-sm-7">
                                        <h6 className="text-dark text-dark mt-2">{props.userData.Area}</h6>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-7 ml-2 mr-4" style={{border: '2px solid black', borderRadius: 10}}>
                                        <h6 className="text-dark" onClick={()=> {
                                            localStorage.removeItem("userData");
                                            nav('/login')
                                        }}>
                                            <i className="material-icons mt-2" style={{marginTop: 10}}>logout</i> 
                                            <span className="text-dark mt-2 pl-2" style={{fontSize: 20}}> Logout</span></h6>
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-7 ml-2 mr-4" style={{border: '2px solid black', borderRadius: 10}}>
                                        <h6 className="text-dark" onClick={()=> {
                                            // localStorage.removeItem("userData");
                                            nav('/forgetPassword')
                                        }}>
                                            <i className="material-icons mt-2" style={{marginTop: 10}}>password</i> 
                                            <span className="text-dark mt-2 pl-2" style={{fontSize: 20}}> Change Passwrod</span></h6>
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
    userData: PropsType.object.isRequired,
}

export default ProfileModal