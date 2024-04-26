import axios from "axios";
import { useState, useEffect } from "react";
import ApplicationContainer from "./ApplicationContainer";
import NewApplication from "./NewApplication";
import PropTypes from 'prop-types';


const ApplicationList = (props) => {
    const [applicationsData, setApplicationsData] = useState([]);
    // const [newApplicationsData, setNewApplicationsData] = useState([]);
    const [acceptedApplicationsData, setAcceptedApplicationsData] = useState([]);
    const [appliedApplicationsData, setAppliedApplicationsData] = useState([]);
    const [selectedType, setSelectedType] = useState("Accepted");
    const selectedTypeStyle = {
        padding: 10,
        color: "orange",
        borderBottom: "4px solid #f5b74f"
    }
    useEffect(() => {
        axios.post("http://localhost:2020/getBKApplications", { BK_id: props.BK_id })
            .then((Response) => {
                setApplicationsData(Response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }, [])
    useEffect(() => {
        // const newapplication = applicationsData.filter((e) => e.ABStatus === "Applied");
        // setNewApplicationsData(newapplication);

        const acceptedapplications = applicationsData.filter((e) => e.ABStatus === 'Accepted');
        setAcceptedApplicationsData(acceptedapplications);

        const appliedapplication = applicationsData.filter((e) => e.ABStatus === 'Applied');
        setAppliedApplicationsData(appliedapplication);

    }, [applicationsData])

    const handleApplication = () => {
        axios.get("http://localhost:2020/getApplicationList")
            .then((Response) => {
                setApplicationsData(Response.data)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    return (
        <main className="main-container" style={{ maxHeight: 610, overflowY: 'auto' }}>
            <div className="main-title">
                <p className="font-weight-bold"><strong>Applications List</strong></p>
            </div>
            <ul className="application">
                <li className="application-type" onClick={() => setSelectedType("Accepted")} style={selectedType === "Accepted" ? selectedTypeStyle : {}}> Accepted Applications </li>
                <li className="application-type" onClick={() => setSelectedType("New")} style={selectedType === "New" ? selectedTypeStyle : {}}> New Applications </li>
                <li className="application-type" onClick={() => setSelectedType("Applied")} style={selectedType === "Applied" ? selectedTypeStyle : {}}> Applied Applications </li>
            </ul>
            <div style={
                selectedType === "New" ? { display: "grid", } : { display: "none", }
            }>
                <NewApplication BK_id={props.BK_id} />
            </div>
            <div className="charts" style={
                selectedType === "Accepted" ? { display: "grid", } : { display: "none", }
            }>
                {acceptedApplicationsData.map((data) => (
                    <ApplicationContainer key={data._id} data={data} selectedType={selectedType} handleApplication={handleApplication} />
                ))}
            </div>
            <div className="charts" style={
                selectedType === "Applied" ? { display: "grid", } : { display: "none" }
            }>
                {appliedApplicationsData.map((data) => (
                    <ApplicationContainer key={data._id} data={data} handleApplication={handleApplication} selectedType={selectedType} />
                ))}
            </div>
        </main>
    )
}

ApplicationList.propTypes = {
    BK_id: PropTypes.string
}
export default ApplicationList
