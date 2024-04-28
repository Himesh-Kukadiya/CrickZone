import PropType from 'prop-types';

const ApplicationContainer = (props) => {
    return (
        <div className="charts-card" style={{ background: "rgba(20, 20, 250, 0.1)" }}>
            <p className="chart-title">{props.data.ABName}</p>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"><strong>Name : </strong></div>
                    <div className="col-md-8">{props.data.BK_id.BKName}</div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Email : </strong></div>
                    <div className="col-md-8">{props.data.BK_id.BKEmail}</div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Mobile : </strong></div>
                    <div className="col-md-8">{props.data.BK_id.BKMobile}</div>
                    <hr />
                </div>
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
                    <div className="col-md-4"><strong>Price:</strong> </div>
                    <div className="col-md-8">{props.data.ABPrice}</div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Size:</strong> </div>
                    <div className="col-md-8 text-left" style={{display: 'flex', justifyContent: 'space-between'}}>
                        <strong>H: {props.data.ABSize[0]}</strong>
                        <strong>W: {props.data.ABSize[1]}</strong>
                        <strong>L: {props.data.ABSize[2]}</strong>    
                    </div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Address:</strong> </div>
                    <div className="col-md-8">{props.data.ABAddress}</div>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-md-4"><strong>Description:</strong> </div>
                    <div className="col-md-8">{props.data.ABDescription}</div>
                    <hr />
                </div>                
                {props.selectedType === "New" ? <Both handleApplication={props.handleApplication} Id={props.data._id} /> 
                : props.selectedType === "Accepted" ? <Accepted handleApplication={props.handleApplication} Id={props.data._id} /> 
                : <Rejected handleApplication={props.handleApplication} Id={props.data._id} /> }
            </div>
        </div>
    )
}

const Both = (props) => {
    return (
        <div className="row">
            <div className="col-md-5">
                <button
                    className="btn btn-success form-control mb-2"
                    onClick={() => props.handleApplication(props.Id, "Accepted")}
                >
                    Accept
                </button>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5">
                <button className="btn btn-danger form-control"
                    onClick={() => props.handleApplication(props.Id, "Rejected")}
                >Reject</button>
            </div>
        </div>
    )
}
const Accepted = (props) => {
    return (
        <div className="row">
            <div className="col-md-7"></div>
            <div className="col-md-5">
                <button className="btn btn-danger form-control"
                    onClick={() => props.handleApplication(props.Id, "Rejected")}
                >Reject</button>
            </div>
        </div>
    )
}
const Rejected = (props) => {
    return (
        <div className="row">
            <div className="col-md-7"></div>
            <div className="col-md-5">
                <button
                    className="btn btn-success form-control mb-2"
                    onClick={() => props.handleApplication(props.Id, "Accepted")}
                >
                    Accept
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
Both.propTypes = {
    Id: PropType.String,
    handleApplication: PropType.func
}
Accepted.propTypes = {
    Id: PropType.String,
    handleApplication: PropType.func
}
Rejected.propTypes = {
    Id: PropType.String,
    handleApplication: PropType.func
}

export default ApplicationContainer