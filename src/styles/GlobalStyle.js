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


    
    [data-theme='light'] {
      --primary-color: #d21312;
      --bg-color: #fff;
      --font-color: #000;
    }
    
    [data-theme='dark'] {
      --primary-color: #d21312;
      --bg-color: #22272e;
      --font-color: #fff;
    }
  }

  #root {
    min-height: 100%;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
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
