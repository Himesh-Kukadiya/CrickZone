import axios from "axios";
import { useEffect, useState } from "react";

var adminData = JSON.parse(localStorage.getItem("adminData"));


const ProfileImageChangeModal = () => {
    const [image, setImage] = useState(null); // Initialize with null
    const [AImageURL, setAImageURL] = useState(null);
    useEffect(()=> {
        if(adminData != null || adminData != "" || adminData != undefined) {
            setAImageURL(adminData.AImageURL)
        }
    }, [])
    const handleUpload = () => {
        if (!image) {
            console.log("No image selected.");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", image);
        formData.append("A_id", adminData._id); // Ensure adminData._id is not undefined

        axios.post("http://localhost:2020/adminProfileImageUpload", formData)
            .then((response) => {
                const ad = response.data.adminData
                // console.log(ad)
                localStorage.setItem("adminData", JSON.stringify(ad));
            })
            .catch((error) => {
                console.log("Error uploading image:", error);
            });
    };

    const handleRemove = () => {
    
        axios.post("http://localhost:2020/removeImage", {_id: adminData._id})
            .then((response) => {
                localStorage.setItem("adminData", JSON.stringify(response.data.adminData));
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
                                AImageURL != null && AImageURL != "default.jpg" && AImageURL != undefined ?
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

