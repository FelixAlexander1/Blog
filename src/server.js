import express from 'express';
import axios from 'axios';
import cors from 'cors';
import cron from 'node-cron';
import dotenv from 'dotenv'; 

const app = express();
const port = 3001;

app.use(cors({
    origin: '*', // Permite todas las solicitudes
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Tu clave API de NLP Cloud
const NLP_CLOUD_API_KEY = process.env.REACT_APP_NLP_CLOUD_API_KEY;
const NEWSAPI_KEY = process.env.REACT_APP_NEWS_API_KEY;
let cachedNews = [];

app.use(express.json());

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
        return [];
    }
}

// Función para analizar texto con NLP Cloud
async function analyzeTextWithNLPCloud(text) {
    try {
        const response = await axios.post(
            'https://api.nlpcloud.io/v1/bart-large-cnn/summarization',
            { text: text },
            {
                headers: {
                    'Authorization': `Bearer ${NLP_CLOUD_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data?.summary_text || 'No se pudo generar un resumen';
    } catch (error) {
        console.error('Error en NLP Cloud:', error.message);
        return 'Error al generar resumen';
    }
}

// Función para actualizar noticias cada 24 horas
async function updateNews() {
    console.log('Actualizando noticias...');
    const articles = await fetchNews('tecnología médica');
    cachedNews = await Promise.all(
        articles.map(async (article) => {
            const content = article.content || article.description || article.title;
            const summary = content.length > 30 ? await analyzeTextWithNLPCloud(content) : 'Contenido insuficiente';
            return {
                title: article.title,
                summary: summary,
                url: article.url,
            };
        })
    );
    console.log('Noticias actualizadas:', cachedNews);
}

// Programar tarea para actualizar noticias todos los días a las 5 AM
cron.schedule('0 5 * * *', updateNews);

// Ruta para obtener las noticias almacenadas
app.get('/news', (req, res) => {
    res.json(cachedNews);
});

// Ruta para resumir texto
app.post('/summarize', async (req, res) => {
    const { text } = req.body;
    if (!text || text.trim().length === 0) {
        return res.status(400).json({ error: 'El texto proporcionado no es válido' });
    }

    try {
        const summary = await analyzeTextWithNLPCloud(text);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
    updateNews(); // Actualiza las noticias al iniciar el servidor
});

