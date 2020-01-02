import React from "react";
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import TableRow from './TableRow/TableRow';
import Styles from './Styles';

function DataTable({ tableData }) {
    console.log('tableData', tableData);

    const { 
        year, just_week, period_num, mov_avg, seas_coef, sales_clear_of_seas,
        x_mult_y, x_squared, trend, forecast,
    } = tableData[0] || {};

    return <Styles>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Week ISO</th>
                <th>Sales</th>
                {year !== undefined ? (<th>Year</th>) : null}
                {just_week !== undefined ? (<th>Week</th>) : null}
                {period_num !== undefined ? (<th>Period</th>) : null}
                {mov_avg !== undefined ? (<th>Moving average</th>) : null}
                {seas_coef !== undefined ? (<th>Seasonal coef</th>) : null}
                {sales_clear_of_seas !== undefined ? (<th>Cleared sales</th>) : null}
                {x_mult_y !== undefined ? (<th>x * y</th>) : null}
                {x_squared !== undefined ? (<th>x ^ 2</th>) : null}
                {trend !== undefined ? (<th>Trend</th>) : null}
                {forecast !== undefined ? (<th>Forecast</th>) : null}
            </tr>
            </thead>
            <tbody>
            {tableData.length ?
                tableData.map((row, idx) => (<TableRow key={idx} row={row} idx={idx} />)) : null}
            </tbody>
        </Table>
    </Styles>
}

DataTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default DataTable;