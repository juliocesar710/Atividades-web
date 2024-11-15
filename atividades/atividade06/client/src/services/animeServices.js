    import axios from 'axios';

    const API_URL = 'http://localhost:3002/animes';

    export const getAllAnimes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os animes:', error);
        throw error;
    }
    };

    export const getAnimeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar o anime com ID ${id}:`, error);
        throw error;
    }
    };

    export const addAnime = async (anime) => {
    try {
        const response = await axios.post(API_URL, anime);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar o anime:', error);
        throw error;
    }
    };

    export const updateAnime = async (id, anime) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, anime);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar o anime com ID ${id}:`, error);
        throw error;
    }
    };


    export const deleteAnime = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Erro ao deletar o anime com ID ${id}:`, error);
        throw error;
    }
    };
