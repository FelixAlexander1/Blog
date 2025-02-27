import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const HeaderWrapper = styled.header`
  background: ${(props) => (props.theme.mode === 'dark' ? '#222' : 'linear-gradient(to right, #3498db, #1abc9c)')};
  color: ${(props) => (props.theme.mode === 'dark' ? '#fff' : 'white')};
  padding: 20px;
  box-shadow: ${(props) => (props.theme.mode === 'dark' ? '0 2px 10px rgba(255, 255, 255, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.1)')};
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-top: 5px;
  opacity: 0.8;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  margin-top: 10px;

  a {
    color: ${(props) => (props.theme.mode === 'dark' ? '#ffcc00' : 'white')};
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1rem;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${(props) => (props.theme.mode === 'dark' ? '#ff6347' : '#ffd700')};
      text-decoration: underline;
    }
  }
`;

const ThemeButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.theme.mode === 'dark' ? '#ffcc00' : '#fff')};
  font-size: 1.8rem;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${(props) => (props.theme.mode === 'dark' ? '#ffd700' : '#ffcc00')};
  }
`;

function Header({ toggleTheme, theme }) {
  return (
    <HeaderWrapper>
      <ThemeButton onClick={toggleTheme} aria-label="Cambiar tema">
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </ThemeButton>
      <HeaderContainer>
        <Title>TecnoBlog</Title>
        <Subtitle>Explora las últimas noticias en tecnología</Subtitle>
        <Nav>
          <Link to="/">Inicio</Link>
          <Link to="/about">Acerca de</Link>
        </Nav>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
