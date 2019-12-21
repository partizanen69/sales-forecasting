import React from 'react';
import PropTypes from 'prop-types';

function TableRow({ row, idx }) {
    return (
        <tr key={idx}>
            <td>{row.week}</td>
            <td>{row.sales}</td>
        </tr>
    )
}

TableRow.propTypes = {
    row: PropTypes.object.isRequired,
    idx: PropTypes.number.isRequired,
}

export default TableRow;