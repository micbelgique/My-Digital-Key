import styled from 'styled-components';

const LoginWrapper = styled.div`
    width: 300px;
    height: auto;
    display: block;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 200;
    font-family: Roboto;
    ${props => props.noJS && 'filter: grayscale(0.9);'}
`;

export default LoginWrapper;
