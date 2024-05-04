import { useState, useEffect } from 'react';
import axios from 'axios';

const ChangePasswordModal = () => {
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        myOtp: '',
        password: '',
        confPass: '',
        error: '',
        showOTPVerification: false,
        showChangePassword: false
    });
    const [closeModal, setCloseModal] = useState(false)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'));
        if (data != null && data != undefined && data != '') {
            setFormData(prevState => ({ ...prevState, email: data.Email }));
        }
    }, []);

    const sendOTP = () => {
        axios
            .post('http://localhost:2020/sendOTP', { email: formData.email })
            .then((response) => {
                setFormData(prevState => ({
                    ...prevState,
                    otp: response.data.OTP,
                    email: response.data.email,
                    showOTPVerification: true
                }));
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const varifyOtp = () => {
        if (formData.otp === formData.myOtp) {
            setFormData(prevState => ({ ...prevState, showChangePassword: true }));
        } else {
            setFormData(prevState => ({ ...prevState, error: "Invalid OTP" }));
        }
    };

    const changePassword = () => {
        if (formData.password === formData.confPass) {
            axios
                .post('http://localhost:2020/changePassword', { email: formData.email, password: formData.password })
                .then((response) => {
                    console.log(response.data.message);
                    setCloseModal(true)
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                });
        } else {
            alert('Password and Confirm Password Must Be the Same');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            {/* sendEmail Modal */}
            <div className="modal fade" id="ChangePassword" tabIndex="-1" role="dialog" aria-labelledby="ChangePasswordLabel" aria-hidden="true">
                { !formData.showOTPVerification ?
                    (<div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="ChangePasswordLabel">Send Password Recovery Email</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5>Your Email Address</h5>
                                <input
                                    type="email"
                                    className="form-control mt-2"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <input
                                    type="submit"
                                    value={'Send OTP'}
                                    className={'mt-4 btn btn-primary'}
                                    style={{ borderRadius: 5, backgroundColor: 'blue', width: '100%', padding: 10, fontSize: 20, border: 'none' }}
                                    onClick={sendOTP}
                                />
                            </div>
                        </div>
                    </div>)
                :
                !formData.showChangePassword ?
                    // VarifyOtp Modal
                    (<div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="ChangePasswordLabel">Verify OTP Code</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5>Your Email Address</h5>
                                <input
                                    type="email"
                                    className="form-control mt-2"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    readOnly
                                />
                                <h5>Enter Your OTP</h5>
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    name="myOtp"
                                    value={formData.myOtp}
                                    onChange={handleChange}
                                />
                                <input
                                    type="submit"
                                    value={'Verify OTP'}
                                    className={'mt-4 btn btn-primary'}
                                    style={{ borderRadius: 5, backgroundColor: 'blue', width: '100%', padding: 10, fontSize: 20, border: 'none' }}
                                    onClick={varifyOtp}
                                />
                                <input
                                    type="submit"
                                    value={'Resend OTP'}
                                    className={'mt-4 btn btn-primary'}
                                    style={{ borderRadius: 5, backgroundColor: 'blue', width: '100%', padding: 10, fontSize: 20, border: 'none' }}
                                    onClick={sendOTP}
                                />
                                <br />
                                <h5 className='text-danger'>{formData.error}</h5>
                            </div>
                        </div>
                    </div>)
                    :
                    // cnage Password Modal
                    (<div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="ChangePasswordLabel">Change Your Password</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5>Your Email Address</h5>
                                <input
                                    type="email"
                                    className="form-control mt-2"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <h5>Enter Your Password</h5>
                                <input
                                    type="password"
                                    className="form-control mt-2"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={{ border: "1px solid black" }}
                                />
                                <h5>Confirm Your Password</h5>
                                <input
                                    type="password"
                                    className="form-control mt-2"
                                    name="confPass"
                                    value={formData.confPass}
                                    onChange={handleChange}
                                    style={{ border: "1px solid black" }}
                                />
                                <input
                                    type="submit"
                                    value={'Change Password'}
                                    className={'mt-4 btn btn-primary'}
                                    style={{ borderRadius: 5, backgroundColor: 'blue', width: '100%', padding: 10, fontSize: 20, border: 'none' }}
                                    onClick={changePassword}
                                    data-dismiss={closeModal ? "modal" : null}
                                />
                            </div>
                        </div>
                    </div>)
                }
            </div>
            {/* OTPVarification Modal */}
            
        </>
    );
};

export default ChangePasswordModal;