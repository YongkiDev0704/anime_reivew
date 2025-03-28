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

  html, body {
    padding: 0;
    width: 100%;
    max-width: 100%;
    background-color: black;
    margin: 0 auto;
  }
  
  body {
    overflow-x: hidden;
  }

  body::-webkit-scrollbar {
    display: none;
  }



  body::-webkit-scrollbar {
    display: none;   
  }

  button {
    background-color: var(--accent-color);
    font-weight: bold;
  } 

  #root {
    background-color: black;
  }
`;
