import React from "react";
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import TableRow from './TableRow/TableRow';
import Styles from './Styles';

function DataTable({ tableData }) {
    console.log('tableData', tableData);

    return <Styles>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Week ISO</th>
                    <th>Sales</th>
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