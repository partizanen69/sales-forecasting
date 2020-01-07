import React from 'react';

import Styles from './Styles';

class Home extends React.Component {

  render() {
    return (
      <Styles>
        <p>
          This is the portfolio project of Oleksii Ablitsov, a fullstack web developer.
        </p>
    <p>The app calculates sales forecast based on linear regression (additive model) and actually implements {
      }logic presented in <a href='/static/files/linear.xlsx'>this file</a>.</p>
        <p>Technology stack:</p>
        <ul>
          <li>Python Flask on back end</li>
          <li>React on front end</li>
        </ul>
        <p>Complete code of the app can be found on <a href='https://github.com/partizanen69/sales-forecasting'>Github</a>.</p>
      </Styles>
    )
  }
}

export default Home;
