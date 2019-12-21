import React from 'react';

class FileText extends React.Component {
    constructor() {
        super();
        this.state = { fileName: '' }
    }

    change(fileName) {
        this.setState({ fileName });
    }

    render() {
        const { fileName } = this.state;
        return (
            <div>{fileName ? `${fileName.slice(0, 20)}...` : 'No file choosen yet'}</div>
        )
    }

}

export default FileText;