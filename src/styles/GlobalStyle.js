import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  #root {
    min-height: 100%;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    --primary-color: #d21312;

  }

  body[data-theme='light'] {
    --bg-color: #fff;
    --bg-secondary-color: #fff;
    --font-color: #000;
    --font-secondary: #d21312;

    --button-color : #fff;
    --button-disabled-color : #c4bdbd;

    --border: #ababab;
    --border-primary: #d21312;
    --border-bottom: #1C2128;
    
  }

  body[data-theme='dark'] {
    --bg-color: #22272e; /* 진한 회색  */
    --bg-secondary-color: #353C45; /* 연한 회색 */
    --bg-dark-color: #1C2128; /* 가장 진한 회색 */
    --bg-dark-sign-color: #161B22;
    --bg-dark-black-color: #0D1116;

    --font-color: #CDD9E5; /* 연한 글자 회색 */
    --font-secondary: #549bf5;

    --button-color: #2D333B;  
    --button-disabled-color : #353C45;


    --border: none;
    --border-primary: #2D333B;
    --border-secondary: #373E47;
    --border-bottom:#CDD9E5;
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
