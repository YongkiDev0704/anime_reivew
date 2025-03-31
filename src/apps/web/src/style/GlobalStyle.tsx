import { createGlobalStyle } from "styled-components";

import RobotoBold from "../assets/fonts/Roboto/Roboto-Bold.ttf"
import RobotoRegular from "../assets/fonts/Roboto/Roboto-Regular.ttf"
import Inter18Bold from "../assets/fonts/Inter/Inter_18pt-Bold.ttf"
import Inter24Bold from "../assets/fonts/Inter/Inter_24pt-Bold.ttf"
import Inter24Regular from "../assets/fonts/Inter/Inter_24pt-Regular.ttf"

export const MAX_WIDTH = 1440;

export const GlobalStyle = createGlobalStyle`
  :root {
    --main-background: #141414;
    --main-text: #FFFFFF;
    --accent-color: #00F5D4;
    --box-background: #333333;
    --box-container: #585858;
  }

  
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Inter';
    src: url(${Inter18Bold}) format('truetype');
    font-weight: 700;
    font-size: 18px;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${Inter24Bold}) format('truetype');
    font-weight: 700;
    font-size: 24px;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${Inter24Regular}) format('truetype');
    font-weight: 400;
    font-size: 24px;
    font-style: normal;
  }

  html, body {
    padding: 0;
    width: 100%;
    max-width: 100%;
    background-color: black;
    margin: 0 auto;
    font-family: 'Roboto', sans-serif;
  }
  
  body {
    overflow-x: hidden;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  p {
    margin: 0;
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
