import React, { useEffect, useState } from "react";
import { getAllAnimes, addAnime, updateAnime, deleteAnime } from "../../services/animeServices";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function BasicTable() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAnime, setNewAnime] = useState({
    name: "",
    genre: "",
    studio: "",
  });
  const [editingAnime, setEditingAnime] = useState(null); 


  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const data = await getAllAnimes();
        setAnimes(data);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar animes.");
        setLoading(false);
        console.error(error);
      }
    };

    fetchAnimes();
  }, []);

  const handleAddAnime = async () => {
    try {
      const addedAnime = await addAnime(newAnime);
      setAnimes([...animes, addedAnime]);
      setNewAnime({ name: "", genre: "", studio: "" });
    } catch (error) {
      setError("Erro ao adicionar o anime.");
      console.error(error);
    }
  };


  const handleDeleteAnime = async (id) => {
    try {
      await deleteAnime(id);
      setAnimes(animes.filter((anime) => anime.id !== id));
    } catch (error) {
      setError("Erro ao deletar o anime.");
      console.error(error);
    }
  };

  
  const handleEditAnime = (anime) => {
    setEditingAnime(anime);  
  };

  const handleUpdateAnime = async () => {
    try {
      await updateAnime(editingAnime.id, editingAnime);
      setAnimes(animes.map((anime) =>
        anime.id === editingAnime.id ? editingAnime : anime
      ));
      setEditingAnime(null);  
    } catch (error) {
      setError("Erro ao atualizar o anime.");
      console.error(error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Adicionar Novo Anime</h2>
      <input
        type="text"
        placeholder="Nome"
        value={newAnime.name}
        onChange={(e) => setNewAnime({ ...newAnime, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Gênero"
        value={newAnime.genre}
        onChange={(e) => setNewAnime({ ...newAnime, genre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Estúdio"
        value={newAnime.studio}
        onChange={(e) => setNewAnime({ ...newAnime, studio: e.target.value })}
      />
      <Button onClick={handleAddAnime}>Adicionar Anime</Button>

      {editingAnime && (
        <div>
          <h2>Editar Anime</h2>
          <input
            type="text"
            placeholder="Nome"
            value={editingAnime.name}
            onChange={(e) =>
              setEditingAnime({ ...editingAnime, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Gênero"
            value={editingAnime.genre}
            onChange={(e) =>
              setEditingAnime({ ...editingAnime, genre: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Estúdio"
            value={editingAnime.studio}
            onChange={(e) =>
              setEditingAnime({ ...editingAnime, studio: e.target.value })
            }
          />
          <Button onClick={handleUpdateAnime}>Salvar Alterações</Button>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome do Anime</TableCell>
              <TableCell align="right">Gênero</TableCell>
              <TableCell align="right">Estúdio</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animes.map((anime) => (
              <TableRow key={anime.id}>
                <TableCell component="th" scope="row">
                  {anime.name}
                </TableCell>
                <TableCell align="right">{anime.genre}</TableCell>
                <TableCell align="right">{anime.studio}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEditAnime(anime)}>Editar</Button>
                  <Button onClick={() => handleDeleteAnime(anime.id)}>Deletar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
