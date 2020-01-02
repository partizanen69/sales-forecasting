import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaFileCsv, FaFileUpload } from 'react-icons/fa';

import FileText from './FileText';
import Styles from './Styles';
import CalcButton from "./CalcButton/CalcButton";

function FileLoader({ setTableData, tableData }) {
    let fileObj;
    let fileReader = {};
    let fileTextElem = React.createRef();

    return <Styles>
        <div>Linear</div>

        <div className='uploader'>
            <label className='upload-wrap btn btn-outline-dark'>
                <input
                    type='file'
                    accept='.csv'
                    onChange={e => acceptFile(e)}
                />
                <div>
                    <i><FaFileCsv /></i>
                    Select file
                </div>
            </label>

            <FileText ref={fileTextElem} />

            <CalcButton tableData={tableData} />
        </div>
    </Styles>

    function acceptFile(e) {
        fileObj = e.target.files[0];
        fileTextElem.current.change(fileObj.name);

        if (!fileObj) return;

        fileReader = new FileReader();
        fileReader.onload = processLoadedFile;
        fileReader.readAsText(fileObj);
    }

    function processLoadedFile() {
        if (!fileReader.result) return;

        let rawData = fileReader.result.split('\n');
        if (!rawData.length) return alert('Could not find rows in the file');
        if (rawData[0].indexOf(';') === -1) return alert('Could not find ";" (semicolon) delimiter in the header');

        let header = rawData[0].split(';').map(elem => {
            elem = elem.trim();
            return (elem || '').toUpperCase();
        });

        /* Check if header contains week iso and sales columns */
        let weekIdx = -1, salesIdx = -1;
        const weekOptions = ['Week ISO', 'Week_ISO', 'Week', 'ISO Week', 'ISO_Week'];
        const salesOptions = ['Sales', 'Sale'];

        for (let i = 0; i < weekOptions.length; i++) {
            const option = weekOptions[i].toUpperCase();
            if (weekIdx === -1) weekIdx = header.indexOf(option);
        }

        for (let i = 0; i < salesOptions.length; i++) {
            const option = salesOptions[i].toUpperCase();
            if (salesIdx === -1) salesIdx = header.indexOf(option);
        }

        if (weekIdx === -1) return alert('Could not find "Week ISO" column in the header');
        if (salesIdx === -1) return alert('Could not find "Sales" column in the header');

        const data = []; /* { week: 201948, sales: 33 } */
        for (let i = 1; i < rawData.length; i++) {
            const row = rawData[i].split(';');

            /* Check of week ISO value is correct */
            let week = row[weekIdx];
            let weekNum = +week.slice(-2);
            if (isNaN(week) || week.length !== 6 || +week < 0 || weekNum < 1 || weekNum > 53)
                return alert(`Week ISO value is not correct at ${i + 1} row`);

            /* Check is sales value is correct */
            let sales = +row[salesIdx];
            if (isNaN(sales) || sales < 0) return alert(`Sales value is not correct at ${i + 1} row`);

            data.push({ week: +week, sales });
        }

        fileTextElem.current.change('');
        setTableData(data);
    }
}

FileLoader.propTypes = {
    setTableData: PropTypes.func.isRequired,
    tableData: PropTypes.arrayOf(PropTypes.object),
}

export default FileLoader;