import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

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

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 20px;
  left: 20px;
  margin-top: 10px;
`;

const ThemeButton = styled.button`
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

const UserSection = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 1.1rem;
  color: ${(props) => (props.theme.mode === 'dark' ? '#ffcc00' : 'white')};
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.theme.mode === 'dark' ? '#ffcc00' : 'white')};
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.theme.mode === 'dark' ? '#ffd700' : '#ffd700')};
  }
`;

function Header({ toggleTheme, theme }) {
  const { user, logout } = useContext(AuthContext); // Usamos AuthContext para obtener el usuario
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Title>TecnoBlog</Title>
        <Subtitle>Explora las últimas noticias en tecnología</Subtitle>
        <Nav>
          <Link to="/">Inicio</Link>
          <Link to="/about">Acerca de</Link>
        </Nav>
      </HeaderContainer>

      {/* Sección superior derecha con el botón de tema y el área de usuario */}
      <TopSection>
        <ThemeButton onClick={toggleTheme} aria-label="Cambiar tema">
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </ThemeButton>

        <UserSection>
          {user ? (
            <>
              <UserName>{user}</UserName>
              <LogoutButton onClick={logout}>Cerrar sesión</LogoutButton>
            </>
          ) : (
            <Link to="/login" style={{ color: theme === 'dark' ? '#ffcc00' : 'white' }}>
              Iniciar sesión
            </Link>
          )}
        </UserSection>
      </TopSection>
    </HeaderWrapper>
  );
}

export default Header;
