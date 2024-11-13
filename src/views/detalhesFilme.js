import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const DetalhesFilme = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/filme/get/${id}`);
        setFilme(response.data.data);
        setErro('');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErro('Filme não encontrado.');
        } else {
          console.error('Erro ao encontrar filme:', error);
          setErro('Erro ao encontrar filme.');
        }
        setFilme(null);
      }
    };

    load();
  }, [id]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Detalhes do Filme</h1>
      {filme ? (
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <div className="row g-0">
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <img
                src={`http://localhost:3001/${filme.foto}`}
                alt={filme.titulo}
                className="img-fluid rounded-start"
                style={{ maxHeight: '400px', objectFit: 'cover', width: '50%' }}
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h2 className="card-title mb-3">{filme.titulo}</h2>
                <p className="card-text"><strong>ID:</strong> {filme.id}</p>
                <p className="card-text"><strong>Descrição:</strong></p>
                <p className="card-text">{filme.descricao}</p>
                {filme.genero && (
                  <p className="card-text"><strong>Género:</strong> {filme.genero.descricao}</p>
                )}
                <Link to={`/filme/edit/${filme.id}`} className="btn btn-warning" style={{color: 'white'}}>
                  Editar Filme
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}
    </div>
  );
};

export default DetalhesFilme
