import { createGlobalStyle } from "styled-components";

export const MAX_WIDTH = 1440;

export const GlobalStyle = createGlobalStyle`

  :root {
    --main-background: #1E1E1E;
    --main-text: #FFFFFF;
    --accent-color: #00F5D4;
    --box-background: #333333;
    --box-container: #585858;
  }

  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
    
  button {
    background-color: var(--accent-color);
    font-weight: bold;
  } 

  #root {
    display: flex;
    justify-content: center;
    width: 100vw;
    background-color: black;
  }
`;
