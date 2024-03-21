// import React from 'react'
import SignupPageCss from '../Css/LoginPage.module.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


// import axios from "axios";

const SignupPage = () => {
    var navigate = useNavigate();

    const [errors, seterrors] = useState(null);
    const [errorStatus, seterrorStatus] = useState(false);
    const [signupData, setsignupData] = useState({
        "name": "",
        "city": "",
        "area": "",
        "mobile": "",
        "email" : "",
        "password":"",
        "repassword": ""
    })

    const handleInputs = (e) => {
        const keyName = e.target.name;
        const value = e.target.value;
        setsignupData({
            ...signupData,
            [keyName] : value.toLowerCase()
        })
    }

    const signupRequest = (e) => {
        e.preventDefault();
        console.log(signupData.password, signupData.repassword);
        if(signupData.password !== signupData.repassword) {
            seterrors("Password or RePassword Must Same")
            seterrorStatus(true)
            return;
        }
        else {
            axios
            .post("http://127.0.0.1:2020/usersignup", signupData)
            .then((response) => {
                console.warn(response.data);
                seterrors("signup successful");
                seterrorStatus(false)
                localStorage.setItem("userData", JSON.stringify(response.data.userData))
                setTimeout(() => {
                    navigate('/');
                }, 500);
            })
            .catch((error) => {
                seterrorStatus(true)
                seterrors(error.response.data.message);
            });
        }
    }

    useEffect( () => {
        if(localStorage.getItem("userData") != null) {
            setTimeout(() => {
                navigate('/');
            }, 100);
        }
    }, [])
    return (
        <>
            <div className={SignupPageCss.LoginBody}>
                <main>
                    <header>
                        <h4>Sign Up</h4>
                    </header>
                    <form onSubmit={signupRequest}>
                        {/* Name */}
                        <div className={SignupPageCss.form_wrapper}>
                            <input  name="name" type="text" onChange={handleInputs} required />
                                <label htmlFor="input">Name</label>
                                <i className="material-icons">person</i>
                        </div>
                        {/* City and Area in one row */}
                        <div className={SignupPageCss.remember}>
                        {/* City */}
                            <div className={SignupPageCss.form_wrapper}>
                                <input  name="city" type="text" onChange={handleInputs} required />
                                    <label htmlFor="input">City</label>
                                    <i className="material-icons">place</i>
                            </div>
                        {/* Area */}
                            <div className={SignupPageCss.form_wrapper}>
                                <input  name="area" type="text" onChange={handleInputs} required />
                                    <label htmlFor="input">Area</label>
                                    <i className="material-icons">person_pin</i>
                            </div>
                        </div>
                        {/* Mobile */}
                        <div className={SignupPageCss.form_wrapper}>
                            <input  name="mobile" type="text" onChange={handleInputs} required />
                                <label htmlFor="input">Mobile</label>
                                <i className="material-icons">phone</i>
                        </div>
                        {/* Email */}
                        <div className={SignupPageCss.form_wrapper}>
                            <input  name="email" type="text" onChange={handleInputs} required />
                                <label htmlFor="input">Email</label>
                                <i className="material-icons">email</i>
                        </div>                    
                        {/* Password and RePassword in one row */}
                        <div className={SignupPageCss.remember}>
                        {/* Password */}
                        <div className={SignupPageCss.form_wrapper}>
                            <input id="password" name="password" type="password" onChange={handleInputs} required />
                                <label htmlFor="password">Password</label>
                                <i className="material-icons">lock</i>
                        </div>
                        {/* RePassword */}
                        <div className={SignupPageCss.form_wrapper}>
                            <input id="repassword" name="repassword" type="password" onChange={handleInputs} required />
                                <label htmlFor="repassword">Re Password</label>
                                <i className="material-icons">lock</i>
                            </div>
                        </div>
                        {/* Error Message */}
                        <div className={SignupPageCss.form_wrapper}>
                        <label className={errorStatus ? SignupPageCss.errors : SignupPageCss.success} >{errors} </label>
                        </div>
                        <button type='submit'>Sign Up</button>
                        <div className={SignupPageCss.new_account}>
                            Already have account ? <Link to="/login">Login</Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export default SignupPage