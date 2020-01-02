import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import FileLoader from './FileLoader/FileLoader';
import DataTable from './DataTable/DataTable';
import Styles from './Styles';

export default function Linear() {
    const [ tableData, setTableData ] = useState([]);

    return <Styles>
        <FileLoader tableData={tableData} setTableData={setTableData} />

        <Tabs defaultActiveKey="data">
            <Tab eventKey="data" title="Data">
                <DataTable tableData={tableData} />
            </Tab>
            <Tab eventKey="chart" title="Chart">
                <p>Forecast chart will be placed here</p>
            </Tab>
        </Tabs>
    </Styles>
}