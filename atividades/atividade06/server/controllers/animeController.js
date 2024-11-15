// controllers/animeController.js

const express = require('express');
const router = express.Router();
const animeService = require('../services/animeService');


router.post('/', (req, res) => {
    const { name, genre, studio } = req.body;
    try {
        const newAnime = animeService.createAnime(name, genre, studio);
        res.status(201).json(newAnime);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/', (req, res) => {
    const animes = animeService.getAllAnimes();
    res.json(animes);
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const anime = animeService.getAnimeById(Number(id));
        res.json(anime);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, genre, studio } = req.body;
    try {
        const updatedAnime = animeService.updateAnime(Number(id), name, genre, studio);
        res.json(updatedAnime);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    try {
        animeService.deleteAnime(Number(id));
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
