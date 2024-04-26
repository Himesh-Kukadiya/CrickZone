import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const BookingDetailsTable = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.post("http://localhost:2020/getBKBookings", { BK_id: props.BK_id })
            .then(response => {
                const data = response.data;
                setData(data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <div className="table-data">
                <div className="bookings">
                    <div className="head">
                        <h3 style={{ display: "inline-block" }}>Recent Bookings</h3>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="tbl" style={{maxHeight: props.maxHeight}}>
                        <table className="table table-bordered text-center table-striped">
                            <thead>
                                <tr>
                                    <th className="bg-dark text-light">#</th>
                                    {/* <th className="bg-dark text-light">Booking ID</th> */}
                                    <th className="bg-dark text-light">User</th>
                                    <th className="bg-dark text-light">Box</th>
                                    <th className="bg-dark text-light">Date</th>
                                    <th className="bg-dark text-light">Time</th>
                                    {/* <th className="bg-dark text-light">Box Keeper</th> */}
                                    <th className="bg-dark text-light">Price</th>
                                    <th className="bg-dark text-light">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((booking, index) => (
                                    <tr key={booking._id}>
                                        <td>{index + 1}</td>
                                        {/* <td>{booking._id}</td> */}
                                        <td>{booking.U_id.UName}</td>
                                        <td>{booking.B_id.BName}</td>
                                        <td>{new Date(booking.BBDate).toLocaleDateString()}</td>
                                        <td>{booking.BBTime.toString()}</td>
                                        {/* <td>{booking.B_id.BK_id.BKName}</td> */}
                                        <td>{booking.B_id.BPrice}</td>
                                        <td>{booking.BBTotalAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

BookingDetailsTable.propTypes = {
    maxHeight: PropTypes.number,
    BK_id: PropTypes.string
};
export default BookingDetailsTable