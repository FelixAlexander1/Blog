import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Estilos adaptados para modo oscuro/claro
const MainContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const ArticleContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: ${(props) => (props.theme.mode === 'dark' ? '#333' : '#ffffff')}; 
  color: ${(props) => (props.theme.mode === 'dark' ? '#f5f5f5' : '#333')}; 
  border-radius: 8px;
  box-shadow: 0 4px 10px ${(props) => (props.theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const ArticleText = styled.div`
  flex: 1;
  padding-left: 20px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: ${(props) => (props.theme.mode === 'dark' ? '#ffcc00' : '#333')}; 
  text-align: left;
`;

const ToggleButton = styled.button`
  display: block;
  margin: 15px auto;
  padding: 10px;
  background-color: ${(props) => (props.theme.mode === 'dark' ? '#ffcc00' : '#007bff')}; 
  color: ${(props) => (props.theme.mode === 'dark' ? '#000' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.theme.mode === 'dark' ? '#ffd700' : '#0056b3')};
  }
`;

const ArticleImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 5px;
  object-fit: cover;
`;

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem('news')) || [];
    const foundArticle = articles.find((a) => a.id === parseInt(id));

    if (foundArticle) {
      setArticle(foundArticle);
    }
  }, [id]);

  if (!article) return <div>Cargando...</div>;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const imageSrc = article.image || 'https://via.placeholder.com/600x300';

  return (
    <MainContainer>
      <ArticleContent>
        <ArticleImage src={imageSrc} alt={article.title} />
        
        <ArticleText>
          <Title>{article.title}</Title>
          <p>{article.summary}</p>

          <ToggleButton onClick={toggleExpand}>
            {isExpanded ? 'Ver menos' : 'Leer el artículo completo'}
          </ToggleButton>

          {isExpanded && (
            <div>
              <p>{article.content}</p>
            </div>
          )}
        </ArticleText>
      </ArticleContent>
    </MainContainer>
  );
}

export default ArticlePage;
