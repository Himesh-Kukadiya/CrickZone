import { useEffect, useState } from "react";
import axios from "axios";

const UserDetailTable = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:2020/getUserDerail")
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
                        <h3 style={{ display: "inline-block" }}>User Details</h3>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="tbl" style={{maxHeight: 500,}}>
                        <table className="table table-bordered text-center table-striped">
                            <thead>
                                <tr>
                                    <th className="bg-dark text-light">#</th>
                                    {/* <th className="bg-dark text-light">User ID</th> */}
                                    <th className="bg-dark text-light">User Name</th>
                                    <th className="bg-dark text-light">User Email</th>
                                    <th className="bg-dark text-light">Mobile</th>
                                    <th className="bg-dark text-light">City</th>
                                    <th className="bg-dark text-light">Area</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user, index) => (
                                    <tr key={user._id}>
                                        <td>{index + 1}</td>
                                        {/* <td>{user._id}</td> */}
                                        <td>{user.UName}</td>
                                        <td>{user.UEmail}</td>
                                        <td>{user.UMobile}</td>
                                        <td>{user.UCity}</td>
                                        <td>{user.UArea}</td>
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

export default UserDetailTable