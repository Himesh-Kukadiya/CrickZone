import axios from "axios";
import { useState,useEffect } from "react";
import ApplicationContainer from "./ApplicationContainer";

const ApplicationList = () => {
    const [applicationsData, setApplicationsData] = useState([]);
    const [newApplicationsData, setNewApplicationsData] = useState([]);
    const [acceptedApplicationsData, setAcceptedApplicationsData] = useState([]);
    const [rejectedApplicationsData, setRejectedApplicationsData] = useState([]);
    const [selectedType, setSelectedType] = useState("New");
    const selectedTypeStyle = {
        padding: 10,
        color: "orange",
        borderBottom: "4px solid #f5b74f"
    }
    useEffect(()=> {
        axios.get("http://localhost:2020/getApplicationList")
        .then((Response) => {
            setApplicationsData(Response.data)
        })
        .catch((e) => {
            console.error(e)
        })
    }, [])
    useEffect(()=> {
        const newapplication = applicationsData.filter((e) => e.ABStatus === "Applied");
        setNewApplicationsData(newapplication);

        const acceptedapplications = applicationsData.filter((e) => e.ABStatus === 'Accepted');
        setAcceptedApplicationsData(acceptedapplications);

        const rejectedapplication = applicationsData.filter((e)=> e.ABStatus === 'Rejected');
        setRejectedApplicationsData(rejectedapplication);

    },[applicationsData])
    const handleApplication = (Id, Status) => {
        const dataPack = { Id: Id, Status: Status};
        axios.post("http://localhost:2020/ApplicationHandle", dataPack)
        .then((response) => {
            if(response.data.message === 'success') {
                axios.get("http://localhost:2020/getApplicationList")
                .then((Response) => {
                    setApplicationsData(Response.data)
                })
                .catch((e) => {
                    console.error(e)
                })
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }
    return (
        <main className="main-container" style={{ maxHeight: 610, overflowY: 'auto' }}>
            <div className="main-title">
                <p className="font-weight-bold">Applications List</p>
            </div>
                <ul className="application">
                    <li className="application-type" onClick={()=> setSelectedType("New")} style={selectedType === "New" ? selectedTypeStyle : {}}> New Applications </li>
                    <li className="application-type" onClick={()=> setSelectedType("Accepted")} style={selectedType === "Accepted" ? selectedTypeStyle : {}}> Accepted Applications </li>
                    <li className="application-type" onClick={()=> setSelectedType("Rejected")} style={selectedType === "Rejected" ? selectedTypeStyle : {}}> Rejected Applications </li>
                </ul>
            <div className="charts" style={
                selectedType === "New" ? {display: "grid"} : {display: "none"}
            }>
                {newApplicationsData.map((data) => (
                    <ApplicationContainer key={data._id} data={data} selectedType={selectedType} handleApplication={handleApplication}  />
                ))}
            </div>
            <div className="charts" style={
                selectedType === "Accepted" ? {display: "grid"} : {display: "none"}
            }>
                {acceptedApplicationsData.map((data) => (
                    <ApplicationContainer key={data._id} data={data} selectedType={selectedType} handleApplication={handleApplication}  />
                ))}
            </div>
            <div className="charts" style={
                selectedType === "Rejected" ? {display: "grid"} : {display: "none"}
            }>
                {rejectedApplicationsData.map((data) => (
                    <ApplicationContainer key={data._id} data={data} selectedType={selectedType} handleApplication={handleApplication}  />
                ))}
            </div>
        </main>
    )
}

export default ApplicationList