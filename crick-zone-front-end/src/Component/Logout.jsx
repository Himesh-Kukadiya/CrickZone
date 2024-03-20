import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("userData")
        navigate('/')
    });
    return (
        <div>Logout</div>
    )
}

export default Logout