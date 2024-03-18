import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const BookingDetails = () => {
    // get the box id from url
    const location = useLocation(); // useLocation from react-router-dom
    const searchParams = new URLSearchParams(location.search); // URLSearchParams to search parameter in query string.
    const Bid = searchParams.get("id") // searchParams.get to data of Params.
    // console.log(Bid)

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <section className="ftco-section bg-light">
            <div className="container" style={{ marginTop: -60, background: "url('src/') no-repeat center center/cover" }}>
                <div className="row">
                    <div className="col-md-12 text-center mb-5 ">
                        <h4 className="ftco-sub-title text-dark">Our Schedule of This Box</h4>
                        <h2 className="display-4">Time &amp; Schedule</h2>
                        <div className="row justify-content-center">
                            <div className="col-md-7">
                                <p className="lead">You Can Book This Box in Free Time, That Time We Provide Best offer For You...</p>
                            </div>
                        </div>
                    </div>
                    {/* select date box */}
                    <div className="col-md-12">
                        <div className="container-fluid" style={{border: '2px solid black'}}>
                            <div className="row">
                                <div className="col-md-4" style={{margin: 20}}>
                                    <label htmlFor="date"><h5>Select Date: &ensp;</h5> </label>
                                    <input type="date" htmlFor="date" style={{width: 200, fontSize: 25}} 
                                    min={(new Date()).toISOString().split('T')[0]}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(e) => console.log(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12" style={{ overflow: 'hidden', maxWidth: '100%', position: 'relative' }}>
                        <div className="container-fluid">
                            {Array.from({ length: 6 }, (_, i) => (
                                <div key={i} className="row" style={{ border: '2px solid black' }}>
                                    {Array.from({ length: 4 }, (_, j) => {
                                        const number = i * 4 + j;
                                        const str = (number === 0 ? "12" : number >= 13 ? number - 12 : number) + (number >= 12 ? " pm" : " am");
                                        
                                        return (
                                            <div className="col-12 col-sm-6 col-lg-3 text-center" style={{ border: '2px solid black' }} key={j}>
                                                <input name="chkbox"
                                                    id={str} 
                                                    type="checkbox" 
                                                    hidden
                                                    defaultChecked={false} 
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        if (checked) {
                                                            setData([...data, str]);
                                                        } else {
                                                            const newData = data.filter(item => item !== str);
                                                            setData(newData);
                                                        }
                                                    }} 
                                                />
                                                <h1 style={{margin: -10,}}><i className={data.includes(str) ? "material-icons text-success" : "material-icons text-dark"} style={{fontSize: 30, marginBottom: 0 }}>alarm</i></h1>
                                                <h4 onClick={() => { document.getElementById(str).click(); }} className={data.includes(str) ? "text-success" : "text-dark"}>
                                                    {str}
                                                </h4>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingDetails;
