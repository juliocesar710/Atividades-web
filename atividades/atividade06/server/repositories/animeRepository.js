

let animes = [
    {
        id: 1,
        name: "Naruto",
        genre: "Ação",
        studio: "Pierrot"
    }
];


const create = (anime) => {
    animes.push(anime);
    return anime;
};


const getAll = () => {
    return animes;
};

const getById = (id) => {
    return animes.find(a => a.id === id);
};

const update = (id, newData) => {
    const anime = animes.find(a => a.id === id);
    if (anime) {
        anime.name = newData.name;
        anime.genre = newData.genre;
        anime.studio = newData.studio;
    }
    return anime;
};

const deleteById = (id) => {
    const index = animes.findIndex(a => a.id === id);
    if (index !== -1) {
        animes.splice(index, 1);
        return true;
    }
    return false;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById
};
