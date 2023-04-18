import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    min-height: 100%;
  }

  #root {
    min-height: 100%;
  }

  html {
    height: 100%;
  }

  a {
  color: inherit;
  text-decoration: none;
  }

  * {
    box-sizing: inherit;
  }

  code {
    font-family: monospace;
  }
`;

export default GlobalStyle;
