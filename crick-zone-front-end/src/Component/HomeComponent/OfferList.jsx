// import React from 'react'

import demo from '../../assets/images/offer_1.jpg'
import axios from 'axios';
import { useEffect, useState } from 'react';

const OfferList = () => {
    const [imagelist, setimagelist] = useState(["../../assets/images/offer_1.jpg"]);

    useEffect(() => {
        axios.get("http://127.0.0.1:2020/imagelist")
        .then((response) => {
            const resdata = response.data;
            const newImageList = [...imagelist]; // Create a copy of the existing array
            resdata.forEach((data) => {
                newImageList.push(data.url); // Add new URLs to the copy
            });
            setimagelist(newImageList); // Update the state with the new array
        })
        .catch((error) => {
            console.warn(error);
        });


    }, []);

    // useEffect( () => {
    //     console.log(imagelist)
    // }, [imagelist])

    return (
        <>
            <div>
            {imagelist.map((image, index) => (
                <img key={index} src={image} alt={`Offer ${index}`} style={{ width: '100px', height: '100px' }} />
                // <li key={index} src={image}> {image} </li>
            ))}
        </div>
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

                                <div className="item">
                                    <div className="media d-block mb-4 text-center ftco-media ftco-animate border-0">
                                        <img src={demo} alt="Free Template by Free-Template.co" className="img-fluid" />
                                            <div className="media-body p-md-5 p-4">
                                                <h5 className="text-primary">$39.50</h5>
                                                <h5 className="mt-0 h4">Beef with Sauce</h5>
                                                <p className="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>

                                                <p className="mb-0"><a href="#" className="btn btn-primary btn-sm">Order Now!</a></p>
                                            </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default OfferList