import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '/src/Css/CustomCss.Module.css'

import axios from "axios";

const BookingDetails = () => {
    const [date, setDate] = useState("");
    const [U_id, setU_id] = useState("");
    const [selectedTime, setSelectedTime] = useState([]);
    const [myBooking, setMyBooking] = useState([]);
    const [othersBooking, setOthersBooking] = useState([]);
    const [boxData, setBoxData] = useState({});
    const [totalAmount, setTotalAmount] = useState(0)

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const B_id = searchParams.get("bid")

    const navigate = useNavigate();
    function currentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        return (`${year}-${month}-${day}`)
    }
    function getCurrentHour() {
        const date = new Date();
        const hour = date.getHours();
        return hour;
    }

    function findColor(str, hourTrue) {
        if (hourTrue)
            return "text_disabled"
        else if(myBooking.includes(str)) 
            return "text_blue"
        else if (othersBooking.includes(str))
            return "text-danger"
        else if (selectedTime.includes(str))
            return "text-success"
        else
            return "text-dark"
    }
    
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData == null) {
            return navigate("/login")
        }
        if (date === "") {
            setDate(currentDate())
        }
        setU_id(userData._id)
    })

    useEffect(() => {
        const requestData = {
            date: date,
            U_id: U_id,
            B_id: B_id
        }
        axios
            .post("http://localhost:2020/boxBookingDetails", requestData)
            .then((response) => {
                setMyBooking(response.data.MyBooking)
                setOthersBooking(response.data.OthersBooking)
                setBoxData(response.data.boxData)
            })
            .catch(() => {
            });
    }, [date]);

    useEffect(() => {
        if (selectedTime.length > 0) {
            const amount = boxData.BPrice * selectedTime.length;
            const discountAmount = boxData.BPrice * selectedTime.length * boxData.Off / 100
            setTotalAmount(amount - discountAmount)
        } else
            setTotalAmount(0)
    }, [selectedTime])

    const bookNowHandle = async () => {
        const bookingData = {
            "U_id": U_id,
            "B_id": B_id,
            "BookDate": currentDate(),
            "BBDate": date,
            "BBTime": selectedTime,
            "BBTotalAmount": totalAmount
        }

        const { data:{order} } = await axios.post("http://localhost:2020/bookNow", bookingData)
        const {data:{key}} = await axios.get("http://localhost:2020/getKey")
        const options = {
            key: key,
            amount: Number(order.amount),
            currency: "INR",
            name: "CrickZone",
            description: "Pay & Checkout this Box to enjoy your free time...",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png",
            order_id: order.id,
            callback_url: `http://localhost:2020/paymentVarification?bookingData=${JSON.stringify(bookingData)}`,
            prefill: {
                contact: localStorage.getItem("userData").Mobile,
                name: localStorage.getItem("userData").Name,
                email: localStorage.getItem("userData").Email
            },
            notes: {
                access: "This booking is for your paid hours"
            },
            theme: {
                color: "#121212"
            }
        };
        // eslint-disable-next-line no-undef
        const razor = new window.Razorpay(options);
        razor.open();
    }

    return (
        <section className="ftco-section bg-light" style={{ marginTop: -50 }}>
            <div className="container-fluid" style={{ marginTop: -60, background: "lightgray", paddingTop: 70, }}>
                <div className="row">
                    <div className="col-md-12 text-center mb-5 ">
                        <h4 className="ftco-sub-title text-dark">Our Schedule of This Box</h4>
                        <h2 className="display-4">Time &amp; Schedule</h2>
                        <div className="row justify-content-center">
                            <div className="col-md-7">
                                <p className="lead" style={{color: "black"}}>You Can Book This Box in Free Time, That Time We Provide Best offer For You...</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="container-fluid" style={{ border: '2px solid black' }}>
                            <div className="row">
                                {/* select date box */}
                                <div className="col-md-4 my-md-4" >
                                    <label htmlFor="date"><h5>Select Date : &ensp;</h5> </label>
                                    <input type="date" htmlFor="date" style={{ width: 150, fontSize: 25, background: "transparent" }}
                                        value={date}
                                        min={(new Date()).toISOString().split('T')[0]}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setDate(e.target.value)} />
                                </div>
                                {/* Price  */}
                                <div className="col-md-4 my-md-4">
                                    <label htmlFor="price"><h5> Price : &ensp; </h5> </label>
                                    <input type="text" id="price" className="pl-2" value={boxData.BPrice} readOnly style={{ width: 150, fontSize: 25, background: "transparent" }} />
                                </div>
                                {/* Total Hours  */}
                                <div className="col-md-3 my-md-4">
                                    <label htmlFor="hours"><h5> Total Hours : &ensp; </h5> </label>
                                    <input type="text" id="hours" className="pl-2" value={selectedTime.length} readOnly style={{ width: 150, fontSize: 25, background: "transparent" }} />
                                </div>

                            </div>
                            <div className="row">
                                {/* Amount  */}
                                <div className="col-md-4 my-md-4">
                                    <label htmlFor="amount"><h5> Amount : &ensp; </h5> </label>
                                    <input type="text" id="amount" className="pl-2" value={boxData.BPrice * selectedTime.length} readOnly style={{ width: 150, fontSize: 25, background: "transparent" }} />
                                </div>
                                {/* Offer  */}
                                <div className="col-md-4 my-md-4">
                                    <label htmlFor="off"><h5> Off : &ensp; </h5> </label>
                                    <input type="text" id="off" className="pl-2" value={boxData.Off + "%"} readOnly style={{ width: 150, fontSize: 25, background: "transparent" }} />
                                </div>
                                {/* Total Amount  */}
                                <div className="col-md-4 my-md-4">
                                    <label htmlFor="netamount"><h5> Net Amount : &ensp; </h5> </label>
                                    <input type="text" id="netamount" className="pl-2" value={totalAmount} readOnly style={{ width: 150, fontSize: 25, background: "transparent" }} />
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
                                        let hourTrue = false; // (number > getCurrentHour() && date == currentDate())  ? false : true
                                        if(number > getCurrentHour() || date != currentDate()) {
                                            hourTrue = false
                                        }
                                        else {
                                            hourTrue = true;
                                        }
                                        return (
                                            <div className="col-12 col-sm-6 col-lg-3 text-center" style={{ border: '2px solid black' }} key={j}>
                                                <input name="chkbox" id={str} type="checkbox" hidden defaultChecked={false}
                                                    disabled={othersBooking.includes(str) || hourTrue }
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        if (checked) {
                                                            setSelectedTime([...selectedTime, str]);
                                                        } else {
                                                            const newTime = selectedTime.filter(item => item !== str);
                                                            setSelectedTime(newTime);
                                                        }
                                                    }}
                                                />
                                                <h1 onClick={() => { document.getElementById(str).click(); }} style={{ margin: -10, }}><i className={findColor(str, hourTrue) + " material-icons " } style={{ fontSize: 30, marginBottom: 0, cursor: "pointer" }}>alarm</i></h1>
                                                <h4 onClick={() => { document.getElementById(str).click(); }} className={findColor(str, hourTrue)} style={{ cursor: "pointer" }}>
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
                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                        <input type="button" onClick={bookNowHandle} className="btn button_primary" value={"Book Now"} />
                    </div>
                </div>
            </div>
            <div className="container-fluid" style={{ background: 'lightgray', padding: 50, marginBottom: -150 }}></div>
        </section>
    );
};

export default BookingDetails;
