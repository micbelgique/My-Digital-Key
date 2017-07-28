import styled, { keyframes } from 'styled-components';

const shaking = keyframes`
from, to {
    transform: translate3d(0, 0, 0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-10px, 0, 0);
  }
  20%, 40%, 60%, 80% {
    transform: translate3d(10px, 0, 0);
  }
}
`;

const LoginForm = styled.form`
  position: relative;
  width: 100%;
  height: auto;
  padding: 35px 25px;
  background: rgba(245, 246, 248, .1);
  border-radius: 2px;
  ${props => props.animateError && `animation: 1s ${shaking} ease-in-out 0s;`}
`;

export default LoginForm;
