import '../../assets/css/MainSection.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

import MonthlyDetailsChart from './MonthlyDetailsChart'
import Top5BoxChart from './Top5BoxChart'

const ChartSection = () => {
    const [monthlyData, setMonthlyData] = useState({});
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [monthlyBookings, setMonthlyBookings] = useState([]);
    const [months, setMonths] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2020/monthlyBookings")
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

    return (
        <main className="main-container" style={{maxHeight: 610, overflowY: 'auto'}}>
            <div className="charts">
                {/* <div className="charts-card">
                    <p className="chart-title">Top Boxes</p>
                    <Chart2 />
                </div> */}
                <div className="charts-card">
                    <p className="chart-title">Monthly Revenue</p>
                    <MonthlyDetailsChart data={monthlyRevenue} months={months} lineColor={"#246dec"} bgColor={"rgba(36, 109, 236, 0.2)"} desc={"Revenue of Bookings"} />
                </div>
                <div className="charts-card">
                    <p className="chart-title"> Monthly Bookings</p>
                    <MonthlyDetailsChart data={monthlyBookings} months={months} lineColor={"#44ba10"} bgColor={"rgb(70, 232, 50, 0.2)"} desc={"Number of Bookings"} />
                </div>
                <div className="charts-card">
                    <p className="chart-title">Top Boxes</p>
                    <Top5BoxChart />
                </div>
            </div>
        </main>
    )
}

export default ChartSection