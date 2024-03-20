// import React from 'react';

import Footer from '../Component/Footer';
import AboutSection from '../Component/PublicHomeComponent/AboutSection';
import MainSection from '../Component/PublicHomeComponent/MainSection';
import { NavBar } from '../Component/PublicHomeComponent/NavBar';
import OfferList from '../Component/PublicHomeComponent/OfferList';


const HomePage = () => {
    return (
        <>
            <NavBar />
            <MainSection />
            <AboutSection />
            <OfferList />
            
            <Footer />
        </>
    )
}

export default HomePage;
