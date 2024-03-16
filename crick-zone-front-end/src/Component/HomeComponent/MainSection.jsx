// import React from 'react'
import bgImage from '../../assets/images/homeBody.jpg';
import Modal from './Modal';

const MainSection = () => {
    return (
        <>
            <section className="ftco-cover" style={{ backgroundImage: `url(${bgImage})` }} id="section-home">
                <div className="container">
                    <div className="row align-items-center justify-content-center text-center ftco-vh-100">
                        <div className="col-md-12">
                            <h1 className="ftco-heading ftco-animate mb-3">Welcome To CrickZone</h1>
                            <h2 className="h5 ftco-subheading mb-5 ftco-animate">We are find the best cricket zones for your ultimate enjoyment...</h2>
                            <p><a href="https://free-template.co/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-lg ftco-animate" data-toggle="modal" data-target="#reservationModal">Okay Lets Find</a></p>
                        </div>
                    </div>
                </div>
            </section>

            <Modal />
        </>
    )
}

export default MainSection