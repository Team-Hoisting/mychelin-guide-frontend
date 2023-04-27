import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  body[data-theme='light'] {
    --bg-color: #fff;
    --font-color: #000;
    --button-color : #fff;
    --border: #ababab;
   
  }

  body[data-theme='dark'] {
    --bg-color: #22272e;
    --bg-secondary-color: #2D333B;
    --font-color: #CDD9E5;
    --button-color: #2D333B;
    --border: none;
    --border-secondary: #373E47;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    min-height: 100%;
    

    background-color: var(--bg-color);
    color: var(--font-color);

  }



  #root {
    min-height: 100%;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    --primary-color: #d21312;

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
    font-family: 'Noto Sans KR', sans-serif;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  code {
    font-family: monospace;
  }
`;

export default GlobalStyle;
