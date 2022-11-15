import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{        
    /* color-palette */
    --color-grey: #eeeeee;
    --color-blue :#00ADB5;
    --color-light-dark: #393E46;
    --color-dark: #222831;
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    font-family: 'Montserrat', sans-serif;
    display: flex;
    place-content: center;
    padding-top: 1rem;
}
input,button{
    font-family: 'Montserrat', sans-serif;
}
`;
export default GlobalStyles;
