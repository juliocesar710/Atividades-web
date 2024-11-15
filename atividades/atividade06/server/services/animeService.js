
const animeRepository = require('../repositories/animeRepository');

const createAnime = (name, genre, studio) => {
    if (!name || !genre || !studio) {
        throw new Error("Todos os campos são obrigatórios");
    }
    const newAnime = {
        id: Date.now(),
        name,
        genre,
        studio
    };
    return animeRepository.create(newAnime);
};

const getAllAnimes = () => {
    return animeRepository.getAll();
};

const getAnimeById = (id) => {
    const anime = animeRepository.getById(id);
    if (!anime) {
        throw new Error("Anime não encontrado");
    }
    return anime;
};

const updateAnime = (id, name, genre, studio) => {
    if (!name || !genre || !studio) {
        throw new Error("Todos os campos são obrigatórios");
    }
    const updatedAnime = animeRepository.update(id, { name, genre, studio });
    if (!updatedAnime) {
        throw new Error("Anime não encontrado");
    }
    return updatedAnime;
};

const deleteAnime = (id) => {
    const deleted = animeRepository.deleteById(id);
    if (!deleted) {
        throw new Error("Anime não encontrado");
    }
    return deleted;
};

module.exports = {
    createAnime,
    getAllAnimes,
    getAnimeById,
    updateAnime,
    deleteAnime
};
