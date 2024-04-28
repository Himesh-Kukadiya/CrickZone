// import { ChangeEvent, useState } from 'react'
import { useState } from 'react'
import '../../assets/css/MainSection.css'
import axios from 'axios';
import ProfileImageChangeModa from './ProfileImageChangeModa';


const Profile = () => {
    const [adminData, setadminData] = useState({});

    useState(() => {
        const data = JSON.parse(localStorage.getItem("adminData"));
        setadminData(data);
    }, [])

    const changeHandle = (e) => {
        setadminData({
            ...adminData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <main className="main-container">
                <div className="main-title">
                    <p className="font-weight-bold"><strong>My Profile</strong></p>
                </div>

                <div className="table-data" >
                    <div className="bookings">
                        <div className="tbl" style={{ maxHeight: 500, }}>
                            <div className="container text-md-center p-3" style={{ border: "2px solid black", borderRadius: 10 }}>
                                <div className="row">
                                    <div className="col-12 pt-1 pb-3 text-center">
                                        <img src={`http://localhost:2020/Images/users/${adminData.AImageURL}`}
                                            alt={`${adminData.AName}`}
                                            style={{ borderRadius: '100%', boxShadow: '2px 2px 10px black', cursor: 'pointer' }}
                                            width={150} height={150} 
                                            data-toggle="modal" data-target="#changeImage"
                                        />
                                        {/* <input type="file" name='file' /> */}
                                    </div>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3"> <strong>Name:</strong> </div>
                                    <div className="col-md-5">
                                        <input type="text" name='AName'
                                            value={adminData.AName} onChange={changeHandle}
                                            className='form-control' style={{ border: "2px solid black", color: 'black' }} />
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3"> <strong>Email:</strong> </div>
                                    <div className="col-md-5">
                                        <input type="text" name='AEmail'
                                            value={adminData.AEmail}
                                            className='form-control' style={{ border: "2px solid black", color: 'black' }} />
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3"> <strong>Mobile:</strong> </div>
                                    <div className="col-md-5 pb-3">
                                        <input type="text" name='AMobile'
                                            value={adminData.AMobile} onChange={changeHandle}
                                            className='form-control' style={{ border: "2px solid black", color: 'black' }} />
                                    </div>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3"> </div>
                                    <div className="col-md-5">
                                        <button className='btn btn-primary form-control'
                                            onClick={() => {
                                                axios.post("http://localhost:2020/editAdminProfile", { data: adminData })
                                                    .then((Response) => {
                                                        localStorage.setItem("adminData", JSON.stringify(Response.data))
                                                    })
                                                    .catch((e) => {
                                                        console.error(e.response.data)
                                                    })
                                            }}
                                        > Edit Profile </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ProfileImageChangeModa />
        </>
    )
}

export default Profile