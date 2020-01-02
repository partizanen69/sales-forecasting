import styled from 'styled-components';

export default styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .lds-ring {
        display: inline-block;
        position: relative;
        width: ${props => props.size};
        height: ${props => props.size};
    
        div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: ${props => props.size};
            height: ${props => props.size};
            margin: 0px;
            border: ${props => props.border} solid #fff;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #fff transparent transparent transparent;

            &:nth-child(1) {
                animation-delay: -0.45s;
            }
            
            &:nth-child(2) {
                animation-delay: -0.3s;
            }
            
            &:nth-child(3) {
                animation-delay: -0.15s;
            }
        }
    }
    
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;