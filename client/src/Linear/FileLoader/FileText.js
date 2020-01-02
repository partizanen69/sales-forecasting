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
            <div className='file-text'>{fileName ?
                fileName.length >= 20 ? `${fileName.slice(0, 20)}...` : fileName
                : 'No file choosen yet'}
            </div>
        )
    }

}

export default FileText;