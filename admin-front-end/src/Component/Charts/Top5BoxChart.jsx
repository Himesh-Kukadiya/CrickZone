import  { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Top5BoxChart = () => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2020/top5Boxes');
                const data = {
                    labels: Object.keys(response.data),
                    datasets: [{
                        label: "Top 5 Boxes",
                        data: Object.values(response.data).map(item => item.totalAmount),
                        backgroundColor: '#1f77b4'
                    }]
                };
                setChartData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartData) {
            const chartOptions = {
                plugins: {
                    legend: {
                        position: 'top',
                        display: true,
                    },
                    title: {
                        display: false,
                        text: 'Sales Data',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Top 5 Boxes'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Revanue'
                        }
                    }
                }
            };

            const chart = new Chart(chartRef.current, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });

            return () => {
                chart.destroy();
            };
        }
    }, [chartData]);

    return (
        <div style={{ width: '500px' }}>
            <canvas ref={chartRef} />
        </div>
    );
};

export default Top5BoxChart;
