import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import FileLoader from './FileLoader/FileLoader';
import DataTable from './DataTable/DataTable';
import Chart from './Chart/Chart.js';
import FcstParams from './FcstParams/FcstParams';
import Styles from './Styles';

export default function Linear() {
    const [ tableData, setTableData ] = useState([]);
    const [ fcstParams, setFcstParams ] = useState({});

    return <Styles>
        <p>Calculate linear regression based on historical sales data divided by weeks {
            }(<a href='/static/files/fcst_import.csv'>input file example</a>).</p>
        <p>Input file params:</p>
        <ul>
            <li>Extension: .csv</li>
            <li>Delimiter: ; (semicolon)</li>
            <li>Columns: week_iso, sales</li>
        </ul>

        <FileLoader 
            tableData={tableData}
            setTableData={setTableData}
            setFcstParams={setFcstParams}
        />

        {Object.keys(fcstParams).length ? (<FcstParams params={fcstParams} />) : ''}

        <Tabs defaultActiveKey="data">
            <Tab eventKey="data" title="Data">
                <DataTable tableData={tableData} />
            </Tab>
            <Tab eventKey="chart" title="Chart">
                {tableData.length ? '' : (<p>Forecast chart will be placed here</p>)}
                {tableData.length ? (<Chart tableData={tableData} />) : ''}
            </Tab>
        </Tabs>
    </Styles>
}