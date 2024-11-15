const express = require('express');
const app = express();


app.use(express.json());

const animes = [
    {
        id: 1,
        name: "Naruto",
        genre: "Ação",
        studio: "Pierrot"
    }
];

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


app.get('/animes', (req, res) => {
    res.json(animes);
});


app.get('/animes/:id', (req, res) => {
    const { id } = req.params;
    const anime = animes.find(a => a.id === parseInt(id));

    if (!anime) {
        return res.status(404).json({ error: "Anime não encontrado" });
    }

    res.json(anime);
});


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
