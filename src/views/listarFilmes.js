import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

const ListarFilmes = () => {
  const [filmes, setFilmes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFilmes();
  }, []);

  const loadFilmes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/filme/list');
      setFilmes(response.data);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  const deleteFilme = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/filme/delete/${id}`);
      setFilmes(filmes.filter(filme => filme.id !== id));
      MySwal.fire({
        icon: 'success',
        title: 'Eliminado!',
        text: 'O filme foi eliminado com sucesso.'
      });
    } catch (error) {
      console.error('Erro ao eliminar filme:', error);
      MySwal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao eliminar o filme.'
      });
    }
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: 'Tem a certeza?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFilme(id);
      }
    });
  };

  return (
    
    <div className="container mt-4">
      <h1>Lista de Filmes</h1>
      <div className="row">
        {filmes.map((filme) => (
          <div className="col-md-3" key={filme.id}>
            <div className="card mb-4">
              <Link to={`/filme/get/${filme.id}`}>
                <img src={`http://localhost:3001/${filme.foto}`} className="card-img-top" alt='FotoFilme' style={{ width: '100%', objectFit: 'cover', height: '400px'}} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{filme.titulo}</h5>
                <p className="card-text">{filme.descricao}</p>
                {filme.genero && (
                  <p className="card-text"><small className="text-muted">Género: {filme.genero.descricao}</small></p>
                )}
                <button onClick={() => confirmDelete(filme.id)} className="btn btn-danger" style={{ float: 'right' }}>
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListarFilmes;
