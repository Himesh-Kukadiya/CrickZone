// import React from 'react'

import { useEffect, useState } from "react";
import BoxCard from "./BoxCard";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
// import { Cursor } from "mongoose";

const BoxList = () => {
    const nav = useNavigate();
    const [data, setData] = useState([]);
    const [boxData, setBoxData] = useState([]);
    const [userData, setUserData] = useState({})
    const [Citys, setCitys] = useState([]);
    const [Areas, setAreas] = useState([]);
    const [customBox, setCustomBox] = useState([]);
    const [customCity, setCustomCity] = useState("");

    useEffect(() => {
        async function getData() {
            const { data: { boxDetails } } = await (await axios.get("http://localhost:2020/boxList"))
            setData(boxDetails)
        }
        getData();
        const user = JSON.parse(localStorage.getItem("userData"))
        if (user) {
            setUserData(user)
        }
    }, []);

    useEffect(() => {
        setBoxData(data)
        setCustomBox(data)
        const city = [...new Set(data.map(item => item.BCity))];
        setCitys(city.sort())
    }, [data])
    
    useEffect(()=> {
    }, [customBox])
    const filterAll = () => {
        setBoxData(data)
    }
    const filterByCity = () => {
        if (!userData) {
            return nav("/login")
        }
        const filterCity = data.filter((item) => item.BCity == userData.City)
        setBoxData(filterCity)
    }
    const filterByArea = () => {
        if (!userData) {
            return nav("/login")
        }
        const filterArea = data.filter((item) => item.BArea == userData.Area && item.BCity == userData.City)
        setBoxData(filterArea)
    }
    const filterCustom = () => {
        setBoxData(data)
        const all = document.getElementById("pills-ALL-tab");
        all.style.display = "none"
        const city = document.getElementById("pills-CITY-tab");
        city.style.display = "none"
        const area = document.getElementById("pills-AREA-tab");
        area.style.display = "none"
        const custom = document.getElementById("pills-custom-tab");
        custom.style.display = "none"
        const cmbCity = document.getElementById("cmbCity");
        cmbCity.style.display = "block"
        const back = document.getElementById("back");
        back.style.display = "block"
    }

    const goBack = () => {
        setBoxData(data)
        const all = document.getElementById("pills-ALL-tab");
        all.style.display = "block"
        const city = document.getElementById("pills-CITY-tab");
        city.style.display = "block"
        const area = document.getElementById("pills-AREA-tab");
        area.style.display = "block"
        const custom = document.getElementById("pills-custom-tab");
        custom.style.display = "block"
        const cmbCity = document.getElementById("cmbCity");
        cmbCity.style.display = "none"
        const cmbArea = document.getElementById("cmbArea");
        cmbArea.style.display = "none"
        const back = document.getElementById("back");
        back.style.display = "none"
    }
    const filterCustomCity = (e) => {
        const cmbArea = document.getElementById("cmbArea");
        cmbArea.style.display = "block"

        const selectedCity = e.target.value;
        setCustomCity(selectedCity)

        const filterCity = data.filter((item) => item.BCity == selectedCity)
        setCustomBox(filterCity)

        const filteredData = data.filter(item => item.BCity === selectedCity);
        const uniqueAreas = [...new Set(filteredData.map(item => item.BArea))];

        setAreas(uniqueAreas)
    }
    const filterCustomArea = (e) => {
        const cmbArea = document.getElementById("cmbArea");
        cmbArea.style.display = "block"

        const selectedArea = e.target.value;

        const filterCity = data.filter((item) => item.BCity == customCity && item.BArea == selectedArea)
        setCustomBox(filterCity)
    }

    return (
        <>
            <section className="ftco-section" id="section-menu" style={{ marginBottom: -150 }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mb-5 ftco-animate">
                            <h2 className="display-4">{"OUR BOX'S LIST"}</h2>
                            <div className="row justify-content-center">
                                <div className="col-md-7">
                                    <p className="lead">{"Amidst cricket's vast expanse, distant from Vokalia and Consonantia, cricket boxes dwell, waiting to enhance your cricketing journey."}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 text-center">
                            <ul className="nav ftco-tab-nav nav-pills mb-5" id="pills-tab" role="tablist">
                                <li className="nav-item ftco-animate">
                                    <a className="nav-link active" id="pills-ALL-tab" onClick={filterAll} data-toggle="pill" href="#pills-ALL" role="tab" aria-controls="pills-ALL" aria-selected="true">ALL</a>
                                </li>
                                <li className="nav-item ftco-animate">
                                    <a className="nav-link" id="pills-CITY-tab" onClick={filterByCity} data-toggle="pill" href="#pills-CITY" role="tab" aria-controls="pills-CITY" aria-selected="false">{userData.City != undefined ? userData.City : "City"}</a>
                                </li>
                                <li className="nav-item ftco-animate">
                                    <a className="nav-link" id="pills-AREA-tab" onClick={filterByArea} data-toggle="pill" href="#pills-AREA" role="tab" aria-controls="pills-AREA" aria-selected="false">{userData.Area != undefined ? userData.Area : "AREA"}</a>
                                </li>
                                <li className="nav-item ftco-animate">
                                    <a className="nav-link" id="pills-custom-tab" onClick={filterCustom} data-toggle="pill" href="#pills-custom" role="tab" aria-controls="pills-custom" aria-selected="false">Custom</a>
                                </li>
                                <li className="nav-item ftco-animate">
                                    <select className="nav-link" id="cmbCity" style={{display: "none"}} onChange={filterCustomCity} >
                                        <option value=""> Select City </option>
                                        {
                                            Citys.map((city) => (
                                                <option key={city} value={city} > {city} </option>
                                            ))
                                        }
                                    </select>
                                </li>
                                <li className="nav-item ftco-animate">
                                    <select className="nav-link" id="cmbArea" style={{display: "none"}} onChange={filterCustomArea} >
                                        <option value=""> Select Area </option>
                                        {
                                            Areas.map((area) => (
                                                <option key={area} value={area} > {area} </option>
                                            ))
                                        }
                                    </select>       
                                </li>
                                <li className="nav-item ftco-animate">
                                    <a className="nav-link" id="back" onClick={goBack} style={{display: "none", cursor: "pointer" }}> BACK </a>
                                </li>
                            </ul>

                            <div className="tab-content text-left">
                                <div className="tab-pane fade show active" id="pills-ALL" role="tabpanel" aria-labelledby="pills-ALL-tab">
                                <div className="row">
                                        {boxData.length > 0 ?
                                            boxData.map((data) => (
                                                <div key={data._id} className="col-lg-6">
                                                    <BoxCard box={data} />
                                                </div>
                                            ))
                                            :
                                            <>
                                                <div className="col-lg-2"></div>
                                                <div className="col-lg-8 text-dark">
                                                    <div className="error-container">
                                                        <h1> 505 </h1>
                                                        <h5>
                                                            {"Oops! In Your Area we can not find any Box."}
                                                        </h5>
                                                        <a className="nav-link" id="goBack" data-toggle="pill" href="#pills-ALL" role="tab" aria-controls="pills-ALL" aria-selected="true">
                                                            Go to find more
                                                        </a>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-CITY" role="tabpanel" aria-labelledby="pills-CITY-tab">
                                    <div className="row">
                                        {boxData.length > 0 ?
                                            boxData.map((data) => (
                                                <div key={data._id} className="col-lg-6">
                                                    <BoxCard box={data} />
                                                </div>
                                            ))
                                            :
                                            <>
                                                <div className="col-lg-2"></div>
                                                <div className="col-lg-8 text-dark">
                                                    <div className="error-container">
                                                        <h1> 505 </h1>
                                                        <h5>
                                                            {"Oops! In Your City we can not find any Box."}
                                                        </h5>
                                                        <a className="nav-link" id="goBack" data-toggle="pill" href="#pills-ALL" role="tab" aria-controls="pills-ALL" aria-selected="true">
                                                            Go to find more
                                                        </a>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-AREA" role="tabpanel" aria-labelledby="pills-AREA-tab">
                                    <div className="row">
                                        {boxData.length > 0 ?
                                            boxData.map((data) => (
                                                <div key={data._id} className="col-lg-6">
                                                    <BoxCard box={data} />
                                                </div>
                                            ))
                                            :
                                            <>
                                                <div className="col-lg-2"></div>
                                                <div className="col-lg-8 text-dark">
                                                    <div className="error-container">
                                                        <h1> 505 </h1>
                                                        <h5>
                                                            {"Oops! In Your Area we can not find any Box."}
                                                        </h5>
                                                        <a className="nav-link" id="goBack" data-toggle="pill" href="#pills-ALL" role="tab" aria-controls="pills-ALL" aria-selected="true">
                                                            Go to find more
                                                        </a>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>

                                < div className="tab-pane fade" id="pills-custom" role="tabpanel" aria-labelledby="pills-custom-tab">
                                    <div className="row">
                                        {customBox.length > 0 ?
                                            customBox.map((data) => (
                                                <div key={data._id} className="col-lg-6">
                                                    <BoxCard box={data} />
                                                </div>
                                            ))
                                            :
                                            <>
                                                <div className="col-lg-2"></div>
                                                <div className="col-lg-8 text-dark">
                                                    <div className="error-container">
                                                        <h1> 505 </h1>
                                                        <h5>
                                                            {"Oops! In Your Area we can not find any Box."}
                                                        </h5>
                                                        <a className="nav-link" id="goBack" data-toggle="pill" href="#pills-ALL" role="tab" aria-controls="pills-ALL" aria-selected="true">
                                                            Go to find more
                                                        </a>
                                                    </div>
                                                </div>
                                            </>
                                        }
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

export default BoxList