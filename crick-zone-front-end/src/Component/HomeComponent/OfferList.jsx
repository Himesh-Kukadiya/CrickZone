import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';

const OfferList = () => {
    const [offerList, setOfferList] = useState([]); // Offer list Data

    useEffect(() => {
        axios.get("http://127.0.0.1:2020/offerList")
            .then((response) => {
                setOfferList(response.data);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []); 

    return (
        <>
            <section className="ftco-section bg-light" id="section-offer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mb-5 ftco-animate">
                            <h4 className="ftco-sub-title">Our Offers</h4>
                            <h2 className="display-4">Offers &amp; Promos</h2>
                            <div className="row justify-content-center">
                                <div className="col-md-7">
                                    <p className="lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-12">
                            <div className="owl-carousel ftco-owl">
                                
                                {offerList.map((data, index) => (
                                        <React.Fragment key={index}>
                                            <div className="item">
                                                <div className="media d-block mb-4 text-center ftco-media border-0"> {/* ftco-animate */}
                                                    <img src={"src/assets/images/Boxes/"+data.Bid.BImageURL} alt="Free Template by Free-Template.co" className="img-fluid" />
                                                        <div className="media-body p-md-5 p-4">
                                                            <h5 className="text-primary"> {data.Off}% Off Right Now </h5>
                                                            <h5 className="mt-0 h4">{data.Bid.BName}</h5>
                                                            <p className="mb-4">{data.Bid.BDescription}</p>
                                                            <p className="mb-0"><a href="#" className="btn btn-primary btn-sm">Book Now!</a></p>
                                                        </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ))}

                                        {/* <div className="item">
                                            <div className="media d-block mb-4 text-center ftco-media ftco-animate border-0">
                                                <img src={"src/assets/images/Boxes/box-3.jpg"} alt="Free Template by Free-Template.co" className="img-fluid" />
                                                    <div className="media-body p-md-5 p-4">
                                                        <h5 className="text-primary"> Off Right Now</h5>
                                                        <h5 className="mt-0 h4">Beef with Sauce</h5>
                                                        <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                                        <p className="mb-0"><a href="#" className="btn btn-primary btn-sm">Order Now!</a></p>
                                                    </div>
                                            </div>
                                        </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OfferList