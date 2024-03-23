// import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropsType from 'prop-types'
const BoxCard = (props) => {
    const nav = useNavigate();
    return (
        <div className="media menu-item p-2" onClick={()=> {nav(`/boxDetails?bid=${props.box._id}`)}} style={{ backgroundColor: "white" }}>
            <img className="mr-3 img-fluid" src={"/src/assets/images/Boxes/"+props.box.BImageURL} style={{ width: 200, height: 130, borderRadius: 5 }} alt="Free Template by Free-Template.co" />
            <div className="media-body">
                <h5 className="mt-0">{props.box.BName}</h5>
                <p>{props.box.BDescription}</p>
                <p style={{marginTop: -15}}>{props.box.BCity}, {props.box.BArea} </p>
                <h6 className="text-primary menu-price"> ₹ {props.box.BPrice}</h6>
            </div>
        </div>
    )
}

BoxCard.propTypes = {
    box: PropsType.object.isRequired
}
export default BoxCard