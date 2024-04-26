import { useEffect, useState } from "react";
import "../assets/css/NavBar.css"
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from "axios"
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
    const nav = useNavigate();
    const [noOfApplication, setNoOfApplication] = useState(0);
    useEffect(()=> {
        axios.post("http://localhost:2020/noOfBKApplication", {BK_id: props.BK_id})
        .then((Response) => {
            setNoOfApplication(Response.data.noOfApplication)
        })
        .catch((e) => {
            console.error(e)
        })
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("boxKeeperData")
        setTimeout(()=> {
            nav('/')
        }, 500)
    }
    return (
        <>
            <aside id="sidebar">
                <div className="d-flex">
                    <button className="toggle-btn" onClick={() => {
                        document.querySelector("#sidebar").classList.toggle("expand");
                        var toggleBtn = document.querySelector('.toggle-icon');
                        toggleBtn.classList.toggle('rotating');
                    }} type="button">
                        <i className="lni lni-grid-alt toggle-icon"></i>
                    </button>
                    <div className="sidebar-logo">
                        <Link to="/"><span style={{ color: "red" }}>Crick</span><span style={{ color: "white" }}>Zone</span></Link>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link to="/dashboard" className="sidebar-link">
                            <i className="lni lni-dashboard mt-2"></i>
                            <span className="mb-2">Dashboard</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/applications" className="sidebar-link" style={{marginBottom: -10}} >
                            <div className="box" style={{ position: "relative", padding: "10px 0px"}}>
                                <i className="material-icons-outlined">chatbox_outline</i>
                                {noOfApplication == 0 ? " " : <b className="badge" style={{ position: "absolute", top: "0px", left: "10px" }}> {noOfApplication} </b>}
                            </div>
                                <span style={{position: "absolute", top: 20, marginLeft: 35}}>Application</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/users" className="sidebar-link">
                            <i className="lni lni-users"></i>
                            <span>User</span>
                        </Link>
                    </li>
                    {/* <li className="sidebar-item">
                        <Link to="/box-keepers" className="sidebar-link">
                            <i className="lni lni-user"></i>
                            <span>Box-Keepers</span>
                        </Link>
                    </li> */}
                    <li className="sidebar-item">
                        <Link to="/boxes" className="sidebar-link">
                            <i className="material-icons-outlined">check_box_outline_blank</i>
                            <span>Boxes</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/bookings" className="sidebar-link">
                            <i className="lni lni-calendar"></i>
                            <span>Booking</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/charts" className="sidebar-link">
                            <i className="lni lni-bar-chart"></i>
                            <span>Charts</span>
                        </Link>
                    </li>
                </ul> 
                <li className="sidebar-footer">
                        <Link to="/profile" className="sidebar-link">
                            <i className="lni lni-user"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                <div className="sidebar-footer">
                    <Link onClick={handleLogout} to="#" className="sidebar-link">
                        <i className="lni lni-exit"></i>
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    )
}

NavBar.propTypes = {
    BK_id: PropTypes.string
}

export default NavBar