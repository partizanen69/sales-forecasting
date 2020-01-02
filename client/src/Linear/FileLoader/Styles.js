import styled from 'styled-components';

export default styled.div`
    .uploader {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        
        label {
            margin: 0;
        }
        
        .upload-wrap {
            cursor: pointer;
            padding-top: 0;
            padding-bottom: 2px;
            margin-right: 10px;
            
            input {
                display: none;
            }
            
            div {
                display: flex;
                align-items: center;
                
                i {
                    font-size: 18px;
                    margin-right: 5px;
                }
            }
        }
        
        .file-text {
            margin-right: 10px;
        }
    }
`;