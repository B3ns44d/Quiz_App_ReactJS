import styled, { createGlobalStyle } from 'styled-components';

import BackgroundIMG from "./img/bg.png";

export const AppStyle = createGlobalStyle`
html {
    height: 100%;
  }
  body::-webkit-scrollbar{
    display: none;
    }   
  body {
    background-image: url(${BackgroundIMG});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
  * {
    font-family: 'Arial', sans-serif;
    box-sizing: border-box;
  }
`;

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    color: #fff;
  }
  .score {
    color: #fff;
    font-size: 2rem;
    margin: 10;
  }
  .appMain {
    display: flex;
    height: 50%;
    align-items: center;
    justify-content: center;
  }

  .appP {
    cursor: pointer;
    position: relative;
    display: inline-block;
    font-size: 2rem;
    background: linear-gradient(to bottom, #000, #000 60%, #fff 60%, #fff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-repeat: no-repeat;
    transition: background 0.2s ease-out;
    white-space: nowrap;
  }

  .appspan {
    position: relative;
  }

  .appspan:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 10px;
    background: #000;
    bottom: 9px;
    transition: all 0.2s ease-out;
  }

  .appP:hover {
    background-position: 0 11px;
  }

  .appspan:hover:before {
    transform: translateY(10px);
  }
  .start,
  .next {
    cursor: pointer;
    background: mediumseagreen;
    border: 2px solid mediumseagreen;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }
  .start {
    max-width: 200px;
  }
`;
