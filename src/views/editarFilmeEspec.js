import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const EditarFilme = () => {
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [generoId, setGeneroId] = useState('');
  const [foto, setFoto] = useState(null);
  const [tituloPlaceholder, setTituloPlaceholder] = useState('');
  const [descricaoPlaceholder, setDescricaoPlaceholder] = useState('');
  const [generos, setGeneros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFilme();
    loadGeneros();
  }, [id]);

  const loadFilme = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/filme/get/${id}`);
      const { titulo, descricao, foto, generoId } = response.data.data;
      setTituloPlaceholder(titulo);
      setDescricaoPlaceholder(descricao);
      setTitulo(titulo); // Set the initial state with current data
      setDescricao(descricao);
      setFoto(foto);
      setGeneroId(generoId);
    } catch (error) {
      console.error('Erro ao buscar filme:', error);
    }
  };

  const loadGeneros = async () => {
    try {
      const response = await axios.get('http://localhost:3001/genero/list');
      setGeneros(response.data);
    } catch (error) {
      console.error('Erro ao buscar géneros:', error);
    }
  };

  const handleTituloChange = (e) => setTitulo(e.target.value);
  const handleDescricaoChange = (e) => setDescricao(e.target.value);
  const handleGeneroChange = (e) => setGeneroId(e.target.value);
  const handleFotoChange = (e) => setFoto(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (titulo) formData.append('titulo', titulo);
    if (descricao) formData.append('descricao', descricao);
    if (generoId) formData.append('generoId', generoId);
    if (foto && typeof foto === 'object') {
      formData.append('foto', foto);
    }

    try {
      await axios.put(`http://localhost:3001/filme/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      MySwal.fire({
        icon: 'success',
        title: 'Atualizado!',
        text: 'O filme foi atualizado com sucesso.',
      }).then(() => {
        navigate('/filme/list');
      });
    } catch (error) {
      console.error('Erro ao atualizar filme:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao atualizar o filme.',
      });
    }
  };

  return (
    <div className="container mt-4 p-2">
      <h2>Editar Filme</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group p-2">
          <label>Título:</label>
          <input
            type="text"
            className="form-control"
            placeholder={tituloPlaceholder}
            value={titulo}
            onChange={handleTituloChange}
          />
        </div>
        <div className="form-group p-2">
          <label>Descrição:</label>
          <textarea
            className="form-control"
            placeholder={descricaoPlaceholder}
            value={descricao}
            onChange={handleDescricaoChange}
          />
        </div>
        <div className="form-group p-2">
          <label>Foto:</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFotoChange}
          />
        </div>
        <div className="form-group p-2">
          <label>Género:</label>
          <select className="form-control" value={generoId} onChange={handleGeneroChange} >
            <option value="">Selecione um género</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>{genero.descricao}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-danger mt-3">Atualizar Filme</button>
      </form>
    </div>
  );
};

export default EditarFilme;
