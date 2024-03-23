// import React from 'react';

import BoxList from '../Component/BoxList/BoxList';
import Footer from '../Component/Footer';
import AboutSection from '../Component/PublicHomeComponent/AboutSection';
import ContactSection from '../Component/PublicHomeComponent/ContactSection';
import MainSection from '../Component/PublicHomeComponent/MainSection';
import { NavBar } from '../Component/PublicHomeComponent/NavBar';
import OfferList from '../Component/PublicHomeComponent/OfferList';


const HomePage = () => {
    return (
        <>
            <NavBar />
            <MainSection />
            <OfferList />
            <BoxList />
            <AboutSection />
            <ContactSection />
            <Footer />
        </>
    )
}

export default HomePage;
