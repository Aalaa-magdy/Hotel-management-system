import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import logo from '../assets/logo.jpg'
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  

  return (
    <StyledLogo>
      <Img src={logo} style={{borderRadius: '80px'}} alt="Logo" />
      <h1 style={{color: isDarkMode? 'white' : 'black'}}>The Wild Oasis</h1>
    </StyledLogo>
  );
}

export default Logo;