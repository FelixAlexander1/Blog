import axios from 'axios';

const NEWSAPI_KEY = process.env.REACT_APP_NEWS_API_KEY;  

// Función para obtener noticias
async function fetchNews(query) {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,  
        apiKey: NEWSAPI_KEY,  
      },
    });

    if (response.status === 200) {
      return response.data.articles.slice(0, 5);  
    } else {
      throw new Error('No se pudieron obtener las noticias.');
    }
  } catch (error) {
    console.error('Error en la solicitud de noticias:', error.message);
    return []; // Retorna un array vacío si no se obtienen noticias
  }
}

// Función para generar el resumen con NLP Cloud
async function summarizeArticle(text) {
  const NLP_CLOUD_API_KEY = process.env.REACT_APP_NLP_CLOUD_API_KEY; // Sustituye con tu clave de NLP Cloud

  try {
    const response = await axios.post(
      'https://api.nlpcloud.io/v1/gpt-3.5-turbo/summarize', // URL del endpoint para resumir en NLP Cloud
      { text: text },  // El texto que quieres resumir
      {
        headers: {
          'Authorization': `Bearer ${NLP_CLOUD_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data?.summary) {
      return response.data.summary;  // Retorna el resumen del artículo
    } else {
      console.log('No se pudo generar el resumen.');
      return 'No se pudo generar un resumen.';
    }
  } catch (error) {
    console.error('Error al generar el resumen:', error.message);
    return 'Hubo un error al generar el resumen.';
  }
}

// Función para obtener y resumir las noticias
async function getAndSummarizeNews(query) {
  try {
    //Obtener las noticias más recientes sobre un tema específico
    const articles = await fetchNews(query);

    if (articles.length === 0) {
      console.log('No se encontraron noticias');
      return []; // Retorna un array vacío si no hay noticias
    }

    // Resumir cada artículo
    // Modificación del mapeo de artículos para incluir la URL completa
const summaries = await Promise.all(
  articles.map(async (article) => {
    const contentToSummarize = article.content || article.description || article.title;

    // Verificamos que el contenido no esté vacío antes de enviarlo
    if (!contentToSummarize || contentToSummarize.length < 30) {
      console.log(`Contenido demasiado corto para resumir: ${article.title}`);
      return {
        title: article.title,
        content: article.content || article.description || "Contenido no disponible",
        summary: 'No hay suficiente contenido para resumir.',
        url: article.url,  // Agregamos la URL completa
      };
    }

    console.log(`Resumen para el artículo: ${article.title}`);
    const summary = await summarizeArticle(contentToSummarize);
    return {
      title: article.title,
      content: article.content || article.description || "Contenido no disponible",
      summary: summary,
      url: article.url,  // Agregamos la URL completa
    };
  })
);


    // Paso 3: Retornar los resúmenes generados
    return summaries;
  } catch (error) {
    console.error('Error en el flujo de noticias:', error.message);
    return [];  // Retorna un array vacío en caso de error
  }
}

// Exportamos la función
export { getAndSummarizeNews };
