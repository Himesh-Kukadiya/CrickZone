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
        if(signupData.password !== signupData.repassword) {
            seterrors("Password or RePassword Must Same")
            seterrorStatus(true)
            return;
        }
        else {
            axios
            .post("http://127.0.0.1:2020/boxKeeperSignup", signupData)
            .then((response) => {
                seterrors("signup successful");
                seterrorStatus(false)
                localStorage.setItem("boxKeeperData", JSON.stringify(response.data.boxKeeperData))
                setTimeout(() => {
                    navigate('/dashboard');
                }, 100);
            })
            .catch((error) => {
                seterrorStatus(true)
                seterrors(error.response.data.message);
            });
        }
    }

    useEffect( () => {
        if(localStorage.getItem("boxKeeperData") != null) {
            setTimeout(() => {
                seterrorStatus(false)
                seterrors("Login Success")
            }, 250)
            setTimeout(() => {
                seterrorStatus(false)
                seterrors("")
                navigate('/');
            }, 800);
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
                        {/* Mobile */}
                        <div className={SignupPageCss.form_wrapper}>
                            <input  name="mobile" type="number" onChange={handleInputs} required />
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
                            Already have account ? <Link to="/">Login</Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export default SignupPage