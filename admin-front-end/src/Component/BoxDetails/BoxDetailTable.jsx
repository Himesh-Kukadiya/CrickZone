import { useEffect, useState } from "react";
import axios from "axios";

const BoxDetailTable = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:2020/getBoxDetails")
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
                        <h3 style={{ display: "inline-block" }}>Box Details</h3>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="tbl" style={{maxHeight: 500,}}>
                        <table className="table table-bordered text-center table-striped">
                            <thead>
                                <tr>
                                    <th className="bg-dark text-light">#</th>
                                    {/* <th className="bg-dark text-light">Box ID</th> */}
                                    <th className="bg-dark text-light">Box Name</th>
                                    <th className="bg-dark text-light">Box Keeper Name</th>
                                    <th className="bg-dark text-light">Price</th>
                                    <th className="bg-dark text-light">Size</th>
                                    <th className="bg-dark text-light">City</th>
                                    <th className="bg-dark text-light">Area</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((box, index) => (
                                    <tr key={box._id}>
                                        <td>{index + 1}</td>
                                        {/* <td>{box._id}</td> */}
                                        <td>{box.BName}</td>
                                        <td>{box.BK_id.BKName}</td>
                                        <td>{box.BPrice}</td>
                                        <td>
                                            H-{box.BSize[0]}, <br /> 
                                            W-{box.BSize[1]}, <br />
                                            L-{box.BSize[2]}, 
                                        </td>
                                        <td>{box.BCity}</td>
                                        <td>{box.BArea}</td>
                                        
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

export default BoxDetailTable