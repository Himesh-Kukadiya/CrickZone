import LoginPageCss from '../Css/LoginPage.module.css'
import { useState } from 'react'
import axios from "axios";
import { useNavigate} from 'react-router-dom' 


const LoginPage = () => {
    var navigate = useNavigate();
    const [loginData, setloginData] = useState({
        "email" : "",
        "password":""
    })
    const [errors, seterrors] = useState(null);
    const [errorStatus, seterrorStatus] = useState(false);
    
    const handleInputs = (e) => {
        const keyName = e.target.name;
        const value = e.target.value;
        setloginData({
            ...loginData,
            [keyName] : value
        })
    }

    const loginRequest = (e) => {
        e.preventDefault();
        axios
        .post("http://127.0.0.1:2020/adminLogin", loginData)
        .then((response) => {
            console.warn(response.data);
            seterrors("Login successful");
            seterrorStatus(false)
            console.log(response.data.useData)
            localStorage.setItem("adminData", JSON.stringify(response.data.data))
            setTimeout(() => {
                navigate('/dashboard');
            }, 200);
        })
        .catch((error) => {
            seterrorStatus(true)
            seterrors(error.response.data.message);
        });
    }

    // check use loged in or not...
    if(localStorage.getItem("adminData") != null) {
        setTimeout(() => {
            navigate('/dashboard');
        }, 100);
    }
    return (
        <div className={LoginPageCss.LoginBody}>
            <main className='Login'>
                <header>
                    <h4>Login</h4>
                </header>
                <form onSubmit={loginRequest}>
                {/* <form > */}
                    {/* Email */}
                    <div className={LoginPageCss.form_wrapper}>
                        <input className='input' id="input" name="email" type="text" onChange={handleInputs} required />
                            <label htmlFor="input">Email Id</label>
                            <i className="material-icons">email</i>
                    </div>
                    {/* Password */}
                    <div className={LoginPageCss.form_wrapper}>
                        <input className='input' id="password" name="password" type="password" onChange={handleInputs} required />
                            <label htmlFor="password">Password</label>
                            <i className="material-icons">lock</i>
                    </div>
                    {/* Error Message */}
                    <div className={LoginPageCss.form_wrapper}>
                        <label className={errorStatus ? LoginPageCss.errors : LoginPageCss.success}>{errors} </label>
                    </div>
                    <div className={LoginPageCss.remember_box}>
                        <div className={LoginPageCss.remember}>
                            <input type="checkbox" id="remember" />
                                <span htmlFor="remember">Remember me</span>
                        </div>
                        <a href="#">Forgot Password ?</a>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </main>
        </div>
    )
}

export default LoginPage