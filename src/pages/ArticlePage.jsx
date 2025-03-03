import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const MainContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const ArticleContent = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 15px;
  background-color: ${(props) => (props.theme.mode === 'dark' ? '#333' : '#ffffff')};
  color: ${(props) => (props.theme.mode === 'dark' ? '#f5f5f5' : '#333')};
  border-radius: 8px;
  box-shadow: 0 4px 10px ${(props) => (props.theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const ArticleImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 20px; /* Espacio entre la imagen y el texto */
`;

const ArticleText = styled.div`
  flex: 1;
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

const SocialButtons = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const SocialIcon = styled.a`
  font-size: 1.5rem;
  color: ${(props) => (props.theme.mode === 'dark' ? '#ffcc00' : '#007bff')};
  transition: color 0.3s ease;
  &:hover {
    color: ${(props) => (props.theme.mode === 'dark' ? '#ffd700' : '#0056b3')};
  }
`;

const CommentSection = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: ${(props) => (props.theme.mode === 'dark' ? '#222' : '#f9f9f9')};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  max-height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  font-size: 1rem;
`;

const CommentButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  background-color: ${(props) => (props.theme.mode === 'dark' ? '#ffcc00' : '#007bff')};
  color: ${(props) => (props.theme.mode === 'dark' ? '#000' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => (props.theme.mode === 'dark' ? '#ffd700' : '#0056b3')};
  }
`;

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);

  // Recuperar el artículo y los comentarios desde localStorage
  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem('news')) || [];
    const foundArticle = articles.find((a) => a.id === parseInt(id));

    if (foundArticle) {
      setArticle(foundArticle);
    }

    // Cargar los comentarios desde localStorage
    const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
    setComments(storedComments);
  }, [id]);

  // Función para guardar los comentarios en localStorage
  const saveComments = (newComments) => {
    localStorage.setItem(`comments-${id}`, JSON.stringify(newComments));
  };

  // Agregar un comentario
  const addComment = () => {
    if (newComment.trim() && user) {
      const newComments = [...comments, { username: user, text: newComment }];
      setComments(newComments);
      setNewComment('');
      saveComments(newComments); // Guardar los comentarios en localStorage
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!article) return <div>Cargando...</div>;

  return (
    <MainContainer>
      <ArticleContent>
        <ArticleImage
          src={article.image || 'https://via.placeholder.com/600x300'}
          alt={article.title}
        />
        <ArticleText>
          <Title>{article.title}</Title>
          <p>{article.summary}</p>
          <ToggleButton onClick={toggleExpand}>
            {isExpanded ? 'Ver menos' : 'Leer el artículo completo'}
          </ToggleButton>
          {isExpanded && <p>{article.content}</p>}
        </ArticleText>
      </ArticleContent>
      <SocialButtons>
        <SocialIcon href={`https://twitter.com/intent/tweet?url=${article.url}`} target="_blank">
          <FaTwitter />
        </SocialIcon>
        <SocialIcon href={`https://www.facebook.com/sharer/sharer.php?u=${article.url}`} target="_blank">
          <FaFacebook />
        </SocialIcon>
        <SocialIcon href={`https://api.whatsapp.com/send?text=${article.url}`} target="_blank">
          <FaWhatsapp />
        </SocialIcon>
      </SocialButtons>

      <CommentSection>
        <h3>Comentarios</h3>
        {user ? (
          <>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
            />
            <CommentButton onClick={addComment}>Enviar</CommentButton>
          </>
        ) : (
          <p>Debes <a href="/login">iniciar sesión</a> para comentar.</p>
        )}

        {comments.map((comment, index) => (
          <p key={index}><strong>{comment.username}:</strong> {comment.text}</p>
        ))}
      </CommentSection>
    </MainContainer>
  );
}

export default ArticlePage;
