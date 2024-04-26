import axios from 'axios';
import PropType from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ApplicationContainer = (props) => {
    const nav = useNavigate();
    const cancelApplication = (Id) => {
        axios.post("http://localhost:2020/cancelApplication", {Id})
            .then(() => {
                setTimeout(() => {
                    nav('/dashboard')
                }, 200)
            })
            .catch(() => {
                // console.log(e.response.data.message);
            })
    }
    const addBox = async (Id) => {
        const { data:{order} } = await axios.post("http://localhost:2020/addNewBox", {Id} )

        const {data:{key}} = await axios.get("http://localhost:2020/getKey")
        const options = {
            key: key,
            amount: Number(order.amount),
            currency: "INR",
            name: "CrickZone",
            description: "Pay & Checkout this Box to enjoy your free time...",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png",
            order_id: order.id,
            callback_url: `http://localhost:2020/boxPaymentVarification?Id=${Id}`,
            prefill: {
                contact: localStorage.getItem("boxKeeperData").BKMobile,
                name: localStorage.getItem("boxKeeperData").BKName,
                email: localStorage.getItem("boxKeeperData").BKEmail
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
        <div className="charts-card" style={{ background: "rgba(20, 20, 250, 0.1)" }}>
            <p className="chart-title">{props.data.ABName}</p>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"><strong>City :</strong> </div>
                    <div className="col-md-8">{props.data.ABCity}</div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Area :</strong> </div>
                    <div className="col-md-8">{props.data.ABArea}</div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Address :</strong> </div>
                    <div className="col-md-8">{props.data.ABAddress}</div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Description:</strong> </div>
                    <div className="col-md-8">{props.data.ABDescription}</div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Description:</strong> </div>
                    <div className="col-md-8">
                        <strong>H : </strong>{props.data.ABSize[0]} &ensp;&ensp;
                        <strong>W : </strong>{props.data.ABSize[1]} &ensp;&ensp;
                        <strong>L : </strong>{props.data.ABSize[2]} &ensp;&ensp;
                    </div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Price :</strong> </div>
                    <div className="col-md-8">{props.data.ABPrice}</div>
                    <hr />
                </div>
                { props.selectedType === "Applied" ? <Applied Id={props.data._id} cancelApplication={cancelApplication} /> 
                : <Accepted cancelApplication={cancelApplication} addBox={addBox} Id={props.data._id} /> }
            </div>
        </div>
    )
}

const Applied = (props) => {
    
    return (
        <div className="row">
            <div className="col-md-7"></div>
            <div className="col-md-5">
                <button className="btn btn-danger form-control"
                    onClick={() => props.cancelApplication(props.Id)}
                > Cancel </button>
            </div>
        </div>
    )
}
const Accepted = (props) => {
    return (
        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-5">
                <button
                        className="btn btn-danger form-control mb-2"
                        onClick={() => props.cancelApplication(props.Id)}
                    >
                    Cancel
                </button>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5">
                <button
                    className="btn btn-success form-control mb-2"
                    onClick={() => props.addBox(props.Id)}
                >
                    <strong> ₹ 500 </strong>
                </button>
            </div>
        </div>
    )
}

ApplicationContainer.propTypes = {
    data: PropType.object,
    selectedType: PropType.String,
    handleApplication: PropType.func
}
Applied.propTypes = {
    Id: PropType.String,
    cancelApplication: PropType.func
}
Accepted.propTypes = {
    Id: PropType.String,
    addBox: PropType.func,
    cancelApplication: PropType.func
}

export default ApplicationContainer