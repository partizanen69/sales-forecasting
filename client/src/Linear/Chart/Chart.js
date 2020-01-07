import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types';


function Chart({ tableData }) {
    const options = {
        title: {
            text: 'Actual sales and forecast'
        },
        xAxis: {
            categories: [],
        },
        series: [
            { name: 'Sales', data: [] },
            { name: 'Forecast', data: [] },
        ],
    };

    for (let i = 0; i < tableData.length; i++) {
        const row = tableData[i];

        const salesPoint = {
            y: !row.sales && row.sales !== 0 ? null : Math.round(row.sales * 100, 2) / 100,
            name: row.week,
            color: 'black',
        };
        options.series[0].data.push(salesPoint);

        const fcstPoint = {
            y: salesPoint.y === null ? Math.round(row.forecast * 100, 2) / 100 : null,
            name: row.week,
            color: 'red',
        };
        options.series[1].data.push(fcstPoint);

        options.xAxis.categories.push(String(row.week));
    }

    return <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
}

Chart.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Chart;
