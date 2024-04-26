import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const BoxImageModal = (props) => {
    const [image, setImage] = useState(null); // Initialize with null

    const handleUpload = () => {
        if (!image) {
            console.log("No image selected.");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", image);
        formData.append("B_id", props.B_id); // Ensure boxKeeperData._id is not undefined
    
        axios.post("http://localhost:2020/changeBoxImage", formData)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log("Error uploading image:", error);
            });
    };
    return (
        <>
            <div className="modal fade" id="BoxImage" tabIndex="-1" role="dialog" aria-labelledby="BoxImageLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h5 className="modal-title text-center" id="BoxImageLabel">
                                <img src={`http://localhost:2020/Images/Boxes/${props.BImageURL}`}  alt={props.BImageURL} 
                                height={270} width={"100%"}/>
                                <input className="form-control  my-2" type="file" name="fileUploader" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                <input className="form-control btn btn-primary my-2" type="submit" value={"Change Image"} onClick={handleUpload} data-dismiss="modal" aria-label="Close" />
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

BoxImageModal.propTypes = {
    B_id: PropTypes.string,
    BImageURL: PropTypes.string
}
export default BoxImageModal