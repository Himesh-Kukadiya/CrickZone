// import React from 'react';

import Footer from '../Component/Footer';
import AboutSection from '../Component/HomeComponent/AboutSection';
import BoxList from '../Component/HomeComponent/OfferList';
import MainSection from '../Component/HomeComponent/MainSection';
import { NavBar } from '../Component/HomeComponent/NavBar';


const HomePage = () => {
    return (
        <>
            <NavBar />
            <MainSection />
            <AboutSection />
            <BoxList />

            <Footer />
        </>
    )
}

export default HomePage;
