import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import About from './components/About';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AuthProvider } from './context/AuthContext';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.theme.mode === 'dark' ? '#121212' : '#ffffff')};
    color: ${(props) => (props.theme.mode === 'dark' ? '#ffffff' : '#333')};
    transition: all 0.3s ease;
  }
`;

const App = () => {
  const [theme, setTheme] = useState({ mode: 'light' });

  const toggleTheme = () => {
    setTheme((prevTheme) => ({
      mode: prevTheme.mode === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <AuthProvider>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <Header toggleTheme={toggleTheme} theme={theme.mode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
</AuthProvider>

  );
};

export default App;
