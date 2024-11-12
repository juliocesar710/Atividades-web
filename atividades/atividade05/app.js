const express = require('express');
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

const animes = [
    {
        id: 1,
        name: "Naruto",
        genre: "Ação",
        studio: "Pierrot"
    }
];

// Rota para criar um anime
app.post('/animes', (req, res) => {
    const { name, genre, studio } = req.body;

    if (!name || !genre || !studio) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const newAnime = {
        id: Date.now(),
        name,
        genre,
        studio
    };

    animes.push(newAnime);
    res.status(201).json(newAnime);
});

// Rota para listar todos os animes
app.get('/animes', (req, res) => {
    res.json(animes);
});

// Rota para listar um anime por ID
app.get('/animes/:id', (req, res) => {
    const { id } = req.params;
    const anime = animes.find(a => a.id === parseInt(id));

    if (!anime) {
        return res.status(404).json({ error: "Anime não encontrado" });
    }

    res.json(anime);
});

// Rota para atualizar um anime por ID
app.put('/animes/:id', (req, res) => {
    const { id } = req.params;
    const { name, genre, studio } = req.body;

    if (!name || !genre || !studio) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const anime = animes.find(a => a.id === parseInt(id));

    if (!anime) {
        return res.status(404).json({ error: "Anime não encontrado" });
    }

    anime.name = name;
    anime.genre = genre;
    anime.studio = studio;

    res.json(anime);
});

// Rota para deletar um anime por ID
app.delete('/animes/:id', (req, res) => {
    const { id } = req.params;
    const index = animes.findIndex(a => a.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: "Anime não encontrado" });
    }

    animes.splice(index, 1);

    res.status(204).send();
});

module.exports = app;
