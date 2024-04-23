// import React from 'react'

import {  useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'

const ChangePasswordModal = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData"))
        if(data != null && data != undefined && data != "") {
            setEmail(data.Email)
        }
        else {
            nav('/')
        }
    }, [])
    useEffect(()=> {
        console.log(email)
    }, [email])
    return (
        <>
            <div className="modal fade" id="ChangePassword" tabIndex="-1" role="dialog" aria-labelledby="ChangePasswordLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="ChangePasswordLabel">Change Your Password</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>Enter you Email address</h5>
                            <input type="email" className="form-control mt-2" name="email" value={email}
                            onChange={(e)=> {setEmail(e.target.value)}} readOnly />
                            <input type="submit" value={"Send OTP"} className={"mt-4 btn btn-primary"} 
                            style={{borderRadius: 5, backgroundColor: "blue", width: "100%", padding: 10, fontSize: 20, border: "none"}}
                            onClick={()=> {
                                
                            }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePasswordModal