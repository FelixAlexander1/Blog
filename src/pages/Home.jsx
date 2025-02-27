import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { useTheme } from 'styled-components';

// Contenedor general de las noticias
const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto; /* Centrar el grid en la página */
`;

// Tarjeta de cada artículo
const ArticleCard = styled.div`
  background: ${(props) => (props.theme.mode === 'dark' ? '#333' : '#fff')};
  border-radius: 10px;
  box-shadow: 0 4px 8px ${(props) => (props.theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
  overflow: hidden;
  transition: transform 0.2s ease-in-out, background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02); /* Pequeño zoom al pasar el mouse */
  }
`;

// Imagen en la tarjeta
const ArticleImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

// Contenido dentro de la tarjeta
const ArticleContent = styled.div`
  padding: 15px;
`;

// Título del artículo
const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: ${(props) => (props.theme.mode === 'dark' ? '#ffcc00' : '#333')};
  transition: color 0.3s ease;
  text-align: justify; /* Justificar el título */
`;

// Resumen del artículo
const Summary = styled.p`
  font-size: 1rem;
  color: ${(props) => (props.theme.mode === 'dark' ? '#ddd' : '#666')};
  margin-bottom: 15px;
  text-align: justify; /* Justificar el resumen */
  transition: color 0.3s ease;
`;

// Botón de "Leer más"
const ReadMore = styled(Link)`
  display: inline-block;
  padding: 10px;
  background-color: ${(props) => (props.theme.mode === 'dark' ? '#ffcc00' : '#007bff')};
  color: ${(props) => (props.theme.mode === 'dark' ? '#000' : '#fff')};
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.theme.mode === 'dark' ? '#ffd700' : '#0056b3')};
  }
`;

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme(); // Obtenemos el tema actual

  useEffect(() => {
    const fetchAndDisplayNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'tecnología médica',
            apiKey: '6f73c56cc6b642028c7d522e14b6ab80',
          },
        });

        const articles = response.data.articles.slice(0, 5);
        const summarizedArticles = articles.map((article, i) => ({
          id: i,
          title: article.title,
          summary: article.content || article.description,
          content: article.content,
          image: article.urlToImage || 'https://via.placeholder.com/600x300',
        }));

        localStorage.setItem('news', JSON.stringify(summarizedArticles));
        setNews(summarizedArticles);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las noticias:', error);
        setLoading(false);
      }
    };

    fetchAndDisplayNews();
  }, []);

  const filteredNews = news.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: theme.mode === 'dark' ? '#121212' : '#fff', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: theme.mode === 'dark' ? '#fff' : '#333' }}>
        Noticias Recientes
      </h1>
      <input
        type="text"
        placeholder="Buscar noticias..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: '20px auto',
          display: 'block',
          padding: '10px',
          borderRadius: '5px',
          border: `1px solid ${theme.mode === 'dark' ? '#555' : '#ccc'}`,
          background: theme.mode === 'dark' ? '#333' : '#fff',
          color: theme.mode === 'dark' ? '#fff' : '#333',
        }}
      />
      <NewsContainer>
        {filteredNews.map((article) => (
          <ArticleCard key={article.id}>
            <ArticleImage src={article.image} />
            <ArticleContent>
              <Title>{article.title}</Title>
              <Summary>{article.summary}</Summary>
              <ReadMore to={`/article/${article.id}`}>Leer más</ReadMore>
            </ArticleContent>
          </ArticleCard>
        ))}
      </NewsContainer>
    </div>
  );
};

export default Home;
