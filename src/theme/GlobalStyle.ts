import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    background-color: ${({ theme }) => theme.color.white};
  }
`;

export default GlobalStyle;
