import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Spinner = styled.i`
  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border-top: 4px solid rgb(139, 131, 152);
    border-right: 4px solid transparent;
    animation: ${rotate360} 0.6s linear infinite;
  }
`;
