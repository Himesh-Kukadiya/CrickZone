// import React from 'react';

const AboutSection = () => {
    return (
        <>
            <section className="ftco-section" id="section-about">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 ftco-animate mb-5">
                            <h4 className="ftco-sub-title">Our Story</h4>
                            <h2 className="ftco-primary-title display-4">Welcome</h2>
                            <p>In city streets, box cricket thrives, echoing excitement with every shot and holding anticipation with every wicket fallen...</p>

                            <p className="mb-4">Under neon lights and amidst towering buildings, players from diverse backgrounds unite, showcasing skill and strategy. In this urban arena, each match is a spectacle, each delivery a challenge, defining the spirit of box cricket...</p>
                            <p><a href="#" className="btn btn-secondary btn-lg">Our Story</a></p>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-6 ftco-animate img" data-animate-effect="fadeInRight">
                            <img src={"src/assets/images/login.jpg"} style={{}} alt="Free Template by Free-Template.co" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutSection;
