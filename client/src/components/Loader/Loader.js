import React from 'react';

import Styles from './Styles';

function Loader({ size, border }) {
    return <Styles size={size} border={border}>
        <div className='lds-ring'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </Styles>
}

export default Loader;