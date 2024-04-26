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
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ComparativeBar = (props) => {
    const [montlyRevanues, setMontlyRevanues] = useState([]);

    useEffect(()=>{
        axios.post("http://localhost:2020/getBoxComparisionRevanue", {BK_id: props.BK_id})
            .then((Response)=> {
                setMontlyRevanues(Response.data)
            })
            .catch((e)=> {
                console.error(e)
            })
    },[])

    const data = {
        labels: props.months,
        datasets: montlyRevanues,
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
        <Line options={options} data={data} style={{maxHeight: 250}} />
    );
}

ComparativeBar.propTypes = {
    BK_id: PropTypes.string,
    months: PropTypes.array,
    data: PropTypes.array,
    desc: PropTypes.string,
}

export default ComparativeBar;
