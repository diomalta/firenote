import styled from 'styled-components';
import { createGlobalStyle  } from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  min-height: 100vh;
`;

export const Content = styled.section`
  flex-direction: column;
  width: 100%;

  background: #21222C;
`;

export const GlobalStyle = createGlobalStyle `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: #181818;
    font-family: 'Source Sans Pro', 'Montserrat', sans-serif;
  }

  input, button {
    font-family: 'Source Sans Pro', 'Montserrat', sans-serif;
  }
  
  button {
    cursor: pointer;
  }
`;