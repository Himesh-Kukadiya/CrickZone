import { useEffect, useState } from "react";
import axios from "axios";

const BoxKeeperDetailTable = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:2020/getBoxKeeperDerail")
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
                        <h3 style={{ display: "inline-block" }}>Box Keeper Details</h3>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="tbl" style={{maxHeight: 500,}}>
                        <table className="table table-bordered text-center table-striped">
                            <thead>
                                <tr>
                                    <th className="bg-dark text-light">#</th>
                                    {/* <th className="bg-dark text-light">Box Keeper ID</th> */}
                                    <th className="bg-dark text-light">Box Keeper Name</th>
                                    <th className="bg-dark text-light">Box Keeper Email</th>
                                    <th className="bg-dark text-light">Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        {/* <td>{user._id}</td> */}
                                        <td>{user.BKName}</td>
                                        <td>{user.BKEmail}</td>
                                        <td>{user.BKMobile}</td>
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

export default BoxKeeperDetailTable