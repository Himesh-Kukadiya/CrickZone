import { Link } from 'react-router-dom';

export const NavBar = () => {
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
                            {/* <li className="nav-item"><a href="#section-menu" className="nav-link">Menu</a></li>
                            <li className="nav-item"><a href="#section-news" className="nav-link">News</a></li>
                            <li className="nav-item"><a href="#section-gallery" className="nav-link">Gallery</a></li>
                            <li className="nav-item"><a href="#section-contact" className="nav-link">Contact</a></li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
