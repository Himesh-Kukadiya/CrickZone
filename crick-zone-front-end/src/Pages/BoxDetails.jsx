// import React from 'react'
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import '/src/Css/CustomCss.Module.css'
import '/src/Css/CustomCss.Module.css'


// import axios from "axios";
import ImageSlider from "../Component/ImageSlider";
import axios from "axios";
const BoxDetails = () => {
    const nav = useNavigate();
    const location = useLocation();
    
    const [boxData, setBoxData] = useState({});
    const [images, setImages] = useState()
    const [boxSize, setBoxSize] = useState({});
    const searchParams = new URLSearchParams(location.search);
    const B_id = searchParams.get("bid")

    useEffect(() => {
        axios.post("http://localhost:2020/boxDetail", {B_id})
        .then((response) => {
            if(response.data) {
                setBoxData(response.data)
            }
        }).catch(err => console.log(err))
    }, [])

    useEffect(()=> {
        async function getImages() {
            const {data: imageUrl} = await axios.post("http://localhost:2020/getGalary", {B_id})
            if(imageUrl) {
                setImages(imageUrl)
            }
        }
        getImages()
    }, [])
    useEffect(()=> {
        const size = boxData.BSize;
        if(size) {
            setBoxSize(size)
        }
    }, [boxData])

    return (
        <section className="ftco-section bg-light" style={{ marginTop: -50 }}>
            <div className="container-fluid" style={{ marginTop: -60, background: "lightgray", paddingTop: 70, }}>
                <div className="row">
                    <div className="col-md-12 text-center mb-5 ">
                        <h4 className="ftco-sub-title text-dark">Explore Details of Box</h4>
                        <h2 className="display-4">Box &amp; Details</h2>
                        <div className="row justify-content-center">
                            <div className="col-md-7">
                                <p className="lead">You Can Book This Box in Free Time, That Time We Provide Best offer For You...</p>
                            </div>
                        </div>
                    </div>
                    <ImageSlider images={images} />
                    <div className="col-md-12 text-center my-5 ">
                        <h4 className="ftco-sub-title text-dark">Explore Details of {boxData.BName}</h4>
                        <h2 className="display-4"> {boxData.BName} </h2>
                        <div className="row justify-content-center">
                            <div className="col-md-7">
                                <p className="lead">{boxData.BDescription}</p>
                                <p className="lead"><h4 className="inline-block"> Price : </h4> &ensp;&ensp; <h5 className="inline-block menu-price">{boxData.BPrice}</h5></p>
                                <p className="lead"><h4 className="inline-block"> Size : </h4> &ensp;&ensp; <h5 className="inline-block lead">Width &nbsp;({boxSize ? boxSize[0] + " m" : ""}), &ensp;&ensp; Length &nbsp;({boxSize ? boxSize[2] + " m" : ""}), &ensp;&ensp; Height &nbsp;({boxSize ? boxSize[0] + " m" : ""})</h5></p>
                                <p className="lead"><h4 className="inline-block"> Location : </h4> &ensp;&ensp;&ensp; <h5 className="inline-block lead">{boxData.BCity}, &ensp; {boxData.BArea}</h5></p>
                                <p className="lead"><h5 className="inline-block lead">{boxData.BAddress}</h5></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                        <input type="button" onClick={()=> {nav(`/booking?bid=${B_id}`)}} className="btn button_primary" value={"Book Now"} />
                    </div>
                </div>
            </div>
            <div className="container-fluid" style={{ background: 'lightgray', padding: 50, marginBottom: -150 }}></div>
        </section>

    )
}

export default BoxDetails