import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MonthlyDetailsChart = (props) => {

    const date = new Date(Date.now());
    
    const year = date.getFullYear();
    const data = {
        labels: props.months,
        datasets: [
            {
                label: `Booking of ${year}`,
                data: props.data,
                backgroundColor: props.bgColor,
                borderColor: props.lineColor, 
                borderWidth: 2,
                fill: 'origin', 
                tension: 0.4, 
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: props.desc,
                },
            },
        },
    };

    return (
        <Line options={options} data={data} />
    );
}

MonthlyDetailsChart.propTypes = {
    months: PropTypes.array,
    data: PropTypes.array,
    desc: PropTypes.string,
    lineColor: PropTypes.string,
    bgColor: PropTypes.string,
}

export default MonthlyDetailsChart;
