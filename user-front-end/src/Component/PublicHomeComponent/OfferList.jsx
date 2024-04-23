import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OfferList = () => {
    const [offerList, setOfferList] = useState([]); 
    useEffect(() => {
        axios.get("http://127.0.0.1:2020/offerList")
            .then((response) => {
                setOfferList(response.data);
            })
            .catch((error) => {
                console.warn(error);
            });
    }, []);

    // fucntions
    return (
        <>
            <section className="ftco-section bg-light" id="section-offer" style={{marginBottom: -200}}>
                <div className="container" style={{marginTop: -50}}>
                    <div className="row">
                        <div className="col-md-12 text-center mb-5 ftco-animate">
                            <h4 className="ftco-sub-title text-dark">Our Box</h4>
                            <h2 className="display-4">Offers &amp; Promos</h2>
                            <div className="row justify-content-center">
                                <div className="col-md-7">
                                    <p className="lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12" style={{ overflow: 'hidden', maxWidth: '100%', position: 'relative' }}>
                            <div className="owl-carousel ftco-owl" style={{ display: 'flex', gap: 10, flexDirection: 'row', flexWrap: 'nowrap', marginLeft: '-10px', marginRight: '-10px', overflowX: 'auto' }}>
                                {offerList.map((data, index) => (
                                    <React.Fragment key={index}>
                                        <div className="item" style={{ minWidth: 300, marginLeft: '10px', marginRight: '10px' }}>
                                            <div className="media d-block mb-4 text-center ftco-media border-0">
                                                <img src={`http://localhost:2020/Images/Boxes/${data.Bid.BImageURL}`} alt={data.Bid.BImageURL} style={{width: 350, height: 200}} className="img-fluid" />
                                                <div className="media-body p-md-5 p-4">
                                                    <h5 className="text-primary"> {data.Off}% Off Right Now </h5>
                                                    <h5 className="mt-0 h4">{data.Bid.BName}</h5>
                                                    <p className="mb-4">{data.Bid.BDescription}</p>
                                                    <p className="mb-0"><Link className="btn btn-primary btn-sm" to={"/booking?bid="+data.Bid._id}> Book Now! </Link></p>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export default OfferList