import axios from "axios";
import { useEffect, useState } from "react";

var boxKeeperData = JSON.parse(localStorage.getItem("boxKeeperData"));


const ProfileImageChangeModal = () => {
    const [image, setImage] = useState(null); // Initialize with null
    const [BKImageURL, setBKImageURL] = useState(null);
    useEffect(()=> {
        if(boxKeeperData != null || boxKeeperData != "" || boxKeeperData != undefined) {
            setBKImageURL(boxKeeperData.BKImageURL)
        }
    }, [])
    const handleUpload = () => {
        if (!image) {
            console.log("No image selected.");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", image);
        formData.append("BK_id", boxKeeperData._id); // Ensure boxKeeperData._id is not undefined
    
        axios.post("http://localhost:2020/bkProfileImageUpload", formData)
            .then((response) => {
                localStorage.setItem("boxKeeperData", JSON.stringify(response.data.boxKeeperData));
            })
            .catch((error) => {
                console.log("Error uploading image:", error);
            });
    };

    const handleRemove = () => {
    
        axios.post("http://localhost:2020/removeBKImage", {_id: boxKeeperData._id})
            .then((response) => {
                localStorage.setItem("boxKeeperData", JSON.stringify(response.data.boxKeeperData));
            })
            .catch((error) => {
                console.log("Error uploading image:", error);
            });
    }
    return (
        <>
            <div className="modal fade" id="uploadImage" tabIndex="-1" role="dialog" aria-labelledby="uploadImageLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h5 className="modal-title" id="uploadImageLabel">
                                <input className="form-control  my-2" type="file" name="fileUploader" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                <input className="form-control btn btn-primary my-2" type="submit" value={"Change Image"} onClick={handleUpload} data-dismiss="modal" aria-label="Close"/>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="modal fade" id="changeImage" tabIndex="-1" role="dialog" aria-labelledby="changeImageLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                        <h5 className="modal-title" id="changeImageLabel">
                            {
                                BKImageURL != null && BKImageURL != "default.jpg" && BKImageURL != undefined ?
                                    <>
                                        <p style={{display: "flex", justifyContent: "space-between"}}>
                                            <strong style={{cursor: "pointer"}} data-dismiss="modal" aria-label="Close"
                                                data-toggle="modal" data-target="#uploadImage"
                                            >
                                                Change Image</strong>
                                            <strong style={{cursor: "pointer"}} data-dismiss="modal" aria-label="Close"
                                                onClick={handleRemove}
                                                data-toggle="modal" data-target="#changeImage"
                                            >
                                                Remove Image</strong>
                                        </p>
                                    </>
                                :
                                    <>
                                        <p style={{display: "flex", justifyContent: "space-between"}}>
                                            <strong style={{cursor: "pointer"}} data-dismiss="modal" aria-label="Close"
                                                data-toggle="modal" data-target="#uploadImage"
                                            >
                                                Change Image</strong>
                                        </p>
                                    </>
                            }
                        </h5>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProfileImageChangeModal;

