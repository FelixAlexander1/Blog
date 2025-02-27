import React from 'react';
import styled from 'styled-components';

// Estilos para la página de About
const AboutContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const Content = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
`;

const About = () => {
  return (
    <AboutContainer>
      <Title>Acerca de Nosotros</Title>
      <Content>
        Bienvenido a nuestro blog. Aquí compartimos noticias, artículos y recursos relacionados con la tecnología médica.
        Nuestro objetivo es mantenerte informado sobre los avances más recientes en este campo, proporcionándote resúmenes
        concisos y accesibles de las noticias más relevantes. ¡Esperamos que disfrutes tu visita!
      </Content>
    </AboutContainer>
  );
}

export default About;
