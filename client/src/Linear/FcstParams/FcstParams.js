import React from 'react';
import PropTypes from 'prop-types';

import Styles from './Styles';

/**
 * @param params {Object}
 *  @param a {Number}
 *  @param b {Number}
 *  @param mape {Number}
 *  @param stdev_on_fcst {Number}
 *  @param stdev_on_sales {Number}
 */
function FcstParams({ params }) {

    const { a, b, mape, stdev_on_fcst, stdev_on_sales } = params;

    return <Styles>
        <p>Linear regression equation: y = {a || ''} + {b || ''}x (y = a + bx).</p>
        <p>Mean absolute percentage error (MAPE): {mape || ''}.</p>
        <p>Standard deviation on actual sales: {stdev_on_sales || ''}.</p>
        <p>Standard deviation on forecast sales: {stdev_on_fcst || ''}.</p>
    </Styles>
}

FcstParams.propTypes = {
    params: PropTypes.object.isRequired,
}

export default FcstParams;