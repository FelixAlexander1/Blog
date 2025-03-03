import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Estilos mejorados para el login
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => (props.theme.mode === "dark" ? "#121212" : "#f4f4f4")};
`;

const LoginBox = styled.div`
  background-color: ${(props) => (props.theme.mode === "dark" ? "#333" : "#fff")};
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  color: ${(props) => (props.theme.mode === "dark" ? "#f5f5f5" : "#333")};
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${(props) => (props.theme.mode === "dark" ? "#555" : "#ccc")};
  border-radius: 5px;
  background-color: ${(props) => (props.theme.mode === "dark" ? "#222" : "#fff")};
  color: ${(props) => (props.theme.mode === "dark" ? "#f5f5f5" : "#333")};
  font-size: 1rem;
  &:focus {
    border-color: ${(props) => (props.theme.mode === "dark" ? "#ffcc00" : "#007bff")};
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => (props.theme.mode === "dark" ? "#ffcc00" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.theme.mode === "dark" ? "#ffd700" : "#0056b3")};
  }
`;

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 0.9rem;
  margin-top: 10px;
`;

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      login(username);
      navigate("/"); // Redirige a la página principal
    } else {
      setError("Por favor ingresa un nombre de usuario válido.");
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Iniciar Sesión</Title>
        <Input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <Button onClick={handleLogin}>Entrar</Button>
      </LoginBox>
    </LoginContainer>
  );
}

export default LoginPage;

