import React from 'react';

import Styles from './Styles';

class Linear extends React.Component {
  constructor() {
    super();
    this.state = {
      fileContent: '',
    };
  }

  startLoading() {
    const fileReader = new FileReader();
    console.log('fileReader', fileReader);
    console.log('this', this);
    console.log('this.sta', this.state.fileContent);
  }

  render() {
    return <Styles>
      <div>Linear</div>
      
      <input 
        type='file' 
        className='file-input' 
        accept='.csv' 
        onChange={e => this.setState({ fileContent: e.target.files[0] })}
      />

      <button onClick={() => this.startLoading()}>
        Click me
      </button>
    </Styles>
  }

}

export default Linear;
