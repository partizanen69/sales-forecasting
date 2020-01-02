import React from 'react';
import PropTypes from 'prop-types';

function TableRow({ row, idx }) {
    const { week, sales, year, just_week, period_num, mov_avg, seas_coef, 
            sales_clear_of_seas, x_mult_y, x_squared, trend, forecast } = row;
    
    return (
        <tr key={idx}>
            <td>{week}</td>
            <td>{sales ? sales.toFixed(2) : ''}</td>
            {year !== undefined ? (<td>{year}</td>) : null}
            {just_week !== undefined ? (<td>{just_week}</td>) : null}
            {period_num !== undefined ? (<td>{period_num}</td>) : null}
            {mov_avg !== undefined ? (<td>{mov_avg ? mov_avg.toFixed(2) : ''}</td>) : null}
            {seas_coef !== undefined ? (<td>{seas_coef ? seas_coef.toFixed(2) : ''}</td>) : null}
            {sales_clear_of_seas !== undefined
                ? (<td>{sales_clear_of_seas ? sales_clear_of_seas.toFixed(2) : ''}</td>) : null}
            {x_mult_y !== undefined ? (<td>{x_mult_y ? x_mult_y.toFixed(2) : ''}</td>) : null}
            {x_squared !== undefined ? (<td>{x_squared ? x_squared.toFixed(2) : ''}</td>) : null}
            {trend !== undefined ? (<td>{trend ? trend.toFixed(2) : ''}</td>) : null}
            {forecast !== undefined ? (<td>{forecast ? forecast.toFixed(2) : ''}</td>) : null}
        </tr>
    )
}

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
}

export default TableRow;