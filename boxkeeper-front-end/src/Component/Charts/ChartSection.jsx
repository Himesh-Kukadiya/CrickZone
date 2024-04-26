import '../../assets/css/MainSection.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

import MonthlyDetailsChart from './MonthlyDetailsChart'
// import Top5BoxChart from './Top5BoxChart'
import BoxPieChart from './BoxPieChart';
import PropTypes from 'prop-types';
import ComparativeBar from './ComparativeBar';

const ChartSection = (props) => {
    const [monthlyData, setMonthlyData] = useState({});
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [monthlyBookings, setMonthlyBookings] = useState([]);
    const [months, setMonths] = useState([]);
    const [ChartData, setChartData] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:2020/getBKMonthly",  {BK_id: props.BK_id} )
            .then((response) => {
                setMonthlyData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const newMonths = [];
        const newMonthlyRevenue = [];
        const newMonthlyBookings = [];

        for (const month in monthlyData) {
            if (Object.hasOwnProperty.call(monthlyData, month)) {
                newMonths.push(month);
                newMonthlyBookings.push(monthlyData[month].totalBBTimeLength);
                newMonthlyRevenue.push(monthlyData[month].totalAmount);
            }
        }
        setMonths(newMonths);
        setMonthlyBookings(newMonthlyBookings);
        setMonthlyRevenue(newMonthlyRevenue);
    }, [monthlyData]);

    useEffect(()=>{
        axios.post("http://localhost:2020/getBoxPieData", {BK_id: props.BK_id})
            .then((response) => {
                setChartData(response.data);
            })
            .catch((e)=>{
                console.error(e)
            })
    },[])

    useEffect(()=>{
        console.log(ChartData)
    },[ChartData])
    return (
        <main className="main-container" style={{maxHeight: 610, overflowY: 'auto'}}>
            <div className="main-title">
                <p className="font-weight-bold"><strong>Groth Visulization</strong></p>
            </div>
            <div className="charts">
                <div className="charts-card" >
                    <p className="chart-title">Box Revenues</p>
                    <BoxPieChart BoxNames={ChartData.boxNames} BoxRevenue={ChartData.bookings}  />
                </div>
                <div className="charts-card">
                    <p className="chart-title">Top Boxes</p>
                    <ComparativeBar months={months} BK_id={props.BK_id} />
                </div>
                <div className="charts-card">
                    <p className="chart-title">Monthly Revenue</p>
                    <MonthlyDetailsChart data={monthlyRevenue} months={months} lineColor={"#246dec"} bgColor={"rgba(36, 109, 236, 0.2)"} desc={"Revenue of Bookings"} />
                </div>
                <div className="charts-card">
                    <p className="chart-title"> Monthly Bookings</p>
                    <MonthlyDetailsChart data={monthlyBookings} months={months} lineColor={"#44ba10"} bgColor={"rgb(70, 232, 50, 0.2)"} desc={"Number of Bookings"} />
                </div>
            </div>
        </main>
    )
}

ChartSection.propTypes = {
    BK_id: PropTypes.string 
}
export default ChartSection