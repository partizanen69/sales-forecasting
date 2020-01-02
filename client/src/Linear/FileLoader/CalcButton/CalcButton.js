import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';

import Styles from './Styles';
import { Button } from 'react-bootstrap';
import Loader from '../../../components/Loader/Loader';
import { AiFillCalculator } from 'react-icons/ai';
import { handleAxiosError } from '../../../sharedLib';

function CalcButton({ tableData, setTableData }) {
    let [ isLoading, setLoading ] = useState(false);

    return <Styles>
        <Button
            className='calculate'
            variant="danger"
            onClick={startCalculation}
        >
            {isLoading ? (<Loader size='20px' border='3px' />) : (<span><i><AiFillCalculator /></i>Calculate</span>)}
        </Button>

    </Styles>

    async function startCalculation() {
        if (!tableData.length || isLoading) return;

        if (tableData.length < 104)
            return alert(`To calculate forecast, input file must contain data for at least 2 years (104 weeks)`);

        console.log('Go on', tableData);

        setLoading(true);

        /* Check if tableData is a valid array */
        const toSend = [];
        for (let i = 0; i < tableData.length; i++) {
            const row = tableData[i];
            if (typeof row.sales !== 'number' || typeof row.week !== 'number') {
                setLoading(false);
                return alert('It seems, incorrect csv file was uploaded. File must contain Week ISO and Sales columns');
            }

            toSend.push({ week: row.week, sales: row.sales });
        }
        
        const options = {
            method: 'post',
            url: '/api/calculate_linear',
            data: { rows: toSend },
        };

        let data, status;
        try { ({ data, status } = await axios(options)) }
        catch(err) {
            const msg = handleAxiosError(err);
            setLoading(false);
            return alert(msg);
        }

        if (typeof data === 'string') {
            try { data = JSON.parse(data); }
            catch(err) { console.error('Could not parse JSON data', err); }
        }

        console.log('startCalculation received result:', { data, status });

        setLoading(false);
        setTableData(data.data);
    }
}

CalcButton.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object),
    setTableData: PropTypes.func.isRequired,
}

export default CalcButton;