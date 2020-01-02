import styled from 'styled-components';

export default styled.div`
    overflow: auto;
    
    table {
        width: auto;
        border: none;
        font-size: 14px;
        
        thead {
            th {
                padding: 5px;
                background-color: #fff;
                font-weight: 600;
                text-align: center;
            }
        }
        
        tbody {
            td {
                padding: 3px 5px; 
                text-align: right;
            }
        }
    }
`;