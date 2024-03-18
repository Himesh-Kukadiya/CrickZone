// import React from 'react';

import Footer from '../Component/Footer';
import AboutSection from '../Component/HomeComponent/AboutSection';
import MainSection from '../Component/HomeComponent/MainSection';
import { NavBar } from '../Component/HomeComponent/NavBar';
import OfferList from '../Component/HomeComponent/OfferList';


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
