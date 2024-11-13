import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const NovoFilme = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const [generoId, setGeneroId] = useState('');
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await axios.get('http://localhost:3001/genero/list');
        setGeneros(response.data);
      } catch (error) {
        console.error('Erro ao encontrar géneros:', error);
      }
    };

    fetchGeneros();
  }, []);

  const handleTituloChange = (e) => setTitulo(e.target.value);
  const handleDescricaoChange = (e) => setDescricao(e.target.value);
  const handleFotoChange = (e) => setFoto(e.target.files[0]);
  const handleGeneroChange = (e) => setGeneroId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    if (foto) {
      formData.append('foto', foto);
    }
    formData.append('generoId', generoId);

    try {
      const response = await axios.post('http://localhost:3001/filme/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      MySwal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Filme criado com sucesso!',
      });
      setTitulo('');
      setDescricao('');
      setFoto(null);
      setGeneroId('');
    } catch (error) {
      console.error('Erro ao criar filme:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao criar filme. Verifique o console para mais detalhes.',
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Adicionar Novo Filme</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input type="text" className="form-control" value={titulo} onChange={handleTituloChange} required placeholder='Insira o titulo do filme'/>
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição:</label>
          <textarea className="form-control" value={descricao} onChange={handleDescricaoChange} required placeholder='Insira a descrição do filme'/>
        </div>
        <div className="mb-3">
          <label className="form-label">Foto:</label>
          <input type="file" className="form-control" onChange={handleFotoChange} required/>
        </div>
        <div className="mb-3">
          <label className="form-label">Género:</label>
          <select className="form-control" value={generoId} onChange={handleGeneroChange} required>
            <option value="">Selecione um género</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.descricao}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-danger">Adicionar Filme</button>
      </form>
    </div>
  );
};

export default NovoFilme;
