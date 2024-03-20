import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../Css/CustomCss.Module.css'
import ProfileModal from './ProfileModal';
export const NavBar = () => {
    const navigate = useNavigate();
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"));
        if (user) {
            if (!isLogedIn) {
                setIsLogedIn(true)
                setUserData(user)
            }
        }
    })

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light " id="ftco-navbar">
                <div className="container">
                    <Link className="navbar-brand text-dark" to="/">Crick<span className='text-primary'>Zone</span></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
                    </button>

                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><a href="#section-home" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="#section-about" className="nav-link">About</a></li>
                            <li className="nav-item"><a href="#section-offer" className="nav-link">Offers</a></li>
                            <li className="nav-item"><button type="button" className="nav-link btn btn-outline-danger"
                                data-toggle="modal" data-target="#exampleModal"
                                onClick={() => { if (!isLogedIn) { navigate("/login") } }} style={{ padding: 10, marginTop: 20 }}>
                                {isLogedIn ? "Pofile" : "Login"}</button></li>
                            {/* <li className="nav-item"><a href="#section-menu" className="nav-link">Menu</a></li>
                            <li className="nav-item"><a href="#section-news" className="nav-link">News</a></li>
                            <li className="nav-item"><a href="#section-gallery" className="nav-link">Gallery</a></li>
                            <li className="nav-item"><a href="#section-contact" className="nav-link">Contact</a></li>
                            <button >
  Launch demo modal
</button>
                            
                            */}
                        </ul>
                    </div>
                </div>
            </nav>

            <ProfileModal userData={userData} />
        </>
    )
}
