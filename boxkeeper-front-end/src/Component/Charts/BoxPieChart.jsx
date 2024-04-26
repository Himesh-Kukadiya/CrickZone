// import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const BoxPieChart = (props) => {

    return (
        <Pie style={{maxHeight: 300}}
            data={{
                datasets: [{
                    data: props.BoxRevenue,
                    backgroundColor: ['red', 'blue','purple' , 'green', 'orange', 'yellow',],
                }],
                labels: props.BoxNames,
            }}
        />
    );
}

BoxPieChart.propTypes = {
    BoxNames: PropTypes.array,
    BoxRevenue: PropTypes.array
}
export default BoxPieChart;
